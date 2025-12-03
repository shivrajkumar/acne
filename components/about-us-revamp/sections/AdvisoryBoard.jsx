import Link from 'next/link';
import React from 'react';


export default function AdvisoryBoard({ data }) {
  const experts = data?.experts || [
    {
      name: "DR. SHAILENDRA CHAUBEY",
      title: "ayurvedic expert",
      description: "An innovator in the field, Dr. Robinson is an award-winning chemist with over 20 years experience developing products for top beauty brands. He is the founder of BeautyStat, a groundbreaking brand in the skincare industry.",
      image: "/shailendra.png"
    },
    {
      name: "DR. SIDDHI SONAWANE",
      title: "md, dermatologist",
      description: "An innovator in the field, Dr. Robinson is an award-winning chemist with over 20 years experience developing products for top beauty brands. He is the founder of BeautyStat, a groundbreaking brand in the skincare industry.",
      image: "/siddhi.png"
    }
  ];

  return (
    <section className="w-full mx-auto px-4 md:px-16 py-12 font-sofia">
      <div className="bg-[#F9F9F5] rounded-[32px] p-8 md:p-16 lg:text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-[#0F1B28] font-medium mb-2 lg:mb-4">
          {data?.title || "Meet the advisory board"}
        </h2>
        <p className="text-[#505354] text-sm md:text-lg lg:text-2xl leading-relaxed mx-auto mb-4 md:mb-16">
          {data?.description || "Our Skincare Advisory Board is comprised of renowned experts in Ayurveda, dermatology, and nutrition. Informed by the latest research, they guide our product innovation, diagnosis algorithms, and treatment plans."}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 mb-12 md:mb-16">
          {experts.map((expert, index) => (
            <div key={index} className="flex flex-col items-center max-w-xl mx-auto md:mx-0">
              <div className="w-full aspect-square overflow-hidden mb-6">
                <img
                  src={expert.image?.url || expert.image}
                  alt={expert.image?.alternativeText || expert.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-[#0F1B28] font-bold text-base md:text-xl lg:text-3xl mb-1 uppercase tracking-wide">
                {expert.name}
              </h3>
              <p className="text-[#0F1B28] text-base md:text-base lg:text-2xl mb-4 font-medium">
                {expert.title}
              </p>
              <p className="text-[#505354] text-sm text-center lg:text-lg leading-relaxed">
                {expert.description}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={data?.cta_link || "/expert"}
          className="inline-block border border-[#0F1B28] text-[#0F1B28] px-8 py-3 rounded-full text-sm md:text-base font-medium hover:bg-[#0F1B28] hover:text-white transition-colors duration-300"
        >
          {data?.cta_text || "Learn More About Our Experts"}
        </Link>
      </div>
    </section>
  );
}
