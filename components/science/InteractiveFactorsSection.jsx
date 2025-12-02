"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

export default function InteractiveFactorsSection({ data }) {
  const title = data?.title || "Internal triggers active";
  const subtitle = data?.subtitle || "What's not in your skin might dictate your skin's acne trajectory!";
  const description = data?.description || "Build an acne care plan as wide as your possible skin condition triggers.";
  const factors = data?.factors || [
    { id: 1, label: "Diet", color: "#F59E0B" },
    { id: 2, label: "Liver Health", color: "#EC4899" },
    { id: 3, label: "Gut", color: "#8B5CF6" },
    { id: 4, label: "Lifestyle", color: "#3B82F6" },
  ];
  const imageUrl = data?.image?.data?.attributes?.url;

  const [activeFactors, setActiveFactors] = useState([1]);

  const toggleFactor = (id) => {
    setActiveFactors((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-[#3B52F5] px-4 md:px-10 lg:px-20 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-white">
            {/* Badge */}
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm md:text-base font-medium">
                INTERNAL TRIGGERS MAPPED
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
              {title}
            </h2>

            <div className="space-y-4">
              <p className="text-lg md:text-xl font-medium">{subtitle}</p>
              <p className="text-base md:text-lg opacity-90">{description}</p>
            </div>

            {/* Interactive Factor Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {factors.map((factor) => (
                <button
                  key={factor.id}
                  onClick={() => toggleFactor(factor.id)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                    activeFactors.includes(factor.id)
                      ? "bg-white text-[#3B52F5] shadow-lg scale-105"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                  style={
                    activeFactors.includes(factor.id)
                      ? { backgroundColor: factor.color || "#FFFFFF", color: "#FFFFFF" }
                      : {}
                  }
                >
                  {factor.label}
                </button>
              ))}
            </div>

            <p className="text-sm md:text-base opacity-80 pt-4">
              Build your acne care plan to target the factors that dictate your skin condition
            </p>
          </div>

          {/* Right Image with Factor Points */}
          <div className="relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/10">
              {imageUrl ? (
                <Image
                  src={`${CDN_BASE_URL}${imageUrl}`}
                  alt={title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {/* Placeholder face illustration */}
                  <div className="relative w-full h-full bg-[#F9C6A7] rounded-2xl">
                    {/* Factor markers on face */}
                    {factors.map((factor, index) => (
                      <div
                        key={factor.id}
                        className={`absolute w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-all duration-200 ${
                          activeFactors.includes(factor.id)
                            ? "scale-125 opacity-100"
                            : "opacity-60"
                        }`}
                        style={{
                          backgroundColor: factor.color,
                          top: `${25 + index * 15}%`,
                          left: `${30 + (index % 2) * 40}%`,
                        }}
                      >
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Caption */}
            <p className="text-white text-sm md:text-base mt-4 opacity-80 text-center">
              What's not in your skin might dictate your skin's acne trajectory!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
