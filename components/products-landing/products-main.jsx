"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
import ProductsBanner from "./components/productsBanner";
import ShopByConcern from "./components/shop-by-concern";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_ACNE_PRODUCTS, GET_PRODUCT_CATEGORY } from "@/constants/urls";
import { CDN_BASE_URL } from "@/constants/constants";

// Lazy-loaded heavy components
const ConcernSection = lazy(() => import("./components/concern-section"));
const WhyItWorks = lazy(() => import("./components/why-it-works"));
const IdealSkincareRitual = lazy(() =>
  import("./components/ideal-skincare-ritual")
);
const TroubleTen = lazy(() => import("./components/trouble-ten"));
const RitualShowcase = lazy(() => import("./components/ritual-showcase"));
const SocialTrust = lazy(() => import("./components/social-trust"));

const categoryMapping = {
  COSMETIC_CLEANSER: "cleanse",
  COSMETIC_MOISTURISER: "moisturise",
  COSMETIC_PROTECTION: "protect",
  SUPPLEMENT: "skinFood",
  DRUG: "treatment",
};

const ProductsMainLanding = () => {
  const [categorizedProducts, setCategorizedProducts] = useState({
    cleanse: [],
    moisturise: [],
    protect: [],
    skinFood: [],
    treatment: [],
  });
  const [shopByConcernItems, setShopByConcernItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log({shopByConcernItems})

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchRequest(GET_ACNE_PRODUCTS());
        const productsData = response?.data?.allProducts || [];
        if (!Array.isArray(productsData))
          throw new Error("Invalid products format");

        const categorized = {
          cleanse: [],
          moisturise: [],
          protect: [],
          skinFood: [],
          treatment: [],
        };

        productsData.forEach((p) => {
          const key = categoryMapping[p.type];
          if (key) categorized[key].push(p);
        });

        setCategorizedProducts(categorized);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await fetchRequest(GET_PRODUCT_CATEGORY());
        console.log("Category response:", response);

        // Handle the response structure - content.products contains the category items
        const categoryData = response?.data?.data?.content?.products || [];
        console.log("Category data:", categoryData);
        if (Array.isArray(categoryData) && categoryData.length > 0) {

          const transformedItems = categoryData.map((product) => {
            // Convert relative paths to full CDN URLs
            const imageUrl = product.image?.startsWith("http")
              ? product.image
              : `${CDN_BASE_URL}${product.image}`;

            return {
              label: product.name,
              image: imageUrl,
            };
          });

          console.log("Transformed items:", transformedItems);
          setShopByConcernItems(transformedItems);
        } else {
          console.warn("No category data received or invalid format");
        }
      } catch (err) {
        console.error("Error fetching product categories:", err);
      }
    };

    fetchProductCategories();
  }, []);

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
            })),
          }}
        />
      </Suspense>
    );

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

      {shopByConcernItems.length > 0 && <ShopByConcern items={shopByConcernItems} />}

      <div className="w-full md:w-6/12 px-4 md:px-12 py-6 md:py-20 text-[28px]">
        This isn't just goodbye. These products will soon disappear from the
        Clear Ritual range. Now is the time to fill up!
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-10 text-red-500">
          Error loading products: {error}
        </div>
      )}

      {/* Dynamic Concern Sections */}
      {Object.entries(categorizedProducts).map(([key, products]) =>
        renderConcernSection(
          key === "skinFood"
            ? "Skin Food"
            : key.charAt(0).toUpperCase() + key.slice(1),
          products
        )
      )}

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
