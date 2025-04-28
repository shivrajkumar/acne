import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuestionsContext } from "../../context/questions-store";
import isEmpty from "lodash/isEmpty";

const OnloadFormPage = () => {
  const { queryStrings, isHindi } = useContext(QuestionsContext);

  const [syntheticId, setSyntheticId] = useState("");
  const [, setTabClosed] = useState("");
  const [, setFormStatus] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let synthetic = window.localStorage.getItem("syntheticId");
    let tabStatus = window.localStorage.getItem("tabclosed");
    let status = window.localStorage.getItem("form_status");
    setSyntheticId(synthetic);
    setTabClosed(tabStatus);
    setFormStatus(status);
  }, []);

  const reDirectFunction = async (val) => {
    // const UTM = Cookies.get("__TRAYA_UTM__");
    // const tempUTM = UTM?.split("&")
    //   ?.find((val) => val.includes("page"))
    //   ?.replace("page=", "");

    let gender = window.localStorage.getItem("gender");
    // let synthetic = window.localStorage.getItem("syntheticId");

    if (val === "resultPage") {
      // if (
      //   window.location.pathname == "/femaleV2/question" ||
      //   window.location.pathname == "/home/question" ||
      //   window.location.pathname == "/user-account/question"
      // ) {
      //   Router.push(
      //     gender == "M"
      //       ? Router.push("/pages/result4")
      //       : Router.push("/pages/female-result")
      //   );
      // } else {
      //   Router.push(
      //     gender == "M"
      //       ? `${window.location.origin}/result?id=${syntheticId}`
      //       : `${window.location.origin}/result?id=${syntheticId}`
      //   );
      // }

      // window.location.replace(
      //   `${window.location.origin}/${
      //     gender == "F" ? "pages/female-result" : "pages/result4"
      //   }?id=${syntheticId}`
      // );

      if (gender == "F") {
        if (searchParams.get("page") === "femalev2") {
          router.push(
            `/pages/female-result?id=${syntheticId}${
              !isEmpty(queryStrings.utmData) ? "&" : ""
            }${new URLSearchParams(queryStrings.utmData).toString()}`
          );
        } else {
          router.push(
            `https://traya.health/pages/female-result?id=${syntheticId}&${new URLSearchParams(
              queryStrings.utmData
            ).toString()}`
          );
        }
      } else {
        if (isHindi) {
          // router.push(
          //   `https://traya.health/pages/result-hinglish?id=${syntheticId}${
          //     !isEmpty(queryStrings.utmData) ? "&" : ""
          //   }${new URLSearchParams(queryStrings.utmData).toString()}`
          // );
          router.push(
            `/pages/result-hinglish?id=${syntheticId}${
              !isEmpty(queryStrings.utmData) ? "&" : ""
            }${new URLSearchParams(queryStrings.utmData).toString()}`
          );
        } else {
          // router.push(
          //   `https://traya.health/pages/result4?id=${syntheticId}${
          //     !isEmpty(queryStrings.utmData) ? "&" : ""
          //   }${new URLSearchParams(queryStrings.utmData).toString()}`
          // );
          router.push(
            `/pages/result4?id=${syntheticId}${
              !isEmpty(queryStrings.utmData) ? "&" : ""
            }${new URLSearchParams(queryStrings.utmData).toString()}`
          );
        }
      }
    }
    if (val === "refill") {
      Cookies.remove("_fw_crm_v");
      Cookies.remove("__TRAYA_UTM__");
      window.sessionStorage.clear();
      window.localStorage.clear();
      await fetch("/api/clearCookies", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: "_fw_crm_v" }),
      });
      window.location.reload();
      // router.push(window.location.reload());
    }
    if (val === "editAgain") {
      window.localStorage.removeItem("tabclosed");
      router.push(window.location.reload());
    }
  };
  return (
    <div className={` h-screen mx-auto max-w-2xl px-6 pb-8 bg-white font-lato flex justify-center items-center `}>
      <div className="flex flex-col items-center justify-center gap-4 h-2/5 sm:h-auto xs:mx-2">
        <h2 className="text-2xl font-bold text-center sm:text-4xl lg:text-6xl text-gray-600 sm:text-brand-gray-dark">
          Hey There!
        </h2>
        <h4 className="font-bold text-center sm:text-2xl text-gray-700 sm:text-brand-gray-dark">
          You have taken the skin test before.
        </h4>
        {/* {syntheticId ? (
          <>
            <button
              className="w-[85%] md:w-[70%] justify-center flex bg-[#414042] text-white py-2.5 px-4 text-[16px] md:text-xl lg:text-xl xl:text-xl font-bold rounded-lg  uppercase"
              // className="mb-4 focus:outline-none text-brand-accent border-2 rounded-2xl py-4 px-9 w-9/12 border-brand-accent xs:px-2"
              onClick={() => reDirectFunction("refill")}
            >
              <span className="font-[400] uppercase text-center">
                Take a test again
              </span>
            </button>
            <button
              className="w-[85%] md:w-[70%] justify-center flex bg-[#414042] text-white py-2.5 px-4 text-[16px] md:text-xl lg:text-xl xl:text-xl font-bold rounded-lg  uppercase"
              // className="mb-4 focus:outline-none text-brand-accent border-2 rounded-2xl py-4 px-9 w-9/12 border-brand-accent xs:px-2"
              onClick={() => reDirectFunction("resultPage")}
            >
              <span className="font-[400] uppercase text-center">
                Go to result
              </span>
            </button>
          </>
        ) : tabClosed === "true" && formStatus !== "filled" ? ( */}
          <>
            <button
              // className="mb-4 focus:outline-none text-brand-accent border-2 rounded-2xl py-4 px-4 xl:px-6 w-10/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12 border-brand-accent xs:px-2"
              className="w-[298px]  mt-6 h-[56px] justify-center text-sm flex  bg-Neutral/900 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
              onClick={() => reDirectFunction("refill")}
            >
              <span className="font-[400] uppercase text-center">
                Start from beginning
              </span>
            </button>
            <button
              // className="mb-4 focus:outline-none text-brand-accent border-2 rounded-2xl py-4 px-4 xl:px-6 w-10/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12 border-brand-accent "
              className="w-[298px]  h-[56px] justify-center text-sm flex bg-neutral-400 text-[#FFFFFF] py-4 px-10 text-[16px]   font-semibold  rounded-[1000px]  uppercase"
              onClick={() => reDirectFunction("editAgain")}
            >
              <span className="font-[400] uppercase text-center">
                Continue where I left
              </span>
            </button>
          </>
        {/* ) : (
          <></>
        )} */}
      </div>
    </div>
  );
};

export default OnloadFormPage;
