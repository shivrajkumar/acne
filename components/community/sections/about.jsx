import React from "react";

const imageLeft = "about_one.png";
const imageRight = "about_two.png";

export default function AboutSection({ data }) {
  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <span className="inline-block bg-[#FFF88A] text-[#0F1B28] text-xs lg:text-base font-bold px-2 py-1 rounded-sm mb-4 lg:mb-8">
            On our Instagram, we teach both:
        </span>
        <div className="flex flex-col md:flex-row md:items-start md:gap-10">
          <div className="hidden md:block shrink-0 mb-6 md:mb-0">
            <div className="rounded-xl overflow-hidden w-28 h-28 md:w-40 md:h-48 lg:w-80 lg:h-96">
              <img src={imageLeft} alt="person" className="w-full h-full object-cover block" />
            </div>
          </div>

          <div className="md:flex-1">

            <h2 className="mt-3 text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-sofia font-semibold leading-tight">
              {data?.title || "Acne is not just a skin problem."}
            </h2>

            <hr className="border-t border-gray-200 my-6" />

            <p className="text-base md:text-lg lg:text-3xl text-[#0F1B28] font-sofia leading-relaxed max-w-none">
              {data?.description || "Pimples, marks, and scars happen due to oil, bacteria, hormones, diet, stress, sleep, and gut health. That's why we focus on both routines."}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row md:items-start md:gap-10">
          <div className="md:flex-1">
            <h3 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-sofia font-semibold text-[#0F1B28]">
              We share real acne journeys.
            </h3>

            <hr className="border-t border-gray-200 my-6" />

            <p className="text-base md:text-lg lg:text-3xl text-[#0F1B28] font-sofia leading-relaxed">
              People who changed both their products and their internal habits saw the biggest improvement.
            </p>
          </div>

          <div className="hidden md:block shrink-0 mt-8 md:mt-0 ml-0 md:ml-8">
            <div className="rounded-xl overflow-hidden w-28 h-28 md:w-40 md:h-48 lg:w-80 lg:h-96 ml-auto">
              <img src={imageRight} alt="hug" className="w-full h-full object-cover block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
