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

  // ✅ Preload all step images when the component mounts
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
        <div className="md:w-1/2 w-full bg-[#f6f5ee] rounded-lg flex flex-col justify-between p-8 md:p-12 min-h-[420px]">
          <div>
            {/* Heading */}
            <h2 className="text-[#1a232b] text-2xl md:text-3xl font-semibold mb-2">
              Get clear with a <span className="font-normal">RITUAL.</span>
            </h2>
            <div className="text-[#5c656d]">
              Essentials for your anti-acne routine.
            </div>

            {/* Product details */}
            <div className="flex flex-row justify-between items-center mb-2 gap-4">
              {/* Text section */}
              <div className="flex-1 w-full">
                <div className="text-[#222] text-[16px] md:text-2xl font-light border-b border-[#222] mb-1">
                  {currentStep.title}
                </div>
                <div className="text-[#5c656d] text-[12px] md:text-base">
                  {currentStep.desc}
                </div>
              </div>

              {/* Dynamic image */}
              <div className="flex-shrink-0 w-[120px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-auto relative text-center">
                <Image
                  src={`${CDN_BASE_URL}${currentStep.image}`}
                  alt={currentStep.title}
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain rounded-md transition-all duration-300"
                  priority={active === 1} // Preload the first one only
                />
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-4 flex-wrap">
            {steps.map((step, index) => {
              const num = index + 1;
              const isActive = active === num;
              return (
                <div key={num} className="flex flex-col items-center">
                  {/* Circle button */}
                  <button
                    className={`w-10 h-10 md:w-16 md:h-16 rounded-full border border-[#bdbdbd] flex items-center justify-center text-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#444] text-white border-[#444]"
                        : "bg-transparent text-[#444]"
                    }`}
                    onClick={() => setActive(num)}
                  >
                    <span>{`0${num}`}</span>
                  </button>

                  {/* Label (always rendered to preserve height) */}
                  <span
                    className={`text-[16px] mt-2 font-normal text-[#444] transition-opacity duration-200 ${
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
