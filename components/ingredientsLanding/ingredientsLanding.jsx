import React from "react";
import IngredientsHeroSection from "./components/ingredientsHeroSection";
import IngredientsFeaturesBar from "./components/IngredientsFeaturesBar";
import PillarsSection from "./components/pillarsSection";
import IngredientToggle from "./components/ingredientsToggle";
import AZTabs from "./components/azTabs";
import IngredientGrid from "./components/ingredientsGrid";
import IngredientsFaqSection from "./components/ingredientsFaq";
import BreadcrumbNavigator from "../generic/BreadcrumbNavigator";

const IngredientsLanding = ({}) => {
  return (
    <div>
      <div>
        <IngredientsHeroSection />
        <IngredientsFeaturesBar />
        <div className="mt-10 px-4 md:px-12 md:container mx-auto">
          <BreadcrumbNavigator />
        </div>
        <PillarsSection />
        <div className="py-10 px-4 md:px-12 md:container mx-auto">
          <h2 className="text-2xl md:text-4xl font-normal font-sophiaPro text-start md:text-center mb-4">
            Our Ingredient Index
          </h2>
          <div className="text-sm md:text-base text-start md:text-center font-semibold font-sophiaPro">
            Here’s what we’re working with. Every Prose formula is a unique
            combination chosen from these safe and sustainable ingredients.
            We’ve also included the EWG scores of each—we’re proud that the vast
            majority come in at 1. Just like in golf, we’re always going for a
            lower score here.
          </div>

          <IngredientToggle />
          <div className="relative w-full">
            {/* Absolutely positioned Tabs */}
            <div className="absolute top-0 -right-9 z-10">
              <AZTabs />
            </div>

            {/* Grid takes full width */}
            <div className="w-full">
              <IngredientGrid />
            </div>
          </div>
        </div>
        <IngredientsFaqSection />
      </div>
    </div>
  );
};

export default IngredientsLanding;
