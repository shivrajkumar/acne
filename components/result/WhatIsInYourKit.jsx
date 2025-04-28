import Image from "next/image";
import React from "react";
import { CDN_BASE_URL } from "@/constants/config";
import checkIcon from "@assets/icons/Check_Icon.png";

function WhatIsInYourKitDesktop() {
  return (
    <section className="bg-Background/AirBlue p-[40px] md:p-10 rounded-3xl">
      <div className="flex  md:flex-row justify-between gap-[40px]">
        {/* Left Content */}
        <div className="md:w-[60%] flex flex-col justify-start gap-[16px] w-[620px]">
          <h2 className="text-[40px]  font-[500] font-lato my-[20px] leading-[130%]">
            Everything You Get with Your Kit
          </h2>

          <div className="space-y-[30px] mb-[16px]">
            <div className="flex items-center gap-[16px]">
              <Image src={checkIcon} width={24} height={24} alt="Icon" />
              <p className="text-[18px] text-Text/Heading-Text font-[500] font-lato leading-[135%]">
                Free shipping, delivered straight to your door
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              <Image src={checkIcon} width={24} height={24} alt="Icon" />
              <p className="text-[18px] text-Text/Heading-Text font-[500] font-lato leading-[135%]">
                A dermatologist-designed, personalized skincare plan{" "}
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              <Image src={checkIcon} width={24} height={24} alt="Icon" />
              <p className="text-[18px] text-Text/Heading-Text font-[500] font-lato leading-[135%]">
                Skin experts to support you every step of the way
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              <Image src={checkIcon} width={24} height={24} alt="Icon" />
              <p className="text-[18px] text-Text/Heading-Text font-[500] font-lato leading-[135%]">
                Effective products tailored just for you
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="md:w-1/2  md:mt-0">
          <div className="overflow-hidden flex justify-end">
            <Image
              src={`${CDN_BASE_URL}website_images/clear_rituals/results_page/whats_in_your_kit.webp`}
              alt="Skin analysis facial scan"
              width={620}
              height={510}
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
function WhatIsInYourKitMobile() {
  return (
    <section className="bg-Background/AirBlue p-[16px] rounded-[24px]">
      <h2 className="text-[28px] font-medium my-[16px]">
        Everything You Get with Your Kit
      </h2>

      <div className="mb-4">
        <Image
          src={`${CDN_BASE_URL}website_images/clear_rituals/results_page/whats_in_your_kit.webp`}
          alt="Skin analysis facial scan"
          width={300}
          height={300}
          className="w-full rounded-xl object-cover"
          unoptimized
        />
      </div>

      <div className="flex flex-col mb-4 gap-[16px]">
        <div className="flex items-center justify-center gap-[16px]">
          <Image src={checkIcon} width={24} height={24} alt="Icon" />
          <p className="text-[14px] text-Text/Heading-Text font-[500] font-lato leading-[140%]">
            Free shipping, delivered straight to your door{" "}
          </p>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={checkIcon} width={24} height={24} alt="Icon" />
          <p className="text-[14px] text-Text/Heading-Text font-[500] font-lato leading-[140%]">
            A dermatologist-designed, personalized skincare plan{" "}
          </p>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={checkIcon} width={24} height={24} alt="Icon" />
          <p className="text-[14px] text-Text/Heading-Text font-[500] font-lato leading-[140%]">
            Skin experts to support you every step of the way{" "}
          </p>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image src={checkIcon} width={24} height={24} alt="Icon" />
          <p className="text-[14px] text-Text/Heading-Text font-[500] font-lato leading-[140%]">
            Effective products tailored just for you{" "}
          </p>
        </div>
      </div>
      <div className="flex justify-center"></div>
    </section>
  );
}

// Responsive component that renders the appropriate version based on screen size
export default function AcneWhatsInYourKit() {
  return (
    <>
      <div className="flex md:block xs:hidden">
        <WhatIsInYourKitDesktop />
      </div>
      <div className="hidden md:hidden xs:flex">
        <WhatIsInYourKitMobile />
      </div>
    </>
  );
}
