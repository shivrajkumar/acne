"use client";

import React from "react";
import Image from "next/image";
import SocialTrustImage from "@assets/images/social-trust.png";
import SocialTrustImageMobile from '@assets/images/mobile-social-trust.png'
import useMediaQuery from "@/hooks/useMediaQuerry";

const stats = [
  {
    title: "No. 1",
    desc: "Nutritionist Recommended Brand",
  },
  {
    title: "25,00,000",
    desc: "Sticks Consumed",
  },
  {
    title: "Clinically",
    desc: "Proven Strains",
  },
  {
    title: "US FDA",
    desc: "Licensed",
  },
];

const SocialTrust = () => {

const isMobile = useMediaQuery("(max-width: 600px)")
  return (
    <section className="w-full py-12 md:py-0">
      <div className="mx-auto px-4 md:px-0 md:py-20 bg-[#faf8f0]">
        <h2 className="text-center text-[#1a232b] text-2xl md:text-4xl font-normal mb-12">
          Uncompromising Science. Unshaken Trust.
        </h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`
            flex flex-col items-center justify-center py-8
            border-[#ecebe4]
            ${idx < stats.length - 2 ? "border-b md:border-b-0" : ""}
            ${idx % 2 === 0 ? "border-r md:border-r-0" : ""}        
            md:border-r md:last:border-r-0
          `}
            >
              <div className="text-[#1a232b] text-[18px] md:text-4xl font-normal mb-2">
                {stat.title}
              </div>
              <div className="text-[#222] text-[14px] md:text-[18px] text-center font-light leading-snug px-6 md:px-0">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Trust logos */}
        <div className="w-full flex justify-center">
          <div className="w-full px-4 md:px-8 py-6 flex flex-wrap items-center justify-center">
            <Image
              src={isMobile ? SocialTrustImageMobile : SocialTrustImage}
              alt="Social Trust Badges"
              width={1200}
              height={120}
              className="object-contain h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialTrust;
