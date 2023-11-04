import axios from 'axios';

/**
 * Mekes authorized request (via function `call`)
 * @param {string} url 
 * @param {object} config 
 * @param {function} call Url and config will be passed to this function with auth data
 * @returns 
 */
export default async function reqAuth(url, config={}, call=axios.get, payload=undefined) {

    async function authCall(accessToken) {
        if(!payload) {
             const response = await call(url, Object.assign(
                config, 
                {headers: {'x-access-token': accessToken}}));
            return response;
        } else {
            const response = await call(url, payload, Object.assign(
                config, 
                {headers: {'x-access-token': accessToken}}));
            return response;
        }
       
    }

    let accessToken = localStorage.getItem('accessToken');
    try {
        if (!accessToken) throw new Error;
        return await authCall(accessToken);
    } catch (err) {
        accessToken = undefined;

        const refreshToken = localStorage.getItem('refreshToken');
        const refreshMessage = await axios.get('/auth/v1/accesstoken', 
            {params: {refresh_token: refreshToken}});
        accessToken = refreshMessage.data;
        localStorage.setItem('accessToken', accessToken);
        if (accessToken) {
            return await authCall(accessToken);
        }
    }
}