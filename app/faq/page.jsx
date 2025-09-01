import React from "react";
import MainFaq from "@/components/faq/MainFaq";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

const page = () => {
  return (
    <>
      <div className="relative w-full h-[400px]">
        <Image 
          src={`${CDN_BASE_URL}acne/faq-webp/faq-banner.webp`} 
          fill 
          priority 
          className="object-cover" 
          alt="FAQ Banner"
        />
      <div className="absolute inset-0 bg-black/40 bg-opacity-50"></div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white text-[24px] font-sophiaPro md:text-[87px] font-normal text-center">
            For Your Information...
          </div>
        </div>
      </div>
      <MainFaq />
    </>
  );
};

export default page;