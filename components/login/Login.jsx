"use client"
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
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
import { Alert, message } from "antd";

const LoginPage = ({ searchParams, closeModal, phone, tid }) => {
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
  const pathname = usePathname();
  const [pendingRedirect, setPendingRedirect] = useState(null);
  const [signInLoader, setSignInLoader] = useState(false);
  const [iscomingFromResultPage, setIsComingFromResultPage] = useState(false);

  useEffect(() => {
    if (pendingRedirect && pathname === pendingRedirect) {
      closeModal?.();
      setPendingRedirect(null);
    }
  }, [pathname, pendingRedirect, closeModal]);



  useEffect(() => {
    if (typeof window !== undefined && phone) {
      setPhoneInput(phone);
      setApiError("Looks like you've already placed an order. Please login to know more details.")
      setIsCustomer(true);
    }

    if(pathname.includes('/result')) setIsComingFromResultPage(true);
  }, [])

  useEffect(() => {
    if (verifySuccess) {
      message.success({
        content: 'Login Successful',
        duration: 3,
        style: {
          marginTop: '20px',
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
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= 10) {
      setPhoneInput(value);
      setApiError(null); // clear error while typing
    }
  };

  const isValidIndianPhone = (phone) => {
    // Must be exactly 10 digits, starting with 6-9
    const regex = /^[6-9]\d{9}$/;
    // Reject repetitive digits (e.g., 0000000000, 1111111111)
    const allSameDigits = /^(\d)\1{9}$/;
    return regex.test(phone) && !allSameDigits.test(phone);
  };


  const handleContinue = async () => {
    if (!isValidIndianPhone(phoneInput)
      || phoneInput.length < 10) {
      setApiError("Please enter a valid 10-digit mobile number.");
      return;
    }
    else {
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

    setSignInLoader(true);
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
        const { access_token, access_token_expires_in, user } = data;
        localStorage.setItem('user_details', JSON.stringify(user));
        login(
          {
            userId: user.id,
            ...user,
          },
          access_token,
          access_token_expires_in
        );

        const targetUrl = isCustomer
          ? `/book-a-call?caseId=${transactionId}`
          : iscomingFromResultPage ? `/result?tid=${tid}&userId=${user.id}` : "/";

        setPendingRedirect(targetUrl);

        setTimeout(() => {
          router.push(targetUrl);
          setSignInLoader(false);
          setVerifySuccess(true);
        }, 3000);

      } else {
        setOtpError(true);
        setApiError("");
        setSignInLoader(false);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError(true);
      setApiError("Network error. Please verify OTP.");
      setSignInLoader(false);
    }
  };




  return (
    <>
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center z-50 font-sophiaPro transition-all duration-500 ease-in-out ${animate ? "bg-opacity-50" : "bg-opacity-0"
          }`}
      >
        <div
          className={`flex md:flex-row flex-col items-center bg-[#0F1B28] rounded-[5px] p-[16px] gap-[16px] ${showOtp
            ? "md:w-auto w-[338px]  h-fit"
            : "md:w-auto w-[328px] h-fit"
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
                className=" object-cover"
              />
            </div>
            <div>
              <p className="font-[400] leading-[140%] text-white text-[14px] text-left">
                Targeted Acne Care, Visible Results.
              </p>
            </div>
          </div>
          <div
            className={`bg-white p-[24px] rounded-[8px] shadow-xl w-full max-w-[360px] min-h-[300px] h-full  relative transition-all duration-700 delay-300 ${animate
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
              }`}
          >{signInLoader ?
            <div className="flex items-center justify-center gap-4 h-full w-full min-w-[250px] md:min-w-[300px] min-h-[300px]">
              <div className="animate-spin rounded-full h-6 w-6 border-x-2 border-b-2 border-[#0F1B28]" />
              <p className="text-[#0F1B28] text-[14px] md:text-[18px] font-[400]">
                Signing you in!
              </p>
            </div>

            :
            <>
              <button
                onClick={closeModal}
                className="absolute md:right-[-3rem] right-[0rem] md:top-[-1rem] top-[-9rem] transform transition-transform duration-300 hover:scale-110"
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
                <div className="">

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
                      className={`w-full pl-10 p-[16px] h-[64px] rounded-[12px]  border-[1px] border-[#E3E3E2] focus:outline-none 
                     focus:ring-[#3B52F5] focus:border-[#3B52F5] focus:ring-[1px] transition-all duration-300
                     ${apiError ? "border-[#EC5B4B]" : "border-[#E3E3E2]"}`}
                      placeholder="Enter Phone Number"
                      inputMode="numeric"
                      value={phoneInput}
                      onChange={handlePhoneChange}
                    />

                  </div>
                  {apiError && (
                    <div className="-mt-2 mb-4 text-[#EC5B4B] text-sm text-left">
                      {apiError}
                    </div>
                  )}

                  <div
                    className={`mb-4 transition-all duration-700 delay-500 ${animate
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                      }`}
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-[18px] h-[18px] rounded-[100px] border-gray-300  focus:ring-[#3B52F5] cursor-pointer accent-[#3B52F5] "
                        defaultChecked
                      />
                      <span className="text-[14px] font-[400] text-[#505354]">
                        Notify me with offers & updates
                      </span>
                    </label>
                  </div>
                  <LoginButton
                    onClick={handleContinue}
                    children={isLoading ? "Sending..." : "Continue"}
                    disabled={isLoading}
                  />
                  <LoginFooter textLink1={"/privacy-policy"} textLink2={"/terms-conditions"} />
                </div>
              )}
            </>
            }
          </div>

        </div>
        {verifySuccess && <Alert type="success" message="Login Successful" />}
      </div>
    </>
  );
};

export default LoginPage;