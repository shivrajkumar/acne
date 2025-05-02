"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { CustomRightArrow, CustomLeftArrow } from "@constants/CustomArrow";
import Loader from "./generic/Loader";
import MorningIcon from "@assets/svg/morning.svg";
import AfternoonIcon from "@assets/svg/afternoon.svg";
import EveningIcon from "@assets/svg/evening.svg";
import NightIcon from "@assets/svg/night.svg";
import moment from "moment";

function BookFreeCall({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  transformedSlots,
  bookedSuccess,
  bookACallOnly,
}) {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const carouselRef = useRef(null);
  const availableDates = Object.keys(transformedSlots || {});

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);

      if (mobile) {
        setSlidesToShow(3);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(6);
      }
    };

    // Initial setup
    handleResize();

    // Only set loading false if there are slots
    if (availableDates.length > 0) {
      setIsLoadingSlots(false);

      // Auto-select the first available date if none selected
      if (!selectedDate) {
        setSelectedDate(availableDates[0]);
      }
    }

    // Listen for resize
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [availableDates, selectedDate]);

  const handleDateSelect = useCallback(
    (dateKey) => {
      setSelectedDate(dateKey);
      setSelectedTime(null); // Reset time selection when date changes
    },
    [setSelectedDate, setSelectedTime]
  );

  const handleTimeSelect = useCallback(
    (time) => {
      setSelectedTime(time);
    },
    [setSelectedTime]
  );

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  // Case 1: Display booking interface when not booked yet
  if (!bookedSuccess) {
    return (
      <div className="mx-auto md:p-[24px] rounded-[24px] md:rounded-[24px] border border-Elements/Divider-Stroke w-full relative font-lato flex flex-col md:gap-[40px] gap-0 bg-white">
        {/* Heading */}
        <div className="md:p-0 p-[16px]">
          <h2 className="font-[400] md:text-[24px] text-[20px] tracking-[0.5px] leading-[130%]">
            Book a Free Call with Skin Expert
          </h2>
        </div>

        {/* Date Selection */}
        <div className="relative md:p-0 p-[16px]">
          <p className="mb-[16px] md:text-[18px] text-[16px] leading-[135%] tracking-[0.5px] font-[400]">
            Choose Date
          </p>

          {isLoadingSlots ? (
            <Loader />
          ) : (
            <Carousel
              ref={carouselRef}
              slidesToShow={slidesToShow}
              arrows={false}
              dots={false}
              infinite={false}
              adaptiveHeight
              variableWidth={isMobile} // Apply variableWidth only on mobile
              className="flex items-center"
            >
              {availableDates.map((dateKey) => (
                <div
                  key={dateKey}
                  className={`px-2 ${!isMobile ? "max-w-[160px]" : ""}`}
                  onClick={() => handleDateSelect(dateKey)}
                >
                  <div
                    className={`h-[80px] w-full p-[16px] rounded-[16px] flex flex-col justify-center items-center cursor-pointer ${
                      selectedDate === dateKey
                        ? "bg-Background/AirBlue border border-Tertiary/400"
                        : "bg-white border border-Elements/Divider-Stroke"
                    }`}
                  >
                    <p className="md:text-[16px] text-[14px] leading-[140%] text-center">
                      {moment(dateKey).format("dddd")}
                    </p>
                    <p className="text-[14px] leading-[140%] text-center">
                      {moment(dateKey).format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          )}

          {/* Custom Arrows */}
          {availableDates.length > slidesToShow && (
            <>
              <div
                className="hidden md:block absolute top-[86px] !left-[-79px] transform -translate-y-1/2 cursor-pointer"
                onClick={handlePrev}
              >
                <CustomLeftArrow />
              </div>
              <div
                className="hidden md:block absolute top-[86px] right-[-24px] transform -translate-y-1/2 cursor-pointer"
                onClick={handleNext}
              >
                <CustomRightArrow />
              </div>
            </>
          )}
        </div>

        {/* Mobile Date Preview */}
        {selectedDate && (
          <div className="md:hidden flex justify-center items-center text-Text/Heading-Text p-[16px] border-b border-b-Elements/Divider-Stroke">
            <p className="text-[16px] font-[400]">
              {moment(selectedDate).format("dddd")},{" "}
              {moment(selectedDate).format("MMM D, YYYY")}
            </p>
          </div>
        )}

        {/* Time Slots */}
        <div className="flex flex-col gap-[16px] font-lato md:py-0 md:px-0 py-[32px] px-[16px]">
          {selectedDate &&
          transformedSlots[selectedDate] &&
          transformedSlots[selectedDate].length > 0 ? (
            Object.entries(
              groupSlotsByPeriod(transformedSlots[selectedDate])
            ).map(([period, times]) => {
              return (
                times.length > 0 && (
                  <div key={period} className="mb-6">
                    {/* Period Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <Image
                        src={getIconForPeriod(period)}
                        width={24}
                        height={24}
                        alt={`${period} Icon`}
                      />
                      <span className="text-Neutral/800 md:text-[18px] text-[14px] font-[400]">
                        {period}
                      </span>
                      <span className="text-Text/Disabled md:text-[18px] text-[14px] font-[400]">
                        ({times.length} slots)
                      </span>
                    </div>

                    {/* Time Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {times.map((time, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTimeSelect(time)}
                          className={`md:w-[181px] md:h-[56px] flex justify-center items-center h-[48px] w-[101px] rounded-[16px] p-[16px] border text-[14px] font-[400] ${
                            selectedTime === time
                              ? "bg-Background/AirBlue border-Tertiary/400"
                              : "bg-white border-Elements/Divider-Stroke hover:bg-Background/AirBlue"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              );
            })
          ) : (
            <div className="text-center text-Text/Disabled text-[16px] py-8">
              {availableDates.length > 0
                ? "Select a time slot"
                : "No available slots"}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Case 2: when bookedSuccess is true and bookACallOnly is true

  if (bookedSuccess && bookACallOnly) {
    return (
      <>
        <div className="flex flex-col items-center px-4 py-8 md:px-20 md:py-12 bg-[#F9FAFB] min-h-[60vh]">
          <div className="w-full max-w-[720px] mx-auto">
            <div className="bg-white border border-Elements/Divider-Stroke rounded-3xl shadow-sm p-6 md:p-10 flex flex-col items-center gap-6 md:gap-10 text-center">
              <h2 className="text-[20px] md:text-[24px] font-medium tracking-wide leading-snug text-gray-900">
                You're all set for your consultation with our Skin Expert
                Doctors.
              </h2>
              <div className="text-[18px] md:text-[22px] font-normal text-gray-700">
                {moment(selectedDate || new Date()).format("MMM Do")} at{" "}
                {selectedTime}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}

/**
 * Groups time slots into periods of the day
 * @param {Array} slots - Array of slot objects with time property
 * @returns {Object} Object with period keys (Morning, After Noon, Evening, Night)
 */
const groupSlotsByPeriod = (slots = []) => {
  const groups = { Morning: [], "After Noon": [], Evening: [], Night: [] };

  if (!Array.isArray(slots) || slots.length === 0) {
    return groups;
  }

  slots.forEach(({ time }) => {
    const localTime = moment.utc(time).local();
    const hour = localTime.hour();
    const formattedTime = localTime.format("hh:mm A");

    if (hour >= 5 && hour < 12) {
      groups.Morning.push(formattedTime);
    } else if (hour >= 12 && hour < 17) {
      groups["After Noon"].push(formattedTime);
    } else if (hour >= 17 && hour < 21) {
      groups.Evening.push(formattedTime);
    } else {
      groups.Night.push(formattedTime);
    }
  });

  return groups;
};

/**
 * Returns the appropriate icon for each time period
 * @param {string} period - Time period name
 * @returns {string} Icon path
 */
const getIconForPeriod = (period) => {
  switch (period) {
    case "Morning":
      return MorningIcon;
    case "After Noon":
      return AfternoonIcon;
    case "Evening":
      return EveningIcon;
    case "Night":
      return NightIcon;
    default:
      return MorningIcon;
  }
};

export default BookFreeCall;
