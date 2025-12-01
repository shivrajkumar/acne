import React from "react";
import { STRAPI_DEV_URL } from "@/constants/constants";
import ScienceHero from "./ScienceHero";
import BiologySection from "./BiologySection";
import InteractiveFactorsSection from "./InteractiveFactorsSection";
import ThreeLayerSystemSection from "./ThreeLayerSystemSection";
import VideoSection from "./VideoSection";
import RealResultsSection from "./RealResultsSection";
import ProductComparisonSection from "./ProductComparisonSection";
import ResearchStatsSection from "./ResearchStatsSection";
import ScienceFaqSection from "./ScienceFaqSection";

async function getScienceData() {
  try {
    const res = await fetch(`${STRAPI_DEV_URL}/api/cr-science?populate=deep`, {
      method: "GET",
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch science data: ${res.status}`);
    }

    const data = await res.json();
    return data?.data?.attributes || null;
  } catch (err) {
    console.error("Error fetching science data:", err);
    return null;
  }
}

export default async function ScienceMain() {
  const scienceData = await getScienceData();

  if (!scienceData) {
    console.warn("Failed to load science data, using fallback content");
  }

  return (
    <main className="w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <ScienceHero data={scienceData?.hero_section} />

      {/* Biology Behind Acne Section */}
      <BiologySection data={scienceData?.biology_section} />

      {/* Interactive Acne Factors Section */}
      <InteractiveFactorsSection data={scienceData?.factors_section} />

      {/* 3-Layer System Section */}
      <ThreeLayerSystemSection data={scienceData?.three_layer_section} />

      {/* Video Section */}
      <VideoSection data={scienceData?.video_section} />

      {/* Real Results Section */}
      <RealResultsSection data={scienceData?.results_section} />

      {/* Product Comparison Section */}
      <ProductComparisonSection data={scienceData?.comparison_section} />

      {/* Research Stats Section */}
      <ResearchStatsSection data={scienceData?.research_stats} />

      {/* FAQ Section */}
      <ScienceFaqSection data={scienceData?.faq_section} />
    </main>
  );
}
