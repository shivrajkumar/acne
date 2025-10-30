"use client";

import { useContext, useEffect } from "react";
import { logGtmEvent } from "../generic/Gtm";
import LoaderwithText from "@/components/generic/LoaderWithText";
import { useRouter } from "next/navigation";
import { QuestionsContext } from "@context/questions-store";
import { addUserAttributeAfterMoenageLoads, trackMoEngageEvent } from "@/utils/moegage";
import { pixelCustomeEvent } from "../generic/Pixel";
import { generateEventId, metaCapi } from "@/helpers/metaCapiHelper";
import { getCookieValue } from "@/helpers/cookieHelper";
import { trackUmamiEvent } from "@components/generic/UmamiTracker";
import { HAUT_AI_IMAGE_CAPTURE_CHECK } from "@/constants/urls";
import { fetchRequest } from "@/helpers/fetchRequest";

const FormSubmission = () => {
  const tid = window.localStorage.getItem("user_tid");
  const router = useRouter();
  const {
    apiResponse: { syntheticId, caseId },
    hautAiResponse,
    setHautAiResponse
  } = useContext(QuestionsContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fbp = getCookieValue("_fbp", document.cookie.split(";"));
      const fbc = getCookieValue("_fbc", document.cookie.split(";"));
      const email = window.localStorage.getItem("user_email");
      const phone = window.localStorage.getItem("user_phone");
      const gender = window.localStorage.getItem("user_gender");
      const url = window.location.href;

      const capiPayloadRes = {
        email,
        phone,
        fbc,
        fbp,
        url,
        gender,
      };
      metaCapi(capiPayloadRes, "Lead");
    }
    // Send GTM event for form completion
    const phone = window.localStorage.getItem("user_phone");
    logGtmEvent("Lead", {
      name: window.localStorage.getItem("user_first_name"),
      phone_number: phone,
      gender: window.localStorage.getItem("user_gender"),
      age: window.localStorage.getItem("user_age"),
      event_id: generateEventId({ eventName: 'Lead', phone: phone })
    });
    pixelCustomeEvent("Lead", {
      name: window.localStorage.getItem("user_first_name"),
      phone_number: window.localStorage.getItem("user_phone"),
      gender: window.localStorage.getItem("user_gender"),
      age: window.localStorage.getItem("user_age"),
    });

    trackUmamiEvent('form_completed', { syntheticId: syntheticId });

    //Send MOE Events
    trackMoEngageEvent("FormSubmit", {
      syntheticId,
      caseId,
      completed_timestamp: new Date().toISOString(),
    });
    addUserAttributeAfterMoenageLoads("form_status", "filled");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("form_status", "filled");
    const phone = window.localStorage.getItem("user_phone");
    logGtmEvent("Form_End", { gender: window?.localStorage?.user_gender, event_id: generateEventId({ eventName: 'Form_End', phone: phone }) })
    if (syntheticId) window.localStorage.setItem("syntheticId", syntheticId);
  }, [syntheticId]);

  // Call HAUT_AI API to check skin analysis at 13th second
  useEffect(() => {
    const checkHautAiResponse = async () => {
      if (tid) {
        try {
          const response = await fetchRequest(HAUT_AI_IMAGE_CAPTURE_CHECK(tid));
          const isAnalysisCaptured = response?.data?.isSkinAnalysisResponseCapturedProperly;
          setHautAiResponse(isAnalysisCaptured);
        } catch (error) {
          console.error("Error checking HAUT AI response:", error);
          // If API fails, set to undefined
          setHautAiResponse(undefined);
        }
      }
    };

    // Set timeout to call API at 13 seconds
    const apiCallTimer = setTimeout(() => {
      checkHautAiResponse();
    }, 13000); // 13 seconds

    // Cleanup timer on unmount
    return () => {
      clearTimeout(apiCallTimer);
    };
  }, [tid, setHautAiResponse]);

  // Navigate after 15 seconds OR when hautAiResponse is true
  useEffect(() => {
    let redirectTimer;
    let hasNavigated = false;

    // Set up 15-second timer
    redirectTimer = setTimeout(() => {
      if (!hasNavigated) {
        hasNavigated = true;
        router.push(`/result?tid=${tid}`);
      }
    }, 15000); // 15 seconds

    // If hautAiResponse becomes true, navigate immediately
    if (hautAiResponse === true && !hasNavigated) {
      hasNavigated = true;
      router.push(`/result?tid=${tid}`);
      clearTimeout(redirectTimer);
    }

    // Clean up the timer if component unmounts
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [hautAiResponse, tid, router]);

  return (
    <div>
      {" "}
      <LoaderwithText />
    </div>
  );
};

export default FormSubmission;
