"use client";

import React from "react";
import { motion } from "framer-motion";
import WaveSVG1 from "@assets/svg/WaveSvg1";
import WaveSVG2 from "@assets/svg/WaveSvg2";
import WaveSVG3 from "@assets/svg/WaveSvg3";

const categories = [
  "Nutrition",
  "Lifestyle",
  "Hormones",
  "Metabolism",
  "Aging",
  "Stress",
];

export default function WaveMarquee() {
  return (
    <div className="relative overflow-hidden w-full bg-white py-10 h-auto ">
      <div className="max-w-5xl mx-auto px-4 md:px-0  md:flex flex-wrap md:gap-32 md:items-center text-left md:pt-20 md:pb-20">
        <h2 className="text-[28px] md:text-[40px] font-[500] mb-2 md:w-[290px] w-[328px] leading-[130%]">
          Because Your Skin is Unique
        </h2>
        <p className="text-gray-600 md:text-[16px] font-[400] text[14px] leading-[150%] md:w-[509px] w-auto text-wrap md:text-right">
        No two skins — or acne triggers — are the same. 
        Clear Ritual delivers solutions personalised for your unique skin
        </p>
      </div>

      <div className="relative w-full h-[523px]">
        <motion.div className="absolute left-0 top-0 flex items-center animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-end">
              {categories.map((category, index) => {
                const WaveComponent = [WaveSVG1, WaveSVG2, WaveSVG3][index % 3];
                return (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-400 text-[20px] text-[#2872A1] mt-1 mb-3 leading-[140%]">
                      {category}
                    </span>
                    <WaveComponent />
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee animation keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
