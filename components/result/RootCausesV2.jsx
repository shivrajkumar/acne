import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { startCase } from "lodash";
import Information from "@assets/icons/information.png";
import { useCartContext } from '../../context/CartContext';
import StressIcon from "@assets/svg/stress_active.svg";
import ToxinsIcon from "@assets/svg/toxin_active.svg";
import LiverIcon from "@assets/svg/liver_active.svg";
import HormoneIcon from "@assets/svg/hormone_active.svg";
import GutIcon from "@assets/svg/gut_active.svg";
import { Divider } from 'antd';

const rootCausesIcons = (rootcauses) => {
    let rootcauseName = rootcauses.toLowerCase();
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
}

const RootCausesV2 = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const { rootCausesDetails: rootCauses } = useCartContext();

    // Check if it's mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return rootCauses && (
        <div className="w-full md:w-[550px]">
            <div className="rounded-[5px] bg-Secondary/100 p-[16px] md:p-[24px] flex flex-col gap-[24px] md:gap-[32px]">
                {/* Clock Icon */}
                <div className='flex flex-col gap-[8px] md:gap-[16px]'>
                    <div className='flex flex-row justify-between'>
                        <div className='text-center justify-center flex flex-col  gap-[5px] md:gap-[8px] '>
                            <h2 className="text-[20px] md:text-[40px] text-Secondary/500 -tracking-[1%] font-lato font-[500]">{"Acne Stage"}</h2>
                            <p className="text-[12px] md:text-[18px] font-lato font-[400] text-Secondary/500">{"Open Pores"}<span className='text-[14px] md:text-[28px] uppercase ms-[4px] md:ms-[16px]'>{"TRUE"}</span></p>
                            <p className="text-[12px] md:text-[18px] font-lato font-[400]  text-Secondary/500">{"Pigmentation"}<span className='text-[14px] md:text-[28px] uppercase  ms-[4px] md:ms-[16px]'>{"PRESENT"}</span></p>
                            <p className="text-[12px] md:text-[18px] font-lato font-[400]  text-Secondary/500">{"Sebum production"}<span className='text-[14px] md:text-[28px] uppercase  ms-[4px] md:ms-[16px]'>{"HYPERPRODUCTION"}</span></p>

                        </div>
                        <div className='hidden md:flex  items-start '>
                            <Image src={Information} alt='Info' width={32} height={32} />
                        </div>
                        <div className='flex md:hidden items-start '>
                            <Image src={Information} alt='Info' width={24} height={24} />
                        </div>
                    </div>
                </div>

            </div>
            <div className='mt-[16px] md:mt-[40px]'>
                <h2 className="text-[20px] md:text-[28px] text-primary/700 -tracking-[1%] font-lato font-[700]">{"Your Root Causes"}</h2>
            </div>
            <Divider className="w-full h-[1.12px] bg-[#CECDC9] p-0 my-[16px]" />
            <RootCauseIconComponent
                rootCauseInfo={rootCauses}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
                isMobile={isMobile}
            />
        </div>
    );
};

const RootCauseIconComponent = ({ rootCauseInfo, setActiveIndex, activeIndex, isMobile }) => {
    const scrollContainerRef = useRef(null);
    const isUserScrolling = useRef(false);
    const isProgrammaticScroll = useRef(false);

    // Handle scroll to keep the active item in view (for mobile)
    useEffect(() => {
        if (isMobile && scrollContainerRef.current) {
            isProgrammaticScroll.current = true; // Flag that this is a programmatic scroll

            const scrollContainer = scrollContainerRef.current;
            const activeItem = scrollContainer.children[activeIndex];

            if (activeItem) {
                const containerWidth = scrollContainer.offsetWidth;
                const itemWidth = activeItem.offsetWidth;
                const scrollLeft = activeItem.offsetLeft - (containerWidth / 2) + (itemWidth / 2);

                scrollContainer.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });

                // Reset the flag after the scroll animation is likely complete
                setTimeout(() => {
                    isProgrammaticScroll.current = false;
                }, 500);
            }
        }
    }, [activeIndex, isMobile]);

    // Handle scroll navigation
    const handleScroll = () => {
        // Only process scroll events that are initiated by the user, not our programmatic scrolls
        if (isMobile && scrollContainerRef.current && !isProgrammaticScroll.current && isUserScrolling.current) {
            const scrollContainer = scrollContainerRef.current;
            const containerWidth = scrollContainer.offsetWidth;
            const scrollPosition = scrollContainer.scrollLeft;
            const itemWidth = containerWidth / 3; // Approximate width of each item

            // Calculate which item should be active based on scroll position
            const newIndex = Math.min(
                Math.floor((scrollPosition + (itemWidth / 2)) / itemWidth),
                rootCauseInfo.length - 1
            );

            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        }
    };

    return (
        <div className='flex flex-col gap-[8px] md:gap-[16px]'>
            {/* Desktop View */}
            <div className="hidden md:flex w-fit bg-Secondary/100 rounded-[16px]">
                {rootCauseInfo?.map((cause, index) => (
                    <div
                        key={cause?.name}
                        className={`w-[92px] h-[80px] py-[8px] px-[24px] flex flex-col gap-[4px] items-center justify-center cursor-pointer ${index === activeIndex ? "bg-Secondary/200  rounded-full" : ""
                            }`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <div className="w-[40px] h-[40px] mb-1 flex items-center justify-center pt-2">
                            <Image
                                src={rootCausesIcons(cause?.name)}
                                alt={cause?.name}
                                width={32}
                                height={32}
                                className={` object-center fill-Neutral/600 ${index === activeIndex ? "" : "custom-icon-fill"}`}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <div className={`text-[14px] font-lato font-[500] ${index === activeIndex && cause?.name === "Stress" ? "text-Semantic/Error" : "text-Neutral/700"
                            }`}>
                            {startCase(cause?.name)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile View - Scrollable */}
            <div className="md:hidden w-full">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-scroll hide-scrollbar bg-Secondary/100 rounded-[16px]"
                    onScroll={handleScroll}
                    onTouchStart={() => { isUserScrolling.current = true; }}
                    onTouchEnd={() => { isUserScrolling.current = false; }}
                >
                    {rootCauseInfo?.map((cause, index) => (
                        <div
                            key={cause?.name}
                            className={` px-[24px] py-[8px] gap-[4px] flex flex-col items-center justify-center flex-shrink-0 `}
                            onClick={() => setActiveIndex(index)}
                        >
                            <div className={`w-[40px] h-[32px] py-[4px] px-[12px] mb-1 flex items-center justify-center pt-2 ${index === activeIndex ? "bg-Secondary/200 rounded-[100px]" : ""
                                }`}>
                                <Image
                                    src={rootCausesIcons(cause?.name)}
                                    alt={cause?.name}
                                    width={32}
                                    height={32}
                                    className={`object-center fill-[#929798] ${index === activeIndex ? "custom-icon-fill-grey" : "custom-icon-fill-light-grey"}`}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>

                            <span className={`text-[14px] font-lato font-[500] ${index === activeIndex && cause?.name === "Stress" ? "text-Semantic/Error" : "text-Neutral/700"
                                }`}>
                                {startCase(cause?.name)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-2">
                    {rootCauseInfo?.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 mx-1 rounded-full cursor-pointer ${index === activeIndex
                                ? "w-6 bg-black"
                                : index < activeIndex
                                    ? "w-2 bg-gray-400"
                                    : index === activeIndex + 1
                                        ? "w-2 bg-gray-400"
                                        : "w-2 bg-gray-200"
                                }`}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="text-[16px] min-h-[100px] md:min-h-[50px]">
                <p className='font-lato font-[400] text-Text/Body-Text'>
                    {rootCauseInfo[activeIndex]?.description}
                </p>
            </div>
        </div>
    );
}


export default RootCausesV2;