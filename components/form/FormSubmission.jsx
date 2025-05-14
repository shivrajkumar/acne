"use client";

import { useContext, useEffect } from "react";
import { sendGtmEvents } from "../generic/Gtm";
import LoaderwithText from "@/components/generic/LoaderWithText";
import { useRouter } from "next/navigation";
import { QuestionsContext } from "@context/questions-store";
import {
  addUserAttributeAfterMoenageLoads,
  trackMoEngageEvent,
} from "@/utils/moegage";
import { pixelCustomeEvent } from "../generic/Pixel";

const FormSubmission = () => {
  const tid = window.localStorage.getItem("user_tid");
  const router = useRouter();
  const {
    apiResponse: { syntheticId, caseId },
    setAllQuestionsFilled,
  } = useContext(QuestionsContext);

  useEffect(() => {
    // Send GTM event for form completion
    sendGtmEvents("form-complete", { location: window.location.pathname });
    pixelCustomeEvent("Skin Test Completed", {
      name: window.localStorage.getItem("user_first_name"),
      phone_number: window.localStorage.getItem("user_phone"),
      gender: window.localStorage.getItem("user_gender"),
      age: window.localStorage.getItem("user_age"),
    });

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
