import axios from "axios";

/**
 * Sends data to specified url
 * @param {String} url Target url
 * @param {Object} payload Data to be sent in body
 * @param {Object} headers Sets headers to be sent in request
 * @returns {Promise<AxoisResponse>} response from server
 */
export default function post(url, payload, headers) {
  return axios.post(url, payload, { headers: headers });
}
