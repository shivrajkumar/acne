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
        title={`Personalised Skin Food That Targets the Internal Trigger of Acne`}
        subtitle="We’ve created 9 personalised Skin Food supplements - Ayurvedic (100% herbal & safe) - to nourish your skin from within."
        gradientFrom="white"
        gradientTo="#CDE3C1"
        titleColor="#0F1B28"
        subtitleColor="#4B5563"
        titleSizeMobile="text-[28px]"
        titleSizeDesktop="md:text-[87px]"
        fontWeight="font-normal"
        containerClasses="px-4 md:px-12 py-12"
      />

      <div className="w-full md:w-6/12 px-4 md:px-12 py-6 md:py-10 text-[18px] md:text-[28px]">
        At Clear Ritual, we work to fix the acne trigger and give you clear skin that lasts.
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
