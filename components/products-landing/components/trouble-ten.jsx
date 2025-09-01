"use client";

import React from "react";

const troubleTen = [
  { num: 1, text: "essential oils", bold: false },
  { num: 2, text: "drying alcohols", bold: true },
  { num: 3, text: "silicones", bold: false },
  { num: 4, text: "chemical sunscreens", bold: false },
  { num: 5, text: "fragrances/dyes", bold: false },
  { num: 6, text: "SLS", bold: false },
  { num: 7, text: "SLS", bold: false },
  { num: 8, text: "SLS", bold: false },
  { num: 9, text: "SLS", bold: false },
  { num: 10, text: "SLS", bold: false },
];

const TroubleTen = () => {
  return (
    <section className="w-full bg-[#f8e477] py-12 md:py-20">
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-12 gap-12 md:gap-0">
        {/* Left Side */}
        <div className="md:w-2/3">
          <div className="text-[16px] text-[#222] mb-2">BTW, we are free from the</div>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-semibold text-[#222] mb-6 leading-tight">Trouble Ten</h2>
          <p className="text-[#444] text-[1rem] md:text-xl max-w-2xl mb-8">
            We avoid six categories of ingredients, many of which, research has shown, can be at the root of common skin issues, such as sensitivity and breakouts. They’re not scary; they’re just the things we think have the potential to be troublesome for the skin.
          </p>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-y-2 gap-x-12 text-[1.35rem] md:text-2xl font-light">
            <div className="flex flex-col gap-2">
              {troubleTen.slice(0, 5).map((item) => (
                <div key={item.num} className="flex items-baseline gap-2">
                  <span className="text-base md:text-lg text-[#b2a15a] font-semibold md:font-normal mr-1">{item.num}</span>
                  <span className={item.bold ? "font-bold text-[14px]" : "text-[14px]"}>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {troubleTen.slice(5).map((item) => (
                <div key={item.num} className="flex items-baseline gap-2">
                  <span className="text-base md:text-lg text-[#b2a15a] font-semibold md:font-normal mr-1">{item.num}</span>
                  <span className={item.bold ? "font-bold text-[14px]" : "text-[14px]"}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="md:w-1/3 flex justify-center md:justify-end mt-10 md:mt-0">
          <div className="bg-white rounded-full w-[360px] h-[360px] flex flex-col items-center justify-center shadow-md p-8 text-center">
            <span className="mb-4">
              {/* No SLS icon */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="27" fill="#fff" stroke="#F05CB3" strokeWidth="2"/>
                <g>
                  <ellipse cx="28" cy="28" rx="12" ry="4" stroke="#888" strokeWidth="2"/>
                  <ellipse cx="22" cy="28" rx="2" ry="2" fill="#fff" stroke="#888" strokeWidth="2"/>
                  <ellipse cx="28" cy="28" rx="2" ry="2" fill="#fff" stroke="#888" strokeWidth="2"/>
                  <ellipse cx="34" cy="28" rx="2" ry="2" fill="#fff" stroke="#888" strokeWidth="2"/>
                </g>
                <line x1="16" y1="40" x2="40" y2="16" stroke="#F05CB3" strokeWidth="3"/>
              </svg>
            </span>
            <p className="text-[#444] text-base md:text-lg">
              Sodium lauryl sulfate is just a little too good at its job. The cleansing agent takes too much from skin, sapping the protective barrier of critical lipids, which are required for skin to function at its happiest, healthiest state.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TroubleTen;
