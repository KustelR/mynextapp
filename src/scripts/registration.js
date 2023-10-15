import axios from 'axios';
import {generatePasswordHash} from '../scripts/passgen';


function createDataObject(element) {
    let data = {};
    const form = Object.entries(element.target);
    form.forEach(item => {
        const tagName = item[1].tagName;
        const id = item[1].id;
        const value = item[1].value;
        if (tagName && id && value && id) {
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

    data.password = await generatePasswordHash(data.password, 'salt');

    await axios.post(url, data, {headers: "application/json"})
        .then(response => {callback(response, null); clearForm(element);})
        .catch(err => {callback(null, err);});
}

export {
    sendFormData
}