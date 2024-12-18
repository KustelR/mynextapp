import axios from "axios";
import { generatePasswordHash } from "../passgen";
import createDataObject from "./createObjectFromForm";
import clearForm from "./clearForm";
import postToApi from "@/scripts/postToApi";

async function sendFormData(url, element, callback) {
  const data = createDataObject(element);

  if (data.password) {
    data.password = await generatePasswordHash(data.password, "salt");
  }

  let response;
  try {
    response = await postToApi(url, data, { headers: "application/json" });
  } catch (err) {
    callback(null, err);
    return;
  }
  callback(response, null);
  clearForm(element);
}

export { sendFormData };
