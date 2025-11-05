"use client";

import { Suspense, lazy, useContext, useEffect, useState } from "react";
// import isEmpty from "lodash/isEmpty";
import { useSearchParams } from "next/navigation";
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
import PhotoAnalysisFailed from "@/components/form/PhotoAnalysisFailed";
import LoaderWithText from "@/components/generic/LoaderWithText";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_SKIN_TEST_CONFIG, getUtmCookiesInObjectForm } from "@/constants/urls";
import LogMoengage from "./LogMoengage";
import { trackMoEngageEvent } from "@/utils/moegage";
import { pixelCustomeEvent } from "./Pixel";
import { generateEventId } from "@/helpers/metaCapiHelper";
import { useRouter } from "next/navigation";

const OnloadFormPage = lazy(() => import("@/components/form/OnloadFormPage"));

const Questions = () => {
  const searchParams = useSearchParams();
  const {
    currentQuestion,
    firstQuestion,
    init,
    removeFromPreviousQuestion,
    allQuestionsFilled,
    hautAiResponse,
    nextQuestion,
    restoreState,
    previousQuestions
  } = useContext(QuestionsContext);
  
  const router = useRouter();
  const mobileScreen = useMediaQuery("(max-width: 600px)");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  const [tabClosed, setTabClosed] = useState("");
  const [isReload, setIsReload] = useState(false);
  const [userBasicInfoCompleted, setUserBasicInfoCompleted] = useState(false);
  const [skipUserBasicInfo, setSkipUserBasicInfo] = useState(false);
  const [photoQCompleted, setPhotoQCompleted] = useState(false);
  const [showPhotoAnalysisFailed, setShowPhotoAnalysisFailed] = useState(false);
  const [showLoaderAfterStress, setShowLoaderAfterStress] = useState(false);
  const [wasRestored, setWasRestored] = useState(false);
  const [hasShownPhotoAnalysisFlow, setHasShownPhotoAnalysisFlow] = useState(false);
  const [stressLevelCompleted, setStressLevelCompleted] = useState(false);

  // Check for persisted HautAi permissions state on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const shouldShowHautPermissions = window.localStorage.getItem("show_haut_permissions") === "true";
      if (shouldShowHautPermissions) {
        setStressLevelCompleted(true);
      }
    }
  }, []);

  const fetchQuestionsData = async () => {
    setLoading(true);
    try {
      const configValue = hautAiResponse ?? true;
      const response = await fetchRequest(GET_SKIN_TEST_CONFIG(configValue));
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

  // Separate effect for handling restoration based on URL changes or refresh
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if we should restore state (when coming from "Continue where I left")
    // Check both localStorage and URL parameter
    const shouldRestoreFromStorage = localStorage.getItem("should_restore_state");
    const shouldRestoreFromURL = searchParams?.get('restore') === 'true';
    const explicitRestore = shouldRestoreFromStorage || shouldRestoreFromURL;
    
    // Check if there's saved state that we can restore
    const savedStateStr = localStorage.getItem("state" + window.location.pathname);
    const hasCompletedUserBasicInfo = localStorage.getItem("user_first_name") && 
                                     localStorage.getItem("user_phone") && 
                                     localStorage.getItem("user_age") && 
                                     localStorage.getItem("user_gender");
    
    // Check if it's a page reload
    let isPageReload = false;
    try {
      const navEntry = performance.getEntriesByType("navigation")[0];
      isPageReload = navEntry?.type === "reload";
    } catch (e) {
      isPageReload = false;
    }
    
    // Determine if we should restore:
    // 1. Explicit restore flag (continue where I left)
    // 2. On refresh with saved state and completed basic info
    const shouldRestore = explicitRestore || (isPageReload && savedStateStr && hasCompletedUserBasicInfo);
    
    // If we're restoring, clear tabClosed to show the questions
    if (shouldRestore) {
      setTabClosed("");
      setFormStatus("");
      
      // If we haven't restored yet, do it now
      if (!wasRestored && savedStateStr) {
        try {
          // Restore the state
          const restored = restoreState();
          
          // Only remove the explicit restore flag, not for refresh
          if (explicitRestore) {
            localStorage.removeItem("should_restore_state");
          }
          
          if (restored) {
            setWasRestored(true);
            setLoading(false); // Stop showing loader
            
            // Clean up URL parameter if present
            if (shouldRestoreFromURL) {
              const url = new URL(window.location.href);
              url.searchParams.delete('restore');
              window.history.replaceState({}, '', url.pathname);
            }
          } else {
            setLoading(false);
          }
        } catch (e) {
          console.error('Error during restoration:', e);
          if (explicitRestore) {
            localStorage.removeItem("should_restore_state");
          }
          setLoading(false);
        }
      } else if (!savedStateStr) {
        if (explicitRestore) {
          localStorage.removeItem("should_restore_state");
        }
        setLoading(false);
      }
    }
  }, [searchParams, wasRestored]); // Remove loading from dependencies to avoid issues

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleBeforeUnload = () => {
      clearGtmFlags([
        "basic_information",
      ]);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    // Check if we should skip initialization for restoration
    const shouldRestoreFromStorage = localStorage.getItem("should_restore_state");
    const shouldRestoreFromURL = searchParams?.get('restore') === 'true';
    const explicitRestore = shouldRestoreFromStorage || shouldRestoreFromURL;
    
    // Check if there's saved state that we can restore
    const savedStateStr = localStorage.getItem("state" + window.location.pathname);
    const hasCompletedUserBasicInfo = localStorage.getItem("user_first_name") && 
                                     localStorage.getItem("user_phone") && 
                                     localStorage.getItem("user_age") && 
                                     localStorage.getItem("user_gender");
    
    // Check if it's a page reload
    let isPageReload = false;
    try {
      const navEntry = performance.getEntriesByType("navigation")[0];
      isPageReload = navEntry?.type === "reload";
    } catch (e) {
      isPageReload = false;
    }
    
    // Determine if we should restore (same logic as above)
    const shouldRestore = explicitRestore || (isPageReload && savedStateStr && hasCompletedUserBasicInfo);
    
    // Skip initialization if we're going to restore or have already restored
    if (shouldRestore || wasRestored) {
      return;
    }
    
    // Normal initialization flow
    if (!currentQuestion?.id && (hautAiResponse === undefined || hautAiResponse === false)) {
      fetchQuestionsData();
    } else if (currentQuestion?.id) {
      setLoading(false);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [wasRestored, hautAiResponse, searchParams]);

  // Handle restoration and check if we need to skip completed questions
  useEffect(() => {
    if (wasRestored && currentQuestion && currentQuestion.id && !skipUserBasicInfo) {
      // If currentQuestion is user_basic_info but we have previous questions,
      // it means user had progressed beyond it
      if (currentQuestion.id === 'user_basic_info' && previousQuestions && previousQuestions.length > 0) {
        setSkipUserBasicInfo(true); // Prevent re-running
        // Automatically complete and move to next
        setTimeout(() => {
          nextQuestion('user_basic_info', 'completed');
        }, 100); // Small delay to ensure state is settled
      }
    }
  }, [wasRestored, currentQuestion?.id, skipUserBasicInfo]);

  const pageExitevent = () => {
    if (typeof window === 'undefined') return;
    
    const eventAttributes = { 
      timestamp: new Date().toISOString(), 
      syntheticId: window.localStorage.getItem("syntheticId") 
    }
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
    
    // Track current and previous questions
    if (typeof window !== 'undefined') {
      const prevQuestion = window.localStorage.getItem('prev_question');
      
      // Check if we've just moved FROM stress_level to any other question
      if (prevQuestion === "stress_level" && currentQuestion && currentQuestion.id !== "stress_level" && !stressLevelCompleted) {
        // Show HautAiReqPermissions before continuing
        setStressLevelCompleted(true);
        // Store this state so it persists on reload
        window.localStorage.setItem("show_haut_permissions", "true");
        return; // Don't update prev_question yet
      }
      
      // Check if we're on photo_q (camera question)
      if (currentQuestion && currentQuestion.id === "photo_q") {
        // Check if this is after showing HautAiReqPermissions
        if (stressLevelCompleted) {
          // We're on photo_q after showing permissions, will show loader when photo_q completes
          setPhotoQCompleted(false);
        }
      }
      
      // Check if we've just moved FROM photo_q to another question
      if (prevQuestion === "photo_q" && currentQuestion && currentQuestion.id !== "photo_q" && !showLoaderAfterStress) {
        // Only show LoaderWithText if an image was actually captured
        const capturedImage = window.localStorage.getItem("capturedImage");
        if (capturedImage) {
          setShowLoaderAfterStress(true);
        }
      }
      
      // Reset loader state if going back to photo_q
      if (currentQuestion && currentQuestion.id === "photo_q" && showLoaderAfterStress) {
        setShowLoaderAfterStress(false);
      }
    }
    
    // Removed old loader logic - now handled by HautAiReqPermissions after stress_level
    
    // Store current question for tracking
    if (currentQuestion && currentQuestion.id && typeof window !== 'undefined') {
      window.localStorage.setItem('prev_question', currentQuestion.id);
    }
  }, [currentQuestion, photoQCompleted, stressLevelCompleted, hautAiResponse, showPhotoAnalysisFailed, showLoaderAfterStress, allQuestionsFilled, hasShownPhotoAnalysisFlow]);

  // Handle hautAiResponse from LoaderWithText
  const handleHautAiResponse = (hautAiResponseValue) => {
    if (typeof window === 'undefined') return;
    
    const tid = window.localStorage.getItem("user_tid");
    
    if (hautAiResponseValue === true) {
      // Navigate to result page
      router.push(`/result?tid=${tid}`);
    } else if (hautAiResponseValue === false) {
      // Show PhotoAnalysisFailed screen
      setShowLoaderAfterStress(false);
      setShowPhotoAnalysisFailed(true);
      setHasShownPhotoAnalysisFlow(true); // Mark that we've shown the flow
    } else if (hautAiResponseValue === 'no-image') {
      // No image captured - go back to photo_q question
      setShowLoaderAfterStress(false);
      // Clear the stored previous question to prevent immediate re-trigger
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('prev_question');
      }
    }
  };

  // Handle when all questions are filled (including addon questions)
  useEffect(() => {
    if (allQuestionsFilled && hautAiResponse === false && !showPhotoAnalysisFailed && !showLoaderAfterStress) {
      // Reset any lingering state that might prevent FormSubmission from showing
      setShowPhotoAnalysisFailed(false);
      setShowLoaderAfterStress(false);
    }
  }, [allQuestionsFilled, hautAiResponse, showPhotoAnalysisFailed, showLoaderAfterStress]);


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

console.log('allQuestionsFilled', allQuestionsFilled)

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
            <div className="flex flex-col items-center justify-start font-sophiaPro  xs:w-full px-[24px]  md:px-[24px]  xs:px-[16px] min-h-screen">
              {currentQuestion && currentQuestion.id === "user_basic_info" && !userBasicInfoCompleted && !skipUserBasicInfo ? (
                <UserBasicInfoForm onComplete={() => {
                  setUserBasicInfoCompleted(true);
                  nextQuestion("user_basic_info", "completed");
                }} />
              ) :
                // Fix: Always allow UserBasicInfoForm to show if currentQuestion.id === "user_basic_info"
                currentQuestion && currentQuestion.id === "user_basic_info" && (userBasicInfoCompleted || skipUserBasicInfo) ? (
                  <UserBasicInfoForm onComplete={() => {
                    setUserBasicInfoCompleted(true);
                    nextQuestion("user_basic_info", "completed");
                  }} />
                ) :
              stressLevelCompleted ? (
                // Show HautAiReqPermissions after stress_level is completed
                <HautAiReqPermissions 
                  onContinue={() => {
                    setStressLevelCompleted(false);
                    // Clear the persisted state
                    if (typeof window !== 'undefined') {
                      window.localStorage.removeItem("show_haut_permissions");
                    }
                    // Continue to next question (camera question)
                  }}
                />
              ) : showLoaderAfterStress ? (
                <LoaderWithText onHautAiResponse={handleHautAiResponse} />
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