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
    <>
      <div
        className={`flex flex-col items-center px-4 py-10 md:px-20 md:py-16 bg-[#F9FAFB] ${height}`}
      >
        <div className="w-full max-w-[720px] mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-md p-6 md:p-10 flex flex-col items-center gap-6 md:gap-10 text-center">
            {/* Confirmation Section */}
            <div className="flex items-center gap-4 md:gap-6">
              <Image
                src={ConfirmedIcon}
                alt="Confirmed"
                width={48}
                height={48}
                className="w-12 h-12 md:w-16 md:h-16"
              />
              <p className="text-[20px] md:text-[26px] font-semibold text-gray-900">
                Your call is booked successfully!
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-[18px] md:text-[22px] font-medium leading-snug text-gray-700">
              You're all set for your consultation with our
              <br className="hidden md:block" />
              Skin Expert Doctors.
            </h2>

            {/* Date and Time Info */}
            <div className="flex items-center gap-6 text-[16px] md:text-[20px] font-normal text-gray-700">
              <div className="flex items-center gap-2">
                <Image
                  src={CalenderIcon}
                  alt="Date"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>
                  {moment(selectedDate || new Date()).format("MMM Do")}
                </span>
              </div>

              <div className="w-[1px] h-6 bg-gray-300" />

              <div className="flex items-center gap-2">
                <Image
                  src={AccessTimeIcon}
                  alt="Time"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>{selectedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmedSlotView;
