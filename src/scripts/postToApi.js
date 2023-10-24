import axios from "axios";


/**
 * Sends data to specified url
 * @param {String} url Target url
 * @param {Object} payload Data to be sent in body
 * @param {Object} params Query params
 * @returns {Promise<AxoisResponse>} response from server
 */
export default function post(url, payload, params) {
    return axios.post(url, payload, {params: params})
}
