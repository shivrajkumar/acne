"use client";

import React from "react";

const features = [
  "Personalised prescription treatments",
  "Personalised skincare products",
  "Personalised internal supplements",
];

const IdealSkincareRitual = () => {
  return (
    <section className="bg-[#f1f4f4] w-full py-12 md:py-20 mb-20 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-start justify-between md:px-28 md:gap-10">
        <div className="md:w-1/2">
          <h2 className="text-[#1a232b] text-[24px] md:text-[2.5rem] font-normal mb-6">
            Build your Clear Ritual routine.
          </h2>
          <p className="text-[#5c656d] text-[14px] md:text-2xl leading-relaxed md:w-5/6">
            Clear Ritual treats acne and post-acne holistically - with
            dermatologist-designed, research-led care that’s personalised to
            your skin profile. Your kit isn’t generic. It’s built for your skin
            biology.
          </p>
        </div>

        <ul className="md:w-1/2 flex flex-col gap-6 mt-5">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center text-[#1a232b] text-[14px] md:text-2xl"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#000000] border border-[#1a232b] mr-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9" cy="9" r="9" fill="#000000" />
                  <path
                    d="M5 9.5L8 12.5L13 7.5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default IdealSkincareRitual;
