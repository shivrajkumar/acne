import { useContext } from "react";
import Cookies from "js-cookie";
// import { MD5 } from "crypto-js";
import { COOKIES_DOMAIN } from "@/constants/config";
import { COOKIES_EXPIRY } from "@/constants/constants";
// import { isGroupComplete } from "../hooks/isGroupComplete";
// import { groupNameMapper } from "../constants/groupNameMapper";

const useFormSubmit = (context) => {
  const {
    addToPreviousQuestion,
   
    currentQuestion,
    makeQuestionsList,
    nextQuestion,
    saveReply,
  } = useContext(context);

  const handleSubmit = async (reply) => {
    reply = typeof reply === "string" ? reply.trim() : reply;

    saveReply(currentQuestion.id, reply);
    // const _nextQuestion = byId[currentQuestion.next];

    // if (isGroupComplete(currentQuestion, _nextQuestion)) {
    //   let _group = groupNameMapper[currentQuestion.group];
    //   if (!_group) _group = currentQuestion.group;
    //   _group = _group + "_complete";
    //   if (_group === "scalp_health_complete") {
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

    //     // Add the `view_item_list` event and associated data to the dataLayer
    //     let age = window.localStorage.getItem("age");
    //     let gender = window.localStorage.getItem("gender");
    //     let LossStage = window.localStorage.getItem("2e");

    //     window.dataLayer.push({
    //       EID: encryptedEmail,
    //       PageName: "Hair Diagnosis",
    //       JourneyType: "Hair Test",
    //       Section: "Scalp Health details",
    //       Age: age ? age : "",
    //       Gender: gender ? gender : "",
    //       LossStage: LossStage ? LossStage : "",
    //       MID: encryptedPhone,
    //       NAEID: user_email ? user_email.trim() : "",
    //       NAMID: user_phone ? user_phone.trim() : "",
    //       user_id: user_synthetic_id ? user_synthetic_id : "",
    //       event: "ScalpDetails_Submitted",
    //     });
    //   }
    //   // if (_group === "know_your_hair_complete") {
    //   //   window.dataLayer = window.dataLayer || [];
    //   //   let user_email = window.localStorage.getItem("user_email");
    //   //   let user_phone = window.localStorage.getItem("user_phone");
    //   //   // let user_synthetic_id = window.localStorage.getItem("user_syn");

    //   //   // const encryptedEmail = user_email
    //   //   //   ? MD5(user_email.trim()).toString()
    //   //   //   : "";
    //   //   // const encryptedPhone = user_phone
    //   //   //   ? MD5(user_phone.trim()).toString()
    //   //   //   : "";

    //   //   // Add the `view_item_list` event and associated data to the dataLayer
    //   //   // let age = window.localStorage.getItem("age");
    //   //   // let gender = window.localStorage.getItem("gender");
    //   //   // let LossStage = window.localStorage.getItem("hair_vol1");
    //   //   // window.dataLayer.push({
    //   //   //   EID: encryptedEmail,
    //   //   //   PageName: "Hair Diagnosis",
    //   //   //   JourneyType: "Hair Test",
    //   //   //   Section: "Know Your Hair",
    //   //   //   Age: age ? age : "",
    //   //   //   Gender: gender ? gender : "",
    //   //   //   LossStage: LossStage ? LossStage : "",
    //   //   //   MID: encryptedPhone,
    //   //   //   NAMID: user_phone ? user_phone.trim() : "",
    //   //   //   NAEID: user_email ? user_email.trim() : "",
    //   //   //   user_id: user_synthetic_id ? user_synthetic_id : "",
    //   //   //   event: "ScalpDetails_Submitted",
    //   //   // });
    //   // }
    // }

    addToPreviousQuestion(currentQuestion.id);
    makeQuestionsList();
    nextQuestion(currentQuestion.id, reply, currentQuestion);

    // if (['photo_q'].includes(currentQuestion.next)) {
    //   Cookies.set("form_status", "semi-filled", {
    //     domain: COOKIES_DOMAIN,
    //     expires: COOKIES_EXPIRY,
    //   });
    // }
  };

  return handleSubmit;
};

export default useFormSubmit;
