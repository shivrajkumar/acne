// src/pages/Home/index.jsx
"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./sections/hero_section";
import Acne from "./sections/acne";
import ThickHair from "./sections/thick_hair";
import AboutSection from "./sections/about";
import StoriesGridSection from "./sections/stories_section";
import Story from "./sections/story";
import Numbers from "./sections/numbers";
import HairJourney from "./sections/hair_journey";
// import Shedding from './sections/shedding';
// import Questions from '../../components/common/questions';
import IngredientsFaqSection from "../ingredientsLanding/components/ingredientsFaq";
import { fetchStrapiData } from "@/helpers/strapiClient";
import Loader from "@/components/generic/Loader";

const DEFAULT_FAQ_ITEMS = [
  {
    id: 1,
    question: "Why did you involve dermatologists in developing the products?",
    answer:
      "Because acne is a medical skin condition—not just a cosmetic concern. Dermatologists ensure every formula, ingredient, and dosage is clinically relevant, safe for acne-prone skin, and actually works.",
  },
  {
    id: 2,
    question: "What role do the experts play in shaping the routines?",
    answer:
      "Experts help design complete plans, not random products. They map how each step supports the next—cleansing, actives, moisturisation, internal triggers—so the routine works as a system, not isolated items.",
  },
  {
    id: 3,
    question: "Why is expert input important for acne care?",
    answer:
      "Acne has multiple causes: oil imbalance, clogged pores, inflammation, hormones, stress, and more. Only trained experts can design solutions that address these safely and holistically.",
  },
  {
    id: 4,
    question: "How do dermatologists help personalise my plan?",
    answer:
      "They define protocols based on acne type (whiteheads, blackheads, pustules), severity, skin type, and internal triggers—so each user gets a plan tailored to their specific profile.",
  },
  {
    id: 5,
    question: "Why not just sell individual products? Why a plan?",
    answer:
      "Experts know acne responds best to systems—cleansers, actives, moisturisers, sunscreen, and lifestyle support working together. A plan improves results, consistency, and safety.",
  },
  {
    id: 6,
    question: "Why does the brand combine dermatology with Ayurveda/nutrition?",
    answer:
      "Because acne is both internal and external. Dermatologists manage the skin biology; integrative experts support inflammation, digestion, stress, and hormonal balance. Together, they create a more complete approach.",
  },
];

export default function Community() {
  const [communityData, setCommunityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchStrapiData("/api/cr-community");

      if (error) {
        console.warn("Failed to load community data:", error);
      }

      setCommunityData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  const FAQ_ITEMS = communityData?.data?.faqSection;

  return (
    <main>
      <HeroSection data={communityData?.data?.heroSection} />
      <ThickHair data={communityData?.data?.taglineSection} />
      <Acne data={communityData?.data?.missionSection} />
      <AboutSection data={communityData?.data?.whatWeDiscussSection} />
      <Story data={communityData?.data?.testimonialFeatureSection} reverse={false}/>
      <Numbers data={communityData?.data?.statisticsSection} />
      <StoriesGridSection data={communityData?.data?.realSkinStoriesSection} />
      <Story data={communityData?.data?.mythBusterSection} reverse={true}/>
      <HairJourney data={communityData?.data?.journeyCtaSection} />
      {/* <Shedding /> */}
      <IngredientsFaqSection showTitle={true} questions={FAQ_ITEMS?.faqs} />
    </main>
  );
}
