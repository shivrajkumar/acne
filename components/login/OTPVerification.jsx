import React, { useEffect } from "react";
import editIcon from "@assets/svg/edit.svg";
import refreshButton from "@assets/svg/refresh.svg";
import blackRefreshButton from "@assets/svg/blackRefresh.svg";
import Image from "next/image";
import LoginFooter from "./LoginFooter";
import LoginButton from "./LoginButton";

const OTPVerification = ({
  phoneNumber,
  onBack,
  handleOtpChange,
  handleKeyDown,
  handleResend,
  animate,
  otp,
  timeLeft,
  handleVerify,
  otpError,
  setTimeLeft,
  inputRefs,
  apiError,
  isLoading,
  generatedOTP
}) => {
  useEffect(() => {
    // Focus on first input field when OTP screen appears
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="md:p-6 p-[16px]">
      <div
        className={`relative transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        <h2 className="text-[28px] text-[#141515] leading-[130%] font-[400] text-center">
          OTP Verification
        </h2>
        <p className="text-center text-[#141515] text-[18px] leading-[135%] mt-2">
          +91 {phoneNumber}
          <button
            onClick={onBack}
            className="text-[#141515] ml-3 text-[14px] leading-[24px] font-[400]"
          >
            <div className="flex items-center gap-1">
              <Image
                src={editIcon}
                alt="editIcon"
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
              <span className="mt-[2px]">EDIT</span>
            </div>
          </button>
        </p>

        {/* API Error Message */}
        {apiError && (
          <div className="text-center text-red-500 text-sm mb-4">
            {apiError}
          </div>
        )}

        {/* OTP Inputs */}
        <div className="flex justify-center gap-[10px] mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`md:w-[49px] md:h-[54px] w-[37px] h-[44px] text-center text-[16px] font-[400] text-[#141515] leading-[24px] rounded-[12px] border-[1px] outline-none transition-all ${otpError
                ? "border-[#B3261E] ring-1 ring-[#B3261E] text-[#B3261E]"
                : "border-[#E3E3E2] focus:border-[#237AB1] focus:border-[3px] focus:ring-[#237AB1]"
                }`}
            />
          ))}
        </div>

        {/* OTP Error Message */}
        {otpError && (
          <p className="text-left text-sm text-[#B3261E] mt-2">
            OTP entered is invalid. Please try again.
          </p>
        )}

        {/* Resend Timer */}
        <div className="mt-2 flex justify-center items-center">
          {timeLeft > 0 ? (
            <div className="flex justify-center items-center uppercase leading-[24px] font-[400] text-[#969B9D] text-[14px]">
              <Image
                src={refreshButton}
                alt="refreshIcon"
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
              <p>RESEND OTP IN {timeLeft} SEC</p>
            </div>
          ) : (
            <button
              onClick={handleResend}
              className="uppercase leading-[24px] font-[400] text-[#141515] text-[14px] flex justify-center items-center"
            >
              <Image
                src={blackRefreshButton}
                alt="blackRefreshIcon"
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
              <p className="ml-1">RESEND OTP</p>
            </button>
          )}
        </div>
        <p className="text-center">
          OTP Only for Development
          <p className="text-[#414042] text-md font-bold mt-2 text-center">
            OTP: {generatedOTP}
          </p>
        </p>


        <LoginButton
          onClick={() => { handleVerify(); }}
          children={isLoading ? "VERIFYING..." : "VERIFY"}
          // disabled={!isOtpComplete || otpError || isLoading}
          variant={!isOtpComplete || otpError || isLoading ? "disabled" : "black"}
        />

        <div className="flex md:hidden">
          <LoginFooter textLink1={"/privacy-policy"} textLink2={"/terms-conditions"} />
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;