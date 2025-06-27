"use client";
import Image from "next/image";
import React, { useState } from "react";
import CollapseIcon from "@assets/svg/downArrow.svg";

const ProductFAQs = ({ faqs }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = expandedFAQ === index;

        return (
          <div
            key={index}
            className="border-b border-b-Elements/Divider-Stroke transition-all duration-300"
          >
            <button
              className="w-full flex justify-between items-center py-2 text-left"
              onClick={() => setExpandedFAQ(isOpen ? null : index)}
            >
              <span className="font-[400] md:text-[18px] text-[14px] leading-[140%] text-primary/700">
                {faq?.question}
              </span>
              <Image
                src={CollapseIcon}
                alt="toggle icon"
                width={20}
                height={20}
                className={`transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out px-4`}
              style={{
                maxHeight: isOpen ? "500px" : "0px",
                opacity: isOpen ? 1 : 0,
                paddingBottom: isOpen ? "1rem" : "0px",
              }}
            >
              <div className="text-Grey-Neutral/400 md:text-[14px] text-[12px] leading-[150%] font-[400] transition-opacity duration-500">
                {faq?.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductFAQs;
