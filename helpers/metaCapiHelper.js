import { fetchRequest } from "./fetchRequest";
import { CAPI_TRACKING_API } from "../constants/urls";

export const metaCapi = async (
  { url, email, phone, fbc, fbp, gender },
  eventName
) => {
  const body = {
    eventName: eventName,
    eventTime: Date.now(),
    email: email,
    phone: phone,
    fbc: fbc,
    fbp: fbp,
    url: url,
    domain: window.location.hostname,
    gender: gender,
  };

  const res = await fetchRequest(CAPI_TRACKING_API, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res;
};
