import React from 'react';

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="/how_it_works_hero.png"
        alt="How it works"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Mobile Overlay */}
      <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center p-6 md:hidden">
        <div className="text-white mb-4">
          <h1 className="text-4xl">
            We are a teams of experts
          </h1>
          <span>+ Skin Geeks</span>
        </div>

        {/* Inline Button */}
        <button
          className="mt-4 px-6 py-3 border border-white text-white rounded-full font-medium bg-transparent hover:bg-white hover:text-black transition"
        >
          TAKE THE SKIN DIAGNOSIS
        </button>
      </div>

      {/* Desktop Overlay */}
      <div className="hidden md:flex absolute inset-0 flex-col justify-center p-20 bg-gradient-to-r from-black/40 to-transparent">
        <div className="text-center">
          <div className="text-white mb-8 leading-tight">
            <h1 className="text-[87px]">
              We are a teams of experts
            </h1>
            <span>+ Skin Geeks</span>
          </div>

          {/* Inline Button */}
          <button
            className="px-8 py-4 border border-white text-white rounded-full font-medium bg-transparent hover:bg-white hover:text-black transition"
          >
            TAKE THE SKIN DIAGNOSIS
          </button>
        </div>
      </div>
    </section>
  );
}
