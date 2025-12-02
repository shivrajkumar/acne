'use client'
import React, { useState, useRef, useEffect } from 'react';

export default function Ingredients() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  const ingredients = [
    {
      name: "INTERNAL TRIGGER DIAGNOSIS",
      description: "We identify what’s causing your acne from the inside - hormones, stress, diet etc.",
      image: "/ingredients_1.jpg"
    },
    {
      name: "SKIN HEALTH DIAGNOSIS",
      description: "We study your acne type, skin barrier, sensitivity, and oil levels.",
      image: "/ingredients_2.jpg"
    },
    {
      name: "DEEP AI SCAN",
      description: "Our AI scan reads pores, spots,  of your acne and tracks your improvement.",
      image: "/ingredients_3.jpg"
    },
    {
      name: "PERSONALISED PLANS",
      description: "Your plan is built only for you — using your skin type and internal triggersin.",
      image: "/ingredients_4.jpg"
    }
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const slideIndex = Math.round(scrollLeft / clientWidth);
      setActiveSlide(slideIndex);
    }
  };

  return (
    <section className="w-full mx-auto px-4 md:px-16 py-12 font-sofia">
      <div className="bg-[#D5F4E1] rounded-[32px] p-8 md:p-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6 md:gap-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-[#0F1B28] font-bold md:w-1/2 leading-tight">
            We don’t guess. We diagnose.
          </h2>
          <p className="text-[#505354] text-sm md:text-lg md:w-[40%] leading-relaxed">
            Every plan starts with understanding your skin and your body - not assumptions or one size fits all.
          </p>
        </div>

        {/* Desktop Grid / Mobile Carousel */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory no-scrollbar pb-8 md:pb-0"
        >
          {ingredients.map((item, index) => (
            <div 
              key={index} 
              className="min-w-[85%] md:min-w-0 snap-center flex flex-col gap-4"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-white">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-[#0F1B28] font-bold text-base lg:text-lg mb-2 uppercase tracking-wide">
                  {item.name}
                </h3>
                <p className="text-[#0F1B28] text-sm lg:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {ingredients.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                activeSlide === index ? 'bg-[#0F1B28]' : 'bg-[#0F1B28]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
