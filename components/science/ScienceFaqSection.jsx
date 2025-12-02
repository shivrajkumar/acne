import React from "react";
import IngredientsFaqSection from "@/components/ingredientsLanding/components/ingredientsFaq";

export default function ScienceFaqSection({ data }) {
  const faqs = data?.faqs || [
    {
      question: "I want to give the gift of Prose, what are my options?",
      answer: "Our approach is science-backed and designed to address the root causes of acne. We combine dermatology-tested formulations with internal support to provide comprehensive care.",
    },
    {
      question: "Do digital gift cards expire?",
      answer: "Yes, our products are formulated to work with all skin types. We use non-comedogenic ingredients that won't clog pores and are suitable for sensitive skin.",
    },
    {
      question: "I need to make a change to my digital gift card, what can I do?",
      answer: "We recommend following the full regimen for best results, but you can customize your routine based on your specific needs. Consult with our experts for personalized recommendations.",
    },
    {
      question: "What products can I purchase with my digital gift card?",
      answer: "Your digital acne card tracks your progress and helps our team provide personalized guidance. You can update it anytime and receive tailored product recommendations.",
    },
    {
      question: "What happens to leftover credit on my digital gift card?",
      answer: "Results typically appear within 4-8 weeks of consistent use. If you're not seeing improvements, our team can adjust your treatment plan to better suit your needs.",
    },
    {
      question: "Can I start a subscription using my digital gift card?",
      answer: "We offer comprehensive support throughout your journey, including regular check-ins with our dermatology team and access to our customer care specialists.",
    },
  ];

  return (
    <section className="bg-[#F9F7F2] py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <IngredientsFaqSection questions={faqs} showTitle={true} />
      </div>
    </section>
  );
}
