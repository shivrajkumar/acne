import React from "react";
import MainFaq from "@/components/faq/MainFaq";
import Image from "next/image";
import FaqBanner from '@assets/images/faq-banner.webp'

const page = () => {
  return (
    <>
      <div className="relative w-full h-[400px]">
        <Image 
          src={FaqBanner} 
          fill 
          priority 
          className="object-cover" 
          alt="FAQ Banner"
        />
      <div className="absolute inset-0 bg-black/40 bg-opacity-50"></div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white text-[24px] md:text-[87px] font-rubik font-bold text-center">
            In case you were wondering...
          </div>
        </div>
      </div>
      <MainFaq />
    </>
  );
};

export default page;