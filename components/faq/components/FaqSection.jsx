'use client';
import React, { useState } from 'react';
import FaqItem from './FaqItem';

const FaqSection = ({ title, items, id }) => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div id={id} className="mb-16">
      <div className="mb-6 font-bold tracking-wide text-gray-900 text-[18px] md:text-[40px]">{title}</div>
      
      <div className="shadow-none border-none bg-[#F9F7F2]">
        <div className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <FaqItem
              key={item.id || index}
              question={item.question}
              answer={item.answer}
              isOpen={openItems[index]}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;