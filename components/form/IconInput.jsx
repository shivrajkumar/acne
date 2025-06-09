import { useContext, useEffect, useState } from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import { TRANSACTION_API } from "@/constants/urls";
import Loader from "../generic/Loader";
import { fetchRequest } from "@/helpers/fetchRequest";
import Image from "next/image";
import { Modal } from "./modal";
import normal from "@assets/images/Normal_Skintype.png";
import combination from "@assets/images/Combination_skintype.png";
import dry from "@assets/images/Dry_skintype.png";
import oily from "@assets/images/Oily_skintype.png";
import infoCircle from "@assets/icons/info-circle.png";
import infoCircleBlack from "@assets/icons/info-circle-black.png";
import { formFillStatus } from "@/enums/QuestionEnums";

const getIconImage = (iconType) => {
  switch (iconType) {
    case "normal":
      return normal;
    case "combination":
      return combination;
    case "oily":
      return oily;
    case "dry":
      return dry;
    default:
      return null;
  }
};

const IconInput = ({ block, context }) => {
  const {
    apiResponse: { transactionId },
    isHindi,
    setAllQuestionsFilled
  } = useContext(context);

  const handleSubmit = useFormSubmit(context);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState(null);
  const [openModal, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
        field_key: block.id,
        question_text: block.text,
        response: [reply],
        status:
          block.id == "photo_q"
            ? formFillStatus.FILLED
            : formFillStatus.SEMI_FILLED,
        location_path: window.location.pathname + window.location.search,
        source: "website",
        response_type: block.type,
      };

      const _options = {
        method: "POST",
        body: JSON.stringify(_formData, block),
      };


      _res = await fetchRequest(TRANSACTION_API(transactionId), _options);
    } catch (error) {
      console.warn(error);
    } finally {
      if (_res.status === 200) {
        await handleSubmit(reply);
        setReply("");

        if (block.id == "photo_q") {
          setAllQuestionsFilled(true);
          window.localStorage.setItem("form_status", "filled");
        }
      } else {
        setError(_res?.data?.message || "An error occurred");

        // eslint-disable-next-line no-unsafe-finally
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

    // For skin_type, directly submit the reply
    if (block.id === "skin_type") {
      _submitReply(selectedValue);
    }

    // Clear any previous errors
    setError("");
  };

  const handleNextClick = async () => {
    if (!reply) {
      setError("Please select an option to continue");
      return;
    }

    // Only submit if this is a new reply or reply changed
    if (block.reply !== reply) {
      await _submitReply(reply);
    } else {
      // If it's the same reply, just move to the next question
      handleSubmit(reply);
    }
  };

  // Parse option name and description from the combined string
  const parseOptionText = (optionName) => {
    // Check if the option name contains a dash
    if (optionName.includes("-")) {
      const [name, description] = optionName
        .split("-")
        .map((item) => item.trim());
      return { name, description };
    }

    // Return the original name if no dash is found
    return { name: optionName, description: "" };
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="flex flex-col mt-8 sm:mt-8 w-full md:w-[620px] mx-auto gap-[16px] md:gap-[16px] xs:gap-[8px]">
        <label
          className="font-lato font-[400] text-[44px] xs:text-[28px] md:text-[44px] text-Text/Heading-Text italic -tracking-[2%] text-center"
          htmlFor={block.id}
        >
          {isHindi ? block.hindi_text : block.text}
        </label>

        {block.sub_text && (
          <label className="text-Text/Label font-lato font-[400] text-[14px] text-center">
            {block.sub_text}
          </label>
        )}

        <div className="flex flex-wrap justify-center sm:justify-center gap-[16px] md:gap-[16px] xs:gap-[8px] mt-[16px] md:mt-[16px] xs:mt-[8px] w-full ">
          {block.optionMap?.map((option) => {
            const { name, description } = parseOptionText(option.name);
            return (
              <div
                key={option.value}
                className={`
                  cursor-pointer rounded-[16px] w-[302px] h-auto md:h-[96px] md:w-[302px] xs:w-[156px] transition-all duration-200 py-[16px] md:py-[14px] px-[24px] md:px-[24px] xs:px-[16px]  hover:border-Primary/500
                  border-[1px] 
                  ${reply === option.value
                    ? "border-Primary/500 bg-Primary/50"
                    : "border-Elements/Divider-Stroke bg-[#FFFFFF]"
                  }
                `}
                onClick={() => handleOptionClick(option.value)}
              >
                <div className="flex items-center md:flex-row md:items-start xs:flex-col gap-[4px] ">
                  <div className="flex flex-col flex-grow gap-[4px]">
                    <h3 className="text-[16px] font-lato font-[500] leading-[150%] text-Text/Heading-Text -tracking-[1%] text-center md:text-left">
                      {name}
                    </h3>
                    <p className="text-[14px] font-lato font-[400] leading-[140%] text-Text/Label text-center md:text-left">
                      {description}
                    </p>
                  </div>

                  <div className="my-auto">
                    {option.icon && getIconImage(option.icon) && (
                      <Image
                        src={getIconImage(option.icon)}
                        alt={name}
                        width={56}
                        height={56}
                        className="max-w-full"
                      />
                    )}
                  </div>
                </div>
                <input
                  type="radio"
                  id={`${block.id}_${option.value}`}
                  name={block.id}
                  value={option.value}
                  checked={reply === option.value}
                  onChange={() => { }}
                  className="sr-only" // Visually hidden but accessible
                />
              </div>
            );
          })}
        </div>
        {block?.whyWeAsk?.show && (
          <div className="flex justify-center mt-10 mb-16 md:hidden">
            <button
              className="font-lato font-[500] text-[14px] py-[8px] px-[16px] border-[1px] border-Elements/Divider-Stroke rounded-[1000px] text-white leading-[24px] -tracking-[2%] flex gap-[4px] items-center bg-Tertiary/400 cursor-pointer hover:bg-white hover:text-black hover:border-black  "
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              type="button"
            >
              <Image src={isHovered? infoCircleBlack : infoCircle} width={20} height={20} alt="Info" />
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
          <span className="block mt-4 text-red-500 text-center font-lato text-[14px]">
            {error}
          </span>
        )}

        {block?.whyWeAsk?.show && (
          <div className="fixed bottom-0 left-0 pb-8 pt-4 ps-[24px] z-20 flex md:flex xs:hidden">
            <button
              className="font-lato font-[500] text-[14px] py-[8px] px-[16px] border-[1px] border-Elements/Divider-Stroke rounded-[1000px]  text-white leading-[24px] -tracking-[2%] flex gap-[4px] items-center bg-Tertiary/400 cursor-pointer hover:bg-white hover:text-black hover:border-black "
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              type="button"
            >
              {/* Replace with your actual image import */}
              <Image src={isHovered? infoCircleBlack : infoCircle} width={20} height={20} alt="Info" />
              Learn More
            </button>
            <Modal
              open={openModal}
              setOpen={setModalOpen}
              content={block?.whyWeAsk}
            />
          </div>
        )}
        {block.id !== "skin_type" && (
          <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center pb-8 pt-4 md:mx-0 xs:mx-4">
            <button
              type="submit"
              className={`py-4 w-full max-w-md font-semibold text-white rounded-full ${reply ? "bg-Neutral/900" : "bg-Neutral/400"
                } transition-all duration-200 shadow-sm`}
              onClick={handleNextClick}
              disabled={!reply}
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default IconInput;
