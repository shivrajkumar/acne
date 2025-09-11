import React, { useState } from 'react';
import Image from 'next/image';

const KeyIngredients = ({ ingredients = [] }) => {

  const defaultIngredients = [
    {
      name: "Rhodiola",
      image: "/images/ingredient1.jpg",
      partUsed: "Lorem ipsum",
      from: "Lorem ipsum"
    },
    {
      name: "Rhodiola",
      image: "/images/ingredient2.jpg",
      partUsed: "Lorem ipsum",
      from: "Lorem ipsum"
    },
    {
      name: "Rhodiola",
      image: "/images/ingredient3.jpg",
      partUsed: "Lorem ipsum",
      from: "Lorem ipsum"
    }
  ];

  const ingredientsToShow = ingredients.length > 0 ? ingredients : defaultIngredients;

  return (
    <div className="flex flex-col gap-4 pt-4 border-t border-[#E9EDED] relative">
      {/* Header */}
      <div className="flex items-end justify-between">
        <h3 className="text-[18px] text-[#0F1B28] tracking-[0.5px] uppercase font-sophiaPro">
          KEY INGREDIENTS
        </h3>
      </div>

      {/* Ingredients Grid */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar">
          {ingredientsToShow.map((ingredient, index) => (
            <IngredientCard key={index} ingredient={ingredient} />
          ))}
        </div>

        {/* <button className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-14 h-14 bg-[#3B52F5] rounded-full shadow-[0px_4px_14px_0px_rgba(0,0,0,0.45)] flex items-center justify-center hidden md:block">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button> */}
    </div>
  );
};

const IngredientCard = ({ ingredient }) => {
  return (
    <div className="flex flex-col gap-2 w-[292px] shrink-0">
      {/* Image */}
      <div className="h-[194px] w-full rounded bg-gray-200 overflow-hidden">
        {ingredient.image && (
          <Image
            src={ingredient.image}
            alt={ingredient.name}
            width={292}
            height={194}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      {/* Info */}
      <div className="flex gap-3 items-start">
        <div className="flex-1 flex flex-col">
          <div className="py-1 border-b border-[#0F1B28]/20">
            <h4 className="text-[18px] text-[#0F1B28] tracking-[0.5px]" style={{ fontFamily: 'Sofia Pro, sans-serif' }}>
              {ingredient.name}
            </h4>
          </div>
          <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
            <span className="text-[16px] text-[#608C59]" style={{ fontFamily: 'Sofia Pro, sans-serif' }}>Part Used:</span>
            <span className="text-[16px] text-[#0F1B28]" style={{ fontFamily: 'Sofia Pro, sans-serif' }}>{ingredient.partUsed}</span>
          </div>
          <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
            <span className="text-[16px] text-[#608C59]" style={{ fontFamily: 'Sofia Pro, sans-serif' }}>From:</span>
            <span className="text-[16px] text-[#0F1B28]" style={{ fontFamily: 'Sofia Pro, sans-serif' }}>{ingredient.from}</span>
          </div>
        </div>
        <button className="w-8 h-8 bg-[#3B52F5] rounded-full flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default KeyIngredients;