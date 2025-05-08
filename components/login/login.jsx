import React, { useState, useEffect } from "react";
import CloseCircle from "@assets/svg/close-circle.svg";
import PhoneCall from "@assets/svg/phone.svg";
import Image from "next/image";
import ClearRitualWhiteLogo from "@assets/images/Clear_Ritual_Logo_Whte.png";
import OTPVerification from "./OTPVerification";

const LoginPage = ({ closeModal }) => {
  // Animation states
  const [animate, setAnimate] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  // Trigger animations when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handlePhoneChange = (e) => {
    setPhoneInput(e.target.value);
  };

  const handleContinue = () => {
    // Validate phone number here if needed
    setShowOtp(true);
  };

  const handleBackToPhone = () => {
    setShowOtp(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center z-50 font-lato transition-all duration-500 ease-in-out ${
          animate ? "bg-opacity-50" : "bg-opacity-0"
        }`}
      >
        {/* Modal content with animations */}
        <div
          className={`flex md:flex-row flex-col items-center bg-[#141515] rounded-[24px] p-[16px] gap-[16px] md:w-auto w-[328px] md:h-[346px] h-[462px] transition-all duration-500 ease-in-out 
          ${
            animate
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }
          `}
        >
          <div
            className={`md:mx-[100px] md:my-0 mt-[18px] mb-[42px] flex flex-col md:gap-[16px] gap-[10px] transition-all duration-700 delay-200 ${
              animate ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-[243px] h-[40px] md:w-[324px] md:h-[54px]">
              <Image
                src={ClearRitualWhiteLogo}
                alt="clearRitual"
                width={324}
                height={54}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-[400] leading-[140%] text-white text-[14px] text-center">
                Targeted Acne Care, Visible Results.
              </p>
            </div>
          </div>
          <div
            className={`bg-white rounded-lg shadow-xl w-full max-w-[360px]  relative transition-all duration-700 delay-300 ${
              animate
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            {/* Close button with hover animation */}
            <button
              onClick={closeModal}
              className="absolute md:right-[-3rem] right-[0rem] md:top-[-2rem] top-[-9rem] transform transition-transform duration-300 hover:scale-110"
            >
              <Image
                src={CloseCircle}
                alt="close"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </button>

            {/* Modal body with staggered animations */}
            {showOtp ? (
              <div>
                <OTPVerification
                  phoneNumber={phoneInput}
                  onBack={handleBackToPhone}
                />
              </div>
            ) : (
              <div className="md:p-6 p-[16px]">
                <div
                  className={`mb-4 relative transition-all duration-700 delay-400 ${
                    animate
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Image
                      src={PhoneCall}
                      alt="phoneIcon"
                      width={48}
                      height={48}
                      className="w-[48px] h-[48px] text-gray-500"
                    />
                  </div>
                  <input
                    type="tel"
                    className="w-full pl-10 p-[16px] h-[64px] rounded-[12px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Enter Phone Number"
                      inputMode="numeric"
                    value={phoneInput}
                    onChange={handlePhoneChange}
                  />
                </div>

                <div
                  className={`mb-4 transition-all duration-700 delay-500 ${
                    animate
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-[18px] h-[18px] rounded-[100px] text-[#2872A1] border-gray-300  focus:ring-blue-500 cursor-pointer"
                      defaultChecked
                    />
                    <span className="text-[14px] font-[400] text-[#505354]">
                      Notify me with offers & updates
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleContinue}
                  className={`md:w-[312px] w-[264px] justify-center items-center h-[56px] bg-[#141515] px-[56px] py-[16px] rounded-full md:my-[24px] my-[15px] text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%] transition-all duration-300 hover:bg-gray-800 hover:shadow-lg ${
                    animate
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  } transition-all duration-700 delay-600`}
                >
                  CONTINUE
                </button>

                <p
                  className={`md:text-[14px] text-[12px] text-[#505354] font-[400] leading-[140%] text-center mt-2 ${
                    animate ? "opacity-100" : "opacity-0"
                  } transition-all duration-700 delay-700`}
                >
                  I accept that I have read & understand{" "}
                  <a
                    href="#"
                    className="underline hover:text-black transition-colors duration-300"
                  >
                    Privacy & Policy
                  </a>{" "}
                  &{" "}
                  <a
                    href="#"
                    className="underline hover:text-black transition-colors duration-300"
                  >
                    T&Cs
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
