import React, { useState } from 'react';

const FAQSection = ({ faqs = [] }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const defaultFAQs = [
    { question: "What Are The Benefits", answer: "Lorem ipsum dolor sit amet..." },
    { question: "How To Use?", answer: "Lorem ipsum dolor sit amet..." },
    { question: "Full Ingredient List", answer: "Lorem ipsum dolor sit amet..." }
  ];

  const faqsToShow = faqs.length > 0 ? faqs : defaultFAQs;

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="flex flex-col">
      {faqsToShow.map((faq, index) => (
        <button
          key={index}
          onClick={() => toggleExpand(index)}
          className="flex items-end justify-between pt-4 pb-0 border-t border-[#E9EDED] cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-[18px] text-[#0F1B28] tracking-[0.5px]" style={{ fontFamily: 'Sofia Pro, sans-serif' }}>
            {faq.question}
          </span>
          <div className="w-5 h-5 bg-[#505354] rounded-full flex items-center justify-center">
            <span className="text-white text-xs transform transition-transform">
              {expandedItems[index] ? '−' : '+'}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FAQSection;