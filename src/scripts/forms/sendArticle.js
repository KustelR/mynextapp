import createDataObject from './createObjectFromForm';
import clearForm from './clearForm';
import postToApi from '@/scripts/postToApi';


async function sendFormData(url, element, callback, additionalData) {
    let data = createDataObject(element);
    for (let i = 0; i < additionalData.length; i++) {
        data[additionalData[i][0]] = additionalData[i][1];
    }

    if (!data.body) throw new Error('No article provided!'); 

    let response;
    try {
        response = await postToApi(url, data, {headers: "application/json"})
    }
    catch(err) {
        callback(null, err);
        return;
    }
    callback(response, null); clearForm(element);
}

export {
    sendFormData
}