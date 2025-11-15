import React from "react";
import SectionTitle from "./section-title";
import ClearSkinImage from "@assets/images/clear-skin.png";
import Image from "next/image";

const MagnesiumSkinCombo = () => {

  const healthyBodyItems = ["Balanced hormones", "Clean liver", "Happy gut", "Purified blood", "Calm mind", "Healthy metabolism"];
  const skinRitualItems = ["Potent Actives", "UV Protection", "Anti Pollution", "Anti - Bacterial", "Oil Control"," Scar Fading", "Deep Hydration"];

  const Box = ({ title, items }) => (
    <div className="border border-black w-[200px] md:w-[350px]">
      <div className="bg-[#A6653D] text-white text-[18px] md:text-2xl font-normal text-left py-4 px-4">
        {title}
      </div>
      <div className="flex flex-col gap-3 p-2 md:p-4">
        {items.map((text, i) => (
          <div
            key={i}
            className="bg-yellow-200 text-[12px] md:text-[16px] px-2 py-1 inline-block w-fit"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center gap-10 font-sophiaPro">
        <Box title="Healthy Body" items={healthyBodyItems} />

        {/* Center-aligned "+" symbol */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#FAF7F0] text-4xl font-bold text-gray-700 pb-2">
            +
          </div>
        </div>

        <Box title="Skin Ritual" items={skinRitualItems} />

        {/* Center-aligned "=" symbol */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#FAF7F0] text-4xl font-bold text-gray-700 pb-2">
            =
          </div>
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
      <div className="flex flex-col items-center gap-6 font-sophiaPro md:hidden w-full">
        <div className="flex items-center justify-center w-full max-w-sm mx-auto gap-3">
          <Box title="Healthy Body" items={healthyBodyItems} />

          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#FAF7F0] text-lg font-bold text-gray-700 flex-shrink-0 pb-1">
            +
          </div>

          <Box title="Skin Ritual" items={skinRitualItems} />
        </div>

        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAF7F0] text-lg font-bold text-gray-700 flex-shrink-0 pb-1">
          =
        </div>

        <div className="flex flex-col items-center max-w-sm w-full text-center">
          <h2 className="text-2xl font-normal">
            <span className="text-gray-500">CLEAR</span>{" "}
            <span className="text-[#1E2C34] font-medium">Skin.</span>
          </h2>
          <Image
            src={ClearSkinImage}
            alt="Clear Skin"
            width={320}
            height={320}
            className="object-contain mt-4 w-full max-w-xs"
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
      <SectionTitle title={"Why it Works"} />
      <div className="text-sm leading-relaxed md:text-[28px] font-normal">
        At Clear Ritual, we target the real acne triggers inside the body while supporting your skin from the outside. That’s what makes our approach different, and long-term.
      </div>

      <div className="mt-10">
        <MagnesiumSkinCombo />
      </div>
    </div>
  );
};

export default WhyItWorks;
