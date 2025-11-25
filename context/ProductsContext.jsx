"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_ACNE_PRODUCTS, GET_PRODUCT_CATEGORY } from "@/constants/urls";
import { CDN_BASE_URL } from "@/constants/constants";

const ProductsContext = createContext(null);

const categoryMapping = {
  COSMETIC_CLEANSER: "cleanse",
  COSMETIC_MOISTURISER: "moisturise",
  COSMETIC_PROTECTION: "protect",
  SUPPLEMENT: "skinFood",
  DRUG: "treatment",
};

export const ProductsProvider = ({ children }) => {
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
  const [hasFetchedProducts, setHasFetchedProducts] = useState(false);
  const [hasFetchedCategories, setHasFetchedCategories] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (hasFetchedProducts) return; // Skip if already fetched

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
      setHasFetchedProducts(true);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }, [hasFetchedProducts]);

  const fetchProductCategories = useCallback(async () => {
    if (hasFetchedCategories) return; // Skip if already fetched

    try {
      const response = await fetchRequest(GET_PRODUCT_CATEGORY());

      const categoryData = response?.data?.data?.content?.products || [];

      if (Array.isArray(categoryData) && categoryData.length > 0) {
        const transformedItems = categoryData.map((product) => {
          const imageUrl = product.image?.startsWith("http")
            ? product.image
            : `${CDN_BASE_URL}${product.image}`;

          return {
            label: product.name.trim(),
            normalized: product.name
              .trim()
              .toUpperCase()
              .replace(/\s+/g, " "),
            image: imageUrl,
          };
        });

        const preferredOrder = [
          "FACEWASH",
          "MOISTURISER",
          "SUNSCREEN",
          "SKIN FOOD",
        ];

        const orderedItems = preferredOrder
          .map((key) =>
            transformedItems.find((item) => item.label.toUpperCase() === key)
          )
          .filter(Boolean);

        setShopByConcernItems(orderedItems);
        setHasFetchedCategories(true);
      } else {
        console.warn("No category data received or invalid format");
      }
    } catch (err) {
      console.error("Error fetching product categories:", err);
    }
  }, [hasFetchedCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProductCategories();
  }, [fetchProductCategories]);

  const value = {
    categorizedProducts,
    shopByConcernItems,
    isLoading,
    error,
    refetchProducts: () => {
      setHasFetchedProducts(false);
      fetchProducts();
    },
    refetchCategories: () => {
      setHasFetchedCategories(false);
      fetchProductCategories();
    },
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProductsContext must be used within a ProductsProvider");
  }

  return context;
};
