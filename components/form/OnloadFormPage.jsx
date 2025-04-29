import { useContext, useEffect } from "react";
import { useState } from "react";
import { QuestionsContext } from "../../context/questions-store";
import handleRedirections from "@/utils/handleRedirections";

const OnloadFormPage = () => {
  const { queryStrings } = useContext(QuestionsContext);

  const [syntheticId, setSyntheticId] = useState("");
  const [tabClosed, setTabClosed] = useState("");
  const [formStatus, setFormStatus] = useState("");


  useEffect(() => {
    let synthetic = window.localStorage.getItem("syntheticId");
    let tabStatus = window.localStorage.getItem("tabclosed");
    let status = window.localStorage.getItem("form_status");
    setSyntheticId(synthetic);
    setTabClosed(tabStatus);
    setFormStatus(status);
  }, []);




  return (
    <div className={` h-screen mx-auto max-w-2xl px-6 pb-8 bg-white font-lato flex justify-center items-center `}>
      <div className="flex flex-col items-center justify-center gap-4 h-2/5 sm:h-auto xs:mx-2">
        <h2 className="text-2xl font-bold text-center sm:text-4xl lg:text-6xl text-gray-600 sm:text-brand-gray-dark">
          Hey There!
        </h2>
        <h4 className="font-bold text-center sm:text-2xl text-gray-700 sm:text-brand-gray-dark">
          You have taken the skin test before.
        </h4>
        {syntheticId ? (
          <>
            <button
              className="w-[298px]  mt-6 h-[56px] justify-center text-sm flex  bg-Neutral/900 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
              // className="mb-4 focus:outline-none text-brand-accent border-2 rounded-2xl py-4 px-9 w-9/12 border-brand-accent xs:px-2"
              onClick={() => handleRedirections({ val: "refill" })}
            >
              <span className="font-[400] uppercase text-center">
                Take a test again
              </span>
            </button>
            <button
              className="w-[298px]  h-[56px] justify-center text-sm flex bg-neutral-400 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
              // className="mb-4 focus:outline-none text-brand-accent border-2 rounded-2xl py-4 px-9 w-9/12 border-brand-accent xs:px-2"
              onClick={() => handleRedirections({ val: "resultPage",queryStrings})}
            >
              <span className="font-[400] uppercase text-center">
                Go to result
              </span>
            </button>
          </>
        ) : tabClosed === "true" && formStatus !== "filled" ? (
          <>
            <button
              // className="mb-4 focus:outline-none text-brand-accent border-2 rounded-2xl py-4 px-4 xl:px-6 w-10/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12 border-brand-accent xs:px-2"
              className="w-[298px]  mt-6 h-[56px] justify-center text-sm flex  bg-Neutral/900 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
                onClick={() => handleRedirections({ val: "refill", queryStrings })}
            >
              <span className="font-[400] uppercase text-center">
                Start from beginning
              </span>
            </button>
            <button
              // className="mb-4 focus:outline-none text-brand-accent border-2 rounded-2xl py-4 px-4 xl:px-6 w-10/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12 border-brand-accent "
              className="w-[298px]  h-[56px] justify-center text-sm flex bg-neutral-400 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
                onClick={() => handleRedirections({val:"editAgain"})}
            >
              <span className="font-[400] uppercase text-center">
                Continue where I left
              </span>
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default OnloadFormPage;
