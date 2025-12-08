import React from 'react';

export default function BottomBanner({ data }) {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden mb-10">
      <img
        src={data?.backgroundImage?.url}
        alt={data?.backgroundImage?.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex justify-center items-center p-6">
        <h2 className="text-4xl md:text-5xl lg:text-7xl text-white text-center font-normal leading-tight">
          {data?.heading}
        </h2>
      </div>
    </section>
  );
}
