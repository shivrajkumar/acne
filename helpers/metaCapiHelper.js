// import {fetchRequest} from "./fetchRequest";
import { trackUmamiEvent } from "@components/generic/UmamiTracker";
import crypto from "crypto";
import { getCurrentTimeInReadableForm } from "./timeFormatter";

export const metaCapi = async (
    { url, email, phone, fbc, fbp, gender, name, order_id, path },
    eventName
) => {
    const eventTime = Date.now();
    const body = {
        eventName: eventName,
        eventTime,
        email: email,
        phone: phone,
        fbc: fbc,
        fbp: fbp,
        url: url,
        domain: window.location.hostname,
        gender: gender,
        full_name: name,
        event_id: generateEventId({eventName, phone, orderId: order_id, path}),
    };

    /*  const res = await fetchRequest(CAPI_TRACKING_API, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res;*/

    await trackUmamiEvent("capi_event", {
        capi_payload: JSON.stringify({
            ...body,
            tenant_id: "acne"
        })
    });
};

export const generateEventId = ({eventName, phone, orderId, path}) => {
  const eventTime = Date.now();
  if (!path && typeof window != undefined) path = window.location.pathname; 
  if (phone) {
      const eventId = `${eventName}_${hash(phone)}`
      if (orderId) {
          return `${eventId}_${orderId}`
      }

      return eventId;
  } else {
      // page view and other events where customer phone is not known
      const eventId = `${eventName}_${eventTime}`;
      if (path) {
          return `${eventId}_${path.replace("/", "")}`;
      }
  }
}

const hash = (input) => {
  if (!input) {
      return;
  }
  return crypto.createHash('sha256').update(input?.trim() || "").digest('hex');
}
