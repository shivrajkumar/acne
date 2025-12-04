'use client'
import React from 'react';

export default function Hero({ data }) {
  console.log('data', data)
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={data?.background_image?.url}
        alt={data?.background_image?.name }
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Mobile Overlay */}
      <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center p-6 md:hidden">
        <div className="text-white mb-4">
          <h1 className="text-4xl">
            {data?.title}
          </h1>
          <span>{data?.subtitle}</span>
        </div>

        {/* Inline Button */}
        <button
          className="mt-4 px-6 py-3 border border-white text-white rounded-full font-medium bg-transparent hover:bg-white hover:text-black transition"
        >
          {data?.cta_text}
        </button>
      </div>

      {/* Desktop Overlay */}
      <div className="hidden md:flex absolute inset-0 flex-col justify-center p-20 bg-gradient-to-r from-black/40 to-transparent">
        <div className="text-center">
          <div className="text-white mb-8 leading-tight">
            <h1 className="text-[87px]">
              {data?.title}
            </h1>
            <span>{data?.subTitle }</span>
          </div>

          {/* Inline Button */}
          <button
            className="px-8 py-4 border border-white text-white rounded-full font-medium bg-transparent hover:bg-white hover:text-black transition"
          >
            {data?.cta_text}
          </button>
        </div>
      </div>
    </section>
  );
}
