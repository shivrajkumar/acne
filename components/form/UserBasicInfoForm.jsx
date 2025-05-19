"use client";

import { useState, useEffect, useContext } from "react";
import { QuestionsContext } from "@/context/questions-store";
import { fetchRequest } from "@/helpers/fetchRequest";
import Cookies from "js-cookie";
import Loader from "../generic/Loader";
import isEmpty from "lodash/isEmpty";
import { INGESTION_API, TRANSACTION_API } from "@/constants/urls";
import { COOKIES_DOMAIN } from "@/constants/config";
import { COOKIES_EXPIRY } from "@/constants/constants";
import maleIcon from "@assets/icons/MaleIcon.png";
import femaleIcon from "@assets/icons/FemaleIcon.png";
import Image from "next/image";
import { getUtmCookiesInObjectForm } from "../../constants/urls";
import moengage from "@moengage/web-sdk";
import {
  callAfterMoegageIsLoaded,
  trackMoEngageEvent,
} from "../../utils/moegage";
import { metaCapi } from "@/helpers/metaCapiHelper";
import { getCookieValue } from "@/helpers/cookieHelper";
import { pixelCustomeEvent } from "../generic/Pixel";
import { logGtmEvent } from "../generic/Gtm";

export default function UserBasicInfoForm() {
  const {
    saveReply,
    nextQuestion,
    byId,
    saveGenderReply,
    currentQuestion,
    saveApiResponse,
    queryStrings: { utmData, cohort },
  } = useContext(QuestionsContext);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    age: null,
    gender: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    age: "",
    gender: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData({
        fullName: window.localStorage.getItem("user_first_name"),
        phoneNumber: window.localStorage.getItem("user_phone")?.substring(3),
        age: window.localStorage.getItem("user_age"),
        gender: window.localStorage.getItem("user_gender"),
      });

      // Validate loaded data
      const loadedPhoneNumber = window.localStorage
        .getItem("user_phone")
        ?.substring(3);
      const loadedAge = window.localStorage.getItem("user_age");

      if (loadedPhoneNumber) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: validatePhoneNumber(loadedPhoneNumber),
        }));
      }

      if (loadedAge) {
        setErrors((prev) => ({ ...prev, age: validateAge(loadedAge) }));
      }
    }
  }, []);

  // Sync with context data if available
  useEffect(() => {
    if (byId["first_name"] && byId["first_name"].reply) {
      setFormData((prev) => ({ ...prev, fullName: byId["first_name"].reply }));
    }
    if (byId["phone"] && byId["phone"].reply) {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: byId["phone"].reply,
      }));
    }
    if (byId["age"] && byId["age"].reply) {
      setFormData((prev) => ({ ...prev, age: byId["age"].reply }));
    }
    if (byId["gender"] && byId["gender"].reply) {
      setFormData((prev) => ({ ...prev, gender: byId["gender"].reply }));
    }
  }, [byId]);

  const validatePhoneNumber = (value) => {
    // Check if it's exactly 10 digits
    if (!/^\d{10}$/.test(value)) {
      return "Phone number must be exactly 10 digits";
    }
    // Convert to a number for range checking
    const numValue = parseInt(value, 10);

    // Check if the number is in the valid range (6000000000 to 9999999999)
    if (numValue < 6000000000 || numValue > 9999999999) {
      return "Please enter a valid mobile number";
    }

    return "";
  };

  const validateAge = (value) => {
    const age = Number(value);
    if (isNaN(age)) {
      return "Age must be a number";
    }
    if (age <= 0) {
      return "Age must be greater than 0";
    }
    if (age >= 100) {
      return "Age must be less than 100";
    }
    return "";
  };

  const validateFullName = (value) => {
    if (!value || value.trim() === "") {
      return "Full name is required";
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(value.trim())) {
      return "Please enter valid name";
    }
    return "";
  };

  const validateGender = (value) => {
    if (!value) {
      return "Please select a gender";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate fields
    if (name === "phoneNumber") {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: validatePhoneNumber(value),
      }));
    } else if (name === "age") {
      setErrors((prev) => ({
        ...prev,
        age: validateAge(value),
      }));
    } else if (name === "fullName") {
      setErrors((prev) => ({
        ...prev,
        fullName: validateFullName(value),
      }));
    }
  };

  const handleGenderSelect = (gender) => {
    setFormData((prevData) => ({
      ...prevData,
      gender,
    }));

    setErrors((prev) => ({
      ...prev,
      gender: "",
    }));
  };

  const submitUTMData = async (transactionId) => {
    let res = {};

    try {
      for (let key in utmData) {
        const _formData = {
          question_id: key,
          question: key,
          response: utmData[key],
          form_status: "In-Progress",
          locationPath: window.location.pathname + window.location.search,
          formFillSource: "website",
        };

        const _requestOptions = {
          method: "PUT",
          body: JSON.stringify(_formData),
        };

        res = await fetchRequest(
          TRANSACTION_API(transactionId),
          _requestOptions
        );
      }
    } catch (error) {
      console.warn(error.message);
    } finally {
      // No return statement in finally
    }

    // Return after the finally block
    return res;
  };

  const _submitBasicInfo = async () => {
    let _res = null;
    let hasError = false;

    try {
      const _form = [];
      var _user = {
        first_name: formData.fullName,
        phone_number: `+91${formData.phoneNumber}`,
        age: Number(formData.age),
        gender: formData.gender,
        email:
          window.localStorage.getItem("user_email") ??
          `${formData.phoneNumber}.unknown@traya.health`,
      };

      if (cohort) {
        _form.push({
          question_id: "cohort",
          question: "cohort",
          response: cohort,
          form_status: "In-Progress",
        });
      }

      const _bodyData = {
        user: _user,
        source: "website",
        location_path: window.location.pathname,
        form: _form,
      };
      const _requestOptions = {
        method: "POST",
        body: JSON.stringify(_bodyData),
      };

      _res = await fetchRequest(INGESTION_API(), _requestOptions);

      if (_res && _res.status === 200) {
        saveApiResponse(_res.data);

        // Save data to localStorage
        window.localStorage.setItem("form_status", "draft");
        window.localStorage.setItem("user_first_name", _user.first_name);
        window.localStorage.setItem("user_phone", _user.phone_number);
        window.localStorage.setItem("user_age", formData.age);
        window.localStorage.setItem("user_gender", formData.gender);
        window.localStorage.setItem(
          "user_email",
          `${formData.phoneNumber}.unknown@traya.health`
        );

        // Set cookies
        Cookies.set("Transaction_ID", _res.data.transactionId, {
          domain: COOKIES_DOMAIN,
          expires: COOKIES_EXPIRY,
        });
        window.localStorage.setItem("user_tid", _res.data.transactionId);

        if (_res.data.syntheticId) {
          Cookies.set("Synthetic_ID", _res.data.syntheticId, {
            domain: COOKIES_DOMAIN,
            expires: COOKIES_EXPIRY,
          });
        }

        Cookies.set("form_status", "draft", {
          domain: COOKIES_DOMAIN,
          expires: COOKIES_EXPIRY,
        });
        window.localStorage.setItem("form_status", "draft");

        return _res.data.transactionId;
      }

      if (_res && _res.status === 500) {
        setErrors((prev) => ({
          ...prev,
          general: _res.data.message,
        }));
        return null;
      }

      if (_res && _res.data && _res.data.message) {
        setErrors((prev) => ({
          ...prev,
          general: _res.data.message,
        }));
      }
    } catch (error) {
      console.warn(error.message);
      hasError = true;
    } finally {
      const eventAttributes = {
        session_id: _res.data.syntheticId,
        case_id: _res.data.caseId,
        timestamp: new Date().toISOString(),
      };
      trackMoEngageEvent("FormStarted", {
        ...getUtmCookiesInObjectForm(),
        ...eventAttributes,
      });
      callAfterMoegageIsLoaded(() => {
        moengage.update_unique_user_id(_res?.data?.caseId);
        moengage.add_first_name(formData.fullName);
        moengage.add_gender(formData.gender);
        moengage.add_mobile(`+91${formData.phone}`);
        moengage.add_user_attribute("synthetic_id", _res.data.syntheticId);
        moengage.add_user_attribute("case_id", _res?.data?.caseId);
      });
      logGtmEvent("Contact", {
        name: formData.fullName,
        phone_number: `+91${formData.phone}`,
        gender: formData.gender,
        age: formData?.age,
      });
      pixelCustomeEvent("Contact", { gender: formData.gender });
      const cookies = document.cookie.split(";");
      const fbp = getCookieValue("_fbp", cookies);
      const fbc = getCookieValue("_fbc", cookies);
      const capiBody = {
        email:
          window.localStorage.getItem("user_email") ??
          `${formData.phoneNumber}.unknown@traya.health`,
        phone:
          window.localStorage.getItem("user_phone") ?? `+91${formData.phone}`,
        fbc: fbc,
        fbp: fbp,
        url: window.location.href,
        gender: formData.gender,
      };
      metaCapi(capiBody, "Form Start");
    }

    // Process results after the finally block
    if (hasError) {
      return null;
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
    const ageError = validateAge(formData.age);
    const fullNameError = validateFullName(formData.fullName);
    const genderError = validateGender(formData.gender);

    if (phoneNumberError || ageError || fullNameError || genderError) {
      setErrors({
        phoneNumber: phoneNumberError,
        age: ageError,
        fullName: fullNameError,
        gender: genderError,
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem("basic_information", JSON.stringify(formData));

    // Begin API submission
    setIsLoading(true);

    const transactionId = await _submitBasicInfo();

    if (!isEmpty(transactionId) && !isEmpty(utmData)) {
      await submitUTMData(transactionId);
    }

    setIsLoading(false);

    if (isEmpty(transactionId)) {
      return; // Stop if submission failed
    }

    // Save to context
    if (byId["first_name"]) {
      saveReply("first_name", formData.fullName);
    }

    if (byId["phone"]) {
      saveReply("phone", `+91${formData.phoneNumber}`);
    }

    if (byId["age"]) {
      saveReply("age", formData.age);
    }

    if (byId["gender"]) {
      saveGenderReply("gender", formData.gender);
    }

    // Important: Save the reply for the current question (user_basic_info) and move to next question
    if (currentQuestion && currentQuestion.id === "user_basic_info") {
      saveReply("user_basic_info", "completed");

      // Move to next question - this is key to navigation
      nextQuestion("user_basic_info", "completed");
      const url = new URL(window.location.href);
      url.searchParams.set("tid", transactionId);
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Check if form is valid and complete for enabling the submit button
  const isFormValid =
    formData.fullName?.trim() !== "" &&
    formData.phoneNumber?.trim() !== "" &&
    formData.age !== null &&
    formData.age !== "" &&
    formData.gender !== null &&
    formData.gender !== "" &&
    !errors.phoneNumber &&
    !errors.age &&
    !errors.gender;
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {isLoading && <Loader />}
      <div className="w-full ">
        <>
          <h1 className="font-lato font-[400] xl:text-[44px] text-[28px] text-Text/Heading-Text italic -tracking-[2%] text-center">
            Tell Us About Yourself
          </h1>
          <p className="text-Text/Label font-lato font-[400] text-[14px] text-center my-[16px]  ">
            We start by collecting your details to create a unique ID for your
            skin.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[24px] pt-0 lg:pt-6"
          >
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full lg:h-[72px] py-[16px] ps-[24px] pr-[4px] border-[1px] border-Elements/Divider-Stroke rounded-[16px] outline-none focus:outline-none"
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full py-[16px] lg:h-[72px] ps-[24px] pr-[4px] border-[1px] ${
                  errors.phoneNumber
                    ? "border-red-500"
                    : "border-Elements/Divider-Stroke"
                } rounded-[16px] outline-none focus:outline-none`}
                maxLength={10}
                pattern="[0-9]{10}"
                required
                onWheel={(e) => e.target.blur()}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
                placeholder="Age"
                className={`w-full py-[16px] lg:h-[72px] ps-[24px] pr-[4px] border-[1px] ${
                  errors.age
                    ? "border-red-500"
                    : "border-Elements/Divider-Stroke"
                } rounded-[16px] outline-none focus:outline-none`}
                min="1"
                max="99"
                required
                onWheel={(e) => e.target.blur()}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            <div className="flex space-x-4 items-center">
              <button
                type="button"
                className={`flex-1 border rounded-[16px] lg:h-[72px] py-[16px] px-[24px] ${
                  formData.gender === "M"
                    ? "bg-Primary/50 border-[#237AB1]"
                    : "bg-[#FFFFFF]"
                }`}
                onClick={() => handleGenderSelect("M")}
              >
                <div className="flex items-center space-x-2 justify-center ">
                  <Image src={maleIcon} width={24} height={24} alt="Icon" />
                  <span className="text-[16px] font-[500]">Male</span>
                </div>
              </button>

              <button
                type="button"
                className={`flex-1 border lg:h-[72px] border-Elements/Divider-Stroke rounded-[16px] py-[16px] px-[24px] ${
                  formData.gender === "F"
                    ? "bg-Primary/50 border-[#237AB1]"
                    : "bg-[#FFFFFF]"
                }`}
                onClick={() => handleGenderSelect("F")}
              >
                <div className="flex items-center space-x-2 justify-center">
                  <Image src={femaleIcon} width={24} height={24} alt="Icon" />
                  <span className="text-[16px] font-[500]">Female</span>
                </div>
              </button>
            </div>
            <div className="md:mt-1 xl:mt-[-0.75rem] lg:mt-4">
              <h2 class="text-gray-400 xs:text-xs lg:text-sm font-modernity py-2 px-1   md:mb-0 mb-2 text-center">
                *Your contact details will be used by Clear Ritual's Skin Expert
                to reach out to you via call/sms/whatsapp
              </h2>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm text-center">
                {errors.gender}
              </p>
            )}

            {errors.general && (
              <p className="text-red-500 text-sm text-center">
                {errors.general}
              </p>
            )}
            <div className="fixed bottom-0 left-0 right-0 z-10  flex justify-center pb-8 pt-4 bg-gradient-to-t from-white via-white to-transparent md:mx-0 xs:mx-4">
              <button
                type="submit"
                className={`w-full max-w-md py-[16px] px-[56px] font-[600] text-[14px] text-Neutral/100 rounded-full font-lato ${
                  isFormValid ? "bg-Neutral/900" : "bg-Neutral/400"
                }`}
                disabled={!isFormValid}
              >
                NEXT
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}
