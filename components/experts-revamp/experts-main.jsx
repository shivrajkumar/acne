import HeroSection from "./experts-hero";
import ExpertsSection from "./experts-section";
import RegimenSection from "./experts-regimen";
import DevelopedWithSection from "./experts-developed-with-section";
import IngredientsFaqSection from "../ingredientsLanding/components/ingredientsFaq";
import { STRAPI_DEV_URL } from "@/constants/constants";

async function getExpertsData() {
  try {
    const res = await fetch(
      `${STRAPI_DEV_URL}/api/cr-expert`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch experts data: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error("Error fetching experts data:", err);
    return null;
  }
}

export default async function ExpertsPage() {
  const expertsData = await getExpertsData();

  if (!expertsData) {
    console.warn("Failed to load experts data, using fallback");
  }

  return (
    <div className="w-full">
      <HeroSection data={expertsData?.hero_section} />
      <ExpertsSection data={expertsData?.experts_section} />
      <RegimenSection data={expertsData?.regimen_section} />
      <DevelopedWithSection data={expertsData?.developed_with_section} />
      <IngredientsFaqSection title={expertsData?.faq_section?.title} questions={expertsData?.faq_section?.faqs} />
    </div>
  );
}
