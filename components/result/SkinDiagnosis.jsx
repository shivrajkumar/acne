"use client";
import { useState } from "react";
import placeholder from "@assets/images/skin-diagnosis-placeholder.png";
import { useCartContext } from "@/context/CartContext";
import DiagnosisImage from "./DiagnosisImage";
import Image from "next/image";

const Tag = ({ severity, score }) => {
  const getSeverityLevel = (score) => {
    if (severity) return severity;

    if (typeof score === "number") {
      if (score === 0) return "None";
      if (score <= 10) return "Mild";
      if (score <= 30) return "Moderate";
      return "Severe";
    }

    return "Unknown";
  };

  const severityLevel = getSeverityLevel(score);

  const getTagColor = (level) => {
    switch (level.toLowerCase()) {
      case "none":
        return "bg-green-100 text-green-800";
      case "mild":
        return "bg-yellow-100 text-yellow-800";
      case "moderate":
        return "bg-orange-100 text-orange-800";
      case "severe":
        return "bg-red-100 text-red-800";
      default:
        return "bg-[#fbf1a6] text-[#0f1b28]";
    }
  };

  return (
    <div
      className={`${getTagColor(
        severityLevel
      )} box-border flex gap-2.5 items-center justify-center px-2 py-1 shrink-0 rounded-md`}
    >
      <div className="flex flex-col font-['Sofia_Pro',sans-serif] justify-center leading-[1.4] not-italic shrink-0 text-[12px] whitespace-nowrap font-medium">
        {severityLevel}
      </div>
    </div>
  );
};

const DiagnosisCard = ({ data, position, isActive, onClick }) => {
  const getCardStyles = () => {
    const baseTransition =
      "transition-all duration-300 ease-out cursor-pointer";
    switch (position) {
      case "left":
        return `absolute bg-[#f7f5ee] flex flex-col items-center justify-start left-[-0.33px] rounded-[16px] top-[25px] w-[442.667px] md:block hidden ${baseTransition} hover:shadow-lg hover:-translate-y-1`;
      case "center":
        return `absolute bg-[#f7f5ee] flex flex-col h-[582px] items-center justify-start left-[458.67px] rounded-[16px] top-0 w-[458px] md:flex hidden md:h-[582px] md:left-[458.67px] md:w-[458px] md:top-0 ${baseTransition} shadow-xl scale-105`;
      case "right":
        return `absolute bg-[#f7f5ee] flex flex-col items-center justify-start left-[932.67px] rounded-[16px] top-[25px] w-[442.667px] md:block hidden ${baseTransition} hover:shadow-lg hover:-translate-y-1`;
      default:
        return "hidden";
    }
  };

  const getMobileCardStyles = () => {
    const baseClasses =
      "bg-[#f7f5ee] flex flex-col items-center justify-start rounded-[16px] w-60 md:hidden transition-all duration-300 ease-out cursor-pointer";
    return isActive
      ? `${baseClasses} shadow-lg transform scale-100 opacity-100`
      : `${baseClasses} opacity-60 transform scale-95 hover:opacity-80`;
  };

  if (!data.image) return null;

  return (
    <>
      {/* Desktop version */}
      <div className={getCardStyles()} onClick={onClick}>
        <iframe
          src={data.image}
          alt={data.name || "Diagnosis"}
          width={458}
          height={367}
          className="h-[367px] w-full object-cover rounded-[12px]"
        />
        <div className="box-border flex flex-col gap-6 items-start justify-start p-4 w-full shrink-0">
          <div className="flex flex-col gap-2 items-start justify-center w-full shrink-0">
            <div className="flex flex-col font-['Sofia_Pro',sans-serif] justify-center leading-[1.3] min-w-full not-italic shrink-0 text-[#0f1b28] text-[28px] tracking-[0.5px]">
              {data.name}
            </div>
            <Tag severity={data.severity} score={data.score} />
          </div>
          <button
            className="bg-black box-border flex gap-2 h-12 items-center justify-center px-8 py-0 rounded-[40px] shrink-0 w-full cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
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
      <div className={getMobileCardStyles()} onClick={onClick}>
        <iframe
          src={data.image}
          alt={data.name || "Diagnosis"}
          width={458}
          height={367}
          className="h-[250px] w-full object-cover rounded-[12px]"
        />
        <div className="box-border flex flex-col gap-2 items-start justify-start p-4 w-full shrink-0">
          <div className="flex flex-col font-['Sofia_Pro',sans-serif] justify-center leading-[1.3] min-w-full not-italic shrink-0 text-[#0f1b28] text-[20px] tracking-[0.5px]">
            {data.name}
          </div>
          <Tag severity={data.severity} score={data.score} />
          <button
            className="bg-black box-border flex gap-2 h-10 items-center justify-center px-6 py-0 rounded-[40px] shrink-0 w-full cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-10 items-center justify-start shrink-0">
              <div className="flex flex-col font-['Figtree',sans-serif] font-medium justify-center shrink-0 text-[12px] text-white whitespace-pre leading-normal">
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

const SkinDiagnosis = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const response = useCartContext?.()?.skinAnalysisResponse;

  function convertSkinAnalysisToArray(skinData) {
    if (!skinData) return [];
    return Object.entries(skinData).map(([key, value]) => ({
      id: key,
      tag: value?.tag || null,
      name: value?.name || key.charAt(0).toUpperCase() + key.slice(1),
      image: value?.image || null,
      score: value?.score || null,
    }));
  }

  const alteredData = convertSkinAnalysisToArray(response).filter(
    (item) => item.image
  ); // ✅ Filter out items without images globally

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? alteredData.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === alteredData.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleThumbnailClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleCardClick = (index) => {
    if (index !== currentIndex) {
      handleThumbnailClick(index);
    }
  };

  const getVisibleCards = () => {
    if (alteredData.length === 1)
      return [{ data: alteredData[0], position: "center", index: 0 }];
    const prevIndex =
      currentIndex === 0 ? alteredData.length - 1 : currentIndex - 1;
    const nextIndex =
      currentIndex === alteredData.length - 1 ? 0 : currentIndex + 1;
    return [
      { data: alteredData[prevIndex], position: "left", index: prevIndex },
      {
        data: alteredData[currentIndex],
        position: "center",
        index: currentIndex,
      },
      { data: alteredData[nextIndex], position: "right", index: nextIndex },
    ];
  };

  return (
    <>
      <div className="font-sophiaPro text-[24px] md:text-[40px] tracking-[0.5px] leading-[1.3]">
        Skin Diagnosis
      </div>

      {/* Desktop */}
      <div className="relative hidden md:flex flex-col gap-6 items-center justify-start w-full h-full">
        <div className="relative w-[1375.33px] h-[582px]">
          {/* Previous Button */}
          {alteredData.length > 1 && (
            <button
              onClick={handlePrevious}
              disabled={isAnimating}
              className={`absolute left-0 top-1/2 -translate-y-1/2 bg-[#3b52f5] flex items-center justify-center rounded-[40px] w-14 h-14 cursor-pointer hover:bg-[#2a3eb5] shadow-lg transition-all duration-200 z-10 ${
                isAnimating ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
          )}

          {/* Main Cards Display */}
          {getVisibleCards().map((card, index) => (
            <DiagnosisCard
              key={card.data.id}
              data={card.data}
              position={card.position}
              isActive={card.position === "center"}
              onClick={() => handleCardClick(card.index)}
            />
          ))}

          {/* Next Button */}
          {alteredData.length > 1 && (
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className={`absolute right-0 top-1/2 -translate-y-1/2 bg-[#3b52f5] flex items-center justify-center rounded-[40px] w-14 h-14 cursor-pointer hover:bg-[#2a3eb5] shadow-lg transition-all duration-200 z-10 ${
                isAnimating ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
          )}
        </div>

        {/* Thumbnails */}
        {alteredData.length > 1 && (
          <div className="flex gap-2 items-start justify-start shrink-0 mt-16">
            {alteredData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleThumbnailClick(index)}
                disabled={isAnimating}
                className={`
            relative h-[72px] w-20 shrink-0 rounded overflow-hidden
            cursor-pointer transition-all duration-300 hover:scale-105
            ${
              index === currentIndex
                ? "border-2 border-[#3b52f5] opacity-100 shadow-lg transform scale-110"
                : `border border-gray-300 opacity-60 hover:opacity-80 ${
                    isAnimating ? "cursor-not-allowed" : ""
                  }`
            }
          `}
                aria-label={`View ${item.name} diagnosis`}
              >
                <iframe
                  className="w-full h-full border-none pointer-events-none rounded"
                  src={item.image}
                  title={`${item.name} diagnosis thumbnail`}
                  loading="lazy"
                  sandbox="allow-same-origin"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="bg-white box-border flex flex-col gap-6 items-center justify-start w-full md:hidden">
        {/* Main Carousel Display */}
        <div className="relative overflow-hidden w-full">
          <div
            className={`flex gap-4 items-center transition-transform ${
              isAnimating ? "duration-300" : "duration-200"
            } ease-out`}
            style={{
              transform: `translateX(calc(40vw - 128px - ${
                currentIndex * 256
              }px))`,
            }}
          >
            {alteredData.map((item, index) => (
              <div key={item.id} className="flex-shrink-0">
                <DiagnosisCard
                  data={item}
                  position="left"
                  isActive={index === currentIndex}
                  onClick={() => handleCardClick(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Scrollable Thumbnails */}
        {alteredData.length > 1 && (
          <div className="w-full">
            <div
              className="flex gap-2 items-start justify-start overflow-x-auto px-4 pb-2 scrollbar-none"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {alteredData.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={`
              relative mt-10 h-[80px] w-[60px] flex-shrink-0 rounded overflow-hidden
              cursor-pointer transition-all duration-300 
              hover:scale-105 active:scale-95
              ${
                index === currentIndex
                  ? "border-2 border-blue-500 opacity-100 shadow-lg scale-110"
                  : `bg-gray-200 opacity-70 hover:opacity-90 border border-gray-300 ${
                      isAnimating ? "cursor-not-allowed" : ""
                    }`
              }
            `}
                  role="button"
                  tabIndex={0}
                  aria-label={`View item ${index + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (!isAnimating) {
                        handleThumbnailClick(index);
                      }
                    }
                  }}
                >
                  <iframe
                    src={item.image}
                    className="w-full h-full border-none pointer-events-none"
                    loading="lazy"
                    title={`Thumbnail ${index + 1}`}
                    sandbox="allow-same-origin"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none rounded-[4px]"
                  />
                </div>
              ))}

              {/* End spacing for comfortable scrolling */}
              <div className="w-4 flex-shrink-0" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SkinDiagnosis;
