"use client"
import Image from "next/image";
import Personalised from "@assets/svg/Personalised.svg";
import SafeToUse from "@assets/svg/Safe_To_Use.svg";
import HighlyEffective from "@assets/svg/Highly_effective.svg";
import TestedProducts from "@assets/svg/Tested_Products.svg";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import { CDN_BASE_URL } from "@/constants/config";
import { useEffect, useState } from "react";

export default function WhatIsCleaRitual() {
   const [orderCount , setOrderCount] = useState(null);

  useEffect(()=>{
  if (typeof window !== "undefined") {
      const orderCountFromStorage =
        window.localStorage.getItem("order_count");

      setOrderCount(orderCountFromStorage);
  }
  },[])


  return (
    <section className="p-6 md:p-[40px] xs:p-[16px] border border-[#E3E3E2] rounded-[24px] flex flex-col md:flex-row gap-6 md:gap-[40px] md:min-h-[585px] min-h-[800px]">
      {/* Left Content */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div className="flex flex-col gap-4 md:gap-[16px]">
          <div className="bg-white border-[1px] border-[#E3E3E2] rounded-[12px] py-2 px-4 font-lato font-normal text-[14px] w-fit">
            What is Clear Ritual?
          </div>
          <h2 className="font-lato text-[40px] md:text-[40px] xs:text-[28px] font-[500] leading-[130%] tracking-[-0.02em] text-wrap xl:w-[620px] md:w-[333px] w-[300px]">
            The Best Brands, Handpicked by Dermatologists for Your Acne Routine
          </h2>
          <div className="w-full flex justify-center md:hidden">
            <div className="rounded-2xl overflow-hidden w-full max-w-[400px]">
              <Image
                src={`${CDN_BASE_URL}website_images/clear_rituals/landingPage/doctor.webp`}
                alt="Dermatologist"
                width={296}
                height={296}
                className="object-cover w-full"
              />
            </div>
          </div>
          {/* Button for Mobile */}
          <div className="hidden md:flex">
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
              redirectTo={"/book-a-call?redirect=home"}
              deskSize="desktopBig"
            />}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-6 md:flex md:flex-wrap md:gap-[40px] mt-6 md:mt-8 font-lato">
          {[
            { img: Personalised, text: "Personalised" },
            { img: SafeToUse, text: "Safe to Use" },
            { img: TestedProducts, text: "Tested Products" },
            { img: HighlyEffective, text: "Highly Effective" },
          ].map(({ img, text }, index) => (
            <div key={index} className="flex flex-col items-center font-lato">
              <Image
                src={img}
                alt={text}
                width={56}
                height={56}
                className="flex xs:hidden"
              />
              <Image
                src={img}
                alt={text}
                width={40}
                height={40}
                className="hidden xs:flex"
              />
              <p className="font-lato text-[16px] md:text-[14px] xs:text-[14px]  font-medium leading-[135%] text-Text/Body-Text ">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex md:hidden justify-center mt-[24px]">
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
            redirectTo={"/book-a-call?redirect=home"}
            deskSize="mobileBig"
          />}
        </div>
      </div>

      {/* Right Image (Second on Desktop) */}
      <div className="md:w-1/2 hidden md:flex justify-center">
        <div className="rounded-2xl overflow-hidden  w-full max-w-[400px] md:max-w-none flex justify-end">
          <Image
            src={`${CDN_BASE_URL}website_images/clear_rituals/landingPage/doctor.webp`}
            alt="Dermatologist"
            width={505}
            height={505}
            className="object-fit "
          />
        </div>
      </div>
    </section>
  );
}
