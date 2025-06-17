"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CDN_BASE_URL } from "@/constants/config";

// Using named function for better debugging with React Fast Refresh
function AcneThreefoldApproach() {
   const [orderCount , setOrderCount] = useState(null);
   const [caseId , setCaseId] = useState(null);

  useEffect(()=>{
      const orderCountFromStorage =
        window.localStorage.getItem("order_count");
        const storedData = localStorage.getItem("acne_result_data");
        const idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;
      setOrderCount(orderCountFromStorage);
      setCaseId(idFromLocalStorage)
  },[])

  return (
    <div className="p-[16px] md:p-[40px]  rounded-[24px] w-full mx-auto font-lato bg-Background/Beige h-[885px] lg:h-[720px]">
      {/* Badge */}
      <div className="bg-white border-[1px] border-[#E3E3E2] rounded-[12px] py-2 px-4 font-lato font-normal text-[12px] md:text-[14px] w-fit">
        Threefold Approach
      </div>

      {/* Mobile Image - only shown on mobile */}
      <div className="flex md:hidden mt-[16px]">
        <Image
          src={`${CDN_BASE_URL}website_images/clear_rituals/landingPage/threefold_approach.webp`}
          alt="Threefold Approach"
          className="rounded-[16px] w-full h-auto"
          width={296}
          height={296}
        />
      </div>

      {/* Heading Section */}
      <div className="flex justify-between mt-[16px] mb-[16px] md:mt-[16px] md:mb-[40px] ">
        <div className="flex flex-col justify-between items-start">
          <h2 className="text-[28px] md:text-[40px] font-lato font-[500] text-Text/Heading-Text leading-[130%]">
            We Combine the <br />
            Best of the Three Worlds.
          </h2>
        </div>
        {/* Desktop subtitle - hidden on mobile */}
        <div className="hidden md:flex  text-Text/Body-Text font-lato font-[400] text-[14px] leading-[140%]  items-end justify-between pr-[106px]">
          <p>
            Our acne solutions combine the power of Ayurveda, expert dermatology, and advanced science for clear, lasting results
          </p>

        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex gap-[40px]">
        {/* Left column - Image */}
        <div className="w-1/2">
          <Image
            src={`${CDN_BASE_URL}website_images/clear_rituals/landingPage/threefold_approach.webp`}
            alt="Threefold Approach"
            className="rounded-[16px] w-full h-[391px]"
            width={730}
            height={391}
          />
        </div>

        {/* Right column */}
        <div className="w-1/2 flex flex-col gap-[12px]">
          <div>
            {/* Item 1 */}
            <div className="bg-white rounded-[16px] p-[16px]  h-[64px] flex items-center">
              <div className="bg-Primary/500 text-white rounded-full w-[24px] h-[24px] flex items-center justify-center mr-4">
                <span>1</span>
              </div>
              <span className="text-[16px] font-[500] text-Text/Heading-Text font-lato leading-[135%]">
                Ayurveda
              </span>
            </div>

            {/* Plus sign */}
            <div className="flex justify-center">
              <span className="text-gray-400 text-2xl my-[4px]">+</span>
            </div>

            {/* Item 2 */}
            <div className="bg-white rounded-[16px] p-[16px] h-[64px] flex items-center">
              <div className="bg-Primary/500 text-white rounded-full w-[24px] h-[24px] flex items-center justify-center mr-4">
                <span>2</span>
              </div>
              <span className="text-[16px] font-[500] text-Text/Heading-Text font-lato">
                Dermatology
              </span>
            </div>

            {/* Plus sign */}
            <div className="flex justify-center">
              <span className="text-gray-400 text-2xl my-[4px]">+</span>
            </div>

            {/* Item 3 */}
            <div className="bg-white rounded-[16px] p-[16px]  h-[64px] flex items-center">
              <div className="bg-Primary/500 text-white rounded-full w-[24px] h-[24px] flex items-center justify-center mr-4">
                <span>3</span>
              </div>
              <span className="text-[16px] font-[500] text-Text/Heading-Text font-lato leading-[135%]">
                Advanced Formulas
              </span>
            </div>
          </div>

          {/* Desktop Button */}
          <div className="mt-auto flex justify-end">
            {!orderCount ? <AcneTakeTheSkinTest
              variant="black"
              text="TAKE THE SKIN TEST"
              tm=" "
              redirectTo="/skin-test"
              deskSize="desktopBig"
            /> : <AcneTakeTheSkinTest
              variant="black"
              text={`Book Your Call Now`}
              tm={" "}
              redirectTo={`/book-a-call?caseId=${caseId}&redirect=home`}
              deskSize="desktopBig"
            />}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden">
        {/* Mobile subtitle */}
        <div className="text-Text/Body-Text font-lato font-[400] text-[14px] leading-[140%] mb-[16px]">
          Our acne solutions combine the power of Ayurveda, expert dermatology, and advanced science for clear, lasting results
        </div>
        {/* Mobile numbered items */}
        <div className="mb-4">
          {/* Item 1 */}
          <div className="bg-white rounded-[16px] p-[16px] flex items-center">
            <div className="bg-Primary/500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-lato">
              <span>1</span>
            </div>
            <span className="text-[16px] font-[500] text-Text/Heading-Text font-lato leading-[135%]">
              Ayurveda
            </span>
          </div>

          {/* Plus sign */}
          <div className="flex justify-center">
            <span className="text-gray-400 text-2xl">+</span>
          </div>

          {/* Item 2 */}
          <div className="bg-white rounded-[16px] p-[16px] flex items-center">
            <div className="bg-Primary/500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-lato">
              <span>2</span>
            </div>
            <span className="text-[16px] font-[500] text-Text/Heading-Text font-lato">
              Dermatology
            </span>
          </div>

          {/* Plus sign */}
          <div className="flex justify-center">
            <span className="text-gray-400 text-2xl">+</span>
          </div>

          {/* Item 3 */}
          <div className="bg-white rounded-[16px] p-[16px] flex items-center">
            <div className="bg-Primary/500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-lato">
              <span>3</span>
            </div>
            <span className="text-[16px] font-[500] text-Text/Heading-Text font-lato leading-[135%]">
              Advanced Formulas
            </span>
          </div>
        </div>
        {/* Mobile Button */}
        <div className="flex justify-center mt-4">
          {!orderCount ? <AcneTakeTheSkinTest
            variant="black"
            text="TAKE THE SKIN TEST"
            tm=" "
            redirectTo="/skin-test"
            deskSize="mobileBig"
          /> : <AcneTakeTheSkinTest
            variant="black"
            text={`Book Your Call Now`}
            tm={" "}
            redirectTo={`/book-a-call?caseId=${caseId}&redirect=home`}
            deskSize="mobileBig"
          />}
        </div>
      </div>
    </div>
  );
}

// Using a separate export statement
export default AcneThreefoldApproach;
