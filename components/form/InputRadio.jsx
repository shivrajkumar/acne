import { useContext, useEffect, useState } from "react";
import useFormSubmit from "../../hooks/useFormSubmit";
import {
 
  TRANSACTION_API,
} from "@/constants/urls";
import { fetchRequest } from "../../helpers/fetchRequest";

import Image from "next/image";
import { Modal } from "./modal";
import Loader from "../generic/Loader";
const InputRadio = ({ block, context }) => {
  const {
    apiResponse: {transactionId,caseId },

    isHindi

  } = useContext(context);

  const handleSubmit = useFormSubmit(context);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState(null);
  const [additionalText, setAdditionalText] = useState("");
  const [openModal, setModalOpen] = useState(false);

  useEffect(() => {
    if (block) {
      setReply(block.reply);
    }
  }, [block]);

  const _submitReply = async (reply) => {
    setIsLoading(true);
    let _res = "";

    try {
      const _formData = {
        question_id: block.id,
        question: block.text,
        response: reply,
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

      _res = await fetchRequest(TRANSACTION_API(transactionId), _options);
    } catch (error) {
      console.warn(error);
    } finally {
      if (_res.status === 200) {
        handleSubmit(reply);
        setReply("");

        if (block.next === null) await _formStatusUpdate();
        // eslint-disable-next-line no-unsafe-finally
        return;
      }
      setError(_res.data.message);
      setIsLoading(false);
    }
  };

  const _formStatusUpdate = async () => {
    const _transactionData = {
      question_id: "",
      question: "",
      response: "",
      form_status: "COMPLETED",
    };

    const _trOptions = {
      method: "PUT",
      body: JSON.stringify(_transactionData),
    };

    const _postRes = await fetchRequest(
      TRANSACTION_API(transactionId),
      _trOptions
    );
    return _postRes;
  };

  const _handleSubmit = async ({ reply }) => {
    setAdditionalText("");
    const _reply = reply;
    if (block.id === "gender") {
      window.localStorage.setItem("gender", reply);
    }
    if (_reply === block.additionalTextBox) {
      return;
    }
    if (block.reply === _reply) {
      handleSubmit(reply);

     
      return;
    }

    await _submitReply(_reply);

 
  };

  const _handleSubmitbtn = async () => {
    if (additionalText === "") {
      setError("Please this in ");
      return;
    }
    const _addtionalTextreply = `${reply}, ${additionalText}`;

    if (block.reply === _addtionalTextreply) {
      handleSubmit(reply);
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
        className={`flex flex-col mt-8 sm:mt-8 ${
          block.showImages ? "w-full md:w-[75%]" : "w-full md:w-[60%]"
        }`}
      >
        <label
          className={`text-[20px] md:text-[24px] font-bold text-gray-700  ${
            block.showImages ? "sm:ml-20" : ""
          } `}
          htmlFor={block.id}
        >
         {isHindi ? block.hindi_text : block.text}
        </label>

        <label
          className={`text-[16px] md:text-[18px] mt-2 text-gray-400 align-middle ${
            block.showImages ? "sm:ml-20" : ""
          }`}
        >
          {block.sub_text}
        </label>

        <div
          className={`flex ${
            block.showImages
              ? "flex-wrap justify-center sm:justify-center gap-x-2 xsm:gap-x-4 sm:gap-x-8 gap-y-4 pt-3 pb-2"
              : "flex-col md:ml-2 pl-0"
          }`}
        >
          {block.optionMap?.map((option, index) => (
            <label
              htmlFor={getGTMElementID(option, block, index)}
              key={option.name}
              data-options="responses"
              className={`inline-flex cursor-pointer ${
                block.showImages ? "" : "py-3 md:py-3.5"
              } ${
                block.showImages
                  ? `flex-col w-[150px] xsm:w-[162px] md:w-[190px] ${
                      reply === option.value
                        ? "border-2 border-brand-accent"
                        : "border-[1px]"
                    } items-center justify-center rounded-md`
                  : "border-b"
              }`}
            >
              {block.showImages && (
                <>
                  <div className="w-full flex justify-center py-2 bg-[#F9F6F6] rounded-md">
                    <Image
                      // src={block.absoluteImagePath?`${CDN_BASE_URL}${option.image_url}` :require(`../../assets/images/${option.image_url}`)}
                      alt={option.name}
                      className="flex-1 mb-1 m-10 rounded-full"
                      height={100}
                      width={100}
                    />
                  </div>
                </>
              )}

              <div
                className={`inline-flex flex-col flex-1 sm:flex-row sm:items-center ${
                  block.showImages && "text-center"
                } ${
                  block.showImages && reply == option.value
                    ? "bg-brand-accent text-white"
                    : ""
                } w-full ${
                  block.showImages ? "border-t-[#cacaca7c] border-t-[1px]" : ""
                }`}
              >
                {/* <div className="flex flex-col"> */}
                <div
                  // className="inline-flex items-center w-full"
                  className={`${
                    block.showImages ? "pl-0  " : "pl-2"
                  } inline-flex items-center w-full `}
                >
                  <input
                    className={`cursor-pointer form-radio text-brand-accent ${
                      block.showImages && "hidden"
                    }`}
                    checked={reply === option.value}
                    id={getGTMElementID(option, block, index)}
                    type="radio"
                    onClick={handleChange}
                    onChange={({ target }) => setReply(target.value)}
                    value={option.value}
                  />
                  {!block.showImages && (
                    <span
                      className={`md:whitespace-nowrap ${
                        block.showImages
                          ? "text-base font-[500] ml-1.5"
                          : "text-[16px] md:text-[18px] min-w-fit ml-3"
                      }`}
                    >
                      {option.name}
                    </span>
                  )}
                  {option.sub_text && (
                    <div
                      className={
                        block.showImages &&
                        `flex flex-col px-1 py-3 justify-between ${
                          reply === option.value ? "bg-brand-accent" : ""
                        } w-full`
                      }
                    >
                      <span
                        className={` whitespace-nowrap  text-black  font-[400] ${
                          block.showImages
                            ? "mr-[1px]  md:text-[1rem] text-[.875rem] xs:text-[.8rem]"
                            : "md:text-xl min-w-fit ml-2 "
                        } ${
                          block.showImages && reply == option.value
                            ? "sm:font-semibold text-white"
                            : ""
                        }`}
                      >
                        {option.name}
                      </span>
                      {option.sub_text && (
                        <span
                          className={` xs:text-[.8rem] ${
                            option.sub_text ? "text-[14px]" : "text-xl"
                          } ${reply !== option.value ? "text-[#959595]" : ""} `}
                        >
                          {option.sub_text}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
        {error !== "" && (
          <span className="block mt-1 text-brand-accent">{error}</span>
        )}
        {block?.whyWeAsk?.show && <div className="flex justify-end">
          <button className="underline font-Nunito text-custom-light-grey text-sm text-end mt-4 mb-6 sm:mb-0" onClick={() => setModalOpen(true)}>
            Why we ask?
          </button>
          <Modal open={openModal} setOpen={setModalOpen} text={block?.whyWeAsk?.text} />
        </div>}
        {reply === block.additionalTextBox && (
          <div className="flex flex-col items-center justify-center mt-4">
            <button
              className="px-6 py-2 uppercase rounded-[4px] w-max bg-brand-accent text-green-50"
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

export default InputRadio;

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
