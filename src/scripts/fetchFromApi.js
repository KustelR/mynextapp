import axios from "axios";

/**
 * Sends get request to url with given parameters
 * @param {string} url specifies request url
 * @param {object} params specifies requset query params
 * @returns {Promise<AxoisResponse>} response from server
 */
async function fetchFromApi(url, params, headers) {
  return axios.get(url, { params: params, headers: headers });
}

export default fetchFromApi;
