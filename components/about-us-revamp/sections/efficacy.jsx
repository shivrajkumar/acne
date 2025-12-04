import React from 'react';

export default function Efficacy({ data }) {
  return (
    <section className="w-full mx-auto px-4 md:px-16 py-12 font-sofiaPro">
      <div className="relative w-full h-[500px] md:h-[300px] rounded-lg overflow-hidden">
        {/* Background Image */}
        <img
          src={data?.background_image?.url || data?.image?.url }
          alt={data?.background_image?.name || data?.image?.name }
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Mobile Overlay */}
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center p-6 md:hidden">
          <h2 className="text-white text-4xl font-bold leading-tight">
            {data?.title || data?.text}
          </h2>
        </div>

        {/* Desktop Overlay */}
        <div className="hidden md:flex absolute inset-0 flex-col justify-center items-center text-center p-20">
           <h2 className="text-white text-5xl lg:text-6xl tracking-wide">
             {data?.title || data?.text}
           </h2>
        </div>
      </div>
    </section>
  );
}
