"use client";

import React from "react";
import Image from "next/image";
import moment from "moment";
import ConfirmedIcon from "@assets/svg/icon.svg";
import CalenderIcon from "@assets/svg/calendar-today.svg";
import AccessTimeIcon from "@assets/svg/access-time.svg";

function ConfirmedSlotView({
  selectedDate,
  selectedTime,
  height = "min-h-[60vh]",
}) {
  return (
    <div className={`flex flex-col items-center px-4 py-8 md:py-16 bg-[#F9FAFB] ${height}`}>
      <div className="w-full max-w-[720px]">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6 md:p-10 text-center space-y-6 md:space-y-10">
          {/* Confirmation Header */}
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={ConfirmedIcon}
              alt="Confirmed"
              width={64}
              height={64}
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              Your call is booked successfully!
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed">
            You're all set for your consultation with
            <br className="hidden md:inline" /> our Skin Expert Doctors.
          </p>

          {/* Date and Time */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-[16px] md:text-[20px] text-gray-700">
            {/* Date */}
            <div className="flex items-center gap-2">
              <Image src={CalenderIcon} alt="Date" width={20} height={20} />
              <span>{moment(selectedDate || new Date()).format("MMM Do")}</span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-6 bg-gray-300" />

            {/* Time */}
            <div className="flex items-center gap-2">
              <Image src={AccessTimeIcon} alt="Time" width={20} height={20} />
              <span>{selectedTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmedSlotView;
