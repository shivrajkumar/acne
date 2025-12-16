"use client";

import { useState, useEffect } from "react";
import Hero from "./sections/Hero";
import TrialAndError from "./sections/TrialAndError";
import HowWeChangeTheGame from "./sections/HowWeChangeTheGame";
import Ayurveda from "./sections/ayurveda";
import Ingredients from "./sections/Ingredients";
import AdvisoryBoard from "./sections/AdvisoryBoard";
import NoteFromTeam from "./sections/NoteFromTeam";
import Efficacy from "./sections/efficacy";
import { fetchStrapiData } from "@/helpers/strapiClient";
import Loader from "@/components/generic/Loader";
import BreadcrumbNavigator from "../generic/BreadcrumbNavigator";
import { fetchRequest } from "@/helpers/fetchRequest";
import { STRAPI_DEV_URL } from "@/constants/constants";

export default function AboutUs() {
  const [aboutUsData, setAboutUsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Use the fetchStrapiData helper to fetch data
        const { data, error } = await fetchStrapiData('/api/cr-about-uses');
        const { dataUAE, errorUAE } = await fetchStrapiData('/api/uae-about-us');
        console.log(dataUAE, "TESSSSSSSSSSSSSSSS")

        if (error) {
          console.warn("Failed to load about us data:", error);
          setAboutUsData(null);
          return;
        }

        // Since the response is an array, get the first element
        const aboutUsContent = Array.isArray(data.data) ? data.data[0] : data.data;
        setAboutUsData(aboutUsContent);
      } catch (error) {
        console.warn("Failed to load about us data:", error);
        setAboutUsData(null);
      } finally {
        setLoading(false);
      }
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
        <Hero data={aboutUsData?.hero_section} />
        <div className="px-4 py-4"><BreadcrumbNavigator/></div>
        <TrialAndError data={aboutUsData?.trial_and_error_section} />
        <HowWeChangeTheGame data={aboutUsData?.how_we_change_section} />
        <Ingredients data={aboutUsData?.ingredients_section} />
        <Ayurveda data={aboutUsData?.ayurveda_dermatology_section} />
        <Efficacy data={aboutUsData?.bannerWithText} />
        <AdvisoryBoard data={aboutUsData?.advisory_board_section} />
        <NoteFromTeam data={aboutUsData?.team_note_section} />
    </main>
  );
}
