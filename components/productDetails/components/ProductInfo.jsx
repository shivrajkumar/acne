import { CDN_BASE_URL } from "@/constants/constants";
import Image from "next/image";
import React from "react";

const ProductInfo = ({
  title,
  subtitle,
  description,
  benefits,
  feels,
  smells,
  btw,
  price,
  size,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Title Section */}
      <div className="flex justify-end">
        <div className="w-fit bg-[#FFF88A] text-Grey/900 text-sm font-medium px-3 py-1 font-sophiaPro">
          ACNE CARE
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-[18px] md:text-[40px] font-bold text-[#0F1B28] tracking-wide font-sophiaPro">
          {title}
        </h1>
        <div className="flex flex-col gap-1">
          {/* Subtitle + Price (mobile only with justify-between) */}
          <div className="flex justify-between items-center md:block">
            <h2 className="text-[16px] md:text-[18px] font-normal text-[#0F1B28] md:text-Grey/500 tracking-[0.5px] font-sophiaPro">
              {/* This is byline */}
              {subtitle}
            </h2>
          </div>
          {/* Price only visible on mobile */}
          <div className="flex items-center gap-1 text-[12px] md:text-[16px] font-normal text-[#0F1B28] font-sophiaPro mt-2">
            <div className="">Rs. {price}</div>

            {/* Separator + Size */}
            <div className="">
              <span className="">| </span>
              {size}
            </div>
          </div>

          {/* Description */}
          {/* {description && (
            <p className="text-[14px] md:text-[16px] text-[#505354] leading-[1.5] font-sophiaPro mt-5">
              {description}
            </p>
          )} */}
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col gap-4">
        <>
          <InfoRow label="BENEFITS:" value={benefits} />
          <InfoRow label="FEELS LIKE:" value={feels} hasBorder />
          <InfoRow label="SMELLS LIKE:" value={smells} hasBorder />
          <InfoRow label="BTW," value={btw} hasBorder />
        </>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, hasBorder = false }) => {
  return (
    <div
      className={`flex flex-row md:gap-[100px] items-start pt-4 ${
        hasBorder ? "border-t border-[#E9EDED]" : ""
      }`}
    >
      <div className="text-sm md:text-[18px] text-[#0F1B28] uppercase font-sophiaPro w-full md:w-1/2">
        {label}
      </div>
      <div className="text-[14px] md:text-[16px] text-[#505354] font-sophiaPro w-full md:w-1/2 md:text-right mt-1 md:mt-0">
        {value}
      </div>
    </div>
  );
};

export default ProductInfo;
