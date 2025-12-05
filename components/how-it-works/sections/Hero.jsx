import React from "react";

export default function Hero({ data }) {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={data?.bannerImage?.url }
        alt={"How it works"}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Mobile Overlay */}
      <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center p-6 md:hidden">
        <h1 className="text-4xl font-bold text-white mb-4">
          {data?.title}
        </h1>

        {/* Inline Button */}
        <button className="px-6 py-3 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-900 transition">
          {"Start now"}
        </button>
      </div>

      {/* Desktop Overlay */}
      <div className="hidden md:flex absolute inset-0 flex-col justify-center p-20 bg-gradient-to-r from-black/40 to-transparent">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8 leading-tight">
            {data?.title}
          </h1>

          {/* Inline Button */}
          <button className="px-8 py-4 bg-black text-white rounded-full text-xl font-medium hover:bg-gray-900 transition">
            {"Start now"}
          </button>
        </div>
      </div>
    </section>
  );
}
