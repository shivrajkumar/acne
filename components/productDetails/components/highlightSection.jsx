import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import BannerImage from '../../../assets/images/highlight-section.png'

export default function HighlightSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-[80vh] mt-20">
      <Image
        src={BannerImage}
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
        <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-medium leading-snug max-w-3xl">
          We pair potent ingredients with proven formulations to craft
          supplements for whole body health.
        </h1>

        <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-6 py-3 font-medium text-sm md:text-[16px] shadow-md hover:shadow-lg transition">
          Take The Skin Diagnosis <FaArrowRight size={18}/>
        </button>
      </div>
    </section>
  );
}
