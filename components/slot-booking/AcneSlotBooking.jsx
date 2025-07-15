"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { CustomRightArrow, CustomLeftArrow } from "@constants/CustomArrow";
import Loader from "../generic/Loader";
import moment from "moment";
import { getIconForPeriod, groupSlotsByPeriod } from "../../utils/bookacall";
import ConfirmedSlotView from "./ConfirmedSlotView";

function BookFreeCall({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  transformedSlots,
  bookedSuccess,
  bookACallOnly = false,
  error = "",
  bookingError = "",
  setBookingError = () => { },
  setError = () => { }
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

    // Set loading to false regardless of whether there are slots or not
    setIsLoadingSlots(false);

    // Auto-select the first available date if none selected and there are dates
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0]);
    } else {
      // Set loading to false even when no slots to show the empty state
      setIsLoadingSlots(false);
    }

    // Listen for resize
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [availableDates, selectedDate, setSelectedDate]);

  const handleDateSelect = useCallback(
    (dateKey) => {
      setSelectedDate(dateKey);
      setSelectedTime(null); // Reset time selection when date changes
      if (setError) {
        setError(null);
      }
      if (setBookingError) {
        setBookingError(null);
      }
    },
    [setSelectedDate, setSelectedTime, setError, setBookingError]
  );

  const handleTimeSelect = useCallback(
    (time) => {
      if (setError) {
        setError(null);
      }
      if (setBookingError) {
        setBookingError(null);
      }
      setSelectedTime(time);
    },
    [setSelectedTime, setError, setBookingError]
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
      <div className="mx-auto md:p-[24px] rounded-[24px] md:rounded-[24px] border border-Elements/Divider-Stroke w-full relative font-sophiaPro flex flex-col md:gap-[40px] gap-0 bg-white">
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
                    className={`h-[80px] w-full p-[16px] rounded-[16px] flex flex-col justify-center items-center cursor-pointer ${selectedDate === dateKey
                        ? "bg-Background/AirBlue border border-Tertiary/400"
                        : "bg-white border border-Elements/Divider-Stroke"
                      }`}
                  >
                    <p className="md:text-[16px] text-[14px] leading-[140%] text-center">
                      {moment(dateKey).isSame(moment(), "day")
                        ? "Today"
                        : moment(dateKey).isSame(moment().add(1, "day"), "day")
                          ? "Tomorrow"
                          : moment(dateKey).format("dddd")}
                    </p>
                    <p className="text-[14px] leading-[140%] text-center">
                      {moment(dateKey).format("MMM D")}
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
        <div className="flex flex-col gap-[16px] font-sophiaPro md:py-0 md:px-0 py-[32px] px-[16px]">
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
                          className={`md:w-[181px] md:h-[56px] flex justify-center items-center h-[48px] w-[101px] rounded-[16px] p-[16px] border text-[14px] font-[400] ${selectedTime === time
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

          {/* Error Message */}
          {(error || bookingError) && (
            <div className="sticky bottom-[88px] md:bottom-[98px] left-0 right-0 px-4 py-2 bg-white z-10  md:bg-transparent w-full">
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <p className="text-sm text-red-700">{error || bookingError}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Case 2: when bookedSuccess is true and bookACallOnly is true
  if (bookedSuccess && bookACallOnly) {
    return (
      <ConfirmedSlotView
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    );
  }

  return null;
}

export default BookFreeCall;
