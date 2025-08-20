"use client";
import { CDN_BASE_URL } from "@/constants/constants";
import Image from "next/image";

const supplements = [
  {
    img: "acne/skin-food/supplement-1.webp",
    title: "Source is always transparent",
    desc: "We use high concentrations of clinically proven ingredients. Dosages are informed by human clinical studies, traditional usage, and FDA recommended levels. When formulating, we work alongside scientists and herbalists to ensure efficacy, safety, and purity.",
  },
  {
    img: "acne/skin-food/supplement-3.webp",
    title: "Dose is always potent",
    desc: "We use high concentrations of clinically proven ingredients. Dosages are informed by human clinical studies, traditional usage, and FDA recommended levels. When formulating, we work alongside scientists and herbalists to ensure efficacy, safety, and purity.",
  },
  {
    img: "acne/skin-food/supplement-2.webp",
    title: "Form is always easy for your body to absorb",
    desc: "Ingredients are bioactive (easily absorbed in the gut) and bioavailable (easily assimilated). No flow agents that negatively affect the microbiome or inhibit absorption.",
  },
];

export default function Supplements() {
  return (
    <section className="bg-white py-16">
      <div className="px-4 md:px-10 text-left">
        <h2 className="text-2xl md:text-[40px] font-normal text-gray-900">
          Supplements You Can Trust and Feel
        </h2>
        <p className="mt-3 text-gray-600 text-[16px] md:text-[18px]">
          Everything we make is inspired by a need; either it isn’t being made,
          or there isn’t a version to our standards of efficacy and purity.
        </p>

        <div className="mt-12 w-full">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar md:grid md:grid-cols-3 md:gap-10 scrollbar-hide">
            {supplements.map((item, idx) => (
              <div key={idx} className="text-left flex-shrink-0 w-64 md:w-auto">
                <div className="relative w-full h-64 md:h-[426px]">
                  <Image
                    src={`${CDN_BASE_URL}${item.img}`}
                    alt={item.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="mt-6 text-[16px] md:text-[20px] font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600 text-[14px] md:text-[16px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
