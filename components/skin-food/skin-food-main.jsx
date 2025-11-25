"use client";
import React, { useMemo } from "react";
import ProductsBanner from "../products-landing/components/productsBanner";
import ConcernSection from "../products-landing/components/concern-section";
import WhyClearSkin from "./components/why-clear-skin";
import RootCauseSection from "./components/root-cause-section";
import Supplements from "./components/supplements";
import HairGrowthNutraceuticals from "./components/hair-growth-nutraceuticals";
import SkinFoodBanners from "./components/skin-food-banners";
import { useProductsContext } from "@/context/ProductsContext";

const SkinFoodMain = () => {
  const { categorizedProducts, isLoading, error } = useProductsContext();

  // Transform skin food products from context to match the ConcernSection format
  const skinFoodProducts = useMemo(() => {
    return categorizedProducts.skinFood.map((p) => ({
      id: p.variantId,
      name: p.name,
      image: p.image,
      price: p.price,
      rating: p.rating,
      ratingCount: p.ratingPeopleCount,
      size: p.size,
      description: p.description,
      tags: p.tags,
      dosage: p.dosage,
      type: p.type,
    }));
  }, [categorizedProducts.skinFood]);

  return (
    <div>
      <ProductsBanner
        title={`Personalised Skin Food That Targets the Root Cause of Acne`}
        subtitle="At Clear Ritual, we’ve created 9 personalised Skin Food supplements - Ayurvedic, 100% herbal, and dermatologist-reviewed - to help rebalance your body from within. These are not generic gummies or vitamins. They're designed to target the real triggers behind acne: hormones, gut, liver, stress, and more."
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
        Acne begins when your body produces too much oil triggered by things like diet, hormones, and stress. Creams and face washes only treat the surface, so acne always comes back. At Clear Ritual, we work to fix the acne trigger and give you clear skin that lasts.
      </div>

      {/* Skin Food Products Section */}
      {!isLoading && !error && skinFoodProducts.length > 0 && (
        <ConcernSection
          concern={{
            title: "Skin Food",
            products: skinFoodProducts,
          }}
        />
      )}

      <WhyClearSkin />
      <RootCauseSection/>
      <Supplements />
      <HairGrowthNutraceuticals />
      <SkinFoodBanners />
    </div>
  );
};

export default SkinFoodMain;
