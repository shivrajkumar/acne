import React, { useState } from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

const ProductGallery = ({ images = [], mainImage }) => {
  const [selectedImage, setSelectedImage] = useState(mainImage || images[0]);
  console.log({mainImage})

  return (
    <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[500px] relative">
      {/* Thumbnail Gallery */}
      {/* <div className="flex md:flex-col gap-2 w-full md:w-16 shrink-0 order-2 md:order-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`h-16 w-16 md:w-full overflow-hidden rounded transition-all ${
              selectedImage === image ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <Image
              src={`${CDN_BASE_URL}${image}`}
              alt={`Product thumbnail ${index + 1}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div> */}

      {/* Main Image */}
      <div className="flex-1 w-full md:w-[516px] relative order-1 md:order-2">
        <div className="h-[400px] md:h-[550px] w-full rounded overflow-hidden flex items-center justify-center">
          <Image
            src={`${CDN_BASE_URL}${mainImage}`}
            alt="Product main image"
            width={516}
            height={654}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation Arrow (desktop only) */}
      {/* <button className="absolute right-[-28px] top-1/2 -translate-y-1/2 w-14 h-14 bg-[#3B52F5] rounded-full shadow-[0px_4px_14px_0px_rgba(0,0,0,0.45)] flex items-center justify-center hidden md:flex z-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default ProductGallery;
