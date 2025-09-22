"use client";
import { useState } from "react";
import Image from "next/image";
import placeholder from "@assets/images/skin-diagnosis-placeholder.png";

// Sample data - replace with actual data
const diagnosisData = [
  { id: 1, condition: "Acne-1", severity: "Moderate-first", image: placeholder },
  { id: 2, condition: "Acne-2", severity: "Severe", image: placeholder },
  { id: 3, condition: "Acne-3", severity: "Mild", image: placeholder },
  { id: 4, condition: "Acne-4", severity: "Moderate-last", image: placeholder },
];

const Tag = ({ severity }) => {
  return (
    <div className="bg-[#fbf1a6] box-border flex gap-2.5 items-center justify-center px-1 py-0.5 shrink-0">
      <div className="flex flex-col font-['Sofia_Pro',sans-serif] justify-center leading-[1.4] not-italic shrink-0 text-[#0f1b28] text-[12px] whitespace-nowrap">
        {severity}
      </div>
    </div>
  );
};

const DiagnosisCard = ({ data, position, isActive }) => {
  const getCardStyles = () => {
    const baseClasses = "absolute bg-[#f7f5ee] flex flex-col items-center justify-start rounded-[16px]";
    const animationClasses = "transition-all duration-500 ease-in-out transform";
    
    switch (position) {
      case "left":
        return `${baseClasses} ${animationClasses} left-[-0.33px] top-[25px] w-[442.667px] md:block hidden opacity-80 scale-95`;
      case "center":
        return `${baseClasses} ${animationClasses} h-[582px] left-[458.67px] top-0 w-[458px] md:flex hidden md:h-[582px] md:left-[458.67px] md:w-[458px] md:top-0 opacity-100 scale-100 shadow-lg z-10`;
      case "right":
        return `${baseClasses} ${animationClasses} left-[932.67px] top-[25px] w-[442.667px] md:block hidden opacity-80 scale-95`;
      default:
        return "hidden";
    }
  };

  const getMobileCardStyles = () => {
    const baseClasses = "bg-[#f7f5ee] flex flex-col items-center justify-start rounded-[16px] w-60 md:hidden transition-all duration-300 ease-out";
    if (isActive) {
      return `${baseClasses} shadow-lg transform scale-100 opacity-100`;
    } else {
      return `${baseClasses} opacity-60 transform scale-95 hover:opacity-80`;
    }
  };

  return (
    <>
      {/* Desktop version */}
      <div className={getCardStyles()}>
        <div
          className="bg-center bg-cover bg-no-repeat h-[367px] rounded-[12px] shrink-0 w-full"
          style={{ backgroundImage: `url(${data.image.src})` }}
        />
        <div className="box-border flex flex-col gap-6 items-start justify-start p-4 w-full shrink-0">
          <div className="flex flex-col gap-1 items-start justify-center w-full shrink-0">
            <div className="flex flex-col font-['Sofia_Pro',sans-serif] justify-center leading-[1.3] min-w-full not-italic shrink-0 text-[#0f1b28] text-[28px] tracking-[0.5px]">
              {data.condition}
            </div>
            <Tag severity={data.severity} />
          </div>
          <button className="bg-black box-border flex gap-2 h-12 items-center justify-center px-8 py-0 rounded-[40px] shrink-0 w-full cursor-pointer hover:bg-gray-800 transition-colors">
            <div className="flex h-12 items-center justify-start shrink-0">
              <div className="flex flex-col font-['Figtree',sans-serif] font-medium justify-center shrink-0 text-[14px] text-white whitespace-pre leading-normal">
                Detailed Insights
              </div>
            </div>
            <div className="overflow-hidden relative shrink-0 w-5 h-5">
              <svg
                width="15"
                height="13.3"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 1L14 7L8.5 13M13 7H1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile version */}
      <div className={getMobileCardStyles()}>
        <div
          className="aspect-[822/736] bg-center bg-cover bg-no-repeat rounded-[12px] shrink-0 w-full"
          style={{ backgroundImage: `url(${data.image.src})` }}
        />
        <div className="box-border flex flex-col gap-2 items-start justify-start p-4 w-full shrink-0">
          <div className="flex flex-col font-['Sofia_Pro',sans-serif] justify-center leading-[1.3] min-w-full not-italic shrink-0 text-[#0f1b28] text-[24px] tracking-[0.5px]">
            {data.condition}
          </div>
          <Tag severity={data.severity} />
          <button className="bg-black box-border flex gap-2 h-10 items-center justify-center px-6 py-0 rounded-[40px] shrink-0 w-full cursor-pointer hover:bg-gray-800 transition-colors">
            <div className="flex h-10 items-center justify-start shrink-0">
              <div className="flex flex-col font-['Figtree',sans-serif] font-medium justify-center shrink-0 text-[14px] text-white whitespace-pre leading-normal">
                Detailed Insights
              </div>
            </div>
            <div className="overflow-hidden relative shrink-0 w-5 h-5">
              <svg
                width="15"
                height="13.3"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 1L14 7L8.5 13M13 7H1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

const SkinDiagnosis = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("");

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("left");
    setCurrentIndex((prev) =>
      prev === 0 ? diagnosisData.length - 1 : prev - 1
    );
    setTimeout(() => {
      setIsAnimating(false);
      setDirection("");
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("right");
    setCurrentIndex((prev) =>
      prev === diagnosisData.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => {
      setIsAnimating(false);
      setDirection("");
    }, 500);
  };

  const handleThumbnailClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
      setDirection("");
    }, 500);
  };

  const getVisibleCards = () => {
    const prevIndex =
      currentIndex === 0 ? diagnosisData.length - 1 : currentIndex - 1;
    const nextIndex =
      currentIndex === diagnosisData.length - 1 ? 0 : currentIndex + 1;

    return [
      { data: diagnosisData[prevIndex], position: "left" },
      { data: diagnosisData[currentIndex], position: "center" },
      { data: diagnosisData[nextIndex], position: "right" },
    ];
  };


  return (
    <>
      {/* Title - responsive */}
      <div className="font-sophiaPro text-[24px] md:text-[40px] tracking-[0.5px] leading-[1.3]">
        Skin Diagnosis
      </div>
      
      {/* Desktop Layout */}
      <div className="relative hidden md:flex flex-col gap-6 items-center justify-start w-full h-full">
        {/* Desktop Carousel container */}
        <div className="relative w-[1375.33px] h-[582px]">
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            disabled={isAnimating}
            className={`absolute left-0 top-1/2 -translate-y-1/2 bg-[#3b52f5] box-border flex gap-2 items-center justify-center rounded-[40px] shadow-[0px_4px_14px_0px_rgba(0,0,0,0.45)] w-14 h-14 cursor-pointer hover:bg-[#2a3eb5] transition-colors z-20 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous diagnosis"
          >
            <svg
              width="18"
              height="16"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 1L1 7L6.5 13M2 7H14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Desktop Cards */}
          {getVisibleCards().map((card, index) => (
            <DiagnosisCard
              key={`desktop-${card.position}-${card.data.id}`}
              data={card.data}
              position={card.position}
              isActive={card.position === "center"}
            />
          ))}

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className={`absolute right-0 top-1/2 -translate-y-1/2 bg-[#3b52f5] box-border flex gap-2 items-center justify-center rounded-[40px] shadow-[0px_4px_14px_0px_rgba(0,0,0,0.45)] w-14 h-14 cursor-pointer hover:bg-[#2a3eb5] transition-colors z-20 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next diagnosis"
          >
            <svg
              width="18"
              height="16"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 1L14 7L8.5 13M13 7H1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Thumbnails */}
        <div className="flex gap-2 items-start justify-start shrink-0 mt-16">
          {diagnosisData.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleThumbnailClick(index)}
              disabled={isAnimating}
              className={`h-[72px] rounded w-20 shrink-0 cursor-pointer transition-all duration-300 ${
                index === currentIndex
                  ? "border-2 border-[#3b52f5] opacity-100"
                  : `border opacity-60 hover:opacity-80 ${isAnimating ? 'cursor-not-allowed' : ''}`
              }`}
            >
              <Image
                className="block max-w-none w-full h-full object-cover rounded"
                width={80}
                height={72}
                sizes="100vw"
                alt={`${item.condition} diagnosis`}
                src={item.image}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="bg-white box-border flex flex-col gap-6 items-center justify-start w-full md:hidden">
        {/* Mobile Cards Container */}
        <div className="relative overflow-hidden w-full">
          <div 
            className={`flex gap-4 items-center transition-transform ${isAnimating ? 'duration-300' : 'duration-200'} ease-out`}
            style={{ 
              transform: `translateX(calc(40vw - 128px - ${currentIndex * 256}px))`,
            }}
          >
            {diagnosisData.map((item, index) => (
              <div key={`mobile-card-${item.id}`} className="flex-shrink-0">
                <DiagnosisCard
                  data={item}
                  position="left"
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Thumbnails */}
        <div className="flex gap-2 items-start justify-start shrink-0">
          {diagnosisData.map((item, index) => (
            <button
              key={`mobile-thumb-${item.id}`}
              onClick={() => handleThumbnailClick(index)}
              disabled={isAnimating}
              className={`h-[54px] rounded w-[60px] shrink-0 cursor-pointer transition-all duration-300 bg-center bg-cover bg-no-repeat ${
                index === currentIndex
                  ? "border border-[rgba(0,0,0,0.38)] opacity-100"
                  : `bg-[#00000033] opacity-60 hover:opacity-80 ${isAnimating ? 'cursor-not-allowed' : ''}`
              }`}
              style={{ backgroundImage: `url(${item.image.src})` }}
            >
              <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.38)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkinDiagnosis;
