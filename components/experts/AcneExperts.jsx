import React from "react";
import FeatureGrid from "./FeatureGrid";
import ExpertBanner from "./ExpertBanner";
import SkincareMakeSense from "../about-us/SkincareMakeSenseAboutUs";
import TrustedByDoctors from "./TrustedByDoctors";
// import TeamGrid from "./TeamGrid";
// import TeamGrid from "./TeamGrid";

const AcneExperts = () => {
  return (
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
  );
};

export default AcneExperts;
