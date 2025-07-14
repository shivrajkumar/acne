"use client";

import { useContext, useEffect } from "react";
import { logGtmEvent } from "../generic/Gtm";
import LoaderwithText from "@/components/generic/LoaderWithText";
import { useRouter } from "next/navigation";
import { QuestionsContext } from "@context/questions-store";
import {
  addUserAttributeAfterMoenageLoads,
  trackMoEngageEvent,
} from "@/utils/moegage";
import { pixelCustomeEvent } from "../generic/Pixel";
import { metaCapi } from "@/helpers/metaCapiHelper";
import { getCookieValue } from "@/helpers/cookieHelper";
import { trackUmamiEvent } from "@components/generic/UmamiTracker";

const FormSubmission = () => {
  const tid = window.localStorage.getItem("user_tid");
  const router = useRouter();
  const {
    apiResponse: { syntheticId, caseId },
    setAllQuestionsFilled,
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
    logGtmEvent("Lead", {
      name: window.localStorage.getItem("user_first_name"),
      phone_number: window.localStorage.getItem("user_phone"),
      gender: window.localStorage.getItem("user_gender"),
      age: window.localStorage.getItem("user_age"),
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
    // Set timeout to redirect after 1000ms (1 second)
    const redirectTimer = setTimeout(() => {
      router.push(`/result?tid=${tid}`);
    }, 1000);

    // Clean up the timer if component unmounts
    return () => clearTimeout(redirectTimer);
  }, [tid, router]);

  useEffect(() => {
    setAllQuestionsFilled(true);
    window.localStorage.setItem("form_status", "filled");
    logGtmEvent("Form_End", { gender: window?.localStorage?.user_gender })
    if (syntheticId) window.localStorage.setItem("syntheticId", syntheticId);
  }, [syntheticId]);

  return (
    <div>
      {" "}
      <LoaderwithText />
    </div>
  );
};

export default FormSubmission;
