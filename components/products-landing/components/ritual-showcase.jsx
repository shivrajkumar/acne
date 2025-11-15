"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import DNALookAlike from "@assets/images/dna-look-alike.png";
import { CDN_BASE_URL } from "@/constants/constants";

const steps = [
  {
    title: "Step 1 - Cleanse",
    desc: "Acne-safe face cleansers that gently clear pores, reduce excess oil, and soothe sensitive, breakout-prone skin.",
    image: "acne/products/pl-cleanse.webp",
    label: "Cleanse",
  },
  {
    title: "Step 2 - Hydrate",
    desc: "Lightweight, non-comedogenic moisturisers that support barrier repair, even skin tone, and long-term hydration.",
    image: "acne/products/pl-moisturiser.webp",
    label: "Hydrate",
  },
  {
    title: "Step 3 - Treat",
    desc: "Prescription-strength formulations that go deep - targeting acne-causing bacteria, inflammation, and clogged pores for visible results.",
    image: "acne/products/pl-treat.webp",
    label: "Treat",
  },
  {
    title: "Step 4 - Protect",
    desc: "Sunscreens designed for acne-prone skin. Zero white cast. Zero comedogenic ingredients. Just safe, everyday protection from UV and pollution.",
    image: "acne/products/pl-sunscreen.webp",
    label: "Protect",
  },
  {
    title: "Step 5 - Feed",
    desc: "Ayurvedic, root-cause supplements that target internal acne triggers - like hormones, gut health, and inflammation - to prevent future flare-ups.",
    image: "acne/products/pl-tablet.webp",
    label: "Feed",
  },
];

const RitualShowcase = () => {
  const [active, setActive] = useState(1);
  const currentStep = steps[active - 1];

  // Preload all step images
  useEffect(() => {
    steps.forEach((step) => {
      const img = new window.Image();
      img.src = `${CDN_BASE_URL}${step.image}`;
    });
  }, []);

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
        <div className="md:w-1/2 w-full bg-[#f6f5ee] rounded-lg flex flex-col justify-between p-8 md:p-12 min-h-[420px] relative">
          <div>
            {/* Heading */}
            <h2 className="text-[#0F1B28] text-2xl md:text-3xl font-semibold mb-2">
              Get clear with the{" "}
              <span className="font-normal text-[#67645E]">RITUAL.</span>
            </h2>
            <div className="text-[#5c656d] mb-6">
              Essentials for your anti-acne routine.
            </div>

            {/* Product details */}
            <div className="flex flex-row justify-between items-center gap-4 relative w-full">
              {/* Text section */}
              <div className="flex-col w-full relative">
                {/* Title */}
                <div className="text-[#222] text-[16px] md:text-2xl font-light">
                  {currentStep.title}
                </div>

                {/* Line + Dot overlapping image */}
                <div className="absolute top-1/4 left-0 h-[1px] bg-[#222] z-50 w-[130%] md:w-[calc(100%-300px)]">
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-[#222] rounded-full"></div>
                </div>

                {/* Description */}
                <div className="text-[#5c656d] text-[12px] md:text-[16px] mt-6">
                  {currentStep.desc}
                </div>
              </div>

              {/* Dynamic image */}
              <div className="flex-shrink-0 w-[140px] sm:w-[200px] md:w-[250px] lg:w-[350px] h-auto relative text-center">
                <Image
                  src={`${CDN_BASE_URL}${currentStep.image}`}
                  alt={currentStep.title}
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain rounded-md transition-all duration-300"
                  priority={active === 1}
                />
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex gap-4 mt-6 w-full justify-start">
            {steps.map((step, index) => {
              const num = index + 1;
              const isActive = active === num;
              return (
                <div
                  key={num}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  {/* Circle button */}
                  <button
                    className={`w-10 h-10 md:w-16 md:h-16 rounded-full border border-Secondary/400 flex items-center justify-center text-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-Secondary/500 text-white border-Secondary/400"
                        : "bg-transparent text-[#444]"
                    }`}
                    onClick={() => setActive(num)}
                  >
                    <span>{`0${num}`}</span>
                  </button>

                  {/* Label */}
                  <span
                    className={`text-[16px] md:text-[18px] mt-2 font-normal text-Secondary/500 transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RitualShowcase;
