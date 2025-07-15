"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";

export default function ListOfProblems({ listOfProblems }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const [orderCount, setOrderCount] = useState(null);

  useEffect(() => {
    const orderCountFromStorage =
      window.localStorage.getItem("order_count");
    const storedData = localStorage.getItem("acne_result_data");
    const idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;
    setOrderCount(orderCountFromStorage);
    setCaseId(idFromLocalStorage)
  }, [])

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: isLoaded,
    centerMode: true,
    centerPadding: "20px",
    slidesToShow: 1.5,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    lazyLoad: "ondemand",
  };

  return (
    <div className="bg-[#FAF9F6]  p-0 md:p-[40px] rounded-[24px] w-full mx-auto">
      <div className="p-[28px] md:p-0">
        <div className="bg-white border-[1px]  border-[#E3E3E2] rounded-[12px] py-2 px-4 font-sophiaPro font-normal text-[14px] w-fit">
          We Solve
        </div>
        <div className="flex justify-between my-[40px] xs:my-[16px]">
          <div className="flex flex-col justify-between items-start">
            <h2 className=" md:text-[40px] text-[28px] font-[500] leading-[130%] text-Text/Heading-Text">
              {"Acne Comes in All Forms —"} <br />
              Clear Ritual Has the Right Solution for You
            </h2>
          </div>
          <div className="hidden items-end md:flex">
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

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-5 gap-4 mt-6">
        {listOfProblems.map((problem, index) => (
          <div
            key={index}
            className="bg-white rounded-[24px] overflow-hidden p-[16px] text-center flex flex-col gap-[16px]"
          >
            <Image
              src={problem.src}
              alt={problem.alt}
              width={211}
              height={211}
              className="rounded-[8px] object-cover w-full h-full"
            />
            <h3 className="text-[18px] font-[500] font-sophiaPro text-Text/Heading-Text">
              {problem.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Mobile Slider with loading control */}
      <div
        className={`flex justify-center md:hidden transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        id="carousel-id"
      >

        <div className="w-full">
          <Carousel {...settings} >
            {listOfProblems.map((problem, index) => (
              <div key={index} className="px-1" style={{ width: 'auto' }}>
                <div className="bg-white rounded-[24px] overflow-hidden p-[16px] text-center flex flex-col gap-[16px]">
                  <div className="w-[211px] h-[211px]">
                    <Image
                      src={problem.src}
                      alt={problem.alt}
                      width={211}
                      height={211}
                      className="rounded-[8px] object-cover w-full h-full"
                      priority={index < 2} // Prioritize loading the first two images
                    />
                  </div>
                  <h3 className="text-[14px] font-[500] font-sophiaPro text-Text/Heading-Text">
                    {problem.title}
                  </h3>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="flex items-end md:hidden mt-[40px] justify-center">
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