"use client";
import React from "react";
import { Typography } from "antd";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const { Text } = Typography;

const FaqItem = ({ question, answer, ingredients, isOpen, onToggle }) => {
  
  return (
    <div className="border-b border-gray-200 last:border-b-0 cursor-pointer">
      <div
        onClick={onToggle}
        className="w-full h-auto py-4 px-0 flex justify-between items-center text-left border-none shadow-none hover:bg-transparent"
      >
        <Text
          strong
          className="text-sm md:text-[16px] font-sophiaPro w-3/4 md:w-full text-gray-900"
        >
          {question}
        </Text>
        <div className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300">
          {isOpen ? (
            <AiFillMinusCircle 
              size={20} 
              className="transition-transform duration-300 rotate-0" 
            />
          ) : (
            <AiFillPlusCircle 
              size={20} 
              className="transition-transform duration-300 rotate-0" 
            />
          )}
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        {ingredients ? (
          <div className="flex flex-wrap gap-2">
               {ingredients.split(',').map((ingredient, index) => (
              <div
                key={index}
                className="bg-[#635e51] px-2 py-2 rounded"
              >
                <span className="text-white text-xs md:text-[14px] font-sophiaPro">
                  {ingredient.trim()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-sm md:text-[14px] font-sophiaPro text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        )}
      </div>
    </div>
  );
};

export default FaqItem;