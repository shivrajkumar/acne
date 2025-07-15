"use client";
import React, { useRef, useState, useCallback } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";
import RightArrowCircelLight from "@assets/svg/rightArrow.svg";

const ProductCarousel = ({ images = [] }) => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = useCallback(() => {
    carouselRef.current?.next();
  }, []);

  const handleGoTo = useCallback((index) => {
    carouselRef.current?.goTo(index);
  }, []);

  const handleSlideChange = useCallback((from, to) => {
    setCurrentSlide(to);
  }, []);

  if (!images.length) {
    return (
      <div className="flex justify-center items-start h-[400px] px-2 mb-4 pt-8">
        <div className="bg-gray-200 rounded-lg flex items-center justify-center w-[280px] h-[280px] md:w-[328px] md:h-[328px]">
          <span className="text-gray-500">No Image Available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] overflow-hidden md:w-[50%] flex flex-col justify-start">
      {/* Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-12 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Next image"
      >
        <Image src={RightArrowCircelLight} width={32} height={32} alt="Next" />
      </button>

      {/* Carousel Container */}
      <div className="w-full flex flex-col justify-start pt-4">
        <Carousel
          ref={carouselRef}
          dots={false}
          speed={500}
          autoplaySpeed={5000}
          infinite
          slidesToShow={1}
          slidesToScroll={1}
          beforeChange={handleSlideChange}
          className="mb-4"
        >
          {images.map((productImage, idx) => (
            <div key={idx} className="flex justify-center items-center px-4 py-4">
              <div className="flex justify-center items-center w-full max-w-[300px] max-h-[300px] mx-auto">
                <Image
                  src={`${CDN_BASE_URL}${productImage.src}`}
                  alt={productImage.alt || `Product image ${idx + 1}`}
                  width={300}
                  height={300}
                  className="rounded-lg object-contain w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx === 0}
                />
              </div>
            </div>
          ))}
        </Carousel>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center gap-4 font-sophiaPro">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`text-[12px] font-[400] cursor-pointer leading-[130%] transition-colors hover:opacity-80 ${currentSlide === idx ? "text-black" : "text-grey/200"
                }`}
              onClick={() => handleGoTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {String(idx + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;