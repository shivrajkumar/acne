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

export default function Philosophy() {
  const [philosophyData, setPhilosophyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchStrapiData("/api/cr-our-plan?populate=deep");

      if (error) {
        console.warn("Failed to load philosophy data:", error);
      }

      setPhilosophyData(data?.data?.attributes);
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
        <Hero data={philosophyData?.hero_section} />
        <InsideOutside data={philosophyData?.inside_outside_section} />
        <FivePillars data={philosophyData?.five_pillars_section} />
        <Diagnose data={philosophyData?.diagnose_section} />
        <Simplicity data={philosophyData?.simplicity_section} />
        <RealPeople data={philosophyData?.real_people_section} />
        <Efficacy data={philosophyData?.efficacy_section} />
    </main>
  );
}
