"use client";
import Image from "next/image";
import { Carousel } from "antd";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import RightArrowCircelLight from "@assets/icons/RightArrowCircleLight.svg";
import { useRef } from "react";

export default function AcneRootCauses({ rootcauses }) {
  const carouselRef = useRef(null);

  return (
    <div className="bg-Background/AirBlue p-[16px] pb-[30px] md:p-[40px] md:pb-[70px] rounded-[24px] w-full mx-auto font-lato md:min-h-[548px] min-h-[552px]">
      <div className="bg-white border-[1px] border-[#E3E3E2] rounded-[12px] py-2 px-4 font-lato font-normal text-[12px] md:text-[14px] w-fit">
        Root Cause
      </div>

      <div className="flex justify-between mt-[16px] mb-[40px]">
        <div className="flex flex-col justify-between items-start">
          <h2 className="text-[28px] md:text-[40px] font-lato font-[500] text-Text/Heading-Text md:w-[620px] w-[300px] leading-[130%]">
            Acne Starts from Within — We Fix the Root Cause.
          </h2>
        </div>
        <div className="hidden items-end md:flex">
          <AcneTakeTheSkinTest
            variant="black"
            text="Take The Skin test"
            tm=" "
            redirectTo="/skin-test"
            deskSize="desktopBig"
          />
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative max-h-[224px] md:h-[224px]"
        id="carousel-id"
      >
        {/* Right Arrow */}
        <div
          onClick={() => carouselRef.current?.next()}
          className="hidden md:block absolute right-[-30px] top-[50%] transform -translate-y-1/2 z-10 cursor-pointer"
        >
          <Image
            src={RightArrowCircelLight}
            width={56}
            height={56}
            alt="Next"
          />
        </div>

        <Carousel
          ref={carouselRef}
          dots
          speed={500}
          autoplay
          autoplaySpeed={2000}
          infinite
          slidesToShow={4}
          slidesToScroll={1}
          className="custom-slider-dots-root-causes"
          variableWidth
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {rootcauses.map((problem, idx) => (
            <div key={idx} className="px-2 flex justify-center">
              <div className="bg-white rounded-2xl h-56 w-full max-w-[250px] md:max-w-[270px] flex flex-col items-center justify-center shadow-sm">
                <Image
                  src={problem.src}
                  alt={problem.alt}
                  width={56}
                  height={56}
                  className="rounded-lg w-14 h-14 object-contain"
                />
                <div className="text-center flex flex-col items-center px-2">
                  <p className="text-[16px] md:text-[18px] font-[500] font-lato my-[4px]">
                    {problem.name}
                  </p>
                  <p className="text-[14px] md:text-[16px] font-normal mb-4 font-lato">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Mobile CTA */}
      <div className="flex items-end md:hidden mt-[40px] justify-center">
        <AcneTakeTheSkinTest
          variant="black"
          text="TAKE THE SKIN TEST"
          tm=" "
          redirectTo="/skin-test"
          deskSize="mobileBig"
        />
      </div>
    </div>
  );
}
