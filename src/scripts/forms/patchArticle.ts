import createDataObject from "./createObjectFromForm";
import axios, { AxiosResponse } from "axios";

/**
 * Sends form data to specified url with auto-gathered from form data
 * @param {string} url Url to which JSON of form data will be sent
 * @param {*} element Form element from which data will be gathered
 * @param {Function} callback Func that will be called after execution,
 * recieves ```(response, error)``` as params
 * @param {object} additionalData Data not from ```input``` or ```textarea``` that needs to be sent
 * @param {object} headers Headers that will be set to request
 * @returns
 */
export default async function patchData(
  url: string,
  element: any,
  callback: Function | null,
  additionalData: object,
  headers: object,
) {
  let data = createDataObject(element);

  let response: AxiosResponse<any, any>;
  try {
    response = await axios.patch(url, Object.assign(data, additionalData), {
      headers: Object.assign({ "Content-Type": "application/json" }, headers),
    });
  } catch (err) {
    if (callback) {
      callback(null, err);
    }
    return;
  }
  if (callback) {
    callback(response, null);
  }
}
