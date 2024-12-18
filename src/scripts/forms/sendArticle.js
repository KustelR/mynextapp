import createDataObject from "./createObjectFromForm";
import clearForm from "./clearForm";
import postToApi from "@/scripts/postToApi";

/**
 * Sends form data to specified url with auto-gathered from form data
 * @param {string} url Url to which JSON of form data will be sent
 * @param {*} element Form element from which data will be gathered
 * @param {function} callback Func that will be called after execution,
 * recieves ```(response, error)``` as params
 * @param {object} additionalData Data not from ```input``` or ```textarea``` that needs to be sent
 * @param {object} headers Headers that will be set to request
 * @returns
 */
async function sendFormData(url, element, callback, additionalData, headers) {
  let data = createDataObject(element);

  let response;
  try {
    response = await postToApi(
      url,
      Object.assign(data, additionalData),
      Object.assign({ "Content-Type": "application/json" }, headers),
    );
  } catch (err) {
    callback(null, err);
    return;
  }
  callback(response, null);
  clearForm(element);
}

export { sendFormData };
