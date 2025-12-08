import React from 'react';

export default function Efficacy({ data }) {
  return (
    <section className="w-full mx-auto px-4 md:px-10 py-2 pb-6 md:py-12 font-sofia">
      <div className="relative w-full h-[500px] md:h-[300px] rounded-[32px] overflow-hidden">
        {/* Background Image */}
        <img
          src={data?.image?.url}
          alt={"Efficacy, innovation, and INTEGRITY."}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Mobile Overlay */}
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center p-6 md:hidden">
          <h2 className="text-white text-4xl font-normal leading-tight">
            {data?.title }
          </h2>
        </div>

        {/* Desktop Overlay */}
        <div className="hidden md:flex absolute inset-0 flex-col justify-center items-center text-center p-20">
           <h2 className="text-white text-5xl lg:text-6xl tracking-wide font-normal">
             {data?.title }
           </h2>
        </div>
      </div>
    </section>
  );
}
