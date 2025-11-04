"use client";
import React, { useRef } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

// Product type to image mapping
const productTypeImages = {
  COSMETIC_CLEANSER: "acne/general/Cleanser.png",
  COSMETIC_MOISTURISER: "acne/general/Moisturiser.png",
  COSMETIC_PROTECTION: "acne/general/Sunscreen.png",
  SUPPLEMENT: "acne/general/Skin Food.png",
  DRUG: "acne/general/Treat.png",
};

// Product type to tube/packaging image mapping
const productTypeTubeImages = {
  COSMETIC_CLEANSER: "acne/general/tubes-web/cleanser-tube-web.png",
  COSMETIC_MOISTURISER: "acne/general/tubes-web/moisturiser-tube-web.png",
  COSMETIC_PROTECTION: "acne/general/tubes-web/protect-tube-web.png",
  SUPPLEMENT: "acne/general/tubes-web/skin-food-tube-web.png",
  DRUG: "acne/general/tubes-web/treatment-tube-web.png",
};

const ProductCarousel = ({ image, name, type }) => {
  const carouselRef = useRef(null);

  // Get the image path based on product type
  const typeImage =
    type && productTypeImages[type]
      ? `${CDN_BASE_URL}${productTypeImages[type]}`
      : null;
  
  // Get the tube/packaging image path based on product type
  const tubeImage =
    type && productTypeTubeImages[type]
      ? `${CDN_BASE_URL}${productTypeTubeImages[type]}`
      : null;

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
    <div className="flex flex-col w-full">
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
            <div className="flex justify-center items-center w-full mx-auto relative">
              <Image
                src={`${CDN_BASE_URL}${image}`}
                alt={name}
                width={180} // reduced width
                height={180} // reduced height
                className="object-cover w-[300px] ml-8 md:ml-12 mt-10"
                sizes="(max-width: 768px) 250px, 400px"
                priority
              />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Product Type Image - positioned beneath carousel */}
      {typeImage && (
        <div className="w-full relative md:h-[200px] -mt-36">
          <Image
            src={typeImage}
            alt={type}
            fill
            className="object-cover w-full h-full"
            sizes="100vw"
          />
        </div>
      )}
      
      {/* Product Tube/Packaging Image - positioned beneath typeImage */}
      {tubeImage && (
        <div className="w-full relative md:h-[150px] -mt-2">
          <Image
            src={tubeImage}
            alt={`${type} packaging`}
            fill
            className="object-scale-down w-full h-full"
            sizes="90vw"
          />
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
