import React from "react";
import SectionTitle from "./section-title";
import ClearSkinImage from "@assets/images/clear-skin.png";
import Image from "next/image";

const MagnesiumSkinCombo = () => {
  const items = [
    "3 forms of Magnesium",
    "3 forms of Magnesium",
    "3 forms of Magnesium",
    "3 forms of Magnesium",
    "3 forms of Magnesium",
    "3 forms of Magnesium",
  ];

  const Box = ({ title }) => (
    <div className="border border-black w-[160px] md:w-[350px]">
      <div className="bg-[#A6653D] text-white text-[18px] md:text-2xl font-normal text-center py-4 px-4">
        {title}
      </div>
      <div className="flex flex-col gap-3 p-2 md:p-4">
        {items.map((text, i) => (
          <div
            key={i}
            className="bg-yellow-200 text-[12px] md:text-base px-2 py-1 inline-block w-fit"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:flex items-center justify-center gap-10 font-sophiaPro">
        <Box title="Healthy Body" />
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#FAF7F0] text-4xl font-bold text-gray-700">
          +
        </div>
        <Box title="Skin Ritual" />
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#FAF7F0] text-4xl font-bold text-gray-700">
          =
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-4xl font-normal">
            <span className="text-gray-500">CLEAR</span>{" "}
            <span className="text-[#1E2C34] font-medium">Skin.</span>
          </h2>
          <Image
            src={ClearSkinImage}
            alt="Clear Skin"
            width={340}
            height={340}
            className="object-contain mt-4"
            priority
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col items-center gap-6 font-sophiaPro md:hidden">
        <div className="flex items-center justify-center px-4">
          <Box title="Healthy Body" />
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAF7F0] text-lg font-bold text-gray-700">
            +
          </div>
          <Box title="Skin Ritual" />
        </div>

        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAF7F0] text-lg font-bold text-gray-700">
          =
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-normal text-center">
            <span className="text-gray-500">CLEAR</span>{" "}
            <span className="text-[#1E2C34] font-medium">Skin.</span>
          </h2>
          <Image
            src={ClearSkinImage}
            alt="Clear Skin"
            width={320}
            height={320}
            className="object-contain mt-4"
            priority
          />
        </div>
      </div>
    </>
  );
};

const WhyItWorks = () => {
  return (
    <div className="w-full px-4 md:px-12 py-20">
      <SectionTitle title={"Why It Works"} />
      <div className="text-sm leading-relaxed md:text-[28px] font-normal">
        We make next level supplements you can trust and feel. This comes down
        to formulating with the best Source, Dose, Form. So how do we compare?
        See how Magnesi-Om , SuperHair and SuperYou stack up to
        other supplements.
      </div>
      <div className="mt-10">
        <MagnesiumSkinCombo />
      </div>
    </div>
  );
};

export default WhyItWorks;
