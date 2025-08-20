"use client";
import { CDN_BASE_URL } from "@/constants/constants";
import useMediaQuery from "@/hooks/useMediaQuerry";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const products = [
  {
    img: "acne/skin-food/ginger.webp",
    title: "Ginger",
    subtitle: "Synergen Complex®",
  },
  {
    img: "acne/skin-food/indian-madder-root.webp",
    title: "Indian Madder Root",
    subtitle: "Synergen Complex®",
  },
  {
    img: "acne/skin-food/pepper.webp",
    title: "Pepper",
    subtitle: "Synergen Complex®",
  },
  {
    img: "acne/skin-food/neem.webp",
    title: "Neem",
    subtitle: "Synergen Complex®",
  },
];

export default function HairGrowthNutraceuticals() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <section className="bg-white py-10">
      <div className="px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 items-center">
        <h2 className="text-2xl md:text-[40px] font-normal text-gray-900">
          Hair Growth
          <span className="hidden md:inline">
            <br />
          </span>{" "}
          Nutraceuticals
        </h2>

        <div className="flex flex-col items-center lg:items-start">
          <p className="text-gray-700 text-[14px] md:text-[24px]">
            Target key root causes of thinning hair with formulas tailored to
            your bio-specific needs.
          </p>
          <button className="mt-6 px-6 py-3 rounded-full bg-Primary/500 text-white font-medium hover:opacity-90 transition">
            {isMobile
              ? "Learn more about our 40+ ingredients"
              : "Shop Hair Growth Nutraceuticals"}
          </button>
        </div>
      </div>

      <div
        className="
    mt-12 
    flex gap-6 overflow-x-auto px-4 
    md:grid md:grid-cols-4 md:gap-6 md:px-10 
   thin-scrollbar
  "
      >
        {products.map((item, idx) => (
          <div key={idx} className="flex-shrink-0 w-40 md:w-auto flex flex-col">
            <div className="relative w-full h-40 md:h-56">
              <Image
                src={`${CDN_BASE_URL}${item.img}`}
                alt={item.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <h3 className="mt-3 text-sm font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-Primary/500">{item.subtitle}</p>
              </div>
              <div className="mt-3 w-8 h-8 rounded-full border bg-Primary/500 flex items-center justify-center cursor-pointer hover:bg-Primary/500 hover:text-white transition">
                <FaArrowRight
                  size={16}
                  className="text-white font-extralight"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
