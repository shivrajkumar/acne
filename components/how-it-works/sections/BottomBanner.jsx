import React from 'react';

export default function BottomBanner({ data }) {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden">
      <img
        src={data?.background_image?.url || "/hiw_bottom.png"}
        alt={data?.background_image?.alternativeText || "Woman applying cream"}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex justify-center items-center p-6">
        <h2 className="text-4xl md:text-5xl lg:text-7xl text-white text-center max-w-4xl leading-tight">
          {data?.title || "all from the privacy of your own home."}
        </h2>
      </div>
    </section>
  );
}
