import Cookies from "js-cookie";
import isEmpty from "lodash/isEmpty";

const handleRedirections = ({ val, queryStrings, router }) => {
  let gender = window.localStorage.getItem("gender");
  let syntheticId = window.localStorage.getItem("syntheticId");

  if (val === "resultPage") {
    router.push(
      `/result?tid=${syntheticId}?${
        !isEmpty(queryStrings?.utmData) ? "&" : ""
      }${new URLSearchParams(queryStrings?.utmData || {}).toString()}`
    );
  }
  if (val === "refill") {
    Cookies.remove("_fw_crm_v");
    Cookies.remove("__TRAYA_UTM__");
    window.sessionStorage.clear();
    window.localStorage.clear();
    fetch("/api/clearCookies", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: "_fw_crm_v" }),
    });
    window.location.reload();
    router.push("/skin-test");
  }

  if (val === "editAgain") {
    window.localStorage.removeItem("tabclosed");
    window.localStorage.setItem("should_restore_state", "true");
    
    // Navigate with a query parameter as backup
    router.push("/skin-test?restore=true");
  }
};

export default handleRedirections;
