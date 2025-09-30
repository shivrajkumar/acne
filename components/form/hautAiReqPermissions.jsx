"use client";

import { useEffect } from "react";

const HautAiReqPermissions = ({ onContinue, step = "1/2" }) => {
  const isFirstStep = step === "1/2";
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-white">
      <div className="text-center space-y-8">
        {/* First Step - AI Skin Scan */}
        <div className={`transition-all duration-300 ${isFirstStep ? 'scale-100 opacity-100' : 'scale-90 opacity-50'}`}>
          <h1 className={`text-[24px] md:text-[40px] font-normal flex items-center justify-center ${isFirstStep ? 'text-black' : 'text-gray-400'}`}>
            <span className={`text-[16px] md:text-[24px] mr-2 ${isFirstStep ? 'text-blue-500 font-bold' : 'text-gray-400'}`}>
              1/2
            </span>
            AI Skin Scan
          </h1>
        </div>
        
        {/* Second Step - Acne Trigger Analysis */}
        <div className={`transition-all duration-300 ${!isFirstStep ? 'scale-100 opacity-100' : 'scale-90 opacity-50'}`}>
          <p className={`text-[16px] md:text-[32px] font-normal leading-relaxed mx-auto flex items-center justify-center ${!isFirstStep ? 'text-black' : 'text-gray-400'}`}>
            <span className={`text-[16px] md:text-[24px] mr-2 ${!isFirstStep ? 'text-blue-500 font-bold' : 'text-gray-400'}`}>
              2/2
            </span>
            Acne Trigger Analysis
          </p>
        </div>
      </div>
    </div>
  );
};

export default HautAiReqPermissions;