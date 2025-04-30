import { useContext, useEffect, useState } from "react";
import useFormSubmit from "../../hooks/useFormSubmit";
import {
  TRANSACTION_API,
} from "@/constants/urls";
import { isNotEmptyArray } from "../../helpers/validation";
import { fetchRequest } from "../../helpers/fetchRequest";
import InputAdditionalText from "./InputAdditionText";

import { BsArrowRightShort } from "react-icons/bs";
// import { QuestionsContext } from "../../context/questions-store";
// import Router from "next/navigation";
// import { SUBMISSION } from "../../constants/routes";
import { Modal } from "./modal";
import Loader from "../generic/Loader";

const InputCheckbox = ({ block, context }) => {
  const {
    apiResponse: { transactionId ,caseId},
    setAllQuestionsFilled,
    isHindi,
  } = useContext(context);

  const handleSubmit = useFormSubmit(context);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [visible, setVisible] = useState(false);
  const [openModal, setModalOpen] = useState(false);


  useEffect(() => {
    if (!block) return;

    if (block.additionalTextBox) {
      const _reply = [];
      block.reply?.forEach((r) => {
        if (r.includes(block.additionalTextBox)) {
          const [checkBoxVal, additionalTextVal] = r.split(", ");
          _reply.push(checkBoxVal);
          setAdditionalText(additionalTextVal);
          setVisible(true);
        } else {
          _reply.push(r);
        }
      });
      setReply(_reply);
    } else {
      setReply(block.reply);
    }

    // return () => setReply("");
  }, [block]);

  const _submitReply = async () => {
    setIsLoading(true);
    let _res = "";
    const _modifiedReply = [];
    for (let i = 0; i < reply.length; i++) {
      if (reply[i] === block.additionalTextBox) {
        _modifiedReply.push(reply[i] + ", " + additionalText);
      } else {
        _modifiedReply.push(reply[i]);
      }
    }



    try {
      const _formData = {
        question_id: block.id,
        question: block.text,
        response: _modifiedReply,
        form_status: ['customer_values'].includes(block.next) 
        ? "semi-filled":block.id=='customer_values'?'filled'
        : "In-Progress",
        locationPath: window.location.pathname + window.location.search,
        formFillSource: "website",
        caseId
      };

      const _options = {
        method: "PUT",
        body: JSON.stringify(_formData),
      };
      if(['customer_values'].includes(block.next)){
        window.localStorage.setItem("form_status", "semi-filled");
      }

      _res = await fetchRequest(TRANSACTION_API(transactionId), _options);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
      if (_res.status === 200) {
        await handleSubmit(reply);
        // if (_res.data.skipPhoto === true) {
        //   window.localStorage.setItem("skipPhoto", true);
     
        //   // Router.push(SUBMISSION);
        if (block.id =='stress_level'){
          setAllQuestionsFilled(true);
        }
        
        // } else {
        //   window.localStorage.removeItem("skipPhoto", true);
        //   await handleSubmit(reply);
        //   setReply("");
        // }
        // eslint-disable-next-line no-unsafe-finally
        return;
      } else {
        // setError(_res.data.message);
      }
    }
  };

  const _handleSubmit = async () => {
    const _isValid = isNotEmptyArray(reply);
    if (visible && additionalText === "") {
      setError("Please Fill this in");
      return;
    }

    if (_isValid.hasError) {
      setError(_isValid.error);
      return;
    }
    if (block.reply === reply) {
      handleSubmit(reply);
      return;
    }

    await _submitReply();
  };

  const handleChnage = ({ target }) => {
    let _value = target.value;
    if (_value === block.additionalTextBox) {
      setVisible(true);
    }
    if (_value == "none" ) {
      setReply([]);
      if (reply.includes("none")) {
        setReply((prev) => prev.filter((i) => i !== _value));
        setVisible(false);
      } else {
        setReply((prev) => [...prev, _value]);
      }
    } else {
      if (reply.includes("none")) {
        setReply((prev) => prev.filter((i) => i !== "none"));
      }
      if (reply.includes(_value)) {
        setReply((prev) => prev.filter((i) => i !== _value));
        setVisible(false);
      } else {
        setReply((prev) => [...prev, _value]);
      }
    }
  };
  const getGTMElementID = (option, block, index) => {
    if (window.location.pathname === "/guest-form") {
      return gtmParametersMap[block.id] + "-" + option.name;
    } else return `${block.id}_${index + 1}`;
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="flex flex-col w-full gap-2 mt-8 md:w-[60%] sm:mt-8">
        <label className="text-[20px] md:text-[24px] font-bold text-gray-700">
          {isHindi ? block.hindi_text : block.text}
        </label>
        {block.sub_text && (
          <div className="text-[16px] md:text-[18px] text-gray-400 align-middle">
            {isHindi ? block.hindi_sub_text : block.sub_text}
          </div>
        )}

        <div className="flex flex-col pl-0 md:pl-4 -mt-2">
          {block.optionMap?.map((option, index) => (
            <label
              htmlFor={getGTMElementID(option, block, index)}
              key={option.name}
              data-options="responses"
              className="block flex-col py-3.5 md:py-3.5 border-b cursor-pointer sm:flex-row sm:items-center"
            >
              <div className="inline-flex items-center pl-2">
                <input
                  className="cursor-pointer form-radio text-brand-accent disabled:text-gray-600 xs:w-5 sm:w-5"
                  checked={reply.includes(option.value)}
                  disabled={
                    !reply.includes(option.value) && reply.length === block.max
                  }
                  id={getGTMElementID(option, block, index)}
                  type="checkbox"
                  onChange={handleChnage}
                  value={option.value}
                />

                <span className="ml-3 text-[16px] md:text-[18px] ">
                  {isHindi ? option.hindi_name : option.name}
                </span>
              </div>

              <div className="w-full px-2">
                {visible && option.value === block.additionalTextBox && (
                  <InputAdditionalText
                    reply={additionalText}
                    setReply={setAdditionalText}
                  />
                )}
              </div>
            </label>
          ))}
        </div>
        {error !== "" && (
          <span className="block mt-1 text-brand-accent">{error}</span>
        )}
        {/* <div className="flex flex-col items-center justify-center">
          <button
            className="px-6 py-2 uppercase rounded-[4px] w-max bg-brand-accent text-green-50"
            onClick={() => _handleSubmit()}
          >
            continue
          </button>
        </div> */}
        {block?.whyWeAsk?.show && <div className="flex justify-end">
          <button className="underline font-Nunito text-custom-light-grey text-sm text-end mt-4 mb-6 sm:mb-0" onClick={() => setModalOpen(true)}>
            Why we ask?
          </button>
          <Modal open={openModal} setOpen={setModalOpen} text={block?.whyWeAsk?.text} />
        </div>}
        <div className="flex flex-row flex-wrap justify-center mt-6 w-full sm:static bottom-0 left-0 right-0 sm:mb-4  bg-white pt-4 pb-2 z-10">
          {/* {currentQuestion.id && (
            <button
              className="uppercase xl:w-[168px] w-[110px] xl:h-[45px] h-[30px] justify-center border border-custom-green bg-[#F9F7F7] font-[700] text-brand-dark xl:px-3 pr-2 xl:py-1 py-0 rounded-full"
              onClick={() => removeFromPreviousQuestion()}
              id="previous_button"
            >
              <div className="flex justify-center items-center">
                <RiArrowLeftSLine color="#414042" size={22} />
                <p className="text-[12px] xl:text-[16px]">Previous</p>
              </div>
            </button>
          )} */}
          <div className="hidden xl:block lg:block md:block sm:block">
          <div className="border-white border rounded w-full flex justify-center align-center fixed bottom-0 right-0 bg-white font-bold focus:outline-none z-50">
            <button
              className={`uppercase px-32 my-2 py-3 bg-[#414042] text-white rounded-[4px] text-[22px] font-sans font-[600] focus:outline-none
            ${
              (reply === "" || reply.length === 0) &&
              "cursor-not-allowed blur-none opacity-75"
            }`}
              onClick={() => _handleSubmit()}
              disabled={reply === "" || reply.length === 0}
            >
              <div className="flex justify-center items-center">
                <p className="text-[17px]">Next</p>
                <BsArrowRightShort color="#FFF" size={25} />
              </div>
            </button>
            </div>
          </div>

          <div className="border-white border block xl:hidden lg:hidden md:hidden sm:hidden">
            <div className="border-white border rounded w-full flex justify-center align-center fixed bottom-0 right-0 bg-white font-bold focus:outline-none z-50">
              <button
                className={`uppercase px-12 my-2 py-3 w-[95%] bg-[#414042] text-white rounded-[4px] text-[22px] font-sans font-[600] focus:outline-none ${
                  (reply === "" || reply.length === 0) &&
                  "cursor-not-allowed blur-none opacity-75"
                }`}
                onClick={() => _handleSubmit()}
                disabled={reply === "" || reply.length === 0}
              >
                <div className="flex justify-center items-center">
                  <p className="text-[17px] xl:text-[16px]">Next</p>
                  <BsArrowRightShort color="#FFF" size={25} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputCheckbox;

const gtmParametersMap = {
  "fhair-goals": "SFQ4",
  "mhair-goals": "SFQ4",
  mAnybelow: "SFQ10",
  fAnybelow: "SFQ10",
};
