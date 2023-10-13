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

async function sendFormData(url, element, callback) {
    const data = createDataObject(element);

    await axios.post(url, data, {headers: "application/json"})
        .then(response => {callback(response, null);})
        .catch(err => {callback(err, null);});
}


export default function SendableForm({href, children}) {

    const [isFailed, setIsFailed] = useState();
    const [isLoading, setIsLoading] = useState();
    const [infoBox, setInfoBox] = useState({});

    function handleSendResult(response, error) {
        if (response) {
            const data = response.data;
            if (response.status == 200) {
                setIsFailed(false);
                setInfoBox({title: data.messageTitle, body: data.message});
            }
            else {
                setIsFailed(true);
                setInfoBox({title: "Form sending failed", body: response.message});
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
