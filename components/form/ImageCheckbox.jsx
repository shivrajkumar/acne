import { useContext, useEffect, useState } from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import { TRANSACTION_API } from "@/constants/urls";
import { isNotEmptyArray } from "@/helpers/validation";
import Loader from "../generic/Loader";
import { fetchRequest } from "@/helpers/fetchRequest";
import Image from "next/image";
import { Modal } from "./modal";
import infoCircle from "@assets/icons/info-circle.png";

// Import images for pimple types
import { formFillStatus } from "@/enums/QuestionEnums";
import infoCircleBlack from "@assets/icons/info-circle-black.png";
import { logGtmEvent } from "../generic/Gtm";
import { CDN_BASE_URL } from "@/constants/constants";
import { generateEventId } from "@/helpers/metaCapiHelper";

const blackheads = `${CDN_BASE_URL}website_images/clear_rituals/landingPage/black_heads.webp`;
const whiteheads = `${CDN_BASE_URL}website_images/clear_rituals/landingPage/white_heads.webp`;
const small_bumps = `${CDN_BASE_URL}website_images/clear_rituals/landingPage/small_bumps.webp`;
const pus_filled = `${CDN_BASE_URL}website_images/clear_rituals/landingPage/pus_filled_pimples.webp`;
const boils_nodules = `${CDN_BASE_URL}website_images/clear_rituals/landingPage/big_boils.webp`;

// Function to get the image based on image_url value
const getImageForPimpleType = (imageUrl) => {
  switch (imageUrl) {
    case "blackheads":
      return blackheads;
    case "whiteheads":
      return whiteheads;
    case "small_bumps":
      return small_bumps;
    case "pus_filled":
      return pus_filled;
    case "boils_nodules":
      return boils_nodules;
    default:
      return null;
  }
};

const ImageCheckbox = ({ block, context }) => {
  const {
    apiResponse: { transactionId },
    setAllQuestionsFilled,
    isHindi,
  } = useContext(context);

  const handleSubmit = useFormSubmit(context);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [openModal, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!block) return;
    setSelectedOptions(block.reply || []);
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
          block.id == "stress_level"
            ? formFillStatus.SEMI_FILLED :
            block.id == "photo_q"
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

      if (["customer_values"].includes(block.next)) {
        window.localStorage.setItem("form_status", "semi-filled");
      }

      _res = await fetchRequest(TRANSACTION_API(transactionId), _options);
    } catch (error) {
      console.warn(error);
      setError(error?.message || "An error occurred");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    if (_res.status === 200) {
      await handleSubmit(selectedOptions);

      if (block.id === "pimples_appearance") {
        const phone = window.localStorage.getItem("user_phone");
        logGtmEvent("pimples_appearance", { question_text: block.text, question_id: block.id, response: selectedOptions, fb_external_id: generateEventId({ eventName: 'pimples_appearance', phone: phone })
      })
      }

      if (block.id == "stress_level") {
        setAllQuestionsFilled(true);
      }
    } else {
      setError(_res?.data?.message || "An error occurred");
    }
  };

  const _handleSubmit = async () => {
    const _isValid = isNotEmptyArray(selectedOptions);

    if (_isValid.hasError) {
      setError(_isValid.error);
      return;
    }

    if (JSON.stringify(block.reply) === JSON.stringify(selectedOptions)) {
      handleSubmit(selectedOptions);
      return;
    }

    await _submitReply();
  };

  const handleOptionToggle = (optionValue) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionValue)) {
        return prev.filter((value) => value !== optionValue);
      } else {
        // If there's a max limit on selections
        if (block.max && prev.length >= block.max) {
          return prev;
        }
        return [...prev, optionValue];
      }
    });

    // Clear any previous errors when a new selection is made
    setError("");
  };

  // Checkmark component
  const Checkmark = () => (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path
        d="M16.6663 5L7.49967 14.1667L3.33301 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      {isLoading && <Loader />}

      <div className="flex flex-col w-full pt-6 sm:pt-8 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <h2 className="text-[44px] md:text-[44px] xs:text-[28px] font-sophiaPro font-[400] text-Text/Heading-Text italic -tracking-[2%] text-center mb-2">
          {isHindi ? block.hindi_text : block.text}
        </h2>

        {block.sub_text && (
          <p className="text-[14px] sm:text-[16px] font-sophiaPro font-[400] text-Text/Label text-center mb-6">
            {isHindi ? block.hindi_sub_text : block.sub_text}
          </p>
        )}

        {/* Grid of options with responsive design */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {block.optionMap?.map((option) => {
            const isSelected = selectedOptions.includes(option.value);
            const pimpleImage = getImageForPimpleType(option.image_url);

            return (
              <div
                key={option.value}
                className={`
                  relative flex flex-col overflow-hidden cursor-pointer transition-all
                  rounded-[1.5rem] border-[1px] 
                  ${isSelected
                    ? "ring-1 ring-Primary/500 border-Primary/500"
                    : "border-gray-200"
                  }
                  w-[calc(50%-0.5rem)] sm:w-[190px] md:w-[220px] lg:w-[220px]
                `}
                onClick={() => handleOptionToggle(option.value)}
              >
                {/* Option header with name and checkbox */}
                <div className="flex justify-between items-center py-2 px-3 bg-white ">
                  <span className=" text-[16px] font-medium text-Text/Heading-Text leading-[1.5%] -tracking-[1%]">
                    {option.name}
                  </span>

                  {/* Checkbox */}
                  <div
                    className={`w-6 h-6 rounded-[12px] flex items-center justify-center ${isSelected
                      ? "bg-Primary/500"
                      : "border-[2px] border-Neutral/900"
                      }`}
                  >
                    {isSelected && <Checkmark />}
                  </div>
                </div>

                {/* Image */}
                <div className="w-full md:h-[220px] h-[156px]">
                  {pimpleImage ? (
                    <Image
                      src={pimpleImage}
                      alt={option.name}
                      width={220}
                      height={220}
                      className="!w-full !h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="w-full h-[180px] bg-gray-100 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mt-4 text-red-500 text-center text-[14px]">
            {error}
          </div>
        )}

        {/* Mobile Learn More button */}
        {block?.whyWeAsk?.show && (
          <div className="flex justify-center mt-10 mb-16 md:hidden">
            <button
              className="font-sophiaPro font-[500] text-[14px] py-[8px] px-[16px] border-[1px] border-Elements/Divider-Stroke rounded-[1000px]  text-white leading-[24px] -tracking-[2%] flex gap-[4px] items-center  bg-Primary/500 cursor-pointer hover:bg-white hover:text-black hover:border-black "
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              type="button"
            >
              <Image src={isHovered ? infoCircleBlack : infoCircle} width={20} height={20} alt="Info" />
              Learn More
            </button>
          </div>
        )}

        {/* Desktop Learn More button */}
        {block?.whyWeAsk?.show && (
          <div className="fixed bottom-0 left-0 pb-8 pt-4 ps-[24px] z-20 hidden md:flex">
            <button
              className="font-sophiaPro font-[500] text-[14px] py-[8px] px-[16px] border-[1px] border-Elements/Divider-Stroke rounded-[1000px]  text-white leading-[24px] -tracking-[2%] flex gap-[4px] items-center bg-Primary/500 cursor-pointer hover:bg-white hover:text-black hover:border-black "
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              type="button"
            >
              <Image src={isHovered ? infoCircleBlack : infoCircle} width={20} height={20} alt="Info" />
              Learn More
            </button>
          </div>
        )}

        {/* Modal component */}
        <Modal
          open={openModal}
          setOpen={setModalOpen}
          content={block?.whyWeAsk}
          enableListing={true}
        />

        {/* Fixed Next button at bottom of screen */}
        <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center pb-8 pt-4 md:mx-0 xs:mx-4">
          <button
            type="submit"
            className={`py-4 w-full max-w-md font-semibold text-white rounded-full ${selectedOptions?.length > 0 ? "bg-Neutral/900" : "bg-Neutral/400"
              } transition-all duration-200 shadow-sm`}
            onClick={_handleSubmit}
            disabled={selectedOptions.length === 0}
          >
            NEXT
          </button>
        </div>

        {/* Add bottom padding to account for fixed button */}
        <div className="h-[30px]"></div>
      </div>
    </>
  );
};

export default ImageCheckbox;
