"use client";
import instructionsForUsage from "@assets/images/how-to-use-haut-ai.png";
import { Button } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

const instructions = [
  {
    id: 1,
    text: "Hold Phone in front of your face",
    image: instructionsForUsage,
  },
  {
    id: 2,
    text: "Remove glasses & hair from forehead",
    image: instructionsForUsage,
  },
  {
    id: 3,
    text: "Remove glasses & hair from forehead",
    image: instructionsForUsage,
  },
];

const triggers = [
  { id: 1, label: "Stress" },
  { id: 2, label: "Hormones" },
  { id: 3, label: "Microbiome" },
  { id: 4, label: "Lifestyle" },
  { id: 5, label: "Immune function" },
  { id: 6, label: "Metabolism" }
];

export default function HautAiReqPermissions({ onContinue, step = "1/2" }) {
  const isFirstStep = step === "1/2";
  const [internalStep, setInternalStep] = useState("1/2");

  // Disable scroll globally
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // Handle transitions
  useEffect(() => {
    if (!isFirstStep && internalStep === "1/2") {
      const transitionTimer = setTimeout(() => {
        setInternalStep("2/2");
      }, 10);
      return () => clearTimeout(transitionTimer);
    } else if (isFirstStep) {
      setInternalStep("1/2");
    }
  }, [isFirstStep, internalStep]);

  const showFirstFocused = internalStep === "1/2";

  return (
    <div className="relative w-full h-screen flex flex-col bg-white overflow-hidden">
      {/* Step Headers */}
      <div className="flex items-center justify-center bg-white mt-5">
        <div className="text-center relative w-full">
          {/* Step 1 */}
          <div
            className={`transition-all duration-1000 ease-in-out`}
          >
            <h1
              className={`text-[24px] md:text-[40px] font-normal flex items-center justify-center transition-colors duration-700 ${
                showFirstFocused ? "text-black" : "text-gray-300 text-sm"
              }`}
            >
              <span
                className={`text-[16px] md:text-[24px] mr-2 font-bold transition-all duration-700 ${
                  showFirstFocused ? "text-blue-500" : "text-gray-300 text-sm"
                }`}
              >
                1/2
              </span>
              AI Skin Scan
            </h1>
          </div>

          {/* Step 2 */}
          <div
            className={``}
          >
            <p
              className={`text-[24px] md:text-[24px] font-normal leading-relaxed flex items-center justify-center ${
                !showFirstFocused ? "text-black" : "text-gray-300 text-sm"
              }`}
            >
              <span
                className={`text-[16px] md:text-[24px] mr-2 font-bold transition-all duration-700 ${
                  !showFirstFocused ? "text-blue-500" : "text-gray-300 text-sm"
                }`}
              >
                2/2
              </span>
              Acne Trigger Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Conditional Content Based on Step */}
      {showFirstFocused ? (
        // Step 1/2: Instructions Screen
        <div className="w-full max-w-xl mx-auto px-4 py-8 flex-1 overflow-y-auto pb-32">
          <div className="space-y-1 mb-8">
            {instructions.map((instruction) => (
              <InstructionCard
                key={instruction.id}
                text={instruction.text}
                image={instruction.image}
              />
            ))}
          </div>
          <SecurityBadge />
        </div>
      ) : (
        // Step 2/2: Acne Trigger Analysis Screen
        <div className="w-full max-w-xl mx-auto px-4 mt-2 flex-1 overflow-y-auto pb-32">
          <h2 className="text-2xl font-light text-center mb-6">Find your</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {triggers.map((trigger) => (
              <TriggerButton key={trigger.id} label={trigger.label} />
            ))}
          </div>
        </div>
      )}

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          type="primary"
          size="large"
          className="w-full max-w-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-12"
          onClick={onContinue}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}

function InstructionCard({ text, image }) {
  return (
    <div className="flex items-center gap-4 bg-[#FFF5F5] border border-red-50 overflow-hidden p-2 rounded-lg">
      <div className="relative w-[160px] h-[80px] flex-shrink-0">
        <Image
          src={image}
          alt={text}
          fill
          className="object-scale-down"
          sizes="190px"
        />
      </div>
      <div className="flex-1 pr-6">
        <p className="text-[#2D3436] text-sm font-medium leading-snug">
          {text}
        </p>
      </div>
    </div>
  );
}

function TriggerButton({ label }) {
  return (
    <div className="py-2 px-6 border border-Secondary/500 bg-Secondary/100 text-lg font-medium text-gray-800">
      {label}
    </div>
  );
}

function SecurityBadge() {
  return (
    <div className="flex items-center justify-center gap-3 text-[#636E72] mt-6">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="flex-shrink-0"
      >
        <path
          d="M12 2L4 6V12C4 16.55 7.16 20.74 12 22C16.84 20.74 20 16.55 20 12V6L12 2Z"
          fill="#636E72"
        />
        <path
          d="M12 7C10.9 7 10 7.9 10 9V11C9.45 11 9 11.45 9 12V15C9 15.55 9.45 16 10 16H14C14.55 16 15 15.55 15 15V12C15 11.45 14.55 11 14 11V9C14 7.9 13.1 7 12 7ZM12 8C12.55 8 13 8.45 13 9V11H11V9C11 8.45 11.45 8 12 8Z"
          fill="white"
        />
      </svg>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold">Secure Photo</span>
        <span className="text-[#B2BEC3]">|</span>
        <span>Privacy Protected</span>
      </div>
    </div>
  );
}