// import Cookies from "js-cookie";
// import { CDN_BASE_URL } from "./config";

import { env } from "next-runtime-env";

export const COOKIES_EXPIRY = 60; // Days
export const CDN_BASE_URL = env("NEXT_PUBLIC_CDN_BASE_URL") + "/";
export const SHOPIFY_CDN_BASE_URL = 'https://cdn.shopify.com/s/files/1/0100/1622/7394/files/'
// var CONSULT_DOCTOR_FEES = "";
// var MALE_RESULT_PAGE = "";
// var FEMALE_RESULT_PAGE = "";

// if (Cookies.get("DOCTOR_LANDING") == "landingV2") {
//   CONSULT_DOCTOR_FEES = 399.0;
// } else if (Cookies.get("DOCTOR_LANDING") == "landingV3") {
//   CONSULT_DOCTOR_FEES = 299.0;
// } else {
//   CONSULT_DOCTOR_FEES = 499.0;
// }

// export var CONSULT_DOCTOR_FEES;

// if (
//   (typeof window !== "undefined" &&
//     window.location.pathname == "/femaleV2/question") ||
//   (typeof window !== "undefined" &&
//     window.location.pathname == "/home/question")
// ) {
//   MALE_RESULT_PAGE = "/pages/result4";
//   FEMALE_RESULT_PAGE = "/pages/female-result";
// } else {
//   MALE_RESULT_PAGE = "https://traya.health/pages/result4";
//   FEMALE_RESULT_PAGE = "https://traya.health/pages/female-result";
// }
// export var MALE_RESULT_PAGE;
// export var FEMALE_RESULT_PAGE;

export const TRAYA_MINI_HOME_URL = "https://traya.health/pages/transplant";
export const APP_TRAYA_DASHBOARD = "https://app.traya.health/login/";
export const APP_DEV_TRAYA_DASHBOARD = "https://portal.dev.hav-g.in/login/";
export const DEFAULT_FORM_CATEGORY = "next_form";
export const WAIT_FOR_PAYMENT = 1000 * 60 * 3; // MilliSeconds

export const SHOPIFY_REPEAT_RESULT = "https://traya.health/pages/Result-repeat";
export const TRAYA_FEMALE_URL = "https://traya.health/pages/female";

export const CLICK_POST_URL = "https://trayahealth.clickpost.ai/returns";

export const PLATFORM = "web_native";

// export const LODHA_KEY = "FRsdTOje52Xf1S78vv1gmiyPpDcxtgPw";
// export const TOTAL_USERS_FILLED_HAIR_TEST = 2493346;
// export const trayaLogo = require("../assets/images/traya_logo.jpg");
// export const trayaLogoDark = `${CDN_BASE_URL}website_images/localImages/TrayaLogoDark.webp`;
// // export const traya = require("../assets/images/traya.png");
// export const traya2x = require("../assets/images/traya@2x.png");
// export const traya3x = require("../assets/images/traya@3x.png");

// export const GooglePlayIcon = `${CDN_BASE_URL}website_images/localImages/play_store.webp`;
// export const AppStoreIcon = `${CDN_BASE_URL}website_images/localImages/app_store.webp`;
// export const trayalogo = `${CDN_BASE_URL}website_images/localImages/traya.webp`;

export const STRAPI_DEV_URL = 'https://webcms.dev.hav-g.in'
export const STRAPI_PROD_URL = ''