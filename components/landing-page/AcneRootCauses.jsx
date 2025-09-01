"use client";
import Image from "next/image";
import { Carousel } from "antd";
import { useRef, useEffect, useState } from "react";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import RightArrowCircelLight from "@assets/icons/RightArrowCircleLight.svg";

export default function AcneRootCauses({ rootcauses }) {
  const carouselRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderCount, setOrderCount] = useState(null);
  const [caseId, setCaseId] = useState(null);

  useEffect(() => {
    const orderCountFromStorage =
      window.localStorage.getItem("order_count");
    const storedData = localStorage.getItem("acne_result_data");
    const idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;
    setOrderCount(orderCountFromStorage);
    setCaseId(idFromLocalStorage)
  }, [])


  // Set isLoaded to true after component mounts to prevent initial animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-Background/AirBlue p-[16px] pb-[40px] md:p-[40px] md:pb-[140px] rounded-[24px] w-full mx-auto font-sophiaPro md:min-h-[548px] min-h-[552px]">
      <div className="bg-white border-[1px] border-[#E3E3E2] rounded-[12px] py-2 px-4 font-sophiaPro font-normal text-[12px] md:text-[14px] w-fit">
        Root Cause
      </div>

      <div className="flex justify-between mt-[16px] mb-[40px]">
        <div className="flex flex-col justify-between items-start">
          <h2 className="text-[28px] md:text-[40px] font-sophiaPro font-[400] text-Text/Heading-Text md:w-[620px] w-[300px] leading-[130%]">
            Acne Starts from Within — We Fix the Root Cause.
          </h2>
        </div>
        <div className="hidden items-end md:flex">
          {!orderCount ? <AcneTakeTheSkinTest
            variant="black"
            text="Take The Skin test"
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

      {/* Carousel */}
      <div
        className={`relative max-h-[224px] md:h-[224px] custom-root-cause-carousel ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        id="carousel-id"
        style={{ transition: "opacity 0.3s ease-in" }}
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
          autoplay={isLoaded}
          autoplaySpeed={5000}
          infinite
          slidesToShow={4}
          slidesToScroll={1}
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
            <div key={idx} className="px-[16px] py-[16px] flex justify-center items-center ">
              <div className="bg-white rounded-2xl h-[224px] md:h-[280px] w-full max-w-[250px] md:w-[290px] md:max-w-[290px] flex items-center justify-center p-[16px]">
                <div className="flex flex-col items-center text-center justify-center gap-2">
                  <div className="h-[56px] flex items-start justify-center align-top self-top">
                    <Image
                      src={problem.src}
                      alt={problem.alt}
                      width={56}
                      height={56}
                      className="rounded-lg w-14 h-14 object-contain"
                    />
                  </div>
                  <p className="text-[16px] md:text-[18px] font-[400] font-sophiaPro">{problem.name}</p>
                  <p className="text-[14px] md:text-[16px] font-[400]  font-sophiaPro">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Mobile CTA */}
      <div className="flex items-end md:hidden mt-[80px] justify-center">
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
  );
}