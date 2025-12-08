"use client";

import React from "react";
import Image from "next/image";

export default function RealPeople({ data }) {
  const stories = data?.testimonials;
  console.log("RealPeople data:", data);

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <div className="bg-[#D5F4E1] rounded-2xl p-6 md:p-10">
        {/* TITLE */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-sofia font-medium lg:font-bold text-[#0F1B28]">
            {data?.title || "Real people. Real improvements."}
          </h2>
          <p className="mt-3 lg:mt-5 text-sm md:text-base lg:text-2xl text-[#505354] mx-auto">
            {data?.description || "With the right plan, results come."}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-start">
          {/* IMAGE CARD 1 */}
          <div className="relative rounded-xl overflow-hidden bg-white">
            <div className="relative w-full h-[200px] lg:h-[420px]">
              <Image
                src={stories[0]?.image?.url}
                alt="Story Image 1"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* GREEN CARD 1 */}
          <div
            className="relative rounded-xl bg-[#579E8F] text-white flex items-center justify-center 
                h-[200px] lg:h-[420px] p-6 md:p-8"
          >
            <h3 className="text-center font-bold text-base md:text-xl lg:text-4xl leading-snug">
              There's
              <br />
              more to my
              <br />
              (acne) story.
            </h3>
          </div>

          {/* IMAGE CARD 2 — mobile: should appear 4th */}
          <div className="relative rounded-xl overflow-hidden bg-white order-4 md:order-3">
            <div className="relative w-full h-[200px] lg:h-[420px]">
              <Image
                src={stories[2]?.image?.url}
                alt="Story Image 2"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* GREEN CARD 2 — mobile: third */}
          <div
            className="relative rounded-xl bg-[#579E8F] text-white flex items-center justify-center 
                h-[200px] lg:h-[420px] p-6 md:p-8 order-3 md:order-4"
          >
            <h3 className="text-center font-bold text-base md:text-xl lg:text-4xl leading-snug">
              You
              <br />
              Are not
              <br />
              alone.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
