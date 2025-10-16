"use client";
import React from "react";
import Image from "next/image";
import tickIcon from "@assets/svg/tick.svg";
import renderStars from "./ProductStarRating";

const ProductHeader = ({ content }) => {

  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="md:text-[28px] text-[18px] leading-[130%] font-[400] text-primary/700">
            {content?.name || "Product Name Not Available"}
          </h1>
        </div>
      </div>

      <p className="md:text-[24px] text-[16px] font-400 leading-[140%] text-primary/700 mb-2">
        {content?.description}
      </p>

      {/* {content?.features && (
        <div className="flex flex-col flex-wrap gap-2 mb-4">
          {content?.features.map((feature, index) => (
            <div
              key={index}
              className="text-[14px] text-primary/700 leading-[150%] font-[400] flex items-center"
            >
              <Image src={tickIcon} alt="tick Icon" width={23} height={23} />
              <span className="ml-1">{feature}</span>
            </div>
          ))}
        </div>
      )} */}

      {/* <div className="flex gap-4">
        <button
          className="bg-Neutral/800 text-[#fff] hover:bg-Primary/500 hover:text-[#fff] w-[296px] h-[56px] px-[40px] py-[16px] rounded-[100px] font-medium"
          onClick={handleCancel}
        >
          BACK TO DIAGNOSTIC
        </button>
      </div> */}
    </div>
  );
};

export default ProductHeader;
