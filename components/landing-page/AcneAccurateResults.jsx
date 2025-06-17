"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import checkIcon from "@assets/icons/Check_Icon.png";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import { CDN_BASE_URL } from "@/constants/constants";

function AccurateSkinTestResults() {
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
    <section className="bg-Background/Beige p-[28px] md:p-[40px] rounded-3xl">
      <div className="flex  md:flex-row justify-between gap-[40px]">
        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col justify-start gap-[24px] w-[620px]">
          <div className="w-fit bg-white rounded-[12px] py-[8px] px-[16px] text-[12px] font-lato">
            Accurate Results
          </div>

          <h2 className="text-[28px] md:text-[40px] font-[500] font-lato  mb-[16px]  leading-[130%] ">
            Our Advanced Skin Test Deeply Analyses <br />
            {`Your Skin to Create a Personalised Acne Care Plan, Crafted by Dermatology Experts.`}
          </h2>

          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <Image src={checkIcon} width={20} height={20} alt="Icon" />
              <p className="text-[18px] text-Text/Heading-Text font-[500] font-lato leading-[135%]">
                Instant skin analysis
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              <Image src={checkIcon} width={20} height={20} alt="Icon" />
              <p className="text-[18px] text-Text/Heading-Text font-[500] font-lato leading-[135%]">
                Personalised skincare routine crafted just for you
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              <Image src={checkIcon} width={20} height={20} alt="Icon" />
              <p className="text-[18px] text-Text/Heading-Text font-[500] font-lato leading-[135%]">
                Expert guidance from dermatologists
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              <Image src={checkIcon} width={20} height={20} alt="Icon" />
              <p className="text-[18px] text-Text/Heading-Text font-[500] font-lato leading-[135%]">
                Products designed to work seamlessly together
              </p>
            </div>
          </div>

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

        {/* Right Content - Image */}
        <div className="md:w-1/2  md:mt-0">
          <div className="overflow-hidden flex justify-end">
            <Image
              src={`${CDN_BASE_URL}website_images/clear_rituals/landingPage/face_map.webp`}
              alt="Skin analysis facial scan"
              width={544}
              height={544}
              className=" object-fit"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Mobile version component
function AccurateSkinTestResultsMobile() {
  const [caseId , setCaseId] = useState(null);
  const [orderCount , setOrderCount] = useState(null);

  useEffect(()=>{
      const orderCountFromStorage =
        window.localStorage.getItem("order_count");
        const storedData = localStorage.getItem("acne_result_data");
        const idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;
      setOrderCount(orderCountFromStorage);
      setCaseId(idFromLocalStorage)
  },[])

  return (
    <section className="bg-Background/Beige p-[16px] rounded-[24px]">
      <div className="w-fit bg-white rounded-[12px] py-[8px] px-[16px] text-[12px] font-lato">
        Accurate Results
      </div>

      <h2 className="text-[28px] font-[500] my-[16px] font-lato leading-[130%]">
        Our Advanced Skin Test Deeply Analyses Your Skin to Create a
        Personalised Acne Care Plan, Crafted by Dermatology Experts.
      </h2>

      <div className="mb-4">
        <Image
          src={`${CDN_BASE_URL}website_images/clear_rituals/landingPage/face_map.webp`}
          alt="Skin analysis facial scan"
          width={300}
          height={300}
          className="w-full rounded-xl object-cover"
          unoptimized
        />
      </div>

      <div className="flex flex-col mb-4 gap-[16px]">
        <div className="flex items-center gap-[16px]">
          <Image src={checkIcon} width={20} height={20} alt="Icon" />
          <p className="text-[14px] text-Text/Heading-Text font-[500] font-lato leading-[140%]">
            Instant skin analysis
          </p>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={checkIcon} width={20} height={20} alt="Icon" />
          <p className="text-[14px] text-Text/Heading-Text font-[500] font-lato leading-[140%]">
            Personalised skincare routine crafted just for you
          </p>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={checkIcon} width={20} height={20} alt="Icon" />
          <p className="text-[14px] text-Text/Heading-Text font-[500] font-lato leading-[140%]">
            Expert guidance from dermatologists
          </p>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={checkIcon} width={20} height={20} alt="Icon" />
          <p className="text-[14px] text-Text/Heading-Text font-[500] font-lato leading-[140%]">
            Products designed to work seamlessly together
          </p>
        </div>
      </div>
      <div className="flex justify-center">
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
    </section>
  );
}

// Responsive component that renders the appropriate version based on screen size
export default function AcneAccurateResults() {
  return (
    <>
      <div className="flex md:block xs:hidden">
        <AccurateSkinTestResults />
      </div>
      <div className="hidden md:hidden xs:flex">
        <AccurateSkinTestResultsMobile />
      </div>
    </>
  );
}
