import React from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

export default function ScienceHero({ data }) {
  const imageUrl = data?.image?.data?.attributes?.url;
  const title = data?.title || "Science First. Always.";
  const tag = data?.tag || "CLEAR RITUAL — WHY OUR ACNE SYSTEM WORKS";
  const subtitle = data?.subtitle || "Focused on the core biological causes of acne and scarring.";
  const stats = data?.stats || [
    {
      value: "100%",
      label: "non-comedogenic actives, dermatology-tested formulas.",
    },
    {
      value: "100%",
      label: "herbal ayurvedic support designed to modulate internal triggers",
    },
  ];
  const citation = data?.citation || 'Reynolds, R. V., et al. "Guidelines of Care for the Management of Acne Vulgaris." Journal of the American Academy of Dermatology, 2024, https://doi.org/10.1016/j.jaad.2023.12.017.';

  return (
    <section className=" px-4 md:px-8 lg:px-10 py-12 md:py-16">
      <div className="max-w-8xl mx-auto bg-[#F5F3EF] p-4">
        {/* Tag */}
        <div className="mb-6">
          <span className="inline-block bg-[#FFF066] px-2 py-1 text-xs md:text-sm font-medium tracking-wide text-[#171819]">
            {tag}
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-0">
            <h1 className="text-[32px] md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-[#171819]">
              {title}
            </h1>
            <p className="text-[32px] md:text-5xl lg:text-[64px] font-normal leading-relaxed text-[#171819] mt-1 w-5/6">
              {subtitle}
            </p>
          </div>

          {/* Right Image - Desktop */}
          <div className="hidden lg:flex justify-end items-start">
            {imageUrl ? (
              <div className="relative w-[280px] h-[200px]">
                <Image
                  src={`${CDN_BASE_URL}${imageUrl}`}
                  alt={title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="w-[280px] h-[200px] flex items-center justify-center">
                <div className="text-8xl">💊</div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Image */}
        <div className="flex lg:hidden justify-center my-8">
          {imageUrl ? (
            <div className="relative w-[240px] h-[180px]">
              <Image
                src={`${CDN_BASE_URL}${imageUrl}`}
                alt={title}
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="w-[240px] h-[180px] flex items-center justify-center">
              <div className="text-7xl">💊</div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-8 md:mt-12 lg:mt-16">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-0">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="flex">
                  <div className="text-[40px] md:text-[64px] font-normal text-[#171819] leading-none">
                    {stat.value}
                  </div>
                  <p className="text-sm md:text-2xl text-[#313233] mt-2 max-w-[300px]">
                    {stat.label}
                  </p>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden md:block w-px bg-[#D1D1D1] mx-8 self-stretch min-h-[80px]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Citation */}
        <div className="mt-8 md:mt-12">
          <p className="text-xs text-[#6B6B6B] max-w-4xl">{citation}</p>
        </div>
      </div>
    </section>
  );
}