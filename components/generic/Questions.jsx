"use client";

import { Suspense, lazy, useContext, useEffect, useState } from "react";
// import isEmpty from "lodash/isEmpty";
// import { usePathname, useSearchParams } from "next/navigation";
// import {pixelCustomeEvent} from '../../../generic/Pixel'
import components from "./components";
import Loader from "./Loader";
// import { FEMALE_RESULT_PAGE, MALE_RESULT_PAGE } from "@constants/constants";
import useMediaQuery from "@/hooks/useMediaQuerry";
import FormSubmission from "@/components/form/FormSubmission";
import { QuestionsContext } from "@/context/questions-store";
import { clearGtmFlags, logGtmEvent } from "./Gtm";
import Header from "@/components/generic/Headers";
import UserBasicInfoForm from "@/components/form/UserBasicInfoForm";
import HautAiReqPermissions from "@/components/form/hautAiReqPermissions";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_SKIN_TEST_CONFIG, getUtmCookiesInObjectForm } from "@/constants/urls";
import LogMoengage from "./LogMoengage";
import { trackMoEngageEvent } from "@/utils/moegage";
import { pixelCustomeEvent } from "./Pixel";
import { generateEventId } from "@/helpers/metaCapiHelper";

const OnloadFormPage = lazy(() => import("@/components/form/OnloadFormPage"));

const Questions = () => {
  const {
    currentQuestion,
    firstQuestion,
    init,
    removeFromPreviousQuestion,
    allQuestionsFilled,
    hautAiResponse,
    nextQuestion
  } = useContext(QuestionsContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  const [tabClosed, setTabClosed] = useState("");
  const [isReload, setIsReload] = useState(false);
  const [userBasicInfoCompleted, setUserBasicInfoCompleted] = useState(false);


  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const _page = searchParams.get("page");

  const mobileScreen = useMediaQuery("(max-width: 600px)");

  const fetchQuestionsData = async () => {
    setLoading(true);
    try {
      const response = await fetchRequest(GET_SKIN_TEST_CONFIG(hautAiResponse ?? true));
      if (response.hasError) {
        throw new Error('Failed to fetch questions data');
      }

      if (response.data &&
        response.data.data &&
        response.data.data.content &&
        response.data.data.content.questions) {

        init(response.data.data.content.questions, "vayu");
        setLoading(false);
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (err) {
      setError('Failed to load form configuration. Please try again later.');
      setLoading(false);
    } 
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearGtmFlags([
        "basic_information",
      ]);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    if (hautAiResponse === undefined || hautAiResponse === false) {
      fetchQuestionsData();
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hautAiResponse]);

  const pageExitevent = () => {
    const eventAttributes = { timestamp: new Date().toISOString(), syntheticId: window.localStorage.getItem("syntheticId") }
    trackMoEngageEvent(`FormExit_${currentQuestion.id}`, eventAttributes)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let isReloadDetected = false;

      // Use modern reload detection
      try {
        const navEntry = performance.getEntriesByType("navigation")[0];
        if (navEntry?.type === "reload") {
          isReloadDetected = true;
        }
        setIsReload(isReloadDetected);
      } catch (e) {
        // fallback - no crash
        setIsReload(false);
      }

      try {
        const val = localStorage?.getItem("form_status");
        const tabStatus = localStorage?.getItem("tabclosed");

        // fallback defaults
        setFormStatus(val || "");
        setTabClosed(tabStatus || "false");
      } catch (err) {
        // Safari/localStorage blocked or unavailable
        setFormStatus("");
        setTabClosed("false");
      }

      // Save tabclosed on unload
      const handleBeforeUnload = () => {
        try {
          localStorage.setItem("tabclosed", "true");
        } catch (err) {
          // fail silently
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, []);



  const exitURL = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/");
      pageExitevent();
    }
  };

  useEffect(() => {

    // Scroll to top when currentQuestion changes
    if (currentQuestion) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (currentQuestion && currentQuestion.group) {
      if (currentQuestion.group == "basic_information") {
        pixelCustomeEvent('Form Start');
        logGtmEvent("Form_Start", {event_id: generateEventId({ eventName: 'Form_Start' })});
      }
    }
  }, [currentQuestion]);


  // If loading, show loader
  if (loading) {
    return <Loader />;
  }

  // If error occurred, show error message
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return formStatus == "filled" || (tabClosed == "true" && !isReload) ? (
    <>
      <OnloadFormPage />
    </>
  ) : (
    <div>

      <Header
        currentQuestion={currentQuestion}
        hidePreviousButton={hidePreviousButton}
        mobileScreen={mobileScreen}
        firstQuestion={firstQuestion}
        exitURL={exitURL}
        removeFromPreviousQuestion={removeFromPreviousQuestion}
      />
      {!allQuestionsFilled ? (
        <>
          <Suspense fallback={<Loader />}>
            <div className="flex flex-col items-center justify-start font-sophiaPro  xs:w-full px-[24px]  md:px-[24px]  xs:px-[16px] bg-Secondary/50 min-h-screen">
              {currentQuestion && currentQuestion.id === "user_basic_info" && !userBasicInfoCompleted ? (
                <UserBasicInfoForm onComplete={() => setUserBasicInfoCompleted(true)} />
              ) : currentQuestion && currentQuestion.id === "user_basic_info" && userBasicInfoCompleted ? (
                <HautAiReqPermissions onContinue={() => {
                  nextQuestion("user_basic_info", "completed");
                  setUserBasicInfoCompleted(false);
                }} />
              ) : (
                components(currentQuestion, QuestionsContext)
              )}
            </div>
            <LogMoengage event="SkinTestLanded" attributes={{
              ...getUtmCookiesInObjectForm(), timestamp: new Date().toISOString()
            }} />

          </Suspense>
        </>
      ) : (
        <FormSubmission />
      )}
    </div>
  );
};
export default Questions;

// eslint-disable-next-line no-undef
const hidePreviousButton = new Set([
  "first_name",
  "phone_number",
  "email",
  "C1d",
  "user_basic_info",
]);