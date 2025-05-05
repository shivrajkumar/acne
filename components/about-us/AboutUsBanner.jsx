"use client";
import Image from "next/image";
import { CDN_BASE_URL } from "@constants/config";

const AboutUsBanner = () => {
  return (
    <section className="relative w-full md:h-[75vh] h-[77vh] overflow-hidden">
      <div className="hidden md:flex">
        <Image
          src={`${CDN_BASE_URL}website_images/vayu/about_us_page/SkinBannerImage.webp`}
          alt="Clear Ritual Skin Care"
          fill
          loading="eager"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="flex md:hidden">
        <Image
          src={`${CDN_BASE_URL}website_images/clear_rituals/about_us_page/SkinBannerImage-mobile.webp`}
          alt="Clear Ritual Skin Care"
          fill
          loading="eager"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute flex justify-center items-center top-0 bottom-0 bg-[radial-gradient(53.72%_142.34%_at_64.1%_50%,_rgba(140,101,78,0.7)_0%,_rgba(74,47,34,0.9)_100%)] z-10" />
      <div className="absolute inset-0 z-20 flex items-end md:items-center justify-start px-4 md:px-16">
        <div className="text-left space-y-6 max-w-lg mb-6">
          <h1 className="text-[40px] md:text-[44px] font-[500] font-lato text-[#FFFFFF] leading-[120%] ">
            We Know Acne. <br /> We Know What Works.
          </h1>
          <p className="text-[#FFFFFF] text-[14px] font-[400] md:text-[16px] leading-[150%] ">
            Skincare shouldn’t be trial and error. If you’ve tried endless products and trends without results, Clear Ritual offers personalised, expert-backed acne solutions that finally work for your skin.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsBanner;
