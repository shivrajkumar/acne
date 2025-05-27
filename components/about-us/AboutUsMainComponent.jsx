"use client";
import React, { useState, useEffect } from "react";
import AboutUsBanner from "./AboutUsBanner";
import InfoSection from "./InfoSection";
import SkinCareCarousel from "./SkinCareCarousel";
import WaveMarquee from "./WaveMarquee";
import SkincareMakeSenseAboutUs from "./SkincareMakeSenseAboutUs";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/AcneHeader";
import AcneFooter from "../generic/AcneFooter";
import Loader from "../generic/Loader";

const AboutUsMainComponent = () => {
  const isLoading = useMediaLoader();

  // Show loader while loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AcneMarqueeBanner />
      <div className="sticky top-0 z-50">
        <AcneHeader />
      </div>
      <AboutUsBanner />
      <WaveMarquee />
      <InfoSection />
      <SkinCareCarousel />
      <SkincareMakeSenseAboutUs />
      <AcneFooter />
    </>
  );
};

export default AboutUsMainComponent;
