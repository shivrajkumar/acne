"use client";
import { CDN_BASE_URL } from "@/constants/constants";
import Image from "next/image";

const supplements = [
  {
    img: "acne/skin-food/supplement-1.webp",
    title: "Ancient Wisdom, Modern Science",
    desc: "We combine time-tested Ayurvedic knowledge with clinical research to craft formulas that are both natural and effective.",
  },
  {
    img: "acne/skin-food/supplement-3.webp",
    title: "Ganasatva Processing",
    desc: "We use Ganasatva - an Ayurvedic technique that blends raw herbal powders with concentrated extracts for better absorption and potency.",
  },
  {
    img: "acne/skin-food/supplement-2.webp",
    title: "Radical Transparency",
    desc: "You deserve to know what goes into your body. We tell you where every herb comes from, which part is used, and why.",
  },
];

export default function Supplements() {
  return (
    <section className="bg-white py-2 md:py-12">
      <div className="px-4 md:px-10 text-left">
        <h2 className="text-2xl md:text-[40px] font-normal text-gray-900 leading-normal">
          BTW, our supplements are rooted in Ayurveda-with efficacy and clinical standards.
        </h2>
        <p className="mt-3 text-gray-600 text-[16px] md:text-[18px]">
          Our Skin Food supplements are manufactured in GMP-certified facilities, with strict checks for safety, purity, and consistency.
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
