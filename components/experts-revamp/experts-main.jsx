"use client";

import { useState, useEffect } from "react";
import HeroSection from "./experts-hero";
import ExpertsSection from "./experts-section";
import RegimenSection from "./experts-regimen";
import DevelopedWithSection from "./experts-developed-with-section";
import IngredientsFaqSection from "../ingredientsLanding/components/ingredientsFaq";
import { fetchStrapiData } from "@/helpers/strapiClient";
import Loader from "@/components/generic/Loader";

export default function ExpertsPage() {
  const [expertsData, setExpertsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchStrapiData("/api/cr-expert");

      if (error) {
        console.warn("Failed to load experts data:", error);
      }

      setExpertsData(data);
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

  return (
    <div className="w-full">
      <HeroSection data={expertsData?.data?.hero_section} />
      <ExpertsSection data={expertsData?.data?.experts_section} />
      <RegimenSection data={expertsData?.data?.regimen_section} />
      <DevelopedWithSection data={expertsData?.data?.developed_with_section} />
      <IngredientsFaqSection title={expertsData?.data?.faq_section?.title} questions={expertsData?.data?.faq_section?.faqs} />
    </div>
  );
}
