"use client";

import React, { useState, useEffect } from "react";
import { fetchStrapiData } from "@/helpers/strapiClient";
import ScienceHero from "./ScienceHero";
import BiologySection from "./BiologySection";
import InteractiveFactorsSection from "./InteractiveFactorsSection";
import ThreeLayerSystemSection from "./ThreeLayerSystemSection";
import VideoSection from "./VideoSection";
import RealResultsSection from "./RealResultsSection";
import ProductComparisonSection from "./ProductComparisonSection";
import ResearchStatsSection from "./ResearchStatsSection";
import ScienceFaqSection from "./ScienceFaqSection";
import Loader from "@/components/generic/Loader";

export default function ScienceMain() {
  const [scienceData, setScienceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchStrapiData("/api/cr-science?populate=deep");

      if (error) {
        console.warn("Failed to load science data:", error);
      }

      setScienceData(data?.data?.attributes);
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
