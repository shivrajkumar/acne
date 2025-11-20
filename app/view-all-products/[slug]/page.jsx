"use client";
import ProductDetailsIndex from "@/components/productDetails/productDetailsIndex";
import React, { useState, useEffect } from "react";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_INGREDIENTS } from "@/constants/urls";
import Loader from "@/components/generic/Loader";
import { useSearchParams } from "next/navigation";

const Page = ({ params }) => {
  const [ingredientsMap, setIngredientsMap] = useState(new Map());
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const searchParams = useSearchParams();

  // Extract variantId from slug and type from query params
  const variantId = params?.slug;
  const productType = searchParams.get("type");

  useEffect(() => {
    fetchAllIngredients();
  }, []);

  const fetchAllIngredients = async () => {
    try {
      setIsLoadingIngredients(true);
      const response = await fetchRequest(GET_INGREDIENTS());

      if (response.status === 200) {
        const data = response.data;

        // Check if content exists directly or nested
        const content = data?.data?.content || data;
        const processedMap = new Map();

        // Process ayurveda ingredients
        if (content.ayurveda && Array.isArray(content.ayurveda)) {
          content.ayurveda.forEach((item) => {
            processedMap.set(item.id, { ...item, ingredientType: "ayurveda" });
          });
        }

        // Process cosmetics ingredients
        if (content.cosmetics && Array.isArray(content.cosmetics)) {
          content.cosmetics.forEach((item) => {
            processedMap.set(item.id, {
              ...item,
              ingredientType: "cosmetics",
            });
          });
        }

        // Process drugs ingredients
        if (content.drugs && Array.isArray(content.drugs)) {
          content.drugs.forEach((item) => {
            processedMap.set(item.id, { ...item, ingredientType: "drugs" });
          });
        }

        setIngredientsMap(processedMap);
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    } finally {
      setIsLoadingIngredients(false);
    }
  };

  if (isLoadingIngredients) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <ProductDetailsIndex
        variantId={variantId}
        ingredientsMap={ingredientsMap}
        type={productType}
      />
    </div>
  );
};

export default Page;
