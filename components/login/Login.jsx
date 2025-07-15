"use client"
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import CloseCircle from "@assets/svg/close-circle.svg";
import PhoneCall from "@assets/svg/phone.svg";
import ClearRitualWhiteLogo from "@assets/images/Clear_Ritual_Logo_Whte.png";
import OTPVerification from "./OTPVerification";
import LoginFooter from "./LoginFooter";
import LoginButton from "./LoginButton";
import { fetchRequestWithoutAuth } from "@/helpers/fetchRequest";
import { GENERATE_OTP_API, RESEND_OTP_API, VALIDATE_OTP_API } from "@/constants/urls";
import { message } from "antd";

const LoginPage = ({ closeModal }) => {
  const { login } = useAuth();
  const router = useRouter();

  const [animate, setAnimate] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(30);
  const [otpError, setOtpError] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const inputRefs = useRef([]);
  const [verifySuccess, setVerifySuccess] = useState(false)
  const [generatedOTP, setgeneratedOTP] = useState("");
  const [isCustomer, setIsCustomer] = useState(false)
  const searchParams = useSearchParams()
  const isRedirected = searchParams.get("redirectFrom")

  useEffect(() => {
    if (typeof window !== undefined && isRedirected) {
      const phone = localStorage.getItem("user_phone")?.substring(3)
      setPhoneInput(phone);
      setApiError("Looks like you've already placed an order. Please login to know more details.")
      setIsCustomer(true);
    }
  }, [])

  useEffect(() => {
    // Display success message at the top of the screen
    if (verifySuccess) {
      message.success({
        content: 'Login Successful',
        duration: 3, // 3 seconds
        style: {
          marginTop: '20px', // Optional: adds some margin from the top of the screen
        }
      });
      setVerifySuccess(false)
    }
  }, [verifySuccess]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length <= 10) {
      setPhoneInput(value);
      setApiError(null);
    }
  };

  const handleContinue = async () => {
    if (phoneInput.length === 10) {
      setIsLoading(true);
      setApiError(null);
      try {
        const res = await fetchRequestWithoutAuth(GENERATE_OTP_API(), {
          method: "POST",
          body: JSON.stringify({
            phone: `+91${phoneInput}`,
          })
        });
        if (res.status == 201) {
          const { data } = res;
          setTransactionId(data.transactionId);
          setgeneratedOTP(data.debug?.otp)
          setShowOtp(true);
          setOtp(new Array(6).fill(""));
          setOtpError(false);
          setTimeLeft(30);
        } else {
          setApiError(res.data?.message);
        }
      } catch (error) {
        console.error("Error generating OTP:", error);
        setApiError("Network error. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBackToPhone = () => {
    setShowOtp(false);
    setApiError(null);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError(false);
    setApiError(null);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setApiError(null);
    setOtpError(false);
    setOtp(new Array(6).fill(""));
    try {
      const res = await fetchRequestWithoutAuth(RESEND_OTP_API(), {
        method: "POST",
        body: JSON.stringify({
          phone: `+91${phoneInput}`,
        })
      });

      if (res.status === 201) {
        const { data } = res;
        setTransactionId(data.transactionId);
        setgeneratedOTP(data?.debug?.otp)
        setTimeLeft(30);
        setOtp(new Array(6).fill(""));
        setOtpError(false);
      } else {
        setApiError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setApiError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6 || !transactionId) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await fetchRequestWithoutAuth(VALIDATE_OTP_API(), {
        method: "POST",
        body: JSON.stringify({
          transactionId,
          token: enteredOtp,
        }),
      });
      if (res.status === 201) {
        const { data } = res;

        const {
          access_token,
          access_token_expires_in,
          user
        } = data;

        login({
          userId: user.id,
          ...user
        }, access_token, access_token_expires_in);

        if (closeModal) {
          closeModal();
        }
        setVerifySuccess(true);
        if (isCustomer) {
          router.push(`book-a-call?caseId=${transactionId}`)
        } else {
          router.push('/');// Need to redirect to post login pages
        }
      } else {
        setOtpError(true);
        setApiError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setVerifySuccess(true);
      console.error("Error verifying OTP:", error);
      setOtpError(true);
      setApiError("Network error. Please verify OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center z-50 font-sophiaPro transition-all duration-500 ease-in-out ${animate ? "bg-opacity-50" : "bg-opacity-0"
          }`}
      >
        <div
          className={`flex md:flex-row flex-col items-center bg-[#141515] rounded-[24px] p-[16px] gap-[16px] ${showOtp
            ? "md:w-auto w-[338px] md:h-[400px] h-auto"
            : "md:w-auto w-[328px] md:h-[356px] h-auto"
            }  transition-all duration-500 ease-in-out 
          ${animate
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
            }
          `}
        >
          <div
            className={`md:mx-[100px] md:my-0 mt-[18px] mb-[42px] flex flex-col md:gap-[16px] gap-[10px] transition-all duration-700 delay-200 ${animate ? "opacity-100" : "opacity-0"
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
            className={`bg-white rounded-lg shadow-xl w-full max-w-[360px]  relative transition-all duration-700 delay-300 ${animate
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
              }`}
          >
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

            {showOtp ? (
              <OTPVerification
                phoneNumber={phoneInput}
                onBack={handleBackToPhone}
                handleOtpChange={handleOtpChange}
                handleKeyDown={handleKeyDown}
                handleResend={handleResend}
                animate={animate}
                otp={otp}
                timeLeft={timeLeft}
                handleVerify={() => { handleVerify(); }}
                otpError={otpError}
                setTimeLeft={setTimeLeft}
                inputRefs={inputRefs}
                apiError={apiError}
                isLoading={isLoading}
                generatedOTP={generatedOTP}
              />
            ) : (
              <div className="md:p-6 p-[16px]">
                {apiError && (
                  <div className="mb-4 text-red-500 text-sm text-center">
                    {apiError}
                  </div>
                )}
                <div
                  className={`mb-4 relative transition-all duration-700 delay-400 ${animate
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
                    type="text"
                    className="w-full pl-10 p-[16px] h-[64px] rounded-[12px]  border-[1px] border-[#E3E3E2] focus:outline-none  focus:ring-[#237AB1] focus:border-[#237AB1] focus:ring-2 transition-all duration-300"
                    placeholder="Enter Phone Number"
                    inputMode="numeric"
                    value={phoneInput}
                    onChange={handlePhoneChange}
                  />
                </div>

                <div
                  className={`mb-4 transition-all duration-700 delay-500 ${animate
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
                <LoginButton
                  onClick={handleContinue}
                  children={isLoading ? "SENDING..." : "CONTINUE"}
                  disabled={phoneInput?.length < 10 || isLoading}
                />
                <LoginFooter textLink1={"/privacy-policy"} textLink2={"/terms-conditions"} />
              </div>
            )}
          </div>
        </div>
        {verifySuccess && <Alert type="success" message="Login Successful" />}
      </div>
    </>
  );
};

export default LoginPage;