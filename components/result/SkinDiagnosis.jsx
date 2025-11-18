"use client";
import { useState, useEffect, useRef } from "react";
import { useCartContext } from "@/context/CartContext";
import { Divider } from "antd";
import { ReactSVG } from "react-svg";
import DiagnosisBottomSheet from "./DiagnosisBottomSheet";
import { trackMoEngageEvent } from "@/utils/moegage";
import { logGtmEvent } from "@/helpers/gtmHelpers";

const CircularProgress = ({ score = 0, size = 64, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2C72FE"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs md:text-[16px] font-semibold text-gray-900">
          {score || 0}
        </span>
        <Divider className="bg-black my-1" />
        <span className="text-xs md:text-[16px] text-gray-500">100</span>
      </div>
    </div>
  );
};

const DiagnosisCard = ({ data, onClick, originalImageWithoutMask }) => {
  if (!data.image) return null;

  const baseClasses =
    "bg-white flex flex-col items-center justify-between rounded-[20px] transition-all duration-300 ease-out cursor-pointer flex-shrink-0";
  const desktopClasses =
    "hidden md:flex w-[255px] h-[400px] shadow-lg hover:shadow-xl hover:-translate-y-1";
  const mobileClasses =
    "md:hidden w-[250px] h-[380px] shadow-lg transform scale-100 opacity-100";

  return (
    <>
      {/* Desktop Version */}
      <div className={`${baseClasses} ${desktopClasses}`} onClick={onClick}>
        {/* Top Image - Layered approach */}
        <div className="w-full h-[250px] rounded-t-[20px] overflow-hidden relative">
          {/* Background: Original face photo */}
          {originalImageWithoutMask && (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={originalImageWithoutMask}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Foreground: SVG mask overlay */}
          {data.image && (
            <div className="absolute inset-0 w-full h-full">
              <ReactSVG
                src={data.image}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 100%; height: 100%;");
                  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
                }}
                wrapper="div"
                className="w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between w-full p-6 flex-grow">
          <div className="flex items-center justify-between w-full">
            <div className="flex-1 mr-4">
              <p className="text-[16px] font-semibold text-gray-900 mb-2">
                {data.name}
              </p>
              {data.tag && (
                <span className="inline-block rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                  {data.tag}
                </span>
              )}
            </div>

            {/* Score Display */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              {data.name?.toLowerCase() === "pustules" ||
              data.name?.toLowerCase() === "papules" ||
              data.name?.toLowerCase() === "acne inflammation" || 
              data.name?.toLowerCase() === "post-inflammatory hyperpigmentation" ? (
                <div className="flex items-center justify-center w-[55px] h-[55px] bg-gray-100 rounded-full">
                  <span className="text-lg font-semibold text-gray-900">
                    {data.score || 0}
                  </span>
                </div>
              ) : (
                <CircularProgress
                  score={data.score}
                  size={55}
                  strokeWidth={3}
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="w-full px-6 pb-4">
          <button className="bg-blue-600 text-white px-8 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors w-full">
            Show more
          </button>
        </div>
      </div>

      {/* Mobile Version */}
      <div className={`${baseClasses} ${mobileClasses}`} onClick={onClick}>
        <div className="w-full h-[250px] rounded-t-[20px] overflow-hidden relative">
          {/* Background: Original face photo */}
          {originalImageWithoutMask && (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={originalImageWithoutMask}
                alt={data.name}
                className="w-full h-full object-cover scale-125 origin-center transition-transform duration-500"
              />
            </div>
          )}

          {/* Foreground: SVG mask overlay (scaled equally) */}
          {data.image && (
            <div className="absolute inset-0 w-full h-full scale-125 origin-center transition-transform duration-500">
              <ReactSVG
                src={data.image}
                beforeInjection={(svg) => {
                  svg.setAttribute(
                    "style",
                    "width: 100%; height: 100%; max-width: 100%; max-height: 100%;"
                  );
                  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
                }}
                wrapper="div"
                className="w-full h-full flex items-center justify-center"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between w-full p-4 flex-grow">
          <div className="flex items-center justify-between w-full">
            <div className="flex-1 mr-3">
              <p className="text-base font-semibold text-gray-900 mb-2">
                {data.name}
              </p>
              {data.severity && (
                <span className="inline-block rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                  {data.severity}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center justify-center flex-shrink-0">
              {data.name?.toLowerCase() === "pustules" ||
              data.name?.toLowerCase() === "papules" ||
              data.name?.toLowerCase() === "acne inflammation" ? (
                <div className="flex items-center justify-center w-[54px] h-[54px] bg-gray-100 rounded-full">
                  <span className="text-base font-semibold text-gray-900">
                    {data.score || 0}
                  </span>
                </div>
              ) : (
                <CircularProgress
                  score={data.score}
                  size={54}
                  strokeWidth={4}
                />
              )}
            </div>
          </div>
        </div>

        <div className="w-full px-4 pb-4">
          <button className="bg-blue-600 text-white w-full py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
            Show more
          </button>
        </div>
      </div>
    </>
  );
};

const SkinDiagnosis = ({ skinType, originalImageWithoutMask }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [scrollPercentagesTracked, setScrollPercentagesTracked] = useState(
    new Set()
  );
  const desktopScrollContainerRef = useRef(null);
  const mobileScrollContainerRef = useRef(null);
  const response = useCartContext?.()?.skinAnalysisResponse;

  useEffect(() => {
    if (response) {
      trackMoEngageEvent("hautai_metrics_displayed");
    }
  }, [response]);

  // Track scroll percentages
  useEffect(() => {
    const handleScroll = (containerRef, containerType) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;

      if (scrollWidth <= 0) return;

      const scrollPercentage = (scrollLeft / scrollWidth) * 100;

      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        const key = `${containerType}_${milestone}`;
        if (
          scrollPercentage >= milestone &&
          !scrollPercentagesTracked.has(key)
        ) {
          logGtmEvent("hautai_metrics_viewed");
          setScrollPercentagesTracked((prev) => new Set([...prev, key]));
        }
      });
    };

    const desktopScrollContainer = desktopScrollContainerRef.current;
    if (desktopScrollContainer) {
      const handleDesktopScroll = () =>
        handleScroll(desktopScrollContainerRef, "desktop");
      desktopScrollContainer.addEventListener("scroll", handleDesktopScroll);
      return () =>
        desktopScrollContainer.removeEventListener(
          "scroll",
          handleDesktopScroll
        );
    }
  }, [scrollPercentagesTracked]);

  useEffect(() => {
    const handleScroll = (containerRef, containerType) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;

      if (scrollWidth <= 0) return;

      const scrollPercentage = (scrollLeft / scrollWidth) * 100;

      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        const key = `${containerType}_${milestone}`;
        if (
          scrollPercentage >= milestone &&
          !scrollPercentagesTracked.has(key)
        ) {
          logGtmEvent("hautai_metrics_viewed");
          setScrollPercentagesTracked((prev) => new Set([...prev, key]));
        }
      });
    };

    const mobileScrollContainer = mobileScrollContainerRef.current;
    if (mobileScrollContainer) {
      const handleMobileScroll = () =>
        handleScroll(mobileScrollContainerRef, "mobile");
      mobileScrollContainer.addEventListener("scroll", handleMobileScroll);
      return () =>
        mobileScrollContainer.removeEventListener("scroll", handleMobileScroll);
    }
  }, [scrollPercentagesTracked]);

  function convertSkinAnalysisToArray(skinData) {
    if (!skinData) return [];

    // Define the desired order based on the algorithm list
    const algorithmOrder = [
      "papules", // Acne Pro Application - Papules, Pustules
      "pustules", // Acne Pro Application - Papules, Pustules
      "pigmentation", // Pigmentation Algorithm
      "pores", // Pores Algorithm
      "quality", // Quality Algorithm
      "hydration", // Hydration Algorithm
      "uniformness", // Uniformness Algorithm
      "redness", // Redness
      "inflammation", // Breakouts (Acne Inflammation)
    ];

    // Convert to array
    const dataArray = Object.entries(skinData).map(([key, value]) => ({
      id: key,
      tag: value?.tag || null,
      name: value?.name || key.charAt(0).toUpperCase() + key.slice(1),
      image: value?.image || null,
      score: value?.score || null,
      description: value?.description || null,
    }));

    // Sort according to the algorithm order
    const sortedArray = dataArray.sort((a, b) => {
      const indexA = algorithmOrder.indexOf(a.id);
      const indexB = algorithmOrder.indexOf(b.id);

      // If both items are in the order array, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If only one item is in the order array, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      // If neither is in the order array, maintain original order
      return 0;
    });

    return sortedArray;
  }

  const alteredData = convertSkinAnalysisToArray(response).filter(
    (item) => item.image
  );

  const handleThumbnailClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleCardClick = (index) => {
    logGtmEvent("hautai_metrics_viewed");

    if (index !== currentIndex) {
      handleThumbnailClick(index);
    }
    handleShowMore(alteredData[index]);
  };

  const handleShowMore = (cardData, e) => {
    e?.stopPropagation();
    setSelectedCard(cardData);
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  return (
    <>
      <div className="px-2 md:px-6 text-[24px] md:text-3xl font-normal">
        Skin Diagnosis Results
      </div>
      <div className="px-2 md:px-6 text-[14px] font-light mt-3">
        Skin Type: <span className="font-bold">{skinType}</span>
      </div>
      {/* Desktop */}
      <div className="relative hidden md:flex flex-col gap-6 items-center justify-start w-full h-full px-2 md:px-6">
        <div
          ref={desktopScrollContainerRef}
          className="flex flex-row gap-6 overflow-x-auto w-full px-4 hide-scrollbar py-5"
        >
          {alteredData.map((card, index) => (
            <DiagnosisCard
              key={index}
              data={card}
              isActive={index === currentIndex}
              onClick={() => handleCardClick(index)}
              originalImageWithoutMask={originalImageWithoutMask}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="bg-white box-border flex flex-col gap-6 items-center justify-start w-full md:hidden">
        <div className="relative overflow-hidden w-full">
          <div
            ref={mobileScrollContainerRef}
            className="overflow-x-auto hide-scrollbar"
          >
            <div className="flex gap-4 items-center py-4 ml-2">
              {alteredData.map((item, index) => (
                <div key={item.id} className="flex-shrink-0">
                  <DiagnosisCard
                    data={item}
                    position="left"
                    isActive={index === currentIndex}
                    onClick={() => handleCardClick(index)}
                    originalImageWithoutMask={originalImageWithoutMask}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DiagnosisBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        data={selectedCard}
        originalImageWithoutMask={originalImageWithoutMask}
      />
    </>
  );
};

export default SkinDiagnosis;
