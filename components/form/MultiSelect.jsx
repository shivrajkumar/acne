import { useContext, useEffect, useState } from "react";
import useFormSubmit from "../../hooks/useFormSubmit";
import { TRANSACTION_API } from "@/constants/urls";
import { fetchRequest } from "../../helpers/fetchRequest";
import Image from "next/image";
import { Modal } from "./modal";
import infoCircle from "@assets/icons/info-circle.png";
import Loader from "../generic/Loader";
import { formFillStatus } from "@/enums/QuestionEnums";
import infoCircleBlack from "@assets/icons/info-circle-black.png";
import { logGtmEvent } from "../generic/Gtm";
import { trackMoEngageEvent } from "@/utils/moegage";
import { generateEventId } from "@/helpers/metaCapiHelper";
import { CiCircleInfo } from "react-icons/ci";
import { MdInfo } from "react-icons/md";

const MultiSelect = ({ block, context }) => {
  const {
    apiResponse: { transactionId, caseId, syntheticId },
    isHindi,
    setAllQuestionsFilled,
  } = useContext(context);

  const handleSubmit = useFormSubmit(context);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [openModal, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Import the cookie library if not already imported
  // import Cookies from 'js-cookie';

  useEffect(() => {
    if (block) {
      // Initialize selected options from block.reply
      if (Array.isArray(block.reply)) {
        setSelectedOptions(block.reply);
      } else if (block.reply) {
        setSelectedOptions([block.reply]);
      } else {
        setSelectedOptions([]);
      }
    }
  }, [block]);

  const _submitReply = async () => {
    setIsLoading(true);
    let _res = "";

    try {
      const _formData = {
        question_id: block.id,
        field_key: block.id,
        question_text: block.text,
        response: selectedOptions,
        status:
          block.id == "pimples_location" && block.next == "end"
            ? formFillStatus.FILLED
            : formFillStatus.DRAFT,
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
      setError(error?.message || "An error occurred");
      setIsLoading(false);
      return;
    }

    if (_res.status === 200) {
      await handleSubmit(selectedOptions);
      setSelectedOptions([]);
      const phone = window.localStorage.getItem("user_phone");
      if (block.id == "acne_scars") {
        logGtmEvent("Acne_Scars", {
          gender: window?.localStorage?.getItem("user_gender"),
          event_id: generateEventId({ eventName: "Acne_Scars", phone: phone }),
        });
      }

      if (block.id == "pimples_location") {
        setAllQuestionsFilled(true);
      }
      if (block.id == "digestive_issues") {
        trackMoEngageEvent("GutRootCauses", {
          syntheticId,
          caseId,
          question_text: block.text,
          question_id: block.id,
          response: selectedOptions,
          completed_timestamp: new Date().toISOString(),
        });
        logGtmEvent("gut_root_cause", {
          question_text: block.text,
          question_id: block.id,
          response: selectedOptions,
          event_id: generateEventId({
            eventName: "gut_root_cause",
            phone: phone,
          }),
        });
      }
    } else {
      setError(_res?.data?.message || "An error occurred");

      // eslint-disable-next-line no-unsafe-finally
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const handleOptionToggle = (optionValue) => {
    setSelectedOptions((prev) => {
      // Handle "none" and "whole_face" specially
      if (optionValue === "none") {
        return prev.includes("none")
          ? prev.filter((val) => val !== "none")
          : ["none"];
      }

      if (optionValue === "whole_face") {
        return prev.includes("whole_face") ? [] : ["whole_face"];
      }

      const updatedOptions = [...prev];

      // Remove "none" and "whole_face" if they exist and we're selecting another option
      if (updatedOptions.includes("none")) {
        updatedOptions.splice(updatedOptions.indexOf("none"), 1);
      }
      if (updatedOptions.includes("whole_face")) {
        updatedOptions.splice(updatedOptions.indexOf("whole_face"), 1);
      }

      // Toggle the selected option
      if (updatedOptions.includes(optionValue)) {
        return updatedOptions.filter((val) => val !== optionValue);
      } else {
        // If there's a max limit
        if (block.max && updatedOptions.length >= block.max) {
          return updatedOptions;
        }
        return [...updatedOptions, optionValue];
      }
    });

    // Clear any previous errors
    setError("");
  };

  const handleNextClick = async () => {
    if (selectedOptions.length === 0) {
      setError("Please select at least one option to continue");
      return;
    }

    // Check if selection has changed
    const originalReply = Array.isArray(block.reply)
      ? block.reply
      : block.reply
      ? [block.reply]
      : [];
    const hasChanged =
      JSON.stringify(selectedOptions.sort()) !==
      JSON.stringify(originalReply.sort());

    if (hasChanged) {
      await _submitReply();
    } else {
      // If it's the same reply, just move to the next question
      handleSubmit(selectedOptions);
    }
  };
  console.log({block})


  return (
    <>
      {isLoading && <Loader />}

      <div className="flex flex-col mt-8 sm:mt-8 w-full mx-auto gap-[16px] md:gap-[16px] xs:gap-[8px]">
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

        <div className="flex flex-wrap justify-center sm:justify-center gap-[16px] md:gap-[16px] xs:gap-[8px] mt-[16px] md:mt-[16px] xs:mt-[8px] w-full max-w-3xl mx-auto">
          {block.optionMap?.map((option) => {
            const isSelected = selectedOptions.includes(option.value);

            return (
              <div
                key={option.value}
                className={`
                flex justify-center items-center
                  cursor-pointer rounded-[16px] w-[302px] ${
                    block.id === "acne_scars"
                      ? "md:w-[412px]"
                      : block.optionMap?.length > 3
                      ? "md:w-[302px]"
                      : "md:w-[412px]"
                  }
xs:w-full transition-all duration-200 py-[16px] px-[24px] md:px-[24px] xs:px-[16px] hover:border-Primary/500
                  border-[1px]  h-[96px]
                  ${
                    isSelected
                      ? "border-Primary/500 bg-Primary/50"
                      : "border-Elements/Divider-Stroke bg-[#FFFFFF]"
                  }
                `}
                onClick={() => handleOptionToggle(option.value)}
              >
                <div className="flex items-center justify-center gap-[4px]">
                  <div className="flex flex-col flex-grow gap-[4px]">
                    <h3 className="text-[16px] font-sophiaPro font-[500] leading-[150%] text-Text/Heading-Text  -tracking-[1%] text-center">
                      {option.name}
                    </h3>
                    <p className="text-[14px] font-sophiaPro font-[400] leading-[140%] text-Text/Label text-center ">
                      {option.sub_text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {error && (
          <span className="block mt-4 text-red-500 text-center font-sophiaPro text-[14px]">
            {error}
          </span>
        )}

        {/* Mobile Learn More button */}
        {block?.whyWeAsk?.show && (
          <div className="flex justify-center mt-2 mb-16 md:hidden">
            <button
              className="font-sophiaPro font-[500] text-[14px] text-black leading-[24px] -tracking-[2%] flex gap-2 items-center cursor-pointer"
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              type="button"
            >
              <MdInfo
                className="text-white rounded-full"
                size={20}
                color="#3b52f5"
                fill="#3b52f5"
              />
              <span className="underline underline-offset-4 decoration-[#3b52f5]">
                {block?.whyWeAsk?.heading}
              </span>
            </button>
          </div>
        )}

        {/* Desktop Learn More button */}
        {block?.whyWeAsk?.show && (
          <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-20 flex hidden md:block">
            <button
              className="font-sophiaPro font-[500] text-[14px] text-black leading-[24px] -tracking-[2%] flex gap-2 items-center cursor-pointer"
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              type="button"
            >
              <MdInfo
                className="text-white rounded-full"
                size={20}
                color="#3b52f5"
                fill="#3b52f5"
              />
              <span className="underline underline-offset-4 decoration-[#3b52f5]">
                {block?.whyWeAsk?.heading}
              </span>
            </button>
          </div>
        )}

        {/* Modal component */}
        <Modal
          open={openModal}
          setOpen={setModalOpen}
          content={block?.whyWeAsk}
          enableListing={block.id === "digestive_issues"}
        />

        {/* Next button */}
        <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center pb-8 pt-4 bg-gradient-to-t from-white via-white to-transparent md:mx-0 xs:mx-4">
          <button
            type="submit"
            className={`py-4 w-full max-w-md font-[400] text-white rounded-full ${
              selectedOptions.length > 0 ? "bg-Neutral/900" : "bg-Neutral/400"
            } transition-all duration-200 shadow-sm`}
            onClick={handleNextClick}
            disabled={selectedOptions.length === 0}
          >
            NEXT
          </button>
        </div>

        {/* Add bottom padding to account for fixed button */}
        <div className="h-[25px]"></div>
      </div>
    </>
  );
};

export default MultiSelect;
