"use client";
import React, { useRef } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

const ProductCarousel = ({ image, name }) => {
  const carouselRef = useRef(null);

  if (!image) {
    return (
      <div className="flex justify-center items-start h-[400px] px-2 mb-4 pt-8">
        <div className="bg-gray-200 rounded-lg flex items-center justify-center w-[280px] h-[280px] md:w-[328px] md:h-[328px]">
          <span className="text-gray-500">No Image Available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] overflow-hidden w-full flex flex-col justify-start">
      {/* 🟡 Badge */}
      <div className="absolute top-2 right-0 z-10 bg-[#FFF88A] text-black text-sm font-medium px-3 py-1 md:hidden">
        ACNE CARE
      </div>

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
          className="mb-4"
        >
          <div className="flex justify-center items-center px-4 py-4">
            <div className="flex justify-center items-center w-full mx-auto relative">
              <Image
                src={`${CDN_BASE_URL}${image}`}
                alt={name}
                width={280}
                height={280}
                className="object-cover w-[350px] md:w-full rounded-lg"
                sizes="(max-width: 768px) 250px, 100vw"
                priority
              />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
