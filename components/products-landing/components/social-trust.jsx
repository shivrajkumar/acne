"use client";

import React from "react";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuerry";
import { CDN_BASE_URL } from "@/constants/constants";

const stats = [
  {
    title: "100%",
    desc: "non-comedogenic formulations",
  },
  {
    title: "Dermatologist",
    desc: "designed, clinically proven actives",
  },
  {
    title: "FDA",
    desc: "registered, globally compliant, and safety-verified",
  },
  {
    title: "100%",
    desc: "acne-safe across all skin types",
  },
];

const trustBadges = [
  {
    name: "ALLERGEN-FREE",
    image: "acne/general/social-trust/allergen.png",
  },
  {
    name: "DERMATOLOGICALLY TESTED",
    image: "acne/general/social-trust/dermatologically-tested.png",
  },
  {
    name: "GMP CERTIFIED",
    image: "acne/general/social-trust/gmp.png",
  },
  {
    name: "FDA APPROVED",
    image: "acne/general/social-trust/fda.png",
  },
  {
    name: "CLINICALLY TESTED",
    image: "acne/general/social-trust/clinically-tested.png",
  },
  {
    name: "DOCTOR RECOMMENDED",
    image: "acne/general/social-trust/doc-recommended.png",
  },
  {
    name: "SKIN COACH RECOMMENDED",
    image: "acne/general/social-trust/skin-coach-recommended.png",
  },
];

const SocialTrust = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <section className="w-full py-12 md:py-20 bg-[#faf8f0]">
      <div className="mx-auto px-4 md:px-8">
        {/* Heading */}
        <h2 className="text-center text-[#1a232b] text-2xl md:text-4xl font-normal mb-12">
          Science-Backed. Dermatologist-Trusted. Built for Acne.
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:flex md:justify-center mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`
        flex flex-col items-center justify-center py-8
        text-center
        border-Grey/300
        md:border-0 md:first:border-none md:last:border-none
        ${
          // Mobile borders (2x2 grid)
          idx < 2 ? "border-b" : ""
        }
        ${idx % 2 === 0 ? "border-r" : ""}
        ${
          // Desktop borders (flex row)
          "md:border-l md:border-r md:first:border-l-0 md:last:border-r-0"
        }
      `}
              style={{ flex: 1 }}
            >
              <div className="text-[#1a232b] text-[18px] md:text-4xl font-normal mb-2">
                {stat.title}
              </div>
              <div className="text-[#222] min-h-[48px] text-[14px] md:text-[18px] font-light leading-snug px-6 md:px-0 mt-2">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div
          className={`flex flex-wrap justify-center items-center gap-x-8 gap-y-10 md:gap-x-24 md:gap-y-12`}
        >
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-3">
                <Image
                  src={`${CDN_BASE_URL}${badge.image}`}
                  alt={badge.name}
                  width={100}
                  height={100}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialTrust;
