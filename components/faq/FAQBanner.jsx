"use client";
import { CDN_BASE_URL } from "@/constants/constants";
import Image from "next/image";

export default function FAQBanner() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden font-lato">
      <div className="absolute inset-0">
        <Image
          src={`${CDN_BASE_URL}website_images/clear_rituals/experts_page/Expert_landing.webp`}
          alt="Expert Dermatologists"
          width={900}
          height={568}
          priority
          className="w-full h-full object-cover"
        />
          {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center">
          <h1 className="text-white text-[24px] md:text-[87px]  tracking-[0.5px] font-[400] leading-[130%]">
            In case you were wondering...
          </h1>
        </div>
      </div>
    </section>
  );
}
