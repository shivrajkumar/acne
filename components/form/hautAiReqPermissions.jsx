"use client";

import { useEffect } from "react";

const HautAiReqPermissions = ({ onContinue }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="text-center">
        <h1 className="text-4xl md:text-[40px] font-normal text-black mb-6">
          AI-Powered Skin Scan!
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mx-auto">
          Our AI-powered scan helps provide accurate insights into your skin health.
        </p>
      </div>
    </div>
  );
};

export default HautAiReqPermissions;
