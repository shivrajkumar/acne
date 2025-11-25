"use client";
import React, { lazy, Suspense } from "react";
import ProductsBanner from "./components/productsBanner";
import ShopByConcern from "./components/shop-by-concern";
import { useProductsContext } from "@/context/ProductsContext";

// Lazy-loaded heavy components
const ConcernSection = lazy(() => import("./components/concern-section"));
const WhyItWorks = lazy(() => import("./components/why-it-works"));
const IdealSkincareRitual = lazy(() => import("./components/ideal-skincare-ritual"));
const TroubleTen = lazy(() => import("./components/trouble-ten"));
const RitualShowcase = lazy(() => import("./components/ritual-showcase"));
const SocialTrust = lazy(() => import("./components/social-trust"));

const ProductsMainLanding = () => {
  const { categorizedProducts, shopByConcernItems, isLoading, error } =
    useProductsContext();

  const renderConcernSection = (title, products) =>
    !isLoading &&
    products.length > 0 && (
      <Suspense
        key={title}
        fallback={<div className="py-10 text-center">Loading {title}...</div>}
      >
        <ConcernSection
          concern={{
            title,
            products: products.map((p) => ({
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
            })),
          }}
        />
      </Suspense>
    );

  return (
    <div>
      <ProductsBanner
        title={`A Personalised Acne Ritual for Clear, Long-Term Skin Health`}
        subtitle="Every product in Clear Ritual is designed to treat acne at the source."
        gradientFrom="white"
        gradientTo="#DCEBF2"
        titleColor="#0F1B28"
        subtitleColor="#4B5563"
        titleSizeMobile="text-[28px]"
        titleSizeDesktop="md:text-[87px]"
        fontWeight="font-normal"
        containerClasses="px-4 md:px-12 py-12"
      />

      {shopByConcernItems.length > 0 && (
        <ShopByConcern items={shopByConcernItems} />
      )}

      <div className="w-full md:w-6/12 px-4 md:px-12 py-6 md:py-20 text-[18px] md:text-[28px]">
        This isn’t a quick fix. It’s your daily ritual for real, lasting change.
      </div>

      {/* Dynamic Concern Sections */}
      {Object.entries(categorizedProducts).map(([key, products]) => {
        if (key === "treatment") return null; // Skip the "treat" section

        return renderConcernSection(
          key === "skinFood"
            ? "Skin Food"
            : key.charAt(0).toUpperCase() + key.slice(1),
          products
        );
      })}

      {/* Lazy-loaded bottom sections */}
      <Suspense
        fallback={
          <div className="py-10 text-center">Loading Why It Works...</div>
        }
      >
        <WhyItWorks />
      </Suspense>
      <Suspense
        fallback={<div className="py-10 text-center">Loading Ritual...</div>}
      >
        <IdealSkincareRitual />
      </Suspense>
      <Suspense
        fallback={
          <div className="py-10 text-center">Loading Trouble Ten...</div>
        }
      >
        <TroubleTen />
      </Suspense>
      <Suspense
        fallback={<div className="py-10 text-center">Loading Showcase...</div>}
      >
        <RitualShowcase />
      </Suspense>
      <Suspense
        fallback={
          <div className="py-10 text-center">Loading Social Proof...</div>
        }
      >
        <SocialTrust />
      </Suspense>
    </div>
  );
};

export default ProductsMainLanding;
