"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from "@/constants/functions";

let settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <SampleNextArrow variant={"light"} />,
  prevArrow: <SamplePrevArrow variant={"light"} />,
  adaptiveHeight: true,
};

let settingsNoArrow = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  lazyload: true,
  adaptiveHeight: true,
  className: "center",
  centerMode: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true,
        autoplay: false,
        autoplaySpeed: 5000,
        adaptiveHeight: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        autoplay: false,
        autoplaySpeed: 5000,
        infinite: true,
        adaptiveHeight: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        centerMode: false,
        adaptiveHeight: true,
      },
    },
  ],
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};
export default function VayuTestimonials({ resultsAndTestimonials }) {
  return (
    <>
      <div className="xl:pt-6 xl:w-11/12 xl:mx-auto xs:pt-3 flex justify-center mb-3 font-jakara">
        <h2 className="text-start xl:pb-8 xs:px-4 font-jakara font-[700] text-[#212121] xl:text-[40px] xs:text-[36px] xs:w-full xl:w-full leading-10">
          Results and Testimonials
        </h2>
      </div>
      <div className=" justify-center xl:flex md:flex lg:flex xs:hidden sm:hidden">
        <Slider
          {...settings}
          className="2xl:w-11/12 xl:w-12/12 xs:w-11/12 flex items-center justify-between hide-next-arrow"
        >
          {resultsAndTestimonials.map((value, index) => {
            return (
              <div key={index} className="p-3">
                <CustomerCard value={value} />
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="justify-center xl:hidden md:hidden lg:hidden xs:flex mb-8 xs:px-2">
        <Slider
          {...settingsNoArrow}
          className="w-[100%] xl:pt-9 md:pt-9 lg:pt-9 py-0 block mx-auto hide-next-arrow"
        >
          {resultsAndTestimonials.map((value, index) => {
            return (
              <div className="p-2 rounded-lg w-[100%] ms-8" key={index}>
                <CustomerCard value={value} />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

function CustomerCard({ value }) {
  return (
    <div className="border rounded-lg xs:h-[29rem] xs:w-full xl:h-[32rem] cursor-pointer font-jakara">
      <div className="rounded-lg mx-auto ">
        <Image
          height={457}
          width={300}
          loading="lazy"
          src={value.src}
          className={"mx-auto rounded-t-lg xs:w-full"}
          alt={value.alt}
        />
      </div>
      <div className="flex flex-col px-3 bg-[#FFFFFF] rounded-lg">
        <h2 className="text-[18px] pb-1 pt-2 text-[#212121] xl:text-[20px]  font-jakara font-[700]">
          {value.title}
        </h2>
        <h2 className="text-[14px] pb-1 pt-1 text-[#212121] xl:text-[20px]  font-jakara font-[500]">
          {value.city}
        </h2>
        <div className="flex justify-between">
          <p className="xl:text-[16px] xs:text-[14px] xl:w-[19rem] xs:w-[12rem] font-jakara text-[#414042] pb-3 font-[400]">
            {value.date}
          </p>
          <Image
            height={20}
            width={120}
            loading="lazy"
            src={value.rating}
            className={"mx-auto xs:h-[1rem]"}
            alt="rating"
          />
        </div>
        <p className="xl:text-[14px] xs:text-[14px] xl:w-[19rem] xs:w-full text-[#414042] font-jakara  pb-3 font-[400]">
          {value.description}
        </p>
      </div>
    </div>
  );
}
