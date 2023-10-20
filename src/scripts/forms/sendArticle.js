import axios from 'axios';
import createDataObject from './createObjectFromForm';
import clearForm from './clearForm';


async function sendFormData(url, element, callback, additionalData) {
    let data = createDataObject(element);
    for (let i = 0; i < additionalData.length; i++) {
        console.log(additionalData[i]);
        data[additionalData[i][0]] = additionalData[i][1];
    }
    console.log(data);
    if (!data.body) throw new Error('No article provided!'); 
    const body = data.body.split('\n');
    let parsedBody = body.forEach((paragraph) => {paragraph.append})

    await axios.post(url, data, {headers: "application/json"})
        .then(response => {callback(response, null); clearForm(element);})
        .catch(err => {callback(null, err);});
}

export {
    sendFormData
}