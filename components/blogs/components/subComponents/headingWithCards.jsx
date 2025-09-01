import React from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/config";

const HeadingWithCards = ({ section }) => {
  console.log("HeadingWithCards section:", section);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-[27px] md:text-4xl font-bold text-gray-900 mb-2">
          How to <span className="text-[#B58E69]">Prevent Constipation</span>
        </h1>
        <p className="text-gray-600 text-lg">{section.subtitle}</p>
      </div>

      <div 
        className={`
          flex overflow-x-auto gap-4 pb-4 md:pb-0
          md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-2
        `}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {section?.tips?.map((tip) => (
          <div
            key={tip.id}
            className={`
              rounded-lg shadow-md border border-[#DEDEDE] overflow-hidden hover:shadow-lg transition-shadow duration-300
              flex-shrink-0 w-80 md:w-auto
            `}
          >
            <Image 
              src={`${CDN_BASE_URL}${tip.image}`} 
              alt={tip.title} 
              width={256} 
              height={160} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h3 className="text-xl font-bold font-modernity text-gray-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-black font-normal font-modernity text-sm leading-relaxed">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadingWithCards;