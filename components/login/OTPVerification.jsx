import React, { useState, useEffect, useRef } from "react";

const OTPVerification = ({  phoneNumber = "7868075756", onBack }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    setOtp(["", "", "", ""]);
    setError(false);
    // Trigger resend OTP API
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp !== "1234") {
      setError(true);
    } else {
      setError(false);
      // Proceed to next step
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-center">OTP Verification</h2>
      <p className="text-center text-gray-600 text-sm">
        +91 {phoneNumber}{" "}
        <button onClick={onBack} className="text-blue-500 ml-2 underline text-sm">
          Edit
        </button>
      </p>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-3 mt-6">
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
            className={`w-12 h-12 text-center text-xl font-semibold rounded-md border-2 outline-none transition-all
              ${error ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"}
            `}
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-center text-sm text-red-600 mt-2">
          OTP entered is invalid. Please try again.
        </p>
      )}

      {/* Resend Timer */}
      <div className="text-center mt-4 text-sm text-blue-500">
        {timeLeft > 0 ? (
          <>RESEND OTP IN {timeLeft} SEC</>
        ) : (
          <button onClick={handleResend} className="underline">
            RESEND OTP
          </button>
        )}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        className="mt-6 w-full bg-black text-white py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
      >
        VERIFY
      </button>
    </div>
  );
};

export default OTPVerification;
