// import Cookies from "js-cookie";
// import { forEach } from "lodash";
import {
  // getValidJSONFromString,
  RETRIEVE_CART_SHOPFLO,
} from "@/constants/urls";
import { env } from "next-runtime-env";

// const UTM_KEYS = [
//   "utm_campaign",
//   "utm_source",
//   "utm_medium",
//   "utm_content",
//   "utm_term",
//   "adset",
//   "adname",
// ];

//UTM related data will be handled later on
const SECURITY_TOKEN = env("NEXT_PUBLIC_API_TOKEN");

async function handleBuyNowClick(
  products,
  caseId,
  tags = ["ORDER_SOURCE_WEB_V2", "SHOPFLO"]
) {
  try {
    if (typeof window !== "undefined") {
      let utmParams = [];
      let productDescriptions = [];
      products.forEach((val) => {
        let objVal = {
          product_id: val.variantId,
          price: val.price,
          quantity: val.quantity,
        };
        productDescriptions.push(objVal);
      });
      // const existingCookie = Cookies.get("__TRAYA_UTM__");
      // let existingParams = getValidJSONFromString(existingCookie);
      // const filteredParams = UTM_KEYS.reduce((acc, key) => {
      //   if (existingParams[key]) {
      //     acc[key] = existingParams[key];
      //   }
      //   return acc;
      // }, {});
      // forEach(filteredParams, (value, key) => {
      //   utmParams.push({ name: key, value });
      // });
      // utmParams.push({
      //   name: "location",
      //   value: window.location.pathname + window.location.search,
      // });
      const sessionId = window.Shopflo?.getSessionId();

      let url = RETRIEVE_CART_SHOPFLO(caseId);
      const currenPathUrl = window.location.href;

      // Direct fetch implementation instead of using fetchRequest
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": "acne",
          "x-access-token": `${SECURITY_TOKEN}`,
        },
        body: JSON.stringify({
          productDescriptions: productDescriptions,
          tags,
          backUrl: currenPathUrl,
          sessionId: sessionId,
          note_attributes: utmParams,
          success_url: "API_URL",
        }),
      });

      const status = response.status;

      // Simple handling of text/html or JSON response
      let data;
      if (status === 200) {
        const responseText = await response.text();
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          data = responseText;
        }

        window.Shopflo.openFloCheckout(data);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export default handleBuyNowClick;
