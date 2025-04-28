import isEmpty from "lodash/isEmpty";
import { MOENGAGE_APP_ID } from "../constants/config";

export const initializeMoengage = () => {
  !(function (e, n, i, t, a, r, o, d) {
    var s = (e[a] = e[a] || []);
    if (((s.invoked = 0), s.initialised > 0 || s.invoked > 0))
      return (
        console.error(
          "MoEngage Web SDK initialised multiple times. Please integrate the Web SDK only once!"
        ),
        !1
      );
    e.moengage_object = a;
    var l = {},
      g = function n(i) {
        return function () {
          for (var n = arguments.length, t = Array(n), a = 0; a < n; a++)
            t[a] = arguments[a];
          (e.moengage_q = e.moengage_q || []).push({ f: i, a: t });
        };
      },
      u = [
        "track_event",
        "add_user_attribute",
        "add_first_name",
        "add_last_name",
        "add_email",
        "add_mobile",
        "add_user_name",
        "add_gender",
        "add_birthday",
        "destroy_session",
        "add_unique_user_id",
        "moe_events",
        "call_web_push",
        "track",
        "location_type_attribute",
      ],
      m = { onsite: ["getData", "registerCallback"] };
    for (var c in u) l[u[c]] = g(u[c]);
    for (var v in m)
      for (var f in m[v])
        null == l[v] && (l[v] = {}), (l[v][m[v][f]] = g(v + "." + m[v][f]));
    (r = n.createElement(i)),
      (o = n.getElementsByTagName("head")[0]),
      (r.async = 1),
      (r.src = t),
      o.appendChild(r),
      (e.moe =
        e.moe ||
        function () {
          return ((s.invoked = s.invoked + 1), s.invoked > 1)
            ? (console.error(
                "MoEngage Web SDK initialised multiple times. Please integrate the Web SDK only once!"
              ),
              !1)
            : ((d = arguments.length <= 0 ? void 0 : arguments[0]), l);
        }),
      r.addEventListener("load", function () {
        if (d)
          return (
            (e[a] = e.moe(d)),
            (e[a].initialised = e[a].initialised + 1 || 1),
            !0
          );
      }),
      r.addEventListener("error", function () {
        return console.error("Moengage Web SDK loading failed."), !1;
      });
  })(
    window,
    document,
    "script",
    "https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js",
    "Moengage"
  );
  // eslint-disable-next-line no-undef
  window.Moengage = moe({
    app_id: MOENGAGE_APP_ID,
    debug_logs: 1,
    cluster: "DC_3",
  });
};
export const handleMoengage = (key, response) => {
  moengageUserAttributes(key, response);
};

export const moengageTrackEvent = (event, data) => {
  try {
    switch (event) {
      case "hairtest_semifilled":
        handleCustomUserAttributes("form_status", "semi-filled");
        break;
      case "hairtest_complete":
        handleCustomUserAttributes("form_status", "filled");
        break;
      default:
        break;
    }

    window.Moengage.track_event(event, { ...data });
  } catch (error) {
    console.warn(error.message);
  }
};

export const sendUtmDataToMoengage = (data) => {
  if (!isEmpty(data)) {
    setTimeout(() => {
      for (let key in data) {
        const attribute = key.replace(/utm_/i, "");
        handleCustomUserAttributes(attribute, data[key]);
      }
    }, [2000]);
  }
};

export const handlePreDefinedUserAttributes = (fn, response) => {
  try {
    window.Moengage[fn](response);
  } catch (error) {
    console.warn(error.message);
  }
};

export const handleCustomUserAttributes = (attribute, response) => {
  try {
    window.Moengage.add_user_attribute(attribute, response);
  } catch (error) {
    console.warn(error.message);
  }
};

export const moengageUserAttributes = (key, response) => {
  switch (key) {
    case "first_name": {
      if (response && typeof response === "string") {
        const name = response.split(" ");
        let [firstName, ...lastName] = name;
        lastName = lastName.join(" ");

        handlePreDefinedUserAttributes("add_first_name", firstName);
        if (lastName) handlePreDefinedUserAttributes("add_last_name", lastName);
      }
      break;
    }

    case "phone_number":
      handlePreDefinedUserAttributes("add_mobile", response);
      handlePreDefinedUserAttributes("add_unique_user_id", response);
      break;

    case "email":
      handlePreDefinedUserAttributes("add_email", response);
      break;

    case "gender":
      handlePreDefinedUserAttributes("add_gender", response);
      break;

    default:
      break;
  }
};

