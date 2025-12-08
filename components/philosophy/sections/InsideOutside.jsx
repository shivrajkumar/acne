import React from 'react';

export default function InsideOutside({ data }) {
  return (
    <section className="w-full mx-auto px-4 md:px-16 py-6 md:py-12 font-sofia">
      <div className="bg-[#F9F9F5] rounded-[32px] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Text Content - Left on Desktop, Bottom on Mobile */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col gap-2 justify-center order-2 md:order-1">
          <h2 className="text-2xl md:text-5xl text-[#635E51] mb-2 leading-tight">
            {data?.title || "Inside + outside care is non-negotiable."}
          </h2>
          <h2 className="text-lg md:text-3xl text-[#635E51] mb-3 leading-tight font-medium">
            {data?.subTitle}
          </h2>

          <p className="text-[#635E51] text-sm md:text-lg leading-relaxed max-w-xl">
            {data?.description}
          </p>
        </div>

        {/* Image - Right on Desktop, Top on Mobile */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full order-1 md:order-2">
          <img
            src={data?.image?.url}
            alt={data?.image?.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
