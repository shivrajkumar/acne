"use client";

import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

const features = [
  "Personalised prescription treatments",
  "Personalised skincare products",
  "Personalised internal supplements",
];

const IdealSkincareRitual = () => {
  return (
    <section className="bg-[#f1f4f4] w-full py-12 md:py-20 mb-12 md:mb-16 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:px-28 md:gap-10">
        
        {/* Left Section */}
        <div className="md:w-1/2">
          <h2 className="text-[#1a232b] text-[24px] md:text-[2.5rem] font-normal mb-6">
            Build your Clear Ritual routine.
          </h2>
          <p className="text-[#5c656d] text-[14px] md:text-2xl leading-relaxed md:w-5/6">
            Clear Ritual treats acne and post-acne holistically - with
            dermatologist-designed, research-led care that’s personalised to
            your skin profile. Your plan isn’t generic. It’s built for your skin
            biology.
          </p>
        </div>

        {/* Right Section */}
        <ul className="md:w-1/2 flex flex-col gap-2 mt-5">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center text-[#1a232b] text-[14px] md:text-2xl"
            >
              <IoIosCheckmarkCircle size={24} className="mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default IdealSkincareRitual;
