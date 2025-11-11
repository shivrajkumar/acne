"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

const troubleTen = [
  {
    num: 1,
    text: "Sulphates",
    bold: false,
    desc: "Strong foaming agents that strip natural oils, damage the skin barrier, and trigger oil overproduction - leading to clogged pores, irritation, and more breakouts.",
    img: "acne/general/trouble-ten/tt-sulphate.webp",
  },
  {
    num: 2,
    text: "Silicones",
    bold: false,
    desc: "Not harmful by themselves, but they don’t wash off easily. This can trap oil, dirt, and dead cells under the skin, clogging pores and leading to more acne.",
    img: "acne/general/trouble-ten/tt-silicone.webp",
  },
  {
    num: 3,
    text: "Fragrance",
    bold: false,
    desc: "Artificial or even natural fragrance can irritate sensitive skin. It adds no skin benefit but often causes redness, itching, and flare-ups.",
    img: "acne/general/trouble-ten/tt-fragrance.webp",
  },
  {
    num: 4,
    text: "Parabens",
    bold: false,
    desc: "Preservatives linked to hormonal disruption. Can worsen acne by destabilizing sebum levels and triggering deeper inflammation.",
    img: "acne/general/trouble-ten/tt-paraben.webp",
  },
  {
    num: 5,
    text: "Paraffin",
    bold: false,
    desc: "Heavy petroleum by-product that clogs pores, suffocates skin, and creates an occlusive layer - especially problematic for oily or acne-prone skin.",
    img: "acne/general/trouble-ten/tt-alcohol.webp",
  },
  {
    num: 6,
    text: "Butters",
    bold: false,
    desc: "Thick ingredients like shea and cocoa butter may moisturise but often block pores and worsen deep-seated acne.",
    img: "acne/general/trouble-ten/tt-butter.webp",
  },
  {
    num: 7,
    text: "Oils",
    bold: false,
    desc: 'Highly comedogenic oils trap bacteria, clog pores, and can trigger breakouts even in "non-comedogenic" formulations.',
    img: "acne/general/trouble-ten/tt-oils.webp",
  },
  {
    num: 8,
    text: "Phthalates",
    bold: false,
    desc: "Chemicals often used to make products flexible or long-lasting. They can disrupt hormones, affect skin balance, and indirectly trigger acne by worsening oil imbalance and inflammation inside the body.",
    img: "acne/general/trouble-ten/tt-dye.webp",
  },
  {
    num: 9,
    text: "Acne Causing UV Filters",
    bold: false,
    desc: "Sunscreen ingredients like oxybenzone, octinoxate, octocrylene, and avobenzone often irritate skin, causing stinging, redness, and acne flare-ups. For acne-prone users, these filters are unsafe compared to gentler, mineral-based options.",
    img: "acne/general/trouble-ten/tt-acne-prone.webp",
  },
  {
    num: 10,
    text: "Talc",
    bold: false,
    desc: "A powdery ingredient often used for absorbency and smooth texture. Once acne prone skin, it can clog pores, trap bacteria, and raise long-term safety concerns. We avoid it completely.",
    img: "acne/general/trouble-ten/tt-peg.webp",
  },
];

const TroubleTen = () => {
  const [selected, setSelected] = useState(troubleTen[0]);

  return (
    <section className="w-full bg-Secondary/200 py-12 md:py-20">
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-12 gap-12 md:gap-0">
        {/* Left Side */}
        <div className="md:w-2/3">
          <div className="text-[16px] text-[#222] mb-2">
            BTW, we are free from
          </div>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-semibold text-[#222] mb-6 leading-tight">
            The Non Ten: What We Never Use
          </h2>
          <p className="text-[#444] text-[1rem] md:text-xl max-w-2xl mb-8">
            Our formulas stay clear of 10 acne-triggering ingredient groups — we
            are designed to be 100% acne-safe.
          </p>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-y-2 gap-x-12 text-[1.35rem] md:text-2xl font-light">
            <div className="flex flex-col gap-2">
              {troubleTen.slice(0, 5).map((item) => (
                <button
                  key={item.num}
                  onClick={() => setSelected(item)}
                  className={`flex items-baseline gap-2 text-left transition-all duration-200 ${
                    selected.num === item.num
                      ? "font-semibold"
                      : "text-[#222]"
                  }`}
                >
                  <span className="text-base md:text-lg text-Grey/500 font-semibold md:font-normal mr-1">
                    {item.num}
                  </span>
                  <span
                    className={
                      item.bold ? "font-bold text-[14px]" : "text-[14px]"
                    }
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {troubleTen.slice(5).map((item) => (
                <button
                  key={item.num}
                  onClick={() => setSelected(item)}
                  className={`flex items-baseline gap-2 text-left transition-all duration-200 ${
                    selected.num === item.num
                      ? "font-semibold"
                      : "text-[#222]"
                  }`}
                >
                  <span className="text-base md:text-lg text-Grey/500 font-semibold md:font-normal mr-1">
                    {item.num}
                  </span>
                  <span
                    className={
                      item.bold ? "font-bold text-[14px]" : "text-[14px]"
                    }
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Dynamic Image */}
        <div className="md:w-1/3 flex justify-center md:justify-end mt-10 md:mt-0">
          <div className="bg-white rounded-full w-[360px] h-[360px] flex flex-col items-center justify-center shadow-md p-8 text-center transition-all duration-300">
            <div className="relative w-[80px] h-[80px]">
              <Image
                key={selected.img} // forces image refresh on change
                src={`${CDN_BASE_URL}${selected.img}`}
                alt={selected.text}
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>

            <h3 className="text-[#222] text-lg font-semibold mb-2">
              {selected.text}
            </h3>
            <p className="text-[#444] text-sm md:text-base">{selected.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TroubleTen;
