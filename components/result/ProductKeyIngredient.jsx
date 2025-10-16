"use client";
import Image from "next/image";
import React, { useState } from "react";
import CollapseIcon from "@assets/svg/downArrow.svg";

const ProductKeyIngredient = ({ keyIngredients }) => {
  console.log('keyIngredients', keyIngredients)
  const [expandedIngredient, setExpandedIngredient] = useState(0);
  return (
    <div className="space-y-3">
      {keyIngredients.map((ingredient, index) => {
        const isOpen = expandedIngredient === index;

        return (
          <div
            key={index}
            className="border-b border-b-Elements/Divider-Stroke transition-all duration-300"
          >
            <button
              className="w-full flex justify-between items-center py-2 text-left"
              onClick={() => setExpandedIngredient(isOpen ? null : index)}
            >
              <span className="font-[400] md:text-[18px] text-[14px] leading-[140%] text-primary/700">
                {ingredient}
              </span>
              <Image
                src={CollapseIcon}
                alt="toggle icon"
                width={20}
                height={20}
                className={`transform transition-transform duration-500 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className="overflow-hidden transition-all duration-500 ease-in-out px-4"
              style={{
                maxHeight: isOpen ? "500px" : "0px",
                opacity: isOpen ? 1 : 0,
                paddingBottom: isOpen ? "1rem" : "0px",
              }}
            >
              <div className="text-Grey-Neutral/400 md:text-[14px] text-[12px] leading-[150%] font-[400] transition-opacity duration-500">
                {ingredient}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductKeyIngredient;
