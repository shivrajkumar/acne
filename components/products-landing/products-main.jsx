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
  const [categorizedProducts, setCategorizedProducts] = useState({
    cleanse: [],
    moisturise: [],
    protect: [],
    skinFood: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Log categorizedProducts whenever it changes
  useEffect(() => {
  }, [categorizedProducts]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchRequest(GET_ACNE_PRODUCTS());
      
      if (response && response.status === 200 && response.data) {
        // The actual products array is in response.data.allProducts
        const productsData = response.data.allProducts || response.data.data || response.data;
        setProducts(productsData);
        
        // Categorize products by type
        const categorized = {
          cleanse: [],
          moisturise: [],
          protect: [],
          skinFood: [],
          treatment: []
        };
        
        if (Array.isArray(productsData)) {
          productsData.forEach(product => {
            switch(product.type) {
              case 'COSMETIC_CLEANSER':
                categorized.cleanse.push(product);
                break;
              case 'COSMETIC_MOISTURISER':
                categorized.moisturise.push(product);
                break;
              case 'COSMETIC_PROTECTION':
                categorized.protect.push(product);
                break;
              case 'SUPPLEMENT':
                categorized.skinFood.push(product);
                break;
              case 'DRUG':
                categorized.treatment.push(product);
                break;
              default:
                break;
            }
          });
          
          setCategorizedProducts(categorized);
        } else {
          console.error('Products data is not an array:', productsData);
        }
      } else {
        throw new Error(
          response?.data?.message || 'Failed to fetch products'
        );
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching products:', error);
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

      {/* Cleanse Section */}
      {!isLoading && categorizedProducts.cleanse.length > 0 && (
        <ConcernSection 
          concern={{
            title: "Cleanse",
            products: categorizedProducts.cleanse.map(p => ({
              id: p.variantId,
              name: p.name,
              image: p.image,
              price: p.price,
              rating: p.rating,
              ratingCount: p.ratingPeopleCount,
              size: p.size,
              description: p.description,
              tags: p.tags,
              dosage: p.dosage
            }))
          }}
        />
      )}
      
      {/* Moisturise Section */}
      {!isLoading && categorizedProducts.moisturise.length > 0 && (
        <ConcernSection 
          concern={{
            title: "Moisturise",
            products: categorizedProducts.moisturise.map(p => ({
              id: p.variantId,
              name: p.name,
              image: p.image,
              price: p.price,
              rating: p.rating,
              ratingCount: p.ratingPeopleCount,
              size: p.size,
              description: p.description,
              tags: p.tags,
              dosage: p.dosage
            }))
          }}
        />
      )}
      
      {/* Protect Section */}
      {!isLoading && categorizedProducts.protect.length > 0 && (
        <ConcernSection 
          concern={{
            title: "Protect",
            products: categorizedProducts.protect.map(p => ({
              id: p.variantId,
              name: p.name,
              image: p.image,
              price: p.price,
              rating: p.rating,
              ratingCount: p.ratingPeopleCount,
              size: p.size,
              description: p.description,
              tags: p.tags,
              dosage: p.dosage
            }))
          }}
        />
      )}
      
      {/* Skin Food Section */}
      {!isLoading && categorizedProducts.skinFood.length > 0 && (
        <ConcernSection 
          concern={{
            title: "Skin Food",
            products: categorizedProducts.skinFood.map(p => ({
              id: p.variantId,
              name: p.name,
              image: p.image,
              price: p.price,
              rating: p.rating,
              ratingCount: p.ratingPeopleCount,
              size: p.size,
              description: p.description,
              tags: p.tags,
              dosage: p.dosage
            }))
          }}
        />
      )}

      <WhyItWorks />
      <IdealSkincareRitual />
      <TroubleTen />
      <RitualShowcase />
      <SocialTrust />
    </div>
  );
};

export default ProductsMainLanding;