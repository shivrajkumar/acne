import React from 'react';

export default function Ayurveda() {
  return (
    <section className="w-full mx-auto px-4 md:px-16 py-12 font-sofia">
      <div className="bg-[#F9F9F5] rounded-[32px] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Text Content - Left on Desktop, Bottom on Mobile */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-2xl md:text-5xl text-[#635E51] mb-2 leading-tight">
            Ayurveda, Dermatology, & Nutrition
          </h2>
          <p className="text-lg text-[#635E51] mb-3 leading-tight">
            Clear Ritual creates personalsied plan combining these three scienes. 
          </p>
          
          <p className="text-[#635E51] text-sm md:text-lg leading-relaxed max-w-xl">
            Ayurveda views your skin as a mirror of internal balance, while dermatology brings clinical precision to understand acne at its root. Together, they help us create holistic, effective, and research-backed solutions for clear, healthy skin.
          </p>
        </div>

        {/* Image - Right on Desktop, Top on Mobile */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full order-1 md:order-2">
          <img
            src="/about_us.jpg"
            alt="Close up of face with water"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
