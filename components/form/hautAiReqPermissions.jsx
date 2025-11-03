"use client";
import { Button } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import InstructionOne from "@assets/images/haut-instructions-1.png";
import InstructionTwo from "@assets/images/haut-instructions-2.png";
import InstructionThree from "@assets/images/haut-instructions-3.png";
import { HiArrowRight } from "react-icons/hi";
import { MdLockPerson } from "react-icons/md";

const instructions = [
  {
    id: 1,
    text: "Hold Phone in front of your face",
    image: InstructionOne,
  },
  {
    id: 2,
    text: "Remove glasses & makeup",
    image: InstructionTwo,
  },
  {
    id: 3,
    text: "Fit your face inside the oval",
    image: InstructionThree,
  },
];

const triggers = [
  { id: 1, label: "Stress" },
  { id: 2, label: "Hormones" },
  { id: 3, label: "Liver" },
  { id: 4, label: "Sleep" },
  { id: 5, label: "Toxins" },
  { id: 6, label: "Diet" },
  { id: 7, label: "Gut" },
  { id: 8, label: "Metabolism" },
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

  // Handle transitions - COMMENTED OUT FOR NOW
  // useEffect(() => {
  //   if (!isFirstStep && internalStep === "1/2") {
  //     const transitionTimer = setTimeout(() => {
  //       setInternalStep("2/2");
  //     }, 10);
  //     return () => clearTimeout(transitionTimer);
  //   } else if (isFirstStep) {
  //     setInternalStep("1/2");
  //   }
  // }, [isFirstStep, internalStep]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onContinue?.();
  //   }, 10000);

  //   return () => clearTimeout(timer);
  // }, [internalStep, onContinue]);

  // Always show first step only
  const showFirstFocused = true; // internalStep === "1/2";

  return (
    <div className="relative w-full h-screen flex flex-col bg-white overflow-hidden">
      {/* Step Headers */}
      <div className="flex items-center justify-center bg-white mt-5">
        <div className="text-center relative w-full">
          {/* Step 1 */}
          <div className="transition-all duration-1000 ease-in-out">
            <h1 className="text-[28px] md:text-[40px] font-normal flex items-center justify-center text-center transition-colors duration-700 text-black">
              {/* <span className="text-[16px] md:text-[24px] mr-2 font-light font-sophiaPro transition-all duration-700 text-blue-500">
                1/2
              </span> */}
              <span>
                Take a Photo
                <br className="block md:hidden" />
                <span className="hidden md:inline"> </span>
                for AI Skin Diagnosis
              </span>
            </h1>
          </div>

          {/* Step 2 - COMMENTED OUT */}
          {/* <div className="mt-2">
            <p
              className={`text-[24px] md:text-[24px] font-normal leading-relaxed flex items-center justify-center ${
                !showFirstFocused ? "text-black" : "text-gray-300 text-sm"
              }`}
            >
              <span
                className={`text-[16px] md:text-[24px] mr-2 font-light font-sophiaPro transition-all duration-700 ${
                  !showFirstFocused ? "text-blue-500" : "text-gray-300 text-sm"
                }`}
              >
                2/2
              </span>
              Acne Trigger Analysis
            </p>
          </div> */}
        </div>
      </div>

      {/* Always show Step 1/2 content only */}
      {/* Step 1/2: Instructions Screen */}
      <div className="w-full max-w-xl mx-auto px-4 py-6 flex-1 overflow-y-auto pb-32">
        <div className="space-y-4 mb-2">
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
      
      {/* Step 2/2: Acne Trigger Analysis Screen - COMMENTED OUT */}
      {/* {!showFirstFocused && (
        <div className="w-full max-w-xl mx-auto px-4 mt-2 flex-1 overflow-y-auto pb-32">
          <h2 className="text-xs font-light text-center my-6 text-[#727678]">
            ANSWER A FEW MORE QUESTIONS, TO HELP US DECODE YOUR TRIGGERS
          </h2>
          <div className="flex justify-center flex-wrap gap-3 mb-8 text-center">
            {triggers.map((trigger) => (
              <TriggerButton key={trigger.id} label={trigger.label} />
            ))}
          </div>
        </div>
      )} */}

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 flex justify-center">
        <Button
          type="primary"
          className="max-w-xl bg-blue-600 hover:bg-blue-700 text-white font-normal rounded-full h-12 px-16 flex items-center justify-center gap-2"
          onClick={onContinue}
        >
          <span className="flex items-center gap-2">
            Take a Photo
            <HiArrowRight size={20} className="mt-[1px]" />
          </span>
        </Button>
      </div>
    </div>
  );
}

function InstructionCard({ text, image }) {
  return (
    <div className="flex items-center gap-4 bg-Secondary/100 overflow-hidden border border-Grey/300 rounded-[4px]">
      <div className="relative w-[120px] h-[90px] flex-shrink-0">
        <Image
          src={image}
          alt={text}
          fill
          className="object-cover"
          sizes="200px"
        />
      </div>
      <div className="w-full">
        <p className="text-[#2D3436] text-[18px] font-normal leading-snug font-sophiaPro">
          {text}
        </p>
      </div>
    </div>
  );
}

function TriggerButton({ label }) {
  return (
    <div className="underline text-lg font-normal text-[#727678] animate-pulse-fast">
      {label}
    </div>
  );
}

function SecurityBadge() {
  return (
    <div className="flex items-center justify-center gap-3 text-[#636E72] mt-5">
      <MdLockPerson size={20} />
      <div className="flex items-center gap-2 text-xs">
        <span className="font-normal">Secure Photo</span>
        <span className="text-[#B2BEC3]">|</span>
        <span>Privacy Protected</span>
      </div>
    </div>
  );
}
