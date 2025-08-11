// import {fetchRequest} from "./fetchRequest";
import { trackUmamiEvent } from "@components/generic/UmamiTracker";
import crypto from "crypto";

export const metaCapi = async (
    { url, email, phone, fbc, fbp, gender, order_id },
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
        event_id: generateEventId(eventName, phone, eventTime, order_id),
    };

    /*  const res = await fetchRequest(CAPI_TRACKING_API, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res;*/

    await trackUmamiEvent("capi_event", JSON.stringify({
        ...body,
        tenant_id: "acne"
    }));
};

const generateEventId = (eventName, phone, eventTime, orderId) => {
    if (phone) {
        const eventId = `${eventName}_${hash(phone)}`
        if (orderId) {
            return `${eventId}_${orderId}`
        }

        return eventId;
    } else {
        // page view and other events where customer phone is not known
        return `${eventName}_${eventTime}`;
    }
}

const hash = (input) => {
    if (!input) {
        return;
    }
    return crypto.createHash('sha256').update(input).digest('hex');
}
