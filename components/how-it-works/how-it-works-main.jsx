"use client";

import React, { useState, useEffect } from "react";
import Hero from "./sections/Hero";
import StepCard from "./sections/StepCard";
import Journey from "./sections/Journey";
import BottomBanner from "./sections/BottomBanner";
import { fetchStrapiData } from "@/helpers/strapiClient";
import Loader from "@/components/generic/Loader";
import BreadcrumbNavigator from "../generic/BreadcrumbNavigator";

export default function HowItWorks() {
  const [howItWorksData, setHowItWorksData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchStrapiData("/api/cr-how-it-works");

      if (error) {
        console.warn("Failed to load how it works data:", error);
      }

      setHowItWorksData(data);
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

  const steps = howItWorksData?.data?.contentSections;

  return (
    <main className="w-full">
      <Hero data={howItWorksData?.data?.bannerSection} />
      <div className="px-4 py-6">
        <BreadcrumbNavigator />
      </div>
      <section className="px-6 md:px-20 py-1 mx-auto">
        {steps?.map((step, index) => (
          <StepCard key={index} step={step} />
        ))}
      </section>

      <Journey data={howItWorksData?.data?.commitmentSection} />
      <BottomBanner data={howItWorksData?.data?.backgroundSection} />
    </main>
  );
}
