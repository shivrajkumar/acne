import { MD5 } from "crypto-js";

export const SUBMISSION_COMPLETED = "submission_completed";
export const CHOLESTEROL_SUBMISSION_COMPLETED =
  "cholesterol_submission_completed";
export const GUEST_FORM_SUBMISSION_COMPLETED =
  "guest_form_submission_completed";
export function logGaEvent() {
  try {
    window.ga("send", {
      hitType: "event",
      eventCategory: "Button_Click",
      eventAction: "Diagnosis_Filled",
      eventLabel: "Click_Submit_Diagnosis",
    });
  } catch (error) {
    console.error(error.toString());
  }
}

export async function logGtmEvent(event, caseID, email, formType) {
  try {
    window.dataLayer = window.dataLayer || [];
    await window.dataLayer.push({
      event: event,
      formLocation: "form.traya.health",
      caseID: caseID,
      enhanced_conversion_data: {
        email: email,
      },
      formType: formType,
    });
  } catch (error) {
    console.info(error.toString());
  }
}

export async function logGtmEventwithParameters(event, data) {
  try {
    window.dataLayer = window.dataLayer || [];
    await window.dataLayer.push({
      event: event,
      formLocation: "form.traya.health",
      elementID: data,
    });
  } catch (error) {
    console.info(error.toString());
  }
}

export async function triggerGa() {
  try {
    await fetch(
      `https://www.google-analytics.com/collect?v=1&t=event&tid=UA-139324868-1&cid=90ba43b7-980b-42ae-8aba-86aa793d4a82&ec=Lead%20Control&ea=test&el=form`,
      {
        method: "POST",
      }
    );
  } catch (error) {
    console.error(error.toString());
  }
}

export async function gtmEcommerce(propsData, event) {
  try {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ ecommerce: null });
    let user_email = window.localStorage.getItem("user_email");
    let user_phone = window.localStorage.getItem("user_phone");
    let user_synthetic_id = window.localStorage.getItem("user_syn");
    let gender = window.localStorage.getItem("gender")?.replace(/['"]+/g, "");

    const encryptedEmail = user_email ? MD5(user_email.trim()).toString() : "";
    const encryptedPhone = user_phone ? MD5(user_phone.trim()).toString() : "";
    window.dataLayer.push({
      ecommerce: {
        currencyCode: "INR",
        value: propsData?.totalPrice ? propsData?.totalPrice : "",
        items: propsData?.cartData ? propsData?.cartData : "",
        cartTotal: propsData?.cartData?.length
          ? propsData?.cartData?.length
          : "",
      },
      EID: encryptedEmail,
      MID: encryptedPhone,
      NAEID: user_email ? user_email.trim() : "",
      NAMID: user_phone ? user_phone.trim() : "",
      user_id: user_synthetic_id ? user_synthetic_id : "",
      event: event ? event : "",
      Gender: gender ? gender : "",
      Section: propsData.section ? propsData.section : "",
      PageName: propsData.pagename ? propsData.pagename : "",
    });
  } catch (error) {
    console.error(error.toString());
  }
}

export async function userGTM(data) {
  try {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ ecommerce: null });
    let user_email = window.localStorage.getItem("user_email");
    let user_phone = window.localStorage.getItem("user_phone");
    let user_id = window.localStorage.getItem("user_id");
    let gender = window.localStorage.getItem("gender");
    let age = window.localStorage.getItem("age");
    let user_synthetic_id = window.localStorage.getItem("user_syn");

    const encryptedEmail = user_email ? MD5(user_email.trim())?.toString() : "";
    const encryptedPhone = user_phone ? MD5(user_phone.trim())?.toString() : "";

    window.dataLayer.push({
      EID: encryptedEmail,
      MID: encryptedPhone,
      NAEID: user_email ? user_email.trim() : "",
      NAMID: user_phone ? user_phone.trim() : "",
      user_id: user_synthetic_id ? user_synthetic_id : "",
      Gender: gender ? gender : "",
      Age: age ? age : "",
      event: data.event ? data.event : "",
      Section: data.section ? data.section : "",
      PageName: data.page_name ? data.page_name : "",
    });
  } catch (error) {
    console.error(error.toString());
  }
}
