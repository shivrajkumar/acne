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

export default function AboutUs() {
  const [aboutUsData, setAboutUsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchStrapiData("/api/cr-about-us");

      if (error) {
        console.warn("Failed to load about us data:", error);
      }

      setAboutUsData(data);
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
        <Hero data={aboutUsData?.data?.hero_section} />
        <TrialAndError data={aboutUsData?.data?.trial_and_error_section} />
        <HowWeChangeTheGame data={aboutUsData?.data?.how_we_change_section} />
        <Ingredients data={aboutUsData?.data?.ingredients_section} />
        <Ayurveda data={aboutUsData?.data?.ayurveda_dermatology_section} />
        <Efficacy data={aboutUsData?.data?.bannerWithText} />
        <AdvisoryBoard data={aboutUsData?.data?.advisory_board_section} />
        <NoteFromTeam data={aboutUsData?.data?.team_note_section} />
    </main>
  );
}
