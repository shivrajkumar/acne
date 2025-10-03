import { useContext, useEffect, useState } from "react";
import useFormSubmit from "../../hooks/useFormSubmit";
import { HAUT_AI_IMAGE_CAPTURE_CHECK, TRANSACTION_API } from "@/constants/urls";
import { fetchRequest } from "../../helpers/fetchRequest";
import Image from "next/image";
import { Modal } from "./modal";
import infoCircle from "@assets/icons/info-circle.png";
import Loader from "../generic/Loader";
import { formFillStatus } from "@/enums/QuestionEnums";
import infoCircleBlack from "@assets/icons/info-circle-black.png";
import { logGtmEvent } from "../generic/Gtm";
import { generateEventId } from "@/helpers/metaCapiHelper";
import { QuestionsContext } from "@/context/questions-store";

const SingleSelect = ({ block, context }) => {
  const {
    apiResponse: { transactionId },
    isHindi,
    setHautAiResponse,
    setAllQuestionsFilled,
  } = useContext(context);

  const handleSubmit = useFormSubmit(context);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState(null);
  const [openModal, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const gender = localStorage.getItem("user_gender");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCaseId = window.localStorage.getItem("caseId");
      if (storedCaseId) {
        setCaseId(storedCaseId);
      }
    }
  }, [caseId]);

  useEffect(() => {
    if (block) {
      setReply(block.reply);
    }
  }, [block]);

  const _submitReply = async (reply) => {
    setIsLoading(true);
    let _res = "";

    try {
      // Check hautAiResponse if this is stress_level
      if (block.id == "stress_level") {
        try {
          const completionRes = await fetchRequest(
            HAUT_AI_IMAGE_CAPTURE_CHECK(transactionId)
          );
          setHautAiResponse(
            completionRes.data.isSkinAnalysisResponseCapturedProperly
          );
        } catch (err) {
          console.error("Error calling HAUT_AI_IMAGE_CAPTURE_CHECK:", err);
        }
      }

      const _formData = {
        question_id: block.id,
        field_key: block.id,
        question_text: block.text,
        response: [reply],
        status: block.id == 'stress_level' ? formFillStatus.FILLED : formFillStatus.SEMI_FILLED,
        location_path: window.location.pathname + window.location.search,
        source: "website",
        response_type: block.type,
      };

      const _options = {
        method: "POST",
        body: JSON.stringify(_formData),
      };

      _res = await fetchRequest(TRANSACTION_API(transactionId), _options);
    } catch (error) {
      console.warn(error);
    } finally {
      if (_res.status === 200) {
        await handleSubmit(reply);
        setReply("");

        if (block.id == "stress_level") {
          const phone = window.localStorage.getItem("user_phone");
          logGtmEvent("stress_level", {
            question_text: block.text,
            question_id: block.id,
            response: [reply],
            event_id: generateEventId({
              eventName: "stress_level",
              phone: phone,
            }),
          });
        }

        setIsLoading(false);
      } else {
        setError(_res?.data?.message || "An error occurred");
        setIsLoading(false);
      }
    }
  };

  const handleOptionClick = (selectedValue) => {
    setReply(selectedValue);

    // Store values in localStorage if needed
    if (block.id === "gender") {
      window.localStorage.setItem("gender", selectedValue);
    }

    if (block.id === "user_age" && selectedValue) {
      window.localStorage.setItem("age", selectedValue);
    }

    // Submit the form immediately for all questions - no need for NEXT button
    _submitReply(selectedValue);

    // Clear any previous errors
    setError("");
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="flex flex-col mt-8 sm:mt-8 w-full max-w-3xl mx-auto gap-[16px] md:gap-[16px] xs:gap-[8px]">
        <label
          className="font-sophiaPro font-[400] text-[44px] xs:text-[28px] md:text-[44px] text-Text/Heading-Text italic -tracking-[2%] text-center"
          htmlFor={block.id}
        >
          {isHindi ? block.hindi_text : block.text}
        </label>

        {block.sub_text && (
          <label className="text-Text/Label font-sophiaPro font-[400] text-[14px] text-center">
            {block.sub_text}
          </label>
        )}

        <div className="flex flex-wrap justify-center sm:justify-center gap-[16px] md:gap-[16px] xs:gap-[8px] mt-[16px] md:mt-[16px] xs:mt-[8px] w-full ">
          {block.optionMap?.map((option) => {
            return (
              <div
                key={option.value}
                className={`
                  cursor-pointer rounded-[16px] w-[302px]   flex justify-center items-center ${
                    block.optionMap?.length > 3
                      ? "md:w-[302px]"
                      : "md:w-[412px]"
                  } xs:w-full transition-all duration-200 py-[16px] px-[24px] md:px-[24px] xs:px-[16px]  hover:border-Primary/500
                  border-[1px] h-auto md:h-[96px]
                  ${
                    reply === option.value
                      ? "border-Primary/500 bg-Primary/50"
                      : "border-Elements/Divider-Stroke bg-[#FFFFFF]"
                  }
                `}
                onClick={() => handleOptionClick(option.value)}
              >
                <div className="flex items-center md:flex-row  xs:flex-col gap-[4px]">
                  <div className="flex flex-col flex-grow gap-[4px]">
                    <h3 className="text-[16px] font-sophiaPro font-[500] leading-[150%] text-Text/Heading-Text text-center md:text-cente items-center -tracking-[1%]">
                      {option.name}
                    </h3>
                    {option.sub_text && (
                      <p className="text-[14px] font-sophiaPro font-[400] leading-[140%] text-Text/Label text-center md:text-center ">
                        {option.sub_text}
                      </p>
                    )}
                    {block.id === "pimples_frequency" &&
                      option.name === "Once a month" &&
                      gender === "F" && (
                        <p className="text-[14px] font-sophiaPro font-[400] leading-[140%] text-Text/Label text-center md:text-center ">
                          Aligned with my menstrual cycle
                        </p>
                      )}
                  </div>
                </div>
                <input
                  type="radio"
                  id={`${block.id}_${option.value}`}
                  name={block.id}
                  value={option.value}
                  checked={reply === option.value}
                  onChange={() => {}}
                  className="sr-only"
                />
              </div>
            );
          })}
        </div>
        {block?.whyWeAsk?.show && (
          <div className="flex justify-center mt-2 mb-24 md:hidden">
            <button
              className="font-sophiaPro font-[500] text-[14px] py-[8px] px-[16px] border-[1px] border-Elements/Divider-Stroke rounded-[1000px]  text-white leading-[24px] -tracking-[2%] flex gap-[4px] items-center bg-Primary/500 cursor-pointer hover:bg-white hover:text-black hover:border-black "
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              type="button"
            >
              <Image
                src={isHovered ? infoCircleBlack : infoCircle}
                width={20}
                height={20}
                alt="Info"
              />
              Learn More
            </button>
            <Modal
              open={openModal}
              setOpen={setModalOpen}
              content={block?.whyWeAsk}
            />
          </div>
        )}

        {error && (
          <span className="block mt-4 text-red-500 text-center font-sophiaPro text-[14px]">
            {error}
          </span>
        )}

        {block?.whyWeAsk?.show && (
          <div className="fixed bottom-0 left-0 pb-8 pt-4 ps-[24px] z-20 flex md:flex xs:hidden">
            <button
              className="font-sophiaPro font-[500] text-[14px] py-[8px] px-[16px] border-[1px] border-Elements/Divider-Stroke  rounded-[1000px]  text-white leading-[24px] -tracking-[2%] flex gap-[4px] items-center bg-Primary/500 cursor-pointer hover:bg-white hover:text-black hover:border-black  "
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              type="button"
            >
              {/* Replace with your actual image import */}
              <Image
                src={isHovered ? infoCircleBlack : infoCircle}
                width={20}
                height={20}
                alt="Info"
              />
              Learn More
            </button>
            <Modal
              open={openModal}
              setOpen={setModalOpen}
              content={block?.whyWeAsk}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SingleSelect;
