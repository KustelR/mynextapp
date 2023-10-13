'use client'

import React, {useState} from 'react';
import axios from 'axios';

import ShowIf from './ui/ShowIf';
import SuccessBox from './ui/popups/SuccessBox';
import ErrorBox from './ui/popups/ErrorBox';
import PendingBox from './ui/popups/PendingBox';


function createDataObject(element) {
    let data = {};
    const form = Object.entries(element.target);
    form.forEach(item => {
        const tagName = item[1].tagName;
        const id = item[1].id;
        const value = item[1].value;
        if (tagName && id && value) {
            data[id] = value;
        }
    });
    return data;
}

function clearForm(element) {
    const form = Object.entries(element.target);
    let i = 0;
    form.forEach(item => {
        if (item[1].value) {
            element.target[item[0]].value = '';
        }
    })
}

async function sendFormData(url, element, callback) {
    const data = createDataObject(element);

    await axios.post(url, data, {headers: "application/json"})
        .then(response => {callback(response, null); clearForm(element);})
        .catch(err => {callback(null, err);});
}


export default function SendableForm({href, children}) {

    const [isFailed, setIsFailed] = useState();
    const [isLoading, setIsLoading] = useState();
    const [infoBox, setInfoBox] = useState({});

    async function handleSendResult(response, error) {
        if (response) {
            if (response.status === 200) {
                const data = response.data;
                setIsFailed(false);
                setInfoBox({title: data.messageTitle, body: data.message});
            }
            else {
                const data = response.data;
                setIsFailed(true);
                setInfoBox({title: response.response.data.messageTitle, body: response.response.data.message});
            }
        }
        else {
            setIsFailed(true);
            setInfoBox({title: "Form sending failed", body: error.message});
        }
        setIsLoading(false);
    }

  return (
    <form onSubmit={e => {e.preventDefault(); sendFormData(href, e, handleSendResult); setIsLoading(true); setIsFailed(undefined)}}>
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
