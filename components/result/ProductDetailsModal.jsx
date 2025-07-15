"use client";
import React, { useState, useEffect, useRef } from "react";
import tickIcon from "@assets/svg/tick.svg";
import Image from "next/image";
import { fetchRequest } from "@/helpers/fetchRequest";
import Loader from "../generic/Loader";
import { PRODUCT_BOTTOM_SHEET_API } from "@/constants/urls";
import ProductCarousel from "./ProductCarousel";
import ProductBenefit from "./ProductBenefit";
import ProductErrorState from "./ProductErrorState";
import ProductEmptyState from "./ProductEmptyState";
import ProductReview from "./ProductReview";
import ProductKeyIngredient from "./ProductKeyIngredient";
import ProductFAQs from "./ProductFAQs";
import ProductHeader from "./ProductHeader";
import ProductCollapsibleSection from "./ProductCollapsibleSection";

const ProductPageModal = ({ variantId, handleCancel }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedIdealForSec, setExpandedIdealForSec] = useState(true);
  const [expandedCourseDurationSec, setExpandedCourseDurationSec] =
    useState(true);
  const [expandedKeyIngredientSec, setExpandedKeyIngredientSec] =
    useState(true);
  const [expandedFaqSec, setExpandedFaqSec] = useState(true);
  const [expandedReviewSec, setExpandedReviewSec] = useState(true);

  useEffect(() => {
    fetchEachProductDetails();
  }, [variantId]);

  // causing unnecessary scroll onload. 
  // const scrollableContentRef = useRef(null);
  // useEffect(() => {
  //   if (scrollableContentRef.current && !isLoading && !error && product) {
  //     scrollableContentRef.current.focus();
  //   }
  // }, [isLoading, error, product]);

  const fetchEachProductDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchRequest(PRODUCT_BOTTOM_SHEET_API(variantId));

      if (!response || response.status !== 200 || !response.data) {
        throw new Error(
          response?.data?.message ||
          "Failed to load product details. Please try again."
        );
      }

      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    fetchEachProductDetails();
  };

  // Loading State - Fixed to be centered and take full width
  if (isLoading) {
    return (
      <div className="w-full bg-white font-sophiaPro">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader />
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="w-full mx-auto p-4 md:p-[10px] bg-white font-sophiaPro">
        <ProductErrorState
          error={error}
          onRetry={handleRetry}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // No product data state
  if (!product || !product.content) {
    return (
      <div className="w-full mx-auto p-4 md:p-[10px] bg-white font-sophiaPro">
        <ProductEmptyState onCancel={handleCancel} />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white font-sophiaPro overflow-hidden flex md:flex-row md:gap-5 flex-col md:h-[400px]">
      {/* Carousel Section - Fixed container */}
      <ProductCarousel images={product?.content?.images} />

      <div 
      // ref={scrollableContentRef}
        className="md:w-[50%] md:overflow-y-scroll md:p-[40px] focus:outline-none"
        tabIndex={0}
        role="region"
        aria-label="Product details">
        {/* Header Section */}
        <ProductHeader content={product?.content} handleCancel={handleCancel} />

        {/* Benefits Section */}
        <ProductBenefit benefits={product?.content?.benefits} />

        {/* Ideal For Section */}
        {product?.content?.ideal_for && (
          <ProductCollapsibleSection
            title="Ideal For:"
            isExpanded={expandedIdealForSec}
            onToggle={() => setExpandedIdealForSec(!expandedIdealForSec)}
          >
            <div className="space-y-2 flex flex-col md:gap-2 gap-1">
              {product?.content?.ideal_for.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center text-[14px] text-primary/700 leading-[150%] font-[400]"
                >
                  <Image
                    src={tickIcon}
                    alt="tick Icon"
                    width={23}
                    height={23}
                  />
                  <span className="ml-1">{item}</span>
                </div>
              ))}
            </div>
          </ProductCollapsibleSection>
        )}

        {/* Course Duration */}
        {product?.content?.course_duration && (
          <ProductCollapsibleSection
            title="Course Duration:"
            isExpanded={expandedCourseDurationSec}
            onToggle={() =>
              setExpandedCourseDurationSec(!expandedCourseDurationSec)
            }
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-[14px] text-primary/700 leading-[150%] font-[400]">
                <Image src={tickIcon} alt="tick Icon" width={23} height={23} />
                <span className="ml-1">
                  {" "}
                  {product?.content?.course_duration?.duration}
                </span>
              </div>
            </div>
            {/* <p className="text-Grey-Neutral/400 text-[12px] font-[400] leading-[140%]">
              {product?.content?.course_duration?.sub_text}
            </p> */}
          </ProductCollapsibleSection>
        )}

        {/* Key Ingredients */}
        {product?.content?.key_ingredients && (
          <ProductCollapsibleSection
            title=" Key Ingredients"
            isExpanded={expandedKeyIngredientSec}
            onToggle={() =>
              setExpandedKeyIngredientSec(!expandedKeyIngredientSec)
            }
          >
            <ProductKeyIngredient
              keyIngredients={product?.content?.key_ingredients}
            />
          </ProductCollapsibleSection>
        )}

        {/* FAQs */}
        {product?.content?.faqs && (
          <ProductCollapsibleSection
            title="FAQs"
            isExpanded={expandedFaqSec}
            onToggle={() => setExpandedFaqSec(!expandedFaqSec)}
          >
            <ProductFAQs faqs={product?.content?.faqs} />
          </ProductCollapsibleSection>
        )}

        {/* Reviews */}
        {product?.content?.reviews && product?.content?.reviews.length > 0 && (
          <ProductCollapsibleSection
            title="Review Highlights"
            isExpanded={expandedReviewSec}
            onToggle={() => setExpandedReviewSec(!expandedReviewSec)}
          >
            <ProductReview reviews={product?.content?.reviews} />
          </ProductCollapsibleSection>
        )}
      </div>
    </div>
  );
};

export default ProductPageModal;
