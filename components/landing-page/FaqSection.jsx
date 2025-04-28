"use client"; // Only apply to this client-side component
import React, { useState } from "react";
import PlusIcon from "@assets/svg/Plus_Icon";
import MinusIcon from "@assets/svg/Minus_Icon";

// Simple plus/minus icons for the FAQ toggle

const FAQSection = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);



  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full  mx-auto p-[16px] md:p-[40px] ">
      <div className="md:flex md:justify-between">
        <div className="md:w-5/12 mb-8 md:mb-0">
          <h2 className="text-[28px] md:text-[40px] font-lato font-[500] leading-[130%] text-Text/Heading-Text">
            {`Have Questions? We've Got You Covered...`}
          </h2>
        </div>
        <div className="md:w-6/12">
          {data.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === index}
              toggleOpen={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="">
      <div
        onClick={toggleOpen}
        className="flex items-center justify-between cursor-pointer transition-all duration-300"
      >
        <h3 className="text-[16px] md:text-[18px] text-Text/Heading-Text font-lato font-[500] leading-[135%] py-[16px]">
          {question}
        </h3>
        <div className="flex-shrink-0 transition-transform duration-300">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="text-[14px] md:text-[16px] font-lato font-[400] leading-[150%] pb-4">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
