// import { fetchStrapi } from "./utils/fetchStrapi";

import HeroSection from "./experts-hero";
import ExpertsSection from "./experts-section";
import RegimenSection from "./experts-regimen";
import DevelopedWithSection from "./experts-developed-with-section";
import FaqSection from "@components/faq/components/FaqSection";
import IngredientsFaqSection from "../ingredientsLanding/components/ingredientsFaq";

export default async function ExpertsPage() {
  //   const data = await fetchStrapi("experts-page?populate=deep");

  //   if (!data) return <div>Failed to load page.</div>;

  //   const page = data.data.attributes;

  const heroSectionDummy = {
    title: "Expert Led acne care that you can trust.",
    highlighted_words: ["Expert", "Led", "trust."],
    tabs: [
      { label: "Science", slug: "science" },
      { label: "Research", slug: "research" },
      { label: "Results", slug: "results" },
    ],
  };

  const dummyExpertsSection = {
    experts: [
      {
        name: "Dr. Corey L. Hartman, MD",
        designation: "Board-Certified Dermatologist",
        experience: "7 Years",
        patients: "100000",
        profile_image: "/uploads/dr_1.png",
        bio: "Dr. Corey L. Hartman is a board-certified dermatologist and founder and medical director of Skin Wellness Dermatology in Birmingham, AL.",
      },
      {
        name: "Dr. Jane Doe",
        designation: "Board-Certified Dermatologist",
        experience: "5 Years",
        patients: "85000",
        profile_image: "/uploads/dr_2.png",
        bio: "Dr. Jane Doe is a leading dermatologist with extensive experience in personalized acne treatment.",
      },
      {
        name: "Dr. Richard Ray",
        designation: "Dermatology Expert",
        experience: "10 Years",
        patients: "150000",
        profile_image: "/uploads/dr_3.png",
        bio: "Dr. Richard specializes in evidence-based skincare and nutrition-backed acne solutions.",
      },
    ],
  };

 const dummyRegimenData = {
  title: "Our experts design personalized regimens that are clinically proven, highly effective, and tailored to your unique skin needs.",
  highlightWords: "personalized regimens",
};

  const developedWithDummy = {
    title: "Developed with top dermatologists, we bring together:",
    items: [
      {
        image: "/uploads/science.png",
        label: "Science",
        slug: "science",
      },
      {
        image: "/uploads/nutrition.png",
        label: "Skin Food",
        slug: "skin-food",
      },
      {
        image: "/uploads/all_products.png",
        label: "All Products",
        slug: "all-products",
      },
    ],
  };

  const faqDummy = {
    title: "Got questions? Ask us anything.",
    faqs: [
      {
        question:"I want to give the gift of Clear Ritual. What are my options?",
        answer: "Here is the answer text...",
      },
      {
        question: "Do digital gift cards expire?",
        answer: "Gift cards never expire.",
      },
      {
        question: "I need to make a change to my digital gift card.",
        answer: "Contact support and we will update the card for you.",
      },
    ],
  };

  return (
    <div className="w-full">
      <HeroSection data={heroSectionDummy} />
      <ExpertsSection data={dummyExpertsSection} />
      <RegimenSection data={dummyRegimenData} />
      <DevelopedWithSection data={developedWithDummy} />
      <IngredientsFaqSection title={faqDummy?.title} questions={faqDummy.faqs} />
    </div>
  );
}
