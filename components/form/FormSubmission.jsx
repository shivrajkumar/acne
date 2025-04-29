"use client";

import { useContext, useEffect } from "react";
// import { pixelCustomeEvent } from "@/components/generic/Pixel";
import { sendGtmEvents } from "../generic/Gtm";
import LoaderwithText from "@/components/generic/LoaderWithText";
import { useRouter } from "next/navigation";

// import { useContext, useEffect, useState, memo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import isEmpty from "lodash/isEmpty";
// import Cookies from "js-cookie";
import { QuestionsContext } from "@context/questions-store";
// // import formatDateTime from "@helpers/formatDateTime";
// import useUploadImage from "@hooks/useUploadImage";

// import traya_processing_animation from "@assets/images/traya-processing-animation.gif";
// import { TRANSACTION_API, UPLOAD_API } from "@constants/urls";
// import { fetchRequest } from "@helpers/fetchRequest";
// import { COOKIES_DOMAIN } from "@constants/config";
// import { COOKIES_EXPIRY } from "@constants/constants";
// import { logGtmEvent, SUBMISSION_COMPLETED } from "@helpers/gtmHelpers";
// import Image from "next/image";
// import { memo } from "react";
// import { getCurrentTimeInReadableForm } from "@helpers/timeFormatter";
// import { activityLoggerForm } from "@helpers/activityLogger";
// import { v4 as uuidv4 } from "uuid";
// import { MD5 } from "crypto-js";

const FormSubmission = () => {
  const tid = window.localStorage.getItem("user_tid")
  const router = useRouter()

  useEffect(() => {
    // Send GTM event for form completion
    sendGtmEvents('form-complete');

    // Set timeout to redirect after 1000ms (1 second)
    const redirectTimer = setTimeout(() => {
      router.push(`/result/${tid}`);
    }, 1000);

    // Clean up the timer if component unmounts
    return () => clearTimeout(redirectTimer);
  }, [tid, router]);

  const {
    apiResponse: { syntheticId, caseId },
    setAllQuestionsFilled,
  } = useContext(QuestionsContext);

  useEffect(() => {
    setAllQuestionsFilled(true);
    window.localStorage.setItem("form_status", "filled");
    if (syntheticId)
      window.localStorage.setItem("syntheticId", syntheticId)
  }, [syntheticId]);

  // const { uploadImage } = useUploadImage(QuestionsContext);
  // const [isApiCalled] = useState(false);
  // const [hasError, setHasError] = useState(false);
  // const [operationFinished, setOperationFinished] = useState(false);
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // useEffect(() => {
  //   // const currDateTime = formatDateTime();
  //   let _sessionId = sessionStorage.getItem("formSession");
  //   if (!_sessionId) {
  //     _sessionId = sessionStorage.setItem("formSession", uuidv4());
  //   }
  //   activityLoggerForm(syntheticId, "hairtest_complete", {
  //     time: getCurrentTimeInReadableForm(),
  //     case_id: caseId,
  //     platform: "web",
  //   });
  // }, []);

  // useEffect(() => {
  //   // const pathname = window.location.pathname;
  //   // let formType = "";
  //   // if (pathname == "/female" || pathname == "/femaleV2/question") {
  //   //   formType = "f_2";
  //   // } else {
  //   //   formType = "f_1";
  //   // }
  //   const _skipPhoto = window.localStorage.getItem("skipPhoto");
  //   if (
  //     _skipPhoto !== "true" &&
  //     (isEmpty(caseId) || isEmpty(byId["photo_q"].reply) || isApiCalled)
  //   ) {
  //     return;
  //   }
  //   const init = async () => {
  //     const UTM = Cookies.get("__TRAYA_UTM__");
  //     const tempUTM = UTM?.split("&")
  //       ?.find((val) => val.includes("page"))
  //       ?.replace("page=", "");

  //     if (tempUTM == "partners") {
  //       window.localStorage.setItem("affiliate", true);
  //     }
  //     if (_skipPhoto !== "true") {
  //       const _uploadRes = await uploadImage(
  //         byId["photo_q"].reply,
  //         UPLOAD_API(caseId)
  //       );
  //       if (_uploadRes?.hasError) {
  //         setHasError(true);
  //         return;
  //       }
  //       const _transactionData = {
  //         formFillSource: "website",
  //         question_id: "",
  //         question: "",
  //         response: "",
  //         form_status: "COMPLETED",
  //       };

  //       const _trOptions = {
  //         method: "PUT",
  //         body: JSON.stringify(_transactionData),
  //       };

  //       const _postRes = await fetchRequest(
  //         TRANSACTION_API(transactionId),
  //         _trOptions
  //       );
  //       if (_postRes.hasError) {
  //         setHasError(true);
  //         return;
  //       }
  //     }
  //     Cookies.set("form_status", "filled", {
  //       domain: COOKIES_DOMAIN,
  //       expires: COOKIES_EXPIRY,
  //     });
  //     setOperationFinished(true);
  //     window.localStorage.setItem("form_status", "filled");
  //     Cookies.remove("_fw_crm_v");
  //   };
  //   init();
  // }, []);

  // useEffect(() => {
  //   if (operationFinished) {
  //     window.dataLayer = window.dataLayer || [];
  //     let user_email = window.localStorage.getItem("user_email");
  //     let user_phone = window.localStorage.getItem("user_phone");
  //     let user_synthetic_id = window.localStorage.getItem("user_syn");

  //     const encryptedEmail = user_email
  //       ? MD5(user_email.trim()).toString()
  //       : "";
  //     const encryptedPhone = user_phone
  //       ? MD5(user_phone.trim()).toString()
  //       : "";

  //     let age = window.localStorage.getItem("age");
  //     let gender = window.localStorage.getItem("gender");
  //     window.dataLayer.push({
  //       EID: encryptedEmail,
  //       PageName: "Hair Diagnosis",
  //       JourneyType: "Hair Test",
  //       Section: "Report Gets Generated",
  //       Age: age ? age : "",
  //       Gender: gender ? gender : "",
  //       MID: encryptedPhone,
  //       NAEID: user_email ? user_email.trim() : "",
  //       NAMID: user_phone ? user_phone.trim() : "",
  //       case_id: caseId ? caseId : "",
  //       user_id: user_synthetic_id ? user_synthetic_id : "",
  //       event: "Report_Generated",
  //       Lang: isHindi ? "Hinglish" : "English",
  //     });
  //     logGtmEvent(SUBMISSION_COMPLETED, caseId, questions.email.reply);
  //   }
  // }, [operationFinished]);
  // useEffect(() => {
  //   const UTM = Cookies.get("__TRAYA_UTM__");

  //   const tempUTM = UTM?.split("&")
  //     ?.find((val) => val.includes("page"))
  //     ?.replace("page=", "");

  //   if (operationFinished) {
  //     let gender = window.localStorage.getItem("gender");
  //     let femaleHairStatus= (window.localStorage.getItem("2e"))?.toString();
  //     let dandruffStatus= (window.localStorage.getItem("describe_dandruff"))?.toString();
  //     const _cohort = queryStrings.cohort;
  //     let _result_page = "";

  //     if (tempUTM == "partners") {
  //       _result_page = `/home/partners/thankyou`;
  //     } else {
  //       if (
  //         queryStrings.utmData.utm_source &&
  //         queryStrings.utmData.utm_medium &&
  //         queryStrings.utmData.utm_campaign &&
  //         queryStrings.utmData.utm_medium
  //       ) {
  //         _result_page = isEmpty(_cohort)
  //           ? `${previewURL}?id=${syntheticId}&cohort=1&utm_source=${queryStrings.utmData.utm_source}&utm_medium=${queryStrings.utmData.utm_medium}&utm_campaign=${queryStrings.utmData.utm_campaign}&utm_term=${queryStrings.utmData.utm_term}&utm_content=${queryStrings.utmData.utm_content}`
  //           : `${previewURL}?id=${syntheticId}&utm_source=${queryStrings.utmData.utm_source}&utm_medium=${queryStrings.utmData.utm_medium}&utm_campaign=${queryStrings.utmData.utm_campaign}&utm_term=${queryStrings.utmData.utm_term}&utm_content=${queryStrings.utmData.utm_content}`;
  //       } else {
  //         // eslint-disable-next-line no-unused-vars
  //         _result_page = isEmpty(_cohort)
  //           ? `${previewURL}?id=${syntheticId}&cohort=1`
  //           : `${previewURL}?id=${syntheticId}`;
  //       }
  //       window.localStorage.setItem("resultSynthetic", syntheticId);
  //     }
  //     window.localStorage.setItem("syntheticId", syntheticId);
  //     // Set a cookie for the main domain
  //     document.cookie = `syntheticId=${syntheticId}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/; `;
  //     // Set a subdomain cookie
  //     document.cookie = `syntheticId=${syntheticId}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/; domain=.traya.health`;

  //     let arr = [];
  //     for (let i = 0; i < localStorage.length; i++) {
  //       if (localStorage.key(i).substring(0, 5) === "state") {
  //         arr.push(localStorage.key(i));
  //       }
  //     }
  //     for (let i = 0; i < arr.length; i++) {
  //       localStorage.removeItem(arr[i]);
  //     }

  //     setTimeout(() => {
  //       // window.location.replace(
  //       //   `${window.location.origin}/${
  //       //     gender == "F" ? "pages/female-result" : "pages/result4"
  //       //   }?id=` + syntheticId
  //       // );

  //       if (gender == "F") {
  //          if( ((femaleHairStatus =="Starting to see widening") ||( femaleHairStatus == "No widening"))
  //          &&['No',
  //         'Yes, Mild that comes & goes'].includes(dandruffStatus) ){
  //           router.push(
  //             `/pages/female-result?id=${syntheticId}${
  //               !isEmpty(queryStrings.utmData) ? "&" : ""
  //             }${new URLSearchParams(queryStrings.utmData).toString()}`
  //           );
  //          }
  //         else if (searchParams.get("page") === "femalev2") {
  //           router.push(
  //             `/pages/female-result?id=${syntheticId}${
  //               !isEmpty(queryStrings.utmData) ? "&" : ""
  //             }${new URLSearchParams(queryStrings.utmData).toString()}`
  //           );
  //         } else {
  //           router.push(
  //             `https://traya.health/pages/female-result?id=${syntheticId}&${new URLSearchParams(
  //               queryStrings.utmData
  //             ).toString()}`
  //           );
  //         }
  //       } else {
  //         if (isHindi) {
  //           // router.push(
  //           //   `https://traya.health/pages/result-hinglish?id=${syntheticId}${
  //           //     !isEmpty(queryStrings.utmData) ? "&" : ""
  //           //   }${new URLSearchParams(queryStrings.utmData).toString()}`
  //           // );
  //           router.push(
  //             `/pages/result-hinglish?id=${syntheticId}${
  //               !isEmpty(queryStrings.utmData) ? "&" : ""
  //             }${new URLSearchParams(queryStrings.utmData).toString()}`
  //           );
  //         } else {
  //           // router.push(
  //           //   `https://traya.health/pages/result4?id=${syntheticId}${
  //           //     !isEmpty(queryStrings.utmData) ? "&" : ""
  //           //   }${new URLSearchParams(queryStrings.utmData).toString()}`
  //           // );
  //           router.push(
  //             `/pages/result4?id=${syntheticId}${
  //               !isEmpty(queryStrings.utmData) ? "&" : ""
  //             }${new URLSearchParams(queryStrings.utmData).toString()}`
  //           );
  //         }
  //       }

  //       // Set a cookie for the main domain
  //       document.cookie = `gender=${gender}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/; `;
  //       // Set a subdomain cookie
  //       document.cookie = `gender=${gender}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/; domain=.traya.health`;
  //     }, 2000);
  //   }
  //   window.localStorage.setItem("resultSynthetic", syntheticId);
  //   window.localStorage.setItem("syntheticId", syntheticId);
  // }, [operationFinished, previewURL]);
  // function chatHandler(event) {
  //   event.preventDefault();
  //   window.open(
  //     "https://api.whatsapp.com/send/?phone=%2B919152511116&text=Hi%2C+I+would+like+to+speak+to+a+Care+Expert%21&type=phone_number&app_absent=0",
  //     "_blank"
  //   );
  // }
  return (
    <div>      <LoaderwithText />
    </div>

  );
};

export default FormSubmission;
