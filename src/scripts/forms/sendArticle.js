import axios from 'axios';
import createDataObject from './createObjectFromForm';
import clearForm from './clearForm';


async function sendFormData(url, element, callback) {
    const data = createDataObject(element);

    const body = data.body.split('\n');
    console.log(body);
    let parsedBody = body.forEach((paragraph) => {paragraph.append})

    await axios.post(url, data, {headers: "application/json"})
        .then(response => {callback(response, null); clearForm(element);})
        .catch(err => {callback(null, err);});
}

export {
    sendFormData
}