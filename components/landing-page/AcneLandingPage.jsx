import React from "react";
import BannerSection from "./BannerSection";
import ListOfProblems from "./ListOfProblems";
import {
  listOfProblems,
  howItWorks,
  rootCauses,
  skincareIngredients,
  testimonials,
  FAQHomePage,
} from "@/constants/allVayuData";
import FAQSection from "./FaqSection";
import AcneThreeFoldApproach from "./AcneThreefoldApproach";
import GetCustomRoutineBanner from "./GetCutomRoutinebanner";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/AcneHeader";
import WhatIsCleaRitual from "./WhatIsCleaRitual";
import AcneRealPeoplRealStories from "./AcneRealPeoplRealStories";
import AcneHowItWorks from "./AcneHowItWorks";
import AcneRootCauses from "./AcneRootCauses";
import AcneIngredients from "./AcneIngredients";
import AcneOurTeam from "./AcneOurTeam";
import AcneAccurateResults from "./AcneAccurateResults";
import AcneFooter from "../generic/AcneFooter";
import LogMoengage from "../generic/LogMoengage";

const AcneLandingPage = () => {


  return (
    <div className="!font-lato">
      <div className="md:relative sticky top-0 z-50">
        <AcneMarqueeBanner />
        <AcneHeader />
      </div>
      <BannerSection />
      {/* <Brandmarquee /> */}
      <div className="mx-[16px] mt-[28px] mb-[40px]  md:mx-[40px] md:mt-[40px] gap-[40px] md:gap-[80px] flex flex-col !font-lato">

        <WhatIsCleaRitual />
        <AcneRealPeoplRealStories
          testimonials={testimonials}
          dualImage={true}
        />
        <ListOfProblems listOfProblems={listOfProblems} />
        <AcneHowItWorks howItWorks={howItWorks} />

        <AcneRootCauses rootcauses={rootCauses} />
        <AcneThreeFoldApproach />
        <AcneIngredients ingredients={skincareIngredients} />
        <AcneOurTeam />
        <GetCustomRoutineBanner />
        <AcneAccurateResults />
        <FAQSection data={FAQHomePage} />


      </div>

      <AcneFooter />

      <LogMoengage event="acne_WebsiteLanded" attributes={{ timestamp: new Date().toISOString() }} />
    </div>
  );
};

export default AcneLandingPage;
