"use client";

import { useEffect, useState } from "react";

const HautAiReqPermissions = ({ onContinue, step = "1/2" }) => {
  const isFirstStep = step === "1/2";
  const [internalStep, setInternalStep] = useState("1/2");
  
  useEffect(() => {
    if (!isFirstStep && internalStep === "1/2") {
      // When step changes to 2/2, wait a moment then trigger internal transition
      const transitionTimer = setTimeout(() => {
        setInternalStep("2/2");
      }, 1000); // Show 1/2 focused for 800ms before transitioning

      return () => clearTimeout(transitionTimer);
    } else if (isFirstStep) {
      setInternalStep("1/2");
    }
  }, [isFirstStep, internalStep]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  const showFirstFocused = internalStep === "1/2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="text-center relative w-full -mt-20">
        {/* First Step - AI Skin Scan */}
        <div className={`transition-all duration-1000 ease-in-out animate-pulse-fast ${
          showFirstFocused 
            ? 'translate-y-5 scale-100 opacity-100' 
            : '-translate-y-8 scale-90 opacity-30'
        }`}>
          <h1 className={`text-[24px] md:text-[40px] font-normal flex items-center justify-center transition-colors duration-700 ${
            showFirstFocused ? 'text-black' : 'text-gray-400'
          }`}>
            <span className={`text-[16px] md:text-[24px] mr-2 font-bold transition-all duration-700 ${
              showFirstFocused 
                ? 'text-blue-500' 
                : 'text-gray-400'
            }`}>
              1/2
            </span>
            AI Skin Scan
          </h1>
        </div>
        
        {/* Second Step - Acne Trigger Analysis */}
        <div className={`transition-all duration-1000 ease-in-out ${
          !showFirstFocused 
            ? '-translate-y-8 scale-100 opacity-100 animate-pulse-fast' 
            : 'translate-y-5 scale-90 opacity-30'
        }`}>
          <p className={`text-[24px] md:text-[24px] font-normal leading-relaxed flex items-center justify-center transition-colors duration-1000 ${
            !showFirstFocused ? 'text-black' : 'text-gray-400'
          }`}>
            <span className={`text-[16px] md:text-[24px] mr-2 font-bold transition-all duration-700 ${
              !showFirstFocused 
                ? 'text-blue-500' 
                : 'text-gray-400'
            }`}>
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