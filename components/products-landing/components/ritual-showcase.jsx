"use client";

import Image from "next/image";
import React, { useState } from "react";
import DNALookAlike from "@assets/images/dna-look-alike.png";
import PocketBlush from "@assets/images/pocket-blush.png";

const steps = [
  {
    title: "pocket blush",
    desc: "tap onto cheeks and lips for satiny, buildable color",
    image: "/assets/images/pocket-blush.png",
    label: "Lorem",
  },
  // Add more steps as needed
  { title: "", desc: "", image: "", label: "" },
  { title: "", desc: "", image: "", label: "" },
  { title: "", desc: "", image: "", label: "" },
  { title: "", desc: "", image: "", label: "" },
];

const RitualShowcase = () => {
  const [active, setActive] = useState(1);

  return (
    <section className="w-full py-12 md:py-28 md:px-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 px-4 md:px-0">
        {/* Left Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <div className="rounded-lg overflow-hidden w-full aspect-square bg-[#f5f5f5]">
            <Image
              src={DNALookAlike}
              alt="DNA look alike"
              width={700}
              height={700}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        {/* Right Content */}
        <div className="md:w-1/2 w-full bg-[#f6f5ee] rounded-lg flex flex-col justify-between p-8 md:p-12 min-h-[420px]">
          <div>
            {/* Heading */}
            <h2 className="text-[#1a232b] text-2xl md:text-3xl font-semibold mb-2">
              Get clear with a <span className="font-normal">RITUAL.</span>
            </h2>
            <div className="text-[#5c656d] mb-8">
              Essentials for your routine.
            </div>

            {/* Product details */}
            <div className="flex flex-row justify-between items-center mb-6 gap-4">
              {/* Text section */}
              <div className="flex-1 w-full">
                <div className="text-[#222] text-[16px] md:text-2xl font-light border-b border-[#222] mb-1">
                  {steps[active - 1].title || "pocket blush"}
                </div>
                <div className="text-[#5c656d] text-[12px] md:text-base">
                  {steps[active - 1].desc ||
                    "tap onto cheeks and lips for satiny, buildable color"}
                </div>
              </div>

              {/* Image */}
              <div className="flex-shrink-0 w-[120px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-auto relative text-center">
                <Image
                  src={PocketBlush}
                  alt="Product"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover rounded-md"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-4 mt-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center">
                {/* Circle button */}
                <button
                  className={`w-10 h-10 md:w-16 md:h-16 rounded-full border border-[#bdbdbd] flex items-center justify-center text-lg font-medium transition-all duration-200 ${
                    active === num
                      ? "bg-[#444] text-white border-[#444]"
                      : "bg-transparent text-[#444]"
                  }`}
                  onClick={() => setActive(num)}
                >
                  <span>{`0${num}`}</span>
                </button>

                {/* Label outside the circle */}
                {active === num && (
                  <span className="text-[16px] mt-2 font-normal text-[#444]">
                    {steps[num - 1].label || "Lorem"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RitualShowcase;
