"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

const troubleTen = [
  {
    num: 1,
    text: "Sulfates",
    desc: "Strong foaming agents that strip natural oils, damage the skin barrier, and trigger oil overproduction - leading to clogged pores, irritation, and more breakouts.",
    img: "acne/general/trouble-ten/tt-sulphate.webp",
  },
  {
    num: 2,
    text: "Silicones",
    desc: "Not harmful by themselves, but they don’t wash off easily. This can trap oil, dirt, and dead cells under the skin, clogging pores and leading to more acne.",
    img: "acne/general/trouble-ten/tt-silicone.webp",
  },
  {
    num: 3,
    text: "Fragrance",
    desc: "Artificial or even natural fragrance can irritate sensitive skin. It adds no skin benefit but often causes redness, itching, and flare-ups.",
    img: "acne/general/trouble-ten/tt-fragrance.webp",
  },
  {
    num: 4,
    text: "Parabens",
    desc: "Preservatives linked to hormonal disruption. Can worsen acne by destabilizing sebum levels and triggering deeper inflammation.",
    img: "acne/general/trouble-ten/tt-paraben.webp",
  },
  {
    num: 5,
    text: "Paraffin",
    desc: "Heavy petroleum by-product that clogs pores, suffocates skin, and creates an occlusive layer - especially problematic for oily or acne-prone skin.",
    img: "acne/general/trouble-ten/tt-paraffin.webp",
  },
  {
    num: 6,
    text: "Butters",
    desc: "Thick ingredients like shea and cocoa butter may moisturise but often block pores and worsen deep-seated acne.",
    img: "acne/general/trouble-ten/tt-butter.webp",
  },
  {
    num: 7,
    text: "Oils",
    desc: 'Highly comedogenic oils trap bacteria, clog pores, and can trigger breakouts even in "non-comedogenic" formulations.',
    img: "acne/general/trouble-ten/tt-oils.webp",
  },
  {
    num: 8,
    text: "Phthalates",
    desc: "Chemicals used to make products flexible or long-lasting. They can disrupt hormones, affect skin balance, and indirectly trigger acne via oil imbalance and inflammation.",
    img: "acne/general/trouble-ten/tt-phthalates.webp",
  },
  {
    num: 9,
    text: "Acne Causing Sun Filters",
    desc: "Sunscreen ingredients like oxybenzone, octinoxate, and avobenzone often irritate skin, causing stinging, redness, and acne flare-ups.",
    img: "acne/general/trouble-ten/tt-acne-prone.webp",
  },
  {
    num: 10,
    text: "Alcohol",
    desc: "It can disrupt the skin barrier, increase dryness and irritation, and trigger more oil production in acne-prone skin. These effects can worsen breakouts over time.",
    img: "acne/general/trouble-ten/tt-alcohol.webp",
  },
];

const TroubleTen = () => {
  const [selected, setSelected] = useState(troubleTen[0]);

  return (
    <section className="w-full bg-[#EFECDD] py-12 md:py-20">
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-12 gap-8 md:gap-0">
        {/* Left Side */}
        <div className="md:w-2/3">
          <div className="text-[16px] text-[#222] mb-2">
            BTW, we are free from
          </div>

          <h2 className="text-[2.5rem] md:text-[3.5rem] font-normal text-[#222] mb-6 leading-tight">
            The Trouble Ten
          </h2>

          <p className="text-[#444] text-[1rem] md:text-xl max-w-2xl mb-8">
            Our formulas stay clear of 10 acne-triggering ingredient groups — we
            are designed to be 100% acne-safe.
          </p>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-y-2 gap-x-0 md:gap-x-12 font-light mt-2">
            {/* Left Column */}
            <div className="flex flex-col gap-2">
              {troubleTen.slice(0, 5).map((item) => {
                const isActive = selected.num === item.num;
                return (
                  <button
                    key={item.num}
                    onClick={() => setSelected(item)}
                    className={`flex items-baseline gap-2 text-left transition-all duration-200
            ${
              isActive
                ? "font-normal text-[20px] text-[#000]"
                : "text-[#222] text-[18px]"
            }`}
                  >
                    <span
                      className={`text-base md:text-lg mr-1 ${
                        isActive ? "text-[#000] font-normal" : "text-Grey/500"
                      }`}
                    >
                      {item.num}
                    </span>

                    <span>{item.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-2">
              {troubleTen.slice(5).map((item) => {
                const isActive = selected.num === item.num;
                return (
                  <button
                    key={item.num}
                    onClick={() => setSelected(item)}
                    className={`flex items-baseline gap-2 text-left transition-all duration-200
            ${
              isActive
                ? "font-semibold text-[20px] text-[#000]"
                : "text-[#222] text-[18px]"
            }`}
                  >
                    <span
                      className={`text-base md:text-lg mr-1 ${
                        isActive ? "text-[#000] font-semibold" : "text-Grey/500"
                      }`}
                    >
                      {item.num}
                    </span>

                    <span>{item.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/3 flex justify-center md:justify-end md:mt-12">
          <div className="bg-white rounded-full w-[320px] h-[320px] md:w-[420px] md:h-[420px] flex flex-col items-center justify-center shadow-md p-8 text-center transition-all duration-300">
            <div className="relative w-[80px] h-[80px]">
              <Image
                key={selected.img}
                src={`${CDN_BASE_URL}${selected.img}`}
                alt={selected.text}
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>

            <h3 className="text-[#222] font-semibold mt-4 text-[14px] md:text-[18px]">
              {selected.text}
            </h3>

            <p className="text-[#444] text-[14px] md:text-[18px] tracking-[0.5px]">
              {selected.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TroubleTen;
