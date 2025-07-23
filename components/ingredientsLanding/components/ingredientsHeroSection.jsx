import React from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

const IngredientsHeroSection = () => {
  return (
    <section className="relative w-full">
      {/* Desktop Version */}
      <div className="hidden md:block relative w-full h-[542px]">
        {/* Background Image */}
        <Image
          src={`${CDN_BASE_URL}acne/ingredients/ingredients-landing-desktop.webp`}
          alt="Ingredient Hero Background"
          width={1600}
          height={542}
          className="w-full h-full object-cover rounded-xl"
          priority
        />

        {/* Turmeric Image */}
        <div className="absolute top-1/2 -translate-y-1/2 left-10 w-[400px] h-[400px]">
          <Image
            src={`${CDN_BASE_URL}acne/ingredients/turmeric.webp`}
            alt="Turmeric"
            width={400}
            height={400}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Text */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[45%] text-left pr-10">
          <h1 className="text-[80px] font-sophiaPro font-normal text-[#262626] leading-tight">
            Engineered for results with <br />
            naturally potent ingredients.
          </h1>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden relative w-full h-[500px]">
  {/* Background Image */}
  <Image
    src={`${CDN_BASE_URL}acne/ingredients/ingredients-landing-mobile.webp`}
    alt="Ingredient Hero Background"
    fill
    className="object-cover rounded-xl"
    priority
  />

  {/* Overlay Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-between py-6 px-4 z-10">
    {/* Text */}
    <h1 className="text-[40px] font-sophiaPro font-normal text-[#262626] text-center leading-tight px-3 py-2 rounded-md">
      Engineered for results with <br className="hidden sm:block" />
      naturally potent ingredients.
    </h1>

    {/* Turmeric Image */}
    <div className="w-[220px] h-[220px]">
      <Image
        src={`${CDN_BASE_URL}acne/ingredients/turmeric.webp`}
        alt="Turmeric"
        width={100}
        height={100}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  </div>
</div>
    </section>
  );
};

export default IngredientsHeroSection;