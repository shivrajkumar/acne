import React from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

export default function BiologySection({ data }) {
  const title = data?.title || "The biology behind acne";
  const description = data?.description || "Hormones (1 or 2, etc), skin-localized factors (1st acne - stress, immune conditions, genetics), triggers - sugar alcohols, dairy, stress";
  const imageUrl = data?.image?.data?.attributes?.url;
  const factors = data?.factors || [];

  return (
    <section className="bg-white px-4 md:px-10 lg:px-20 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="inline-block bg-[#FFFAEB] border border-[#FEF3C7] px-4 py-2 rounded-full mb-4">
            <span className="text-sm md:text-base font-medium text-[#92400E]">
              OUR METHODOLOGY
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#171819] leading-tight max-w-2xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-base md:text-lg text-[#313233] leading-relaxed">
              {description}
            </p>

            {/* Factors List */}
            {factors.length > 0 && (
              <div className="space-y-4 pt-4">
                {factors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E8F5E9] flex items-center justify-center mt-1">
                      <svg
                        className="w-4 h-4 text-[#19785D]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-base text-[#313233] leading-relaxed">
                      {factor.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="relative">
            {imageUrl ? (
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={`${CDN_BASE_URL}${imageUrl}`}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center">
                <span className="text-6xl">🔬</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
