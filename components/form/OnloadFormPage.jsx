import { useContext, useEffect } from "react";
import { useState } from "react";
import { QuestionsContext } from "../../context/questions-store";
import handleRedirections from "@/utils/handleRedirections";
import { useRouter } from "next/navigation";

const OnloadFormPage = () => {
  const { queryStrings } = useContext(QuestionsContext);

  const [syntheticId, setSyntheticId] = useState("");
  const [tabClosed, setTabClosed] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [hasUserData, setHasUserData] = useState(false);
  const router = useRouter()

  useEffect(() => {
    try {
      let synthetic = window.localStorage.getItem("syntheticId");
      let tabStatus = window.localStorage.getItem("tabclosed");
      let status = window.localStorage.getItem("form_status");

      // Check if user has filled basic info (can resume)
      const hasBasicUserData = window.localStorage.getItem("user_first_name") && window.localStorage.getItem("user_phone");
      setSyntheticId(synthetic);
      setTabClosed(tabStatus);
      setFormStatus(status);
      setHasUserData(!!hasBasicUserData);

      // iOS Safari fix: If we have user data but reached this page, ensure tabclosed is set
      // This helps maintain consistency across page loads
      if (hasBasicUserData && (!tabStatus || tabStatus === "false" || tabStatus === "null")) {
        window.localStorage.setItem("tabclosed", "true");
        setTabClosed("true");
      }

      // If no user data found, redirect back to skin test after a delay
      if (!hasBasicUserData && !synthetic) {
        const redirectTimer = setTimeout(() => {
          router.push("/skin-test");
        }, 500);
        return () => clearTimeout(redirectTimer);
      }
    } catch (err) {
      console.error("[OnloadFormPage] Error reading localStorage:", err);
    }
  }, [router]);

  return (
    <div className={` h-screen mx-auto max-w-2xl px-6 pb-8 bg-white font-sophiaPro flex justify-center items-center `}>
      <div className="flex flex-col items-center justify-center gap-4 h-2/5 sm:h-auto xs:mx-2">
        <h2 className="text-2xl font-[400] text-center sm:text-4xl lg:text-6xl text-gray-600 sm:text-brand-gray-dark">
          Hey There!
        </h2>
        <h4 className="font-[400] text-center sm:text-2xl text-gray-700 sm:text-brand-gray-dark">
          You have taken the skin test before.
        </h4>
        {syntheticId ? (
          <>
            <button
              className="w-[298px]  mt-6 h-[56px] justify-center text-sm flex  bg-Neutral/900 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
              onClick={() => handleRedirections({ val: "refill", router })}
            >
              <span className="font-[400] uppercase text-center">
                Take a test again
              </span>
            </button>
            <button
              className="w-[298px]  h-[56px] justify-center text-sm flex bg-neutral-400 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
              onClick={() => handleRedirections({ val: "resultPage", queryStrings, router })}
            >
              <span className="font-[400] uppercase text-center">
                Go to result
              </span>
            </button>
          </>
        ) : (tabClosed === "true" || formStatus === "filled") && hasUserData ? (
          // Show resume options if user has started the form
          <>
            <button
              className="w-[298px]  mt-6 h-[56px] justify-center text-sm flex  bg-Neutral/900 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
              onClick={() => handleRedirections({ val: "refill", queryStrings, router })}
            >
              <span className="font-[400] uppercase text-center">
                Start from beginning
              </span>
            </button>
            <button
              className="w-[298px]  h-[56px] justify-center text-sm flex bg-neutral-400 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
              onClick={() => handleRedirections({ val: "editAgain", router })}
            >
              <span className="font-[400] uppercase text-center">
                Continue where I left
              </span>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default OnloadFormPage;
