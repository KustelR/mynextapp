'use client'

import React, {useState} from 'react';

import ShowIf from './ui/ShowIf';
import SuccessBox from './ui/popups/SuccessBox';
import ErrorBox from './ui/popups/ErrorBox';
import PendingBox from './ui/popups/PendingBox';


export default function SendableForm({href, children, submitHandler}) {

    const [isFailed, setIsFailed] = useState();
    const [isLoading, setIsLoading] = useState();
    const [infoBox, setInfoBox] = useState({});

    async function handleSendResult(response, error) {
        error ? // This cursed abomination assigns error.response to response if there is no response, but error.response
        error.response ? response = error.response : response = null 
        : error = null;

        if (response) {
            if (response.status === 200) {
                const data = response.data;
                setIsFailed(false);
                setInfoBox({title: data.messageTitle, body: data.message});
            }
            else {
                const data = response.data;
                setIsFailed(true);
                setInfoBox({title: data.messageTitle, body: data.message});
            }
        }
        else {
            setIsFailed(true);
            setInfoBox({title: "Form sending failed", body: error.message});
        }
        setIsLoading(false);
    }

  return (
    <form onSubmit={e => {e.preventDefault(); submitHandler(href, e, handleSendResult); setIsLoading(true); setIsFailed(undefined)}}>
        <ShowIf 
            isVisible={!isFailed && (isFailed !== undefined)}>
            <SuccessBox title={infoBox.title} body={infoBox.body} />
        </ShowIf>
        <ShowIf 
            isVisible={isFailed}>
            <ErrorBox title={infoBox.title} body={infoBox.body} />
        </ShowIf>
        <ShowIf 
            isVisible={isLoading}>
            <PendingBox title="Sending form to the server..." body="Please stand by" />
        </ShowIf>
        {children}
    </form>
  )
}
