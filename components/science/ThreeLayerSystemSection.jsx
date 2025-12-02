import React from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

export default function ThreeLayerSystemSection({ data }) {
  const title = data?.title || "The Science-Backed 3-Layer System: Skincare, Rx, Internal Support.";
  const subtitle = data?.subtitle || "";
  const layers = data?.layers || [
    {
      label: "Layer 1: Skincare",
      description: "Non-comedogenic formulations",
    },
    {
      label: "Layer 2: Rx",
      description: "Prescription-strength actives",
    },
    {
      label: "Layer 3: Internal Support",
      description: "Herbal supplements for internal balance",
    },
  ];
  const graphImage = data?.graph?.data?.attributes?.url;
  const description = data?.description || "";

  return (
    <section className="bg-[#F9F7F2] px-4 md:px-10 lg:px-20 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-[#FFFAEB] border border-[#FEF3C7] px-4 py-2 rounded-full mb-4">
            <span className="text-sm md:text-base font-medium text-[#92400E]">
              SCIENCE-BACKED 3-LAYER SYSTEM
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#171819] leading-tight max-w-4xl mx-auto">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-[#313233] mt-4 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Graph/Chart */}
          <div className="relative">
            {graphImage ? (
              <div className="relative w-full aspect-[16/10] bg-white rounded-2xl shadow-sm p-6">
                <Image
                  src={`${CDN_BASE_URL}${graphImage}`}
                  alt="3-Layer System Graph"
                  fill
                  className="object-contain p-4"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-[16/10] bg-white rounded-2xl shadow-sm p-6">
                {/* Placeholder wave graph */}
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Layer 1</span>
                    <span>Layer 2</span>
                    <span>Layer 3</span>
                  </div>
                  <svg
                    viewBox="0 0 400 150"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {/* Wave pattern representing effectiveness */}
                    <path
                      d="M 0 100 Q 50 80 100 70 T 200 60 T 300 50 T 400 40"
                      stroke="#3B52F5"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Second wave */}
                    <path
                      d="M 0 110 Q 50 95 100 85 T 200 75 T 300 65 T 400 55"
                      stroke="#10B981"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Third wave */}
                    <path
                      d="M 0 120 Q 50 105 100 95 T 200 85 T 300 75 T 400 65"
                      stroke="#F59E0B"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Right - Layer Descriptions */}
          <div className="space-y-6">
            {layers.map((layer, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3B52F5] text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-[#171819] mb-2">
                      {layer.label}
                    </h3>
                    <p className="text-base text-[#313233]">{layer.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {description && (
              <div className="pt-4">
                <p className="text-base text-[#313233] leading-relaxed">{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
