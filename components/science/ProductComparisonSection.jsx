import React from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

export default function ProductComparisonSection({ data }) {
  const title = data?.title || "A Short";
  const subtitle = data?.subtitle || "We make short supplements you can trust and feel. This comes down to formulating with the best science. Bixa, form, to how do we compare? See how Magnus-Giti, Superbites and SupPlus stack up.";
  const leftColumn = data?.left_column || {
    title: "Healthy Body",
    items: [
      "Sugar-less & stearate free",
      "Immune-gen elite care",
      "Premium vegan-elite vits",
    ],
  };
  const rightColumn = data?.right_column || {
    title: "Skin Ritual",
    items: [
      "Science-baked ritanoids",
      "Clean masks and anti-care spots",
      "Superfad and anti-age serums",
    ],
  };
  const resultText = data?.result_text || "CLEAR SKIN.";
  const resultSubtext = data?.result_subtext || "clear\nglow";

  return (
    <section className="bg-[#F9F7F2] px-4 md:px-10 lg:px-20 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-[#E0E7FF] border border-[#C7D2FE] px-4 py-2 rounded-full mb-4">
            <span className="text-sm md:text-base font-medium text-[#3730A3]">
              SCIENCE-BACKED APPROACH
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#171819] leading-tight mb-4">
            {title}
          </h2>
          <p className="text-base md:text-lg text-[#313233] max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Comparison Formula */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Column - Healthy Body */}
            <div className="flex-1 space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-[#171819] mb-4">
                {leftColumn.title}
              </h3>
              <div className="space-y-3">
                {leftColumn.items?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#19785D]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base text-[#313233]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Plus Symbol */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#3B52F5] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                +
              </div>
            </div>

            {/* Right Column - Skin Ritual */}
            <div className="flex-1 space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-[#171819] mb-4">
                {rightColumn.title}
              </h3>
              <div className="space-y-3">
                {rightColumn.items?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#19785D]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base text-[#313233]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Equals Symbol */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#3B52F5] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                =
              </div>
            </div>

            {/* Result */}
            <div className="flex-shrink-0 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#171819]">
                  {resultText}
                </div>
                <div className="text-base md:text-lg text-[#313233] whitespace-pre-line">
                  {resultSubtext}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <p className="text-sm md:text-base text-[#6B7280] italic">
            Acne care shouldn't be a game of trial and error. We did the RESEARCH so you can stop experimenting with your skin.
          </p>
        </div>
      </div>
    </section>
  );
}
