// src/pages/Home/index.jsx
import React from "react";
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
import { STRAPI_DEV_URL } from "@/constants/constants";

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

async function getCommunityData() {
  try {
    const res = await fetch(`${STRAPI_DEV_URL}/api/cr-community?populate=deep`, {
      method: "GET",
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch community data: ${res.status}`);
    }

    const data = await res.json();
    return data?.data?.attributes || null;
  } catch (err) {
    console.error("Error fetching community data:", err);
    return null;
  }
}

export default async function Community() {
  const communityData = await getCommunityData();

  if (!communityData) {
    console.warn("Failed to load community data, using fallback content");
  }

  const FAQ_ITEMS = communityData?.faq_items || DEFAULT_FAQ_ITEMS;

  return (
    <main>
      <HeroSection data={communityData?.hero_section} />
      <ThickHair data={communityData?.thick_hair_section} />
      <Acne data={communityData?.acne_section} />
      <AboutSection data={communityData?.about_section} />
      <Story
        data={communityData?.story_1}
        image="/mugdha.jpg"
        name="Mugdha"
        headlineAccent="is sharing her acne story."
        description="Join the conversation and share your experience with us."
        ctaHref="#"
        reverse={false}
      />
      <Numbers data={communityData?.numbers_section} />

      <StoriesGridSection data={communityData?.stories_grid_section} />

      <Story
        data={communityData?.story_2}
        image="/stigma.jpg"
        name="Bring a new way"
        headlineAccent="to heal acne and Scars."
        description="Our goal is to talk about skin in a real, science-led way — including how things like gut balance, stress, sleep, and routines play a role in acne. These deeper factors are important for long-term results."
        reverse={true}
        ctaHref=""
      />

      <HairJourney data={communityData?.hair_journey_section} />

      {/* <Shedding /> */}

      <IngredientsFaqSection showTitle={true} questions={FAQ_ITEMS} />
    </main>
  );
}
