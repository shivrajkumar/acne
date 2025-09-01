"use client";

import React from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { doctorExpert } from "@/constants/allVayuData";

const TrustedByDoctors = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="bg-white px-[16px] ">
      <div className="text-left text-[28px] md:text-[40px] leading-[130%] tracking-[-0.02em] font-[400] mb-10 text-Text/Heading-Text font-sophiaPro md:pl-[10.25rem]">
        Trusted by Doctors
      </div>

      <div className="block md:hidden h-[500px]" id="carousel-id">
        <Carousel {...sliderSettings}>
          {doctorExpert?.map((doctor) => (
            <div
              key={doctor?.id}
              className="flex flex-col items-center text-center h-full"
            >
              {/* Adjust image to take full width of the slider */}
              <div className="w-full rounded-3xl overflow-hidden">
                <Image
                  src={doctor?.doctorImage}
                  alt={doctor?.name}
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>

              <div className="mt-4 ">
                <div className="flex flex-col gap-y-[36px]">
                  <div className="flex flex-col gap-y-[4px] items-start">
                    <div className="text-[14px] font-[500] leading-[140%] text-[#171819]">
                      {doctor?.name}
                    </div>
                    <div className="text-[14px] leading-[140%] font-[400] text-[#313233] text-left">
                      {doctor?.qualification}
                    </div>
                    <div className="text-[12px] font-[400] tracking-[-0.01em] leading-[140%] text-Text/Body-Text ">
                      {doctor?.experince} | {doctor?.patients}
                    </div>
                  </div>
                  <div className=" text-[16px] leading-[135%] font-[500] text-left text-[#171819]">
                    {doctor?.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="hidden md:flex flex-wrap px-[140px]">
        {doctorExpert?.map((doctor) => (
          <div
            key={doctor?.id}
            className="flex flex-col items-center text-center w-full md:w-1/3 px-6 mb-8"
          >
            <Image
              src={doctor?.doctorImage}
              alt={doctor?.name}
              className="w-full h-auto rounded-xl object-cover"
              width={400}
              height={400}
            />
            <div className="mt-4">
              <div className="flex flex-col gap-y-[4px] items-start">
                <div className="text-[16px] font-[400] leading-[150%] tracking-[-0.001em] text-Text/Heading-Text font-sophiaPro">
                  {doctor?.name}
                </div>
                <div className="text-[12px] font-[400] tracking-[-0.01em] text-left leading-[140%] text-Text/Body-Text ">
                  {doctor?.qualification}
                </div>
                <div className="text-[12px] font-[400] tracking-[-0.01em] leading-[140%] text-Text/Body-Text ">
                  {doctor?.experince} | {doctor?.patients}
                </div>
              </div>
              <div className="flex flex-col gap-y-[36px] md:mt-[32px] md:mb-6 ">
                <div className="text-[15px] leading-[135%] tracking-[-0.001em] font-[500] text-left text-Text/Heading-Text font-sophiaPro">
                  {doctor?.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedByDoctors;
