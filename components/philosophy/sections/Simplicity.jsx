import React from 'react';

export default function Simplicity({ data }) {
  return (
    <section className="w-full mx-auto px-4 md:px-16 py-12 font-sofia">
      <div className="bg-[#F9F9F5] rounded-[32px] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Text Content - Left on Desktop, Bottom on Mobile */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-2xl md:text-5xl text-[#635E51] mb-2 leading-tight">
            {data?.title || "Simplicity Over Confusion"}
          </h2>
          <p className="text-[#635E51] text-sm md:text-lg leading-relaxed max-w-xl mb-3 lg:mb-6">
            {data?.subtitle || "No complicated 10-step routines."}
          </p>

          <p className="text-[#635E51] text-sm md:text-lg leading-relaxed max-w-xl">
            {data?.description || "Only what your skin actually needs. Clear, simple steps you can follow daily. Easy to do, Easy to stay consistent with, and Easy to see results from."}
          </p>
        </div>

        {/* Image - Right on Desktop, Top on Mobile */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full order-1 md:order-2">
          <img
            src={data?.image?.url || "/about_us.jpg"}
            alt={data?.image?.alternativeText || "Close up of face with water"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
