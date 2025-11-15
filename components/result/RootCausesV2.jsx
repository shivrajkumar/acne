"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { startCase } from "lodash";
import { useCartContext } from "../../context/CartContext";

// SVG imports (make sure these exist in @assets/svg/)
import StressIcon from "@assets/svg/stress_active.svg";
import ToxinsIcon from "@assets/svg/toxin_active.svg";
import LiverIcon from "@assets/svg/liver_active.svg";
import HormoneIcon from "@assets/svg/hormone_active.svg";
import GutIcon from "@assets/svg/gut_active.svg";

// Helper function to get root cause icon
const rootCausesIcons = (rootcauses) => {
  const rootcauseName = rootcauses?.toLowerCase();
  switch (rootcauseName) {
    case "stress":
      return StressIcon;
    case "liver":
      return LiverIcon;
    case "toxins":
      return ToxinsIcon;
    case "hormone":
      return HormoneIcon;
    case "gut":
      return GutIcon;
    default:
      return GutIcon;
  }
};

const RootCausesV2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { rootCausesDetails: rootCauses } = useCartContext();

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!rootCauses) return null;

  return (
    <div className="w-full">
      <RootCauseIconComponent
        rootCauseInfo={rootCauses}
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        isMobile={isMobile}
      />
    </div>
  );
};

const RootCauseIconComponent = ({
  rootCauseInfo,
  setActiveIndex,
  activeIndex,
  isMobile,
}) => {
  const scrollContainerRef = useRef(null);
  const isUserScrolling = useRef(false);
  const isProgrammaticScroll = useRef(false);

  // Auto-scroll active item into view (mobile)
  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      isProgrammaticScroll.current = true;
      const scrollContainer = scrollContainerRef.current;
      const activeItem = scrollContainer.children[activeIndex];

      if (activeItem) {
        const containerWidth = scrollContainer.offsetWidth;
        const itemWidth = activeItem.offsetWidth;
        const scrollLeft =
          activeItem.offsetLeft - containerWidth / 2 + itemWidth / 2;

        scrollContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });

        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 500);
      }
    }
  }, [activeIndex, isMobile]);

  // Scroll event handler
  const handleScroll = () => {
    if (
      isMobile &&
      scrollContainerRef.current &&
      !isProgrammaticScroll.current &&
      isUserScrolling.current
    ) {
      const scrollContainer = scrollContainerRef.current;
      const containerWidth = scrollContainer.offsetWidth;
      const scrollPosition = scrollContainer.scrollLeft;
      const itemWidth = containerWidth / 3;

      const newIndex = Math.min(
        Math.floor((scrollPosition + itemWidth / 2) / itemWidth),
        rootCauseInfo.length - 1
      );

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="bg-[#FEF0E4] rounded-[16px] p-[16px] relative h-[270px] md:h-[197px]">
      {/* Header */}
      <div className="flex items-center gap-[4px] mb-[16px]">
        <div className="bg-[#CA3936] rounded-full w-[16px] h-[16px] flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">!</span>
        </div>
        <span className="text-[#CA3936] text-[12px] font-sophiaPro font-[400]">
          Your Root Causes Need Extra Support
        </span>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="bg-[rgba(0,0,0,0.08)] rounded-[16px]">
          <div
            className={`flex items-center ${
              rootCauseInfo.length === 1 ? "justify-start" : "justify-between"
            }`}
          >
            {rootCauseInfo.map((cause, index) => (
              <div
                key={cause?.name}
                className={`flex flex-col gap-[4px] items-center justify-center cursor-pointer px-[24px] py-[8px] rounded-[16px] transition-all ${
                  rootCauseInfo.length === 1 ? "flex-shrink-0" : "flex-1"
                } ${
                  index === activeIndex
                    ? "bg-[#FEEADB] border border-[#CA3936]"
                    : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <Image
                    src={rootCausesIcons(cause?.name)}
                    alt={cause?.name}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] object-contain"
                    style={{
                      filter: index === activeIndex ? "none" : "opacity(0.6)",
                    }}
                  />
                </div>
                <div
                  className={`text-[14px] font-sophiaPro font-[400] ${
                    index === activeIndex ? "text-[#CA3936]" : "text-[#505354]"
                  }`}
                >
                  {startCase(cause?.name)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-[8px]">
          <p className="font-sophiaPro font-[400] text-[#313233] text-[14px] leading-[1.5]">
            {rootCauseInfo[activeIndex]?.description}
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Carousel cards */}
        <div className="bg-[rgba(0,0,0,0.08)] rounded-[16px]">
          <div
            ref={scrollContainerRef}
            className="flex items-center overflow-x-scroll hide-scrollbar gap-2"
            onScroll={handleScroll}
            onTouchStart={() => (isUserScrolling.current = true)}
            onTouchEnd={() => (isUserScrolling.current = false)}
          >
            {rootCauseInfo.map((cause, index) => (
              <div
                key={cause?.name}
                className={`flex flex-col gap-2 items-center justify-center cursor-pointer px-6 py-2 rounded-[16px] flex-shrink-0 transition-all ${
                  index === activeIndex
                    ? "bg-[#FEEADB] border border-[#CA3936]"
                    : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <Image
                    src={rootCausesIcons(cause?.name)}
                    alt={cause?.name}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] object-contain"
                    style={{
                      filter: index === activeIndex ? "none" : "opacity(0.6)",
                    }}
                  />
                </div>

                <span
                  className={`text-[14px] font-sophiaPro font-[400] text-center ${
                    index === activeIndex ? "text-[#CA3936]" : "text-[#505354]"
                  }`}
                >
                  {startCase(cause?.name)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-[6px]">
          {rootCauseInfo.map((_, index) => {
            let classes = "transition-all duration-300";

            if (index === activeIndex) {
              // Active: wide pill
              classes += " w-[16px] h-[3px] rounded-[3px] bg-[#313233]";
            } else if (
              index === activeIndex - 1 ||
              index === activeIndex - 2 ||
              index === activeIndex + 1 ||
              index === activeIndex + 2
            ) {
              // Two adjacent circles on each side: active color
              classes += " w-[6px] h-[6px] rounded-full bg-[#313233]";
            } else {
              // Farthest or others: small grey
              classes += " w-[4px] h-[4px] rounded-full bg-[#D0D0D0]";
            }

            return <div key={index} className={classes}></div>;
          })}
        </div>

        {/* Description */}
        <p className="font-sophiaPro font-[400] text-[#313233] text-[14px] leading-[1.5]">
          {rootCauseInfo[activeIndex]?.description}
        </p>
      </div>
    </div>
  );
};

export default RootCausesV2;
