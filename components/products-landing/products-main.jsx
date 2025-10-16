"use client";
import React, { useState, useEffect } from "react";
import ProductsBanner from "./components/productsBanner";
import ShopByConcern from "./components/shop-by-concern";
import product1 from "@assets/images/products-1.webp";
import product2 from "@assets/images/products-2.webp";
import product3 from "@assets/images/products-3.webp";
import { shopByConcerns } from "./data/data";
import ConcernSection from "./components/concern-section";
import WhyItWorks from "./components/why-it-works";
import IdealSkincareRitual from "./components/ideal-skincare-ritual";
import TroubleTen from "./components/trouble-ten";
import RitualShowcase from "./components/ritual-showcase";
import SocialTrust from "./components/social-trust";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_ACNE_PRODUCTS } from "@/constants/urls";

const ProductsMainLanding = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchRequest(GET_ACNE_PRODUCTS());
      
      if (response && response.status === 200 && response.data) {
        setProducts(response.data);
        console.log('ACNE Products Data:', response);
      } else {
        throw new Error(
          response?.data?.message
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ProductsBanner
        title={`an ingredient-elimination\nphilosophy for a total skin reset.`}
        subtitle="Well done on completing your personalised kit—consistency is the real secret to lasting clear skin."
        gradientFrom="white"
        gradientTo="#DCEBF2"
        titleColor="#45474A"
        subtitleColor="#4B5563"
        titleSizeMobile="text-[28px]"
        titleSizeDesktop="md:text-[87px]"
        fontWeight="font-normal"
        containerClasses="px-4 md:px-12 py-12"
      />

      <ShopByConcern
        items={[
          { label: "FACEWASH", image: product1 },
          { label: "MOISTURISER", image: product2 },
          { label: "SUNSCREEN", image: product3 },
          { label: "SKIN FOOD", image: product1 },
        ]}
      />

      <div className="w-full md:w-6/12 px-4 md:px-12 py-6 md:py-20 text-[28px]">
        This isn’t just goodbye. These products will soon disappear from the
        Clear Ritual range. Now is the time to fill up!
      </div>

      {shopByConcerns.map((concern) => (
        <ConcernSection key={concern.title} concern={concern} />
      ))}

      <WhyItWorks />
      <IdealSkincareRitual />
      <TroubleTen />
      <RitualShowcase />
      <SocialTrust />
    </div>
  );
};

export default ProductsMainLanding;
