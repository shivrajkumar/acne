import React from "react";
import ProductsBanner from "../products-landing/components/productsBanner";
import ConcernSection from "../products-landing/components/concern-section";
import { skinFoodItems } from "./data";
import WhyClearSkin from "./components/why-clear-skin";
import RootCauseSection from "./components/root-cause-section";
import Supplements from "./components/supplements";
import HairGrowthNutraceuticals from "./components/hair-growth-nutraceuticals";
import SkinFoodBanners from "./components/skin-food-banners";

const SkinFoodMain = () => {
  return (
    <div>
      <ProductsBanner
        title={`an ingredient-elimination\nphilosophy for a total skin reset.`}
        subtitle="Well done on completing your personalised kit—consistency is the real secret to lasting clear skin."
        gradientFrom="white"
        gradientTo="#CDE3C1"
        titleColor="#45474A"
        subtitleColor="#4B5563"
        titleSizeMobile="text-[28px]"
        titleSizeDesktop="md:text-[87px]"
        fontWeight="font-normal"
        containerClasses="px-4 md:px-12 py-12"
      />

      <div className="w-full md:w-6/12 px-4 md:px-12 py-6 md:py-10 text-[18px] md:text-[28px]">
        This isn’t just goodbye. These products will soon disappear from the
        Clear Ritual range. Now is the time to fill up!
      </div>

      {skinFoodItems?.map((concern) => (
        <ConcernSection key={concern.title} concern={concern} />
      ))}

      <WhyClearSkin />
      <RootCauseSection/>
      <Supplements />
      <HairGrowthNutraceuticals />
      <SkinFoodBanners />
    </div>
  );
};

export default SkinFoodMain;
