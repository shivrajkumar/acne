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
import { clearGtmFlags, sendGtmEvents } from "./Gtm";
import Header from "@/components/generic/Headers";
import UserBasicInfoForm from "@/components/form/UserBasicInfoForm";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_SKIN_TEST_CONFIG } from "@/constants/urls";

const OnloadFormPage = lazy(() => import("@/components/form/OnloadFormPage"));

const Questions = () => {
  const {
    currentQuestion,
    firstQuestion,
    init,
    removeFromPreviousQuestion,
    allQuestionsFilled,
  } = useContext(QuestionsContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const _page = searchParams.get("page");

  const mobileScreen = useMediaQuery("(max-width: 600px)");

  const fetchQuestionsData = async () => {
    setLoading(true);
    try {
      const response = await fetchRequest(GET_SKIN_TEST_CONFIG);

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
        console.error('Unexpected API response structure:', response);
        throw new Error('Invalid API response structure');
      }
    } catch (err) {
      console.error('Error fetching questions data:', err);
      setError('Failed to load form configuration. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearGtmFlags([
        "basic_information",
        "skin_assessment",
        "skin_concerns",
        "lifestyle_questions",
        "misc",
      ]);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    fetchQuestionsData();

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [formStatus, setFormStatus] = useState("");
  const [tabClosed, setTabClosed] = useState("");
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        setIsReload(true);
      }
    }
    const val = window.localStorage.getItem("form_status");
    const tabStatus = window.localStorage.getItem("tabclosed");
    if (tabStatus && val) {
      setTabClosed(tabStatus);
      setFormStatus(val);
      window.addEventListener(
        "beforeunload",
        window.localStorage.setItem("tabclosed", "true")
      );
    }
    window.addEventListener(
      "beforeunload",
      window.localStorage.setItem("tabclosed", "true")
    );
  }, []);

  const exitURL = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  };

  useEffect(() => {
    if (currentQuestion && currentQuestion.group) {
      if (currentQuestion.group == "basic_information") {
        const item = window.localStorage.getItem("basic_information");
        if (!item) {
          // pixelCustomeEvent('form-stage-1')
          sendGtmEvents("form-stage-1");
          window.localStorage.setItem("basic_information", "yes");
        }
      } else if (currentQuestion.group == "skin_assessment") {
        const item = window.localStorage.getItem("skin_assessment");
        if (!item) {
          //  pixelCustomeEvent('form-stage-2')
          sendGtmEvents("form-stage-2");
          window.localStorage.setItem("skin_assessment", "yes");
        }
      } else if (currentQuestion.group == "skin_concerns") {
        const item = window.localStorage.getItem("skin_concerns");
        if (!item) {
          //  pixelCustomeEvent('form-stage-3')
          sendGtmEvents("form-stage-3");
          window.localStorage.setItem("skin_concerns", "yes");
        }
      } else if (currentQuestion.group == "lifestyle_questions") {
        const item = window.localStorage.getItem("lifestyle_questions");
        if (!item) {
          //  pixelCustomeEvent('form-stage-4')
          sendGtmEvents("form-stage-4");
          window.localStorage.setItem("lifestyle_questions", "yes");
        }
      } else if (currentQuestion.group == "misc") {
        const item = window.localStorage.getItem("misc");
        if (!item) {
          // pixelCustomeEvent('form-stage-5')
          sendGtmEvents("form-stage-5");
          window.localStorage.setItem("misc", "yes");
        }
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
    <div >
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
            <div className="flex flex-col items-center justify-start font-lato  xs:w-full px-[24px]  md:px-[24px]  xs:px-[16px] bg-Secondary/50 min-h-screen">
              {currentQuestion && currentQuestion.id === "user_basic_info" ? (
                <UserBasicInfoForm />
              ) : (
                components(currentQuestion, QuestionsContext)
              )}
            </div>
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