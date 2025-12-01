"use client";

import React from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function RealResultsSection({ data }) {
  const title = data?.title || "Real people, Real Results";
  const description = data?.description || "not just early helped with the acne, but post acne scars. The frequency at which acne comes back has also significantly reduced.";
  const beforeImage = data?.before_image?.data?.attributes?.url;
  const afterImage = data?.after_image?.data?.attributes?.url;
  const testimonials = data?.testimonials || [];
  const stats = data?.stats || [
    { icon: "✓", label: "Reduced Acne" },
    { icon: "✓", label: "Lightens Scars" },
    { icon: "✓", label: "Reduced Breakout" },
  ];

  return (
    <section className="bg-white px-4 md:px-10 lg:px-20 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-[#FEF3C7] border border-[#FDE68A] px-4 py-2 rounded-full mb-4">
            <span className="text-sm md:text-base font-medium text-[#92400E]">
              REAL RESULTS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#171819] leading-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Before/After Comparison */}
          <div className="relative">
            {beforeImage && afterImage ? (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={`${CDN_BASE_URL}${beforeImage}`}
                      alt="Before treatment"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={`${CDN_BASE_URL}${afterImage}`}
                      alt="After treatment"
                    />
                  }
                  style={{ width: "100%", height: "100%" }}
                />

                {/* Labels */}
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-md">
                  Before 8 Weeks
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-md">
                  After 8 Weeks
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                <span className="text-6xl">📊</span>
              </div>
            )}
          </div>

          {/* Right - Description and Stats */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <p className="text-lg md:text-xl text-[#313233] leading-relaxed">
                {description}
              </p>
              <p className="text-sm md:text-base text-[#6B7280] mt-4 italic">
                After 8 weeks of ClearRitual usage
              </p>
            </div>

            {/* Stats Icons */}
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-[#E8F5E9] px-4 py-2 rounded-full"
                >
                  <span className="text-[#19785D] font-bold text-lg">
                    {stat.icon}
                  </span>
                  <span className="text-sm md:text-base font-medium text-[#19785D]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            {testimonials.length > 0 && (
              <div className="space-y-4 pt-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-[#F9F7F2] p-4 md:p-6 rounded-xl"
                  >
                    <p className="text-base text-[#313233] italic">
                      "{testimonial.text}"
                    </p>
                    {testimonial.author && (
                      <p className="text-sm text-[#6B7280] mt-2 font-medium">
                        - {testimonial.author}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-xs md:text-sm text-[#6B7280] pt-4">
              *After 8 weeks of ClearRitual usage
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
