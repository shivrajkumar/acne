"use client";
import React, { useState, useEffect } from "react";
import ProductsBanner from "../products-landing/components/productsBanner";
import ConcernSection from "../products-landing/components/concern-section";
import WhyClearSkin from "./components/why-clear-skin";
import RootCauseSection from "./components/root-cause-section";
import Supplements from "./components/supplements";
import HairGrowthNutraceuticals from "./components/hair-growth-nutraceuticals";
import SkinFoodBanners from "./components/skin-food-banners";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_ACNE_PRODUCTS } from "@/constants/urls";

const SkinFoodMain = () => {
  const [skinFoodProducts, setSkinFoodProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkinFoodProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchRequest(GET_ACNE_PRODUCTS());
        const productsData = response?.data?.allProducts || [];

        if (!Array.isArray(productsData)) {
          throw new Error("Invalid products format");
        }

        // Filter only SUPPLEMENT type products (skin food)
        const skinFood = productsData.filter((product) => product.type === "SUPPLEMENT");

        // Transform products to match the ConcernSection format
        const transformedProducts = skinFood.map((p) => ({
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
          type: p.type, // Pass product type
        }));

        setSkinFoodProducts(transformedProducts);
      } catch (err) {
        console.error("Error fetching skin food products:", err);
        setError(err.message || "Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkinFoodProducts();
  }, []);

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

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-10 text-red-500">
          Error loading products: {error}
        </div>
      )}

      {/* Skin Food Products Section */}
      {!isLoading && !error && skinFoodProducts.length > 0 && (
        <ConcernSection
          concern={{
            title: "Skin Food",
            products: skinFoodProducts,
          }}
        />
      )}

      {/* No Products State */}
      {!isLoading && !error && skinFoodProducts.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No skin food products available at the moment.
        </div>
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
