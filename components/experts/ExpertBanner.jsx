"use client";
import Image from "next/image";
import { CDN_BASE_URL } from "@constants/config";

export default function ExpertBanner() {
  return (
    <section className=" bg-Background/Beige flex items-center flex-col md:flex-row">
      <div className="flex w-full flex-col-reverse md:flex-row items-center justify-between md:px-10 md:pt-10 md:pb-0">
        <div className="md:max-w-[100%] max-w-fit mt-[7px]">
          <Image
            src={`${CDN_BASE_URL}website_images/clear_rituals/experts_page/Expert_landing.webp`}
            alt="Expert Dermatologists"
            width={900}
            height={568}
            className="object-contain"
          />
        </div>

        {/* Shifted Text to the Left */}
        <div className="px-[24px] md:mr-[30px] w-full md:w-[702px] text-left md:text-left ml-auto md:-ml-[9px]">
          <div className="text-[44px] leading-[120%] md:w-[550px] text-wrap w-[313px] mt-[40px] font-[500] text-Text/Heading-Text font-lato">
            Our Experts:
            <br />
            Dermatologists Behind Clear Ritual’s Personalised Acne
            Solutions
          </div>

          <div className="text-Text/Body-Text mt-4 text-[16px] font-[400]  md:w-[400px] text-wrap w-[313px]  tracking-[-0.01em] leading-[150%] font-lato">
            Developed with top dermatologists and doctors, our solutions blends
            science and Ayurveda for real results.
          </div>
        </div>
      </div>
    </section>
  );
}
