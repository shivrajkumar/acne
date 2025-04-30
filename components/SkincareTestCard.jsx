"use client";

import React from "react";
import Image from "next/image";
import AcneTakeTheSkinTest from "./generic/AcneTakeTheSkinTest";
// import { CDN_BASE_URL } from "@constants/config";

const SkincareTestCard = ({ title, mobileImage, desktopImage }) => {
  return (
    <div className="h-full rounded-xl text-white relative overflow-hidden ">
      <div className="hidden md:block">
        <Image
          src={desktopImage}
          alt={`Desktop Background ${1}`}
          width={1055}
          height={350}
          className="rounded-xl h-[450px] min-h-[450px] sm:min-h-[450px] object-cover"
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden ">
        <Image
          src={mobileImage}
          alt={`Mobile Background ${1}`}
          width={300}
          height={350}
          className="rounded-xl w-full h-[400px] min-h-[300px] sm:min-h-[320px] object-cover "
        />
      </div>

      <div className="rounded-3xl flex flex-col justify-between absolute top-0 bottom-0 left-0 right-0 px-3 py-3 text-xl font-semibold shadow-md">
        <h2 className=" md:w-[361px] font-[400] text-[24px] md:text-[40px] font-lato md:leading-[120%] md:pt-[2rem] md:pl-[2rem]">
          {title}
        </h2>
        {/* Desktop Skin test Button */}
        <div className="md:flex hidden md:flex-row-reverse mb-2 md:pr-[14px] md:pb-[14px]">
          <AcneTakeTheSkinTest
            variant={"white"}
            text={"TAKE THE SKIN TEST"}
            tm={" "}
            redirectTo={"/skin-test"}
            deskSize="mobileBig"
          />
        </div>
        {/* Mobile Skin test Button */}
        <div className="md:hidden flex justify-center ">
          <AcneTakeTheSkinTest
            variant={"white"}
            text={"TAKE THE SKIN TEST"}
            tm={" "}
            redirectTo={"/skin-test"}
            deskSize={"mobileMedium"}
          />
        </div>
      </div>
    </div>
  );
};

export default SkincareTestCard;
