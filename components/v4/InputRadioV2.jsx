import { useContext, useEffect, useState } from "react";
import useFormSubmit from "../../hooks/v2/useFormSubmit";
import jsonLogic from "json-logic-js";
import { TRANSACTION_API } from "@/constants/urls";
import { fetchRequest } from "../../helpers/fetchRequest";
import InputAdditionalText from "../form/InputAdditionText";
// import Image from "next/image";

// import { RESULT_CHOLESTROL } from "../../constants/config";
import {
  CHOLESTEROL_SUBMISSION_COMPLETED,
  logGtmEvent,
  triggerGa,
} from "../../helpers/gtmHelpers";
// import { usePathname } from "next/navigation";
// import { FEMALE } from "../../constants/routes";
// import { getCurrentTimeInReadableForm } from "../../helpers/timeFormatter";
// import { activityLoggerForm } from "../../helpers/activityLogger";
import useMediaQuery from "../../hooks/useMediaQuerry";
import Loader from "../generic/Loader";

const InputRadioV2 = ({ block, context }) => {
  // const pathname = usePathname();

  const {
    apiResponse: { caseId, transactionId },
    setAllQuestionsFilled,
    isHindi,
    setIsMale,
    changeLanguage,
  } = useContext(context);

  const handleSubmit = useFormSubmit(context);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState(null);
  const [additionalText, setAdditionalText] = useState("");
  const [errorMsg,] = useState("");

  const mobileScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (block) {
      setReply(block.reply);
    }

    if (block.id === "gender") {
      changeLanguage(false);
    }
  }, [block]);

  const _submitReply = async (reply) => {
    if (block.id === "gender") {
      window.localStorage.setItem("gender", reply);
    }
    setIsLoading(true);
    let _res = "";

    if (block.fn) block.next = jsonLogic.apply(block.fn, { reply });
    try {
      // const maleStage = window.localStorage.getItem("2e");
      const _skipBpQuestion = block.id == "preferred_language";
      const _formData = {
        question_id: block.id,
        question: block.text,
        response: reply,
        locationPath: window.location.pathname + window.location.search,
        formFillSource: "website",
        form_status:
          ['photo_q'].includes(block.next) || _skipBpQuestion
            ? "semi-filled"
            : "In-Progress",
        caseId
      };
      if (['photo_q'].includes(block.next) || _skipBpQuestion)
        setAllQuestionsFilled(true);
      const _options = {
        method: "PUT",
        body: JSON.stringify(_formData),
      };

      _res = await fetchRequest(TRANSACTION_API(transactionId), _options);
      // if (LAST_QUESTIONS.has(block.next) || _skipBpQuestion) {
      //   activityLoggerForm(syntheticId, "hairtest_semifilled", {
      //     time: getCurrentTimeInReadableForm(),
      //     case_id: caseId,
      //     platform: "web",
      //   });
      // }
    } catch (error) {
      console.warn(error);
    } finally {
      if (_res.status === 200) {
        // if (_res.data.skipPhoto === true) {
        //   window.localStorage.setItem("skipPhoto", true);
        await handleSubmit(reply);
        // Router.push(SUBMISSION);

        //   // setAllQuestionsFilled(true);
        // } else {
        //   window.localStorage.removeItem("skipPhoto", true);
        //   await handleSubmit(reply);
        //   window.localStorage.removeItem("fs1");
        //   if (block.id === "gender") {
        //     window.localStorage.setItem("gender", reply);
        //   }
        //   setReply("");
        //   // if (LAST_QUESTIONS.has(block.id)) {
        //   //   await _formStatusUpdate();
        //   // }
        // }
        // eslint-disable-next-line no-unsafe-finally
        return;
      }
      setIsLoading(false);
      // setError(_res.data?.message);
    }
  };

  // const _formStatusUpdate = async () => {
  //   const _transactionData = {
  //     question_id: "",
  //     question: "",
  //     response: "",
  //     locationPath: window.location.pathname + window.location.search,
  //     formFillSource: "website",
  //     form_status: "COMPLETED",
  //   };

  //   const _trOptions = {
  //     method: "PUT",
  //     body: JSON.stringify(_transactionData),
  //   };

  //   const _postRes = await fetchRequest(
  //     TRANSACTION_API(transactionId),
  //     _trOptions
  //   );
  //   return _postRes;
  // };

  const _handleSubmit = async ({ reply }) => {
    setAdditionalText("");

    if (block.id === "gender") {
      if (reply === "F") {
        setIsMale(false);
        changeLanguage(false);
      } else if (reply === "M") {
        setIsMale(true);
      } else {
        setIsMale(null);
      }
    }

    const _reply = reply;
    if (block.id === "hair_vol1") {
      window.localStorage.setItem("2e", _reply);
    }
    if (block.id === "gender") {
      window.localStorage.setItem("gender", reply);
    }
    if (_reply === block.additionalTextBox) {
      return;
    }

    if (block.reply === _reply) {
      await _submitReply(_reply);

      if (block.reply && block.id === "gender") {
        window.localStorage.setItem("gender", reply);
      }

      if (block.id === "situation_reaction") {
        await logGtmEvent(CHOLESTEROL_SUBMISSION_COMPLETED, caseId);
        await triggerGa();
        // window.location.assign(RESULT_CHOLESTROL(syntheticId));
        let arr = [];
        for (let i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i).substring(0, 5) === "state") {
            arr.push(localStorage.key(i));
          }
        }

        for (let i = 0; i < arr.length; i++) {
          localStorage.removeItem(arr[i]);
        }
      }
      return;
    }
    await _submitReply(_reply);
    if (block.id === "situation_reaction") {
      await logGtmEvent(CHOLESTEROL_SUBMISSION_COMPLETED, caseId);
      await triggerGa();
      // window.location.assign(RESULT_CHOLESTROL(syntheticId));
      let arr = [];
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 5) === "state") {
          arr.push(localStorage.key(i));
        }
      }

      for (let i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i]);
      }
    }
    if (block.id === "fs1") {
      window.localStorage.setItem("fs1", "Pregnancy");
    }
  };

  const _handleSubmitbtn = async () => {
    if (additionalText === "") {
      setError("Please this in ");
      return;
    }
    const _addtionalTextreply = `${reply}, ${additionalText}`;

    if (block.reply === _addtionalTextreply) {
      await handleSubmit(reply);
      if (block.reply && block.id === "gender") {
        window.localStorage.setItem("gender", reply);
      }
      return;
    }

    await _submitReply(_addtionalTextreply);
  };

  const handleChange = ({ target }) => {
    setReply(target.value);
    _handleSubmit({ reply: target.value });
  };
  const getGTMElementID = (option, block, index) => {
    if (window.location.pathname === "/guest-form") {
      return (
        gtmParametersMap[block.id] + "-" + option.name.replace("Stage", "STG")
      );
    } else return option.id || `${block.id}_${index + 1}`;
  };

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={`flex flex-col mt-8 sm:mt-8 font-sans
        ${block.id === "preferred_language"
            ? "lg:w-[90%] w-full"
            : "lg:w-[60%] w-full"
          }`}
      >
        <p
          className="text-[20px] md:text-[24px] mb-2 sm:mb-4 font-bold text-gray-700 text-left"
          htmlFor={block.id}
        >
          {isHindi ? block.hindi_text : block.text}
        </p>

        <div className="text-[16px] md:text-[18px] h-8 mb-8 xl:mb-4 text-gray-400 text-left">
          {block.sub_text}
        </div>

        <div
          className={`${block.id === "preferred_language"
              ? "w-[100%] grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 xl:mb-0 mx-auto"
              : "xl:w-[80%] w-[100%] grid grid-cols-2 md:grid-cols-2 gap-6 mx-auto"
            } `}
        >
          {block.optionMap?.map((option, index) => (
            <label
              htmlFor={getGTMElementID(option, block, index)}
              key={option.name}
              data-options="responses"
              className={`inline-flex mx-auto cursor-pointer bg-[#F0F0F0] rounded-[5.8px] border border-[#F0F0F0]  ${block.showImages
                  ? "flex-col flex-1 items-center px-4 justify-center rounded-md border-[#BA9D86]  hover:bg-[#BA9D86]  hover:text-white"
                  : "border"
                }
              ${mobileScreen
                  ? "border"
                  : "border hover:bg-[#BA9D86] hover:text-white"
                }
                ${reply == option.value
                  ? "bg-[#BA9D86] text-white"
                  : "bg-[#F0F0F0]"
                }
              ${block.id === "preferred_language"
                  ? "xl:w-[100%] w-[100%]"
                  : "w-[100%]"
                }`}
              style={{
                boxShadow:
                  "0px 1.4473836421966553px 4.342150688171387px 0px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* {block.showImages && (
                <Image
                  src={
                    require(`../../assets/images/${option.image_url}`).default
                  }
                  alt={option.name}
                  className="flex-1 mb-1"
                  height={100}
                  width={100}
                />
              )} */}

              <div className={`" inline-flex w-[100%] flex-col flex-1 sm:flex-row sm:items-center rounded-[5.8px]  ${reply === option.value ? "text-white bg-[#BA9D86]" : "text-[#414042] "} `}>
                <button
                  className={`cursor-pointer w-full px-[24px]  rounded-[5.8px] py-[12px] md:py-[16px] font-sans text-[#414042] font-[700] text-[14px] xl:text-[20px] ${block.showImages
                      ? "text-base "
                      : "text-[16px] md:text-[20px]"
                    }
                  ${mobileScreen ? "hover:text-[#414042]" : "hover:text-white"}
                  ${reply === option.value ? "text-white bg-[#BA9D86]" : "text-[#414042] "}`}
                  id={getGTMElementID(option, block, index)}
                  onClick={handleChange}
                  value={option.value}
                >
                  {isHindi ? option.hindi_name : option.name}
                </button>

                {reply === block.additionalTextBox &&
                  option.value === block.additionalTextBox && (
                    <div className="w-full pr-4 mt-4">
                      <InputAdditionalText
                        reply={additionalText}
                        setReply={setAdditionalText}
                        placeholder="Mention which medications"
                      />
                    </div>
                  )}
              </div>
            </label>
          ))}
        </div>

        {errorMsg !== "" && (
          <span className="block mt-1 text-[#BA9D86]">{errorMsg}</span>
        )}

        {error !== "" && (
          <span className="block mt-1 text--[#BA9D86]">{error}</span>
        )}
        {reply === block.additionalTextBox && (
          <div className="flex flex-col items-center justify-center mt-4">
            <button
              className="px-6 py-2 uppercase rounded-md w-max bg--[#BA9D86] text-green-50"
              onClick={() => _handleSubmitbtn()}
            >
              continue
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default InputRadioV2;

const gtmParametersMap = {
  gender: "SFQ1",
  mdandruff: "SFQ3",
  fdandruff: "SFQ3",
  "mHairloss-image": "SFQ5",
  "fHairloss-image": "SFQ5",
  mEnergetic: "SFQ6",
  fEnergetic: "SFQ6",
  mConstipated: "SFQ7",
  fConstipated: "SFQ7",
  mStress: "SFQ8",
  fStress: "SFQ8",
  mSleep: "SFQ9",
  fSleep: "SFQ9",
  fStages: "SFQ11-F",
};
