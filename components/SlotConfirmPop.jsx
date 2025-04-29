"use client";
import { useRouter } from "next/navigation";
import React from "react";
import moment from "moment";
import Image from "next/image";
import Icon from "@assets/svg/icon.svg";
import CalenderIcon from "@assets/svg/calendar-today.svg";
import AccessTimeIcon from "@assets/svg/access-time.svg";
import CloseIcon from "@assets/svg/vector.svg";

export default function SlotConfirmPop({
    selectedDate,
    setClose,
    selectedTime,
    link
}) {
  const router = useRouter();

  return (
    <div className="w-[330px] h-[324px] cursor-pointer">
      <div className="relative w-[339px] h-[398px] -top-3">
        <div className="w-[328px] gap-9 pt-8 pb-6 px-4 absolute top-3 left-0 bg-white rounded-xl overflow-hidden flex flex-col items-center shadow-md">
          {/* Header */}
          <div className="flex flex-col items-center gap-2.5 w-full">
            <Image
              className="w-[60px] h-[60px]"
              alt="Icon"
              width={2}
              height={2}
              src={Icon}
             
             
            />
            <h2 className="font-semibold text-grey-900 text-lg text-center">
              Your Slot is Confirmed!
            </h2>
          </div>

          {/* Description */}

          <p className="text-center text-sm text-[#838383]">
            You&#39;re all set for your consultation with our expert doctors.
          </p>

          {/* Details */}
          <div className="flex w-[279px] justify-between items-center">
            <div className="flex items-center gap-1">
              <Image
                className="w-5 h-5"
                alt="Calendar today"
                src={CalenderIcon}
                layout="fill"
                objectFit="cover"
              />
              <span className="text-sm text-[#414042] font-medium">
                {moment(selectedDate || new Date()).format("MMM Do")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                className="w-5 h-5"
                alt="Access time"
                src={AccessTimeIcon}
                layout="fill"
                objectFit="cover"
              />
              <span className="text-sm text-[#414042] font-medium">
                {`${moment(selectedTime).format("h:mm A")}`}
              </span>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => router.push(link)}
            className="bg-brown-sand-700 text-white cursor-pointer font-modernity font-[400] text-[17px] py-3 px-6 rounded-full h-[56px] w-full flex justify-center items-center"
          >
            Continue
          </button>
        </div>

        {/* Close Button */}
        <div
          onClick={() => setClose(false)}
          className="absolute w-6 h-6 top-0 right-0 flex items-center rounded-full justify-center bg-white"
        >
          <div className="w-6 h-6 bg-white cursor-pointer rounded-full flex items-center justify-center">
            <Image
              className="w-2.5 h-[11px]"
              alt="Close"
              src={CloseIcon}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
