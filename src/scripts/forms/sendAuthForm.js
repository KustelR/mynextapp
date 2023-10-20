import axios from 'axios';
import {generatePasswordHash} from '../passgen';
import createDataObject from './createObjectFromForm';
import clearForm from './clearForm';


async function sendFormData(url, element, callback) {
    const data = createDataObject(element);
    
    if (data.password) {
        data.password = await generatePasswordHash(data.password, 'salt');
    }

    await axios.post(url, data, {headers: "application/json"})
        .then(response => {callback(response, null); clearForm(element);})
        .catch(err => {callback(null, err);});
}

export {
    sendFormData
}