"use client";

import React, { useState } from "react";

import ShowIf from "./ui/ShowIf";
import SuccessBox from "./ui/popups/SuccessBox";
import ErrorBox from "./ui/popups/ErrorBox";
import PendingBox from "./ui/popups/PendingBox";

/**
 * Container for forms that (kinda) automatically finds
 * inputs inside of it and sends data to specified url
 * @param {object}  param0 react component props
 * @param {string} href Url to which will be sent request with form data
 * @param {*} children Things to be set inside of the form
 * @param {function} submitHandler Function to be called when form is submitted
 * @returns {React.JSX.Element}
 */
export default function SendableForm({ href, children, submitHandler }) {
    const [isFailed, setIsFailed] = useState();
    const [isLoading, setIsLoading] = useState();
    const [infoBox, setInfoBox] = useState({});

    async function submit(e) {
        e.preventDefault();
        if (submitHandler) {
            submitHandler(href, e, handleSendResult);
            setIsLoading(true);
            setIsFailed(undefined);
        } else {
            console.error("No submit handler provided to the form");
        }
    }

    async function handleSendResult(response, error) {
        error // This cursed abomination assigns error.response to response if there is no response, but error.response
            ? error.response
                ? (response = error.response)
                : (response = null)
            : (error = null);
        let data;
        if (response) {
            if (response.status.toString().startsWith("2")) {
                data = response.data;
                setIsFailed(false);
                setInfoBox({ title: data.messageTitle, body: data.message });
            } else {
                data = response.data;
                setIsFailed(true);
                setInfoBox({ title: data.messageTitle, body: data.message });
            }
        } else {
            setIsFailed(true);
            setInfoBox({ title: "Form sending failed", body: error.message });
        }

        if (data) {
            if (data.toLocalStorage) {
                const keys = Object.keys(data.toLocalStorage);
                for (let i = 0; i < keys.length; i++) {
                    localStorage.setItem(keys[i], data.toLocalStorage[keys[i]]);
                }
            }
        }

        setIsLoading(false);
    }

    return (
        <form onSubmit={submit}>
            <ShowIf isVisible={!isFailed && isFailed !== undefined}>
                <SuccessBox title={infoBox.title} body={infoBox.body} />
            </ShowIf>
            <ShowIf isVisible={isFailed}>
                <ErrorBox title={infoBox.title} body={infoBox.body} />
            </ShowIf>
            <ShowIf isVisible={isLoading}>
                <PendingBox
                    title="Sending form to the server..."
                    body="Please stand by"
                />
            </ShowIf>
            {children}
        </form>
    );
}
