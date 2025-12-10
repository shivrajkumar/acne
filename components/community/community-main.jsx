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
import BreadcrumbNavigator from "../generic/BreadcrumbNavigator";

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
      <div className="px-4 py-4">
        <BreadcrumbNavigator/>
      </div>
      <ThickHair data={communityData?.data?.taglineSection} />
      <Acne data={communityData?.data?.missionSection} />
      <AboutSection data={communityData?.data?.whatWeDiscussSection} />
      <Story data={communityData?.data?.testimonialFeatureSection} reverse={false}/>
      <Numbers data={communityData?.data?.statisticsSection} />
      <StoriesGridSection data={communityData?.data?.realSkinStoriesSection} />
      <Story data={communityData?.data?.mythBusterSection} reverse={true}/>
      <HairJourney data={communityData?.data?.journeyCtaSection} />
      {/* <Shedding /> */}
      <div className="px-4">
        <IngredientsFaqSection showTitle={true} questions={FAQ_ITEMS?.faqs} />
      </div>
    </main>
  );
}
