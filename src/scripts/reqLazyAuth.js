import axios from 'axios';


/**
 * Makes authorized request (via function `call`) do not trying to get new access token if old expired
 * @param {string} url 
 * @param {object} config 
 * @param {function} call Url and config will be passed to this function with auth data
 * @returns 
 */
export default async function reqLazyAuth(url,  call=axios.get, config={}) {
    let accessToken = localStorage.getItem('accessToken');
    let response;
    try {
        response = await call(url, Object.assign(
            config, 
            {headers: {'x-access-token': accessToken}}));
        return response;
    } catch (err) {
        response = await call(url, config);
        return response;
    }
}