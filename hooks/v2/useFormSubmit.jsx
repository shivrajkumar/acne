/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
import { useContext } from "react";
import Cookies from "js-cookie";
import { MD5 } from "crypto-js";
import { COOKIES_EXPIRY } from "@/constants/constants";
// import useSlots from "../useSlots";
import { isGroupComplete } from "../../hooks/isGroupComplete";
import { groupNameMapper } from "@/constants/groupNameMapper";
import { env } from "next-runtime-env";
const useFormSubmit = (context) => {
  const {
    addToPreviousQuestion,
    byId,
    currentQuestion,
    makeQuestionsList,
    nextQuestion,
    saveReply,
  } = useContext(context);

  const COOKIES_DOMAIN = env("NEXT_PUBLIC_COOKIES_DOMAIN")


  // const [getSlots] = useSlots(context);

  const handleSubmit = (reply) => {
    return new Promise(async (resolve) => {
      reply = typeof reply === "string" ? reply.trim() : reply;

      saveReply(currentQuestion.id, reply);
      const _nextQuestion = byId[currentQuestion.next];
      if (!currentQuestion.slots) {
        addToPreviousQuestion(currentQuestion.id);
      }

      if (isGroupComplete(currentQuestion, _nextQuestion)) {
        let _group = groupNameMapper[currentQuestion.group];
        if (!_group) _group = currentQuestion.group;
        _group = _group + "_complete";
        if (_group === "basic_information_complete") {
          window.dataLayer = window.dataLayer || [];
          let user_email = window.localStorage.getItem("user_email");
          let user_phone = window.localStorage.getItem("user_phone");
          let user_synthetic_id = window.localStorage.getItem("user_syn");

          const encryptedEmail = user_email
            ? MD5(user_email.trim()).toString()
            : "";
          const encryptedPhone = user_phone
            ? MD5(user_phone.trim()).toString()
            : "";

          // Add the `view_item_list` event and associated data to the dataLayer
          let age = window.localStorage.getItem("age");
          let gender = window.localStorage.getItem("gender");
          window.dataLayer.push({
            EID: encryptedEmail,
            PageName: "Hair Diagnosis",
            JourneyType: "Hair Test",
            Section: "Personal Details",
            Age: age ? age : "",
            Gender: gender ? gender : "",
            MID: encryptedPhone,
            NAEID: user_email ? user_email.trim() : "",
            NAMID: user_phone ? user_phone.trim() : "",
            user_id: user_synthetic_id ? user_synthetic_id : "",
            event: "PersonalDetails_Submitted",
          });
        }
        if (_group === "lifestyle_assessment_complete") {
          window.dataLayer = window.dataLayer || [];
          let user_email = window.localStorage.getItem("user_email");
          let user_phone = window.localStorage.getItem("user_phone");
          let user_synthetic_id = window.localStorage.getItem("user_syn");
          let LossStage = window.localStorage.getItem("2e");
          const encryptedEmail = user_email
            ? MD5(user_email.trim()).toString()
            : "";
          const encryptedPhone = user_phone
            ? MD5(user_phone.trim()).toString()
            : "";

          // Add the `view_item_list` event and associated data to the dataLayer
          let age = window.localStorage.getItem("age");
          let gender = window.localStorage.getItem("gender");
          window.dataLayer.push({
            EID: encryptedEmail,
            PageName: "Hair Diagnosis",
            JourneyType: "Hair Test",
            Section: "Your lifestyle",
            Age: age ? age : "",
            Gender: gender ? gender : "",
            LossStage: LossStage ? LossStage : "",
            MID: encryptedPhone,
            NAEID: user_email ? user_email.trim() : "",
            NAMID: user_phone ? user_phone.trim() : "",
            user_id: user_synthetic_id ? user_synthetic_id : "",
            event: "LifestyleDetails_Submitted",
          });
        }
        if (_group === "know_your_hair_complete") {
          window.dataLayer = window.dataLayer || [];
          let user_email = window.localStorage.getItem("user_email");
          let user_phone = window.localStorage.getItem("user_phone");
          let user_synthetic_id = window.localStorage.getItem("user_syn");

          const encryptedEmail = user_email
            ? MD5(user_email.trim()).toString()
            : "";
          const encryptedPhone = user_phone
            ? MD5(user_phone.trim()).toString()
            : "";

          // Add the `view_item_list` event and associated data to the dataLayer
          let age = window.localStorage.getItem("age");
          let gender = window.localStorage.getItem("gender");
          let LossStage = window.localStorage.getItem("hair_vol1");
          window.dataLayer.push({
            EID: encryptedEmail,
            PageName: "Hair Diagnosis",
            JourneyType: "Hair Test",
            Section: "Know Your Hair",
            Age: age ? age : "",
            Gender: gender ? gender : "",
            LossStage: LossStage ? LossStage : "",
            MID: encryptedPhone,
            NAMID: user_phone ? user_phone.trim() : "",
            NAEID: user_email ? user_email.trim() : "",
            user_id: user_synthetic_id ? user_synthetic_id : "",
            event: "ScalpDetails_Submitted",
          });
        }
        if (_group === "scalp_health_complete") {
          window.dataLayer = window.dataLayer || [];
          let user_email = window.localStorage.getItem("user_email");
          let user_phone = window.localStorage.getItem("user_phone");
          let user_synthetic_id = window.localStorage.getItem("user_syn");

          const encryptedEmail = user_email
            ? MD5(user_email.trim()).toString()
            : "";
          const encryptedPhone = user_phone
            ? MD5(user_phone.trim()).toString()
            : "";

          // Add the `view_item_list` event and associated data to the dataLayer
          let age = window.localStorage.getItem("age");
          let gender = window.localStorage.getItem("gender");
          let LossStage = window.localStorage.getItem("2e");

          window.dataLayer.push({
            EID: encryptedEmail,
            PageName: "Hair Diagnosis",
            JourneyType: "Hair Test",
            Section: "Scalp Health details",
            Age: age ? age : "",
            Gender: gender ? gender : "",
            LossStage: LossStage ? LossStage : "",
            MID: encryptedPhone,
            NAEID: user_email ? user_email.trim() : "",
            NAMID: user_phone ? user_phone.trim() : "",
            user_id: user_synthetic_id ? user_synthetic_id : "",
            event: "ScalpDetails_Submitted",
          });
        }
      }

      if (_nextQuestion && _nextQuestion.next === null) {
        Cookies.set("form_status", "semi-filled", {
          domain: COOKIES_DOMAIN,
          expires: COOKIES_EXPIRY,
        });
      }

      let skip = null;
      if (_nextQuestion && _nextQuestion.slots) {
        skip = await getSlots(_nextQuestion);
      }

      if (!skip) nextQuestion(currentQuestion.id, reply);
      makeQuestionsList();

      return resolve(true);
    });
  };

  return handleSubmit;
};

export default useFormSubmit;
