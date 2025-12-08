"use client";

import { useState, useEffect } from "react";
import Hero from "./sections/Hero";
import InsideOutside from "./sections/InsideOutside";
import Diagnose from "./sections/Diagnose";
import Simplicity from "./sections/Simplicity";
import RealPeople from "./sections/RealPeople";
import FivePillars from "./sections/FivePillars";
import Efficacy from "./sections/efficacy";
import { fetchStrapiData } from "@/helpers/strapiClient";
import Loader from "@/components/generic/Loader";
import BreadcrumbNavigator from "../generic/BreadcrumbNavigator";

export default function Philosophy() {
  const [philosophyData, setPhilosophyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchStrapiData("/api/cr-our-plan");

      if (error) {
        console.warn("Failed to load philosophy data:", error);
      }

      setPhilosophyData(data);
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
    <main className="w-full">
        <Hero data={philosophyData?.data?.heroSection} />
        <div className="px-4 py-4"><BreadcrumbNavigator/></div>
        <InsideOutside data={philosophyData?.data?.insideOutsideCareSection} />
        <FivePillars data={philosophyData?.data?.fivePillarsSection} />
        <Diagnose data={philosophyData?.data?.diagnosisSection} />
        <Simplicity data={philosophyData?.data?.simplicitySection} />
        <RealPeople data={philosophyData?.data?.testimonialsSection} />
        <Efficacy data={philosophyData?.data?.efficacyBannerSection} />
    </main>
  );
}
