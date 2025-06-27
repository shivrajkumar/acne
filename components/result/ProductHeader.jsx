"use client"
import React from "react";
import Image from "next/image";
import tickIcon from "@assets/svg/tick.svg";
import renderStars from "./ProductStarRating";

const ProductHeader = ({ content, handleCancel }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="md:text-[28px] text-[18px] leading-[130%] font-[400] text-primary/700">
            {content?.name || "Product Name Not Available"}
          </h1>
          <p className="md:text-[28px] text-[18px] leading-[130%] font-[600] text-primary/700">
            {content?.subtitle}
          </p>
          <div className="flex md:flex-row flex-col md:items-center md:gap-3 gap-1 mb-2">
            {content?.rating?.stars &&
              renderStars(content?.rating?.stars, "text-primary/700")}
            <div className="text-[14px] font-[400] leading-[150%] text-primary/700">
              {content?.rating?.stars && (
                <span className="mr-2">{content?.rating?.stars}</span>
              )}
              {content?.rating?.reviews && (
                <span className="mr-4">
                  {content?.rating?.reviews.toLocaleString()} reviews
                </span>
              )}
              {content?.ph_score && (
                <div className="px-4 border-l-Elements/Divider-Stroke border-l-[2px] inline-block">
                  ph score: {content?.ph_score}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="md:text-[24px] text-[16px] font-400 leading-[140%] text-primary/700 mb-2">
        {content?.description}
      </p>
      <p className="text-[14px] font-400 leading-[150%] text-primary/700 mb-2">
        {content?.detailed_description}
      </p>

      {content?.features && (
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
      )}

      <div className="flex gap-4">
        <button
          className="bg-Neutral/800 text-[#fff] hover:bg-Primary/500 hover:text-[#fff] w-[296px] h-[56px] px-[40px] py-[16px] rounded-[100px] font-medium"
          onClick={handleCancel}
        >
          BACK TO DIAGNOSTIC
        </button>
      </div>
    </div>
  );
};

export default ProductHeader;
