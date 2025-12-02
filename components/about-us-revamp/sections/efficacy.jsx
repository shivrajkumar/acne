import React from 'react';

export default function Efficacy() {
  return (
    <section className="w-full mx-auto px-4 md:px-16 py-12 font-sofia">
      <div className="relative w-full h-[500px] md:h-[600px] rounded-[32px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/efficicay.jpg" 
          alt="Efficacy, innovation, and INTEGRITY."
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Mobile Overlay */}
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center p-6 md:hidden">
          <h2 className="text-white text-4xl font-bold leading-tight">
            Efficacy, innovation, and INTEGRITY.
          </h2>
        </div>
        
        {/* Desktop Overlay */}
        <div className="hidden md:flex absolute inset-0 flex-col justify-center items-center text-center p-20">
           <h2 className="text-white text-5xl lg:text-6xl tracking-wide">
             Efficacy, innovation, and INTEGRITY.
           </h2>
        </div>
      </div>
    </section>
  );
}
