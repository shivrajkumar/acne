"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomRightArrow, CustomLeftArrow } from "@constants/CustomArrow";

// Simulate fetching slots directly without using a Promise
const mockFetchSlots = () => {
  return {
    morning: ["10:00 AM", "10:30 AM", "11:00 AM"],
    afternoon: ["12:00 PM", "01:30 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:30 PM"],
    evening: ["05:00 PM", "06:30 PM"],
    night: [],
    availableSections: ["morning", "afternoon", "evening", "night"]
  };
};

const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  variableWidth: false,
  centerMode: true,
  nextArrow: <CustomRightArrow />,
  prevArrow: <CustomLeftArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1.5,
        arrows: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1.5,
        arrows: false,
      },
    },
  ],
};

function BookFreeCall() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [slots, setSlots] = useState({});
  const [availableSections, setAvailableSections] = useState([]);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const getFormattedSelectedDate = () => {
    const selected = dates[selectedDate];
    const prefix =
      selectedDate === 0
        ? "Today"
        : selectedDate === 1
          ? "Tomorrow"
          : "";

    const fullDate = selected.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    return prefix ? `${prefix}, ${fullDate}` : fullDate;
  };

  useEffect(() => {
    // Simulating delay without using Promise
    setTimeout(() => {
      const data = mockFetchSlots(); // Call mock function directly
      setSlots(data);
      setAvailableSections(data.availableSections);
    }, 1000); // 1-second delay
  }, []);

  const renderSlots = (section, label, icon) => {
    if (!availableSections.includes(section)) return null;

    return (
      <div className="mb-6 mt-[36px] md:mt-10">
        <div className="flex items-center text-gray-600 font-semibold text-base mb-4">
          <span className="mr-2 text-lg">{icon}</span>
          <span className="md:text-[18px] text-[14px] font-lato font-[600] text-[#171819] pr-[5px]">{label}</span>
          <span className="text-[#989899] md:text-[18px] text-[14px] font-lato font-[600]">
            ({slots[section]?.length || 0} slots)
          </span>
        </div>
        {slots[section]?.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {slots[section].map((slot, i) => (
              <button
                key={i}
                className="w-[100px] px-4 py-4 rounded-lg border hover:bg-blue-100 text-[14px] font-[400] font-lato"
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 font-lato italic">No slots available</p>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto p-6 rounded-[24px] border border-Elements/Divider-Stroke">
      <h2 className=" font-[400] text-[20px] md:text-[24px] font-lato mb-10 -tracking-[0.5px]">Book a Free Call with Skin Expert</h2>
      <p className="pb-[16px] text-[16px] font-lato text-[500] text-[#171819]">Choose Date</p>
      <div className="gap-3  pb-3 mb-6">
        <Slider {...settings}>
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(index)}
              className={`flex flex-col items-center px-4 py-3 min-w-[120px] border rounded-lg ${selectedDate === index ? "bg-slot-buttonBg border border-[#2872A1] text-black" : "bg-white"
                }`}
            >
              <span className="md:text-[16px] text-[12px] font-semibold font-lato text-[#171819]">
                {index === 0
                  ? "Today"
                  : index === 1
                    ? "Tomorrow"
                    : date.toLocaleDateString("en-GB", { weekday: "short" })}
              </span>
              <br />
              <span className="text-xs text-gray-700 font-semibold font-mono">
                {date.getDate()} {date.toLocaleDateString("en-GB", { month: "short" })}
              </span>
              <div className="w-full h-[1px] bg-black-200"></div>
            </button>
          ))}
        </Slider>
      </div>

      <div className="block md:hidden">
        <p className="flex items-center justify-center pt-4 pb-4 ">
          <strong className="text-[16px] font-lato font-[500] text-[#171819]">{getFormattedSelectedDate()}</strong>
        </p>
      </div>

      {availableSections.includes("morning") && renderSlots("morning", "Morning", "☀️")}
      {availableSections.includes("afternoon") && renderSlots("afternoon", "Afternoon", "🌞")}
      {availableSections.includes("evening") && renderSlots("evening", "Evening", "🌬️")}
      {availableSections.includes("night") && renderSlots("night", "Night", "🌙")}
    </div>
  );
}

export default BookFreeCall;
