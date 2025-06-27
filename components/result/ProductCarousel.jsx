"use client";
import React, { useRef, useState } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";
import RightArrowCircelLight from "@assets/svg/rightArrow.svg";

const ProductCarousel = ({ images = [] }) => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!images.length) {
    return (
      <div className="flex justify-center items-center h-[300px] md:h-[480px] px-2 mb-4">
        <div className="bg-gray-200 rounded-lg flex items-center justify-center w-[280px] h-[280px] md:w-[328px] md:h-[328px]">
          <span className="text-gray-500">No Image Available</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-[400px] md:h-[400px]  overflow-hidden md:w-[50%]`}
      id="carousel-id"
      style={{ transition: "opacity 0.3s ease-in" }}
    >
      {/* Right Arrow - Hidden on mobile */}
      <div
        onClick={() => carouselRef.current?.next()}
        className="absolute md:right-[46px] right-[0px] top-[50%] transform -translate-y-1/2 z-10 cursor-pointer"
      >
        <Image src={RightArrowCircelLight} width={32} height={32} alt="Next" />
      </div>

      {/* Carousel Container - Fixed width constraints */}
      <div className="w-full max-w-full overflow-hidden">
        <Carousel
          ref={carouselRef}
          dots={false}
          speed={500}
          autoplaySpeed={5000}
          infinite
          slidesToShow={1}
          slidesToScroll={1}
          beforeChange={(from, to) => setCurrentSlide(to)}
        >
          {images?.map((productImage, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center px-2 py-4 w-full"
            >
              <Image
                src={`${CDN_BASE_URL}${productImage.src}`}
                alt={productImage.alt || `Product image ${idx + 1}`}
                width={328}
                height={480}
                className="rounded-lg w-auto h-auto max-w-[300px] max-h-[480px] object-contain mx-auto"
              />
            </div>
          ))}
        </Carousel>
        <div className="flex justify-center items-center gap-4 font-lato ">
          {images?.map((_, idx) => (
            <span
              key={idx}
              className={`text-[12px] font-[400] cursor-pointer eading-[130%] ${
                currentSlide === idx ? "text-black" : " text-grey/200"
              }`}
              onClick={() => carouselRef.current?.goTo(idx)}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
