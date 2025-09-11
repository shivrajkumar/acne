"use client";
import FaqItem from "@/components/faq/components/FaqItem";
import React, { useState } from "react";

const DEFAULT_QUESTIONS = [
  {
    question: "I want to give the gift of Prose, what are my options?",
    answer: "I want to give the gift of Prose, what are my options?",
  },
  {
    question: "Do digital gift cards expire?",
    answer: "I want to give the gift of Prose, what are my options?",
  },
  {
    question: "I need to make a change to my digital gift card, what can I do?",
    answer: "I want to give the gift of Prose, what are my options?",
  },
  {
    question: "What products can I purchase with my digital gift card?",
    answer: "I want to give the gift of Prose, what are my options?",
  },
  {
    question: "What happens to leftover credit on my digital gift card?",
    answer: "I want to give the gift of Prose, what are my options?",
  },
  {
    question: "Can I start a subscription using my digital gift card?",
    answer: "I want to give the gift of Prose, what are my options?",
  },
  {
    question:
      "What happens if I’m not totally satisfied with products purchased using my digital gift card?",
    answer: "I want to give the gift of Prose, what are my options?",
  },
];

const IngredientsFaqSection = ({ questions = DEFAULT_QUESTIONS, showTitle = true }) => {
  const [openItems, setOpenItems] = useState({});

  const handleToggle = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
  className={`w-full ${showTitle ? 'px-4 md:px-12' : 'px-0'} ${showTitle ? 'py-10' : 'py-0'} text-[#262626] md:container mx-auto flex flex-col ${
    showTitle ? "md:flex-row justify-between" : "md:flex-col"
  }`}
>
  {showTitle && (
    <div className="text-[28px] md:text-[40px] font-normal font-sophiaPro mb-4 w-full md:w-2/6 px-4 md:px-0">
      Got questions? Ask us anything.
    </div>
  )}

  <div className={`flex flex-col gap-3 w-full ${showTitle ? "md:w-1/2" : "md:w-full"} ${!showTitle ? 'px-0' : 'px-4 md:px-0'}`}>
    {questions?.map((question, index) => (
      <FaqItem
        key={index}
        question={question.question}
        answer={question.answer}
        isOpen={openItems[index]}
        onToggle={() => handleToggle(index)}
      />
    ))}
  </div>
</div>
  );
};

export default IngredientsFaqSection;
