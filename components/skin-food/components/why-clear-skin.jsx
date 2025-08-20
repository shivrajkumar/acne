"use client";
import { useState } from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

const accordionData = [
  {
    id: 1,
    title: "#1 Digestive herb blend for the protein bloat.",
    content:
      "Protein farts, bloated tummy and burps? If you’ve experienced those – we’ve got you covered! We’ve added gut-friendly herbs such as ginger, cumin, fennel & fenugreek that help you digest the protein content better.",
  },
  {
    id: 2,
    title: "#2 Clean ingredients that your gut loves.",
    content: "Details about clean, gut-friendly ingredients go here...",
  },
];

export default function WhyClearSkin() {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#F9F7F2] p-6 md:p-8 md:py-10 flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
      {/* ---------- Mobile Layout (<md) ---------- */}
      <div className="block md:hidden w-full">
        <h2 className="text-[24px] font-normal text-left leading-snug mb-4">
          We’ve made plant protein{" "}
          <span className="text-[#B47C5C]">gut-friendly</span>{" "}
          Here’s why.
        </h2>

        <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6">
          <Image
            src={`${CDN_BASE_URL}acne/skin-food/ingredient-combo.webp`}
            alt="Ingredients"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-4 space-y-4">
          {accordionData.map((item) => (
            <div key={item.id} className="border-b last:border-0 pb-3">
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex justify-between items-center text-left font-semibold text-[#1a1a1a] text-[14px]"
              >
                <span className="w-3/4">{item.title}</span>
                <span className="text-xl">
                  {openId === item.id ? "−" : "+"}
                </span>
              </button>
              {openId === item.id && (
                <p className="mt-2 text-sm text-gray-600">{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Desktop Layout (md+) ---------- */}
      <div className="hidden md:flex w-full flex-row gap-10">
        <div className="w-1/2">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden">
            <Image
              src={`${CDN_BASE_URL}acne/skin-food/ingredient-combo.webp`}
              alt="Ingredients"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-[40px] font-normal text-gray-900 mb-4 leading-relaxed tracking-wide">
            We’ve made skin food{" "}
            <span className="text-Secondary/400">for your CLEAR skin.</span>{" "}
            Here’s why.
          </h2>

          <div className="divide-y divide-gray-200">
            {accordionData.map((item) => (
              <div key={item.id} className="py-4">
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex justify-between items-center text-left font-semibold text-gray-800 text-lg"
                >
                  <span>{item.title}</span>
                  <span className="text-xl">
                    {openId === item.id ? "−" : "+"}
                  </span>
                </button>

                {openId === item.id && (
                  <p className="mt-2 text-gray-600 text-sm md:text-[16px]">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
