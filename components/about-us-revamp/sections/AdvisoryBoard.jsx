import Link from "next/link";
import React from "react";

export default function AdvisoryBoard({ data }) {
  const experts = data?.members || [];

  return (
    <section className="w-full mx-auto px-4 md:px-16 py-6 md:py-12 font-sofia">
      <div className="bg-[#F9F9F5] rounded-[32px] p-8 md:p-16 lg:text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-[#0F1B28] font-medium mb-2 lg:mb-4">
          {data?.title}
        </h2>
        <p className="text-[#505354] text-sm md:text-lg lg:text-2xl leading-relaxed mx-auto mb-4 md:mb-16">
          {data?.description}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 mb-12 md:mb-16">
          {experts?.map((expert, index) => (
            <div
              key={index}
              className="flex flex-col items-center max-w-xl mx-auto md:mx-0"
            >
              <div className="w-full overflow-hidden mb-6 rounded-[24px] h-[296px] md:h-[464px]">
                <img
                  src={expert.image?.url || expert.image}
                  alt={expert.image?.name || expert.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[#0F1B28] font-bold text-base md:text-xl lg:text-3xl mb-1 uppercase tracking-wide">
                {expert.name}
              </h3>
              <p className="text-[#0F1B28] text-[16px] md:text-2xl mb-4 font-medium">
                {expert.role}
              </p>
              <p className="text-[#505354] text-sm text-center lg:text-lg leading-relaxed">
                {expert.bio}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href={"/experts"}
            className="inline-block border border-[#0F1B28] text-[#0F1B28] px-8 py-3 rounded-full text-sm md:text-[16px] font-medium hover:bg-[#0F1B28] hover:text-white transition-colors duration-300"
          >
            {data?.cta_text || "Learn More About Our Experts"}
          </Link>
        </div>
      </div>
    </section>
  );
}
