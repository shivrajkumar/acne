"use client"
import React from "react";
import { Suspense } from "react";
import FeatureGrid from "./FeatureGrid";
import ExpertBanner from "./ExpertBanner";
import SkincareMakeSense from "../about-us/SkincareMakeSenseAboutUs";
import TrustedByDoctors from "./TrustedByDoctors";
import AcneHeader from "@/components/generic/Header/AcneHeader";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneFooter from "@/components/generic/AcneFooter";
import useMediaLoader from "@/hooks/useMediaLoader";
import Loader from "../generic/Loader";

const AcneExpertsPage = () => {
  const isLoading = useMediaLoader({
    minLoadingTime: 2800,
    maxLoadingTime: 3000,
    transitionDelay: 2000
  });

  // Show loader while loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AcneMarqueeBanner />
      <div className=" sticky top-0 z-50">
        <AcneHeader />
      </div>

      <Suspense>
        <div className="flex flex-col md:gap-y-[60px] gap-y-[40px] w-full overflow-hidden">
          <ExpertBanner />
          <TrustedByDoctors />
          <FeatureGrid />
          {/* <TeamGrid /> */}
          <SkincareMakeSense
            expertsPage={true}
            heading="Expert-Designed Acne Care, Made Just for You"
            subText={
              "Acne is never one-size-fits-all — and now, your treatment isn’t either. Get personalised routines crafted for your skin type and acne triggers, backed by leading dermatologists and skin experts."
            }
          />
        </div>
      </Suspense>

      <AcneFooter />
    </>


  );
};

export default AcneExpertsPage;
