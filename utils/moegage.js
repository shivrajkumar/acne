import moengage from "@moengage/web-sdk";

export const trackMoEngageEvent = (eventName, eventData) => {
  console.log("Tracking MoEngage event:", eventName, eventData);
  const trackEventWhenLoaded = () => {
    if (moengage.isMoeLoaded()) {
      moengage.track_event(eventName, eventData);
    } else {
      setTimeout(trackEventWhenLoaded, 250); // Retry after a delay
    }
  };
  trackEventWhenLoaded();
};

export const callAfterMoegageIsLoaded = (fn) => {
  const call = () => {
    if (moengage.isMoeLoaded()) {
      fn();
    } else {
      setTimeout(call, 250);
    }
  };
  call();
};

export const addUserAttributeAfterMoenageLoads = (key, value) => {
  const call = () => {
    if (moengage.isMoeLoaded()) {
      moengage.add_user_attribute(key, value);
    } else {
      setTimeout(call, 250);
    }
  };
  call();
};
