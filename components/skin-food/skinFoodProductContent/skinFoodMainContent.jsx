'use client'
import React, { useState, useEffect } from "react";
import ProductImage from '../../../assets/images/products-1.webp'
import product1 from "@assets/images/products-1.webp";
import product2 from "@assets/images/products-2.webp";
import ProductGallery from "@/components/productDetails/components/ProductGallery";
import ProductInfo from "@/components/productDetails/components/ProductInfo";
import KeyIngredients from "@/components/productDetails/components/KeyIngredients";
import CompleteRoutine from "@/components/productDetails/components/CompleteRoutine";
import IngredientsFaqSection from "@/components/ingredientsLanding/components/ingredientsFaq";
import BestValueSection from "@/components/productDetails/components/BestValueSection";
import IngredientsThatWork from "@/components/productDetails/components/ingredientsThatWork";
import OddsSection from "@/components/productDetails/components/oddsSection";
import RoutineCards from "@/components/productDetails/components/routineCards";
import HighlightSection from "@/components/productDetails/components/highlightSection";
import ResultsTimeline from "@/components/productDetails/components/resultsTimeline";
import NoteCard from "@/components/productDetails/components/noteCard";
import VideoTestimonialsGrid from "@/components/productDetails/components/videoTestimonialsGrid";
import ConcernSection from "@/components/products-landing/components/concern-section";
import AcneApproach from "./acneApproach";
import { fetchRequest } from "@/helpers/fetchRequest";
import { PRODUCT_BOTTOM_SHEET_API } from "@/constants/urls";
import Loader from "@/components/generic/Loader";
import ProductErrorState from "@/components/result/ProductErrorState";
import ProductEmptyState from "@/components/result/ProductEmptyState";
import { Divider } from "antd";
import ProductCollapsibleSection from "@/components/result/ProductCollapsibleSection";
import BottomSheetReviews from "@/components/result/bottomSheetReviews";

const SkinFoodMainContent = ({ variantId, ingredientsMap }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    fullIngredients: false,
    whoIsFor: false,
    howToUse: false,
    keyIngredients: true,
    faqs: true,
    reviews: true,
  });
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isHowToUseOpen, setIsHowTowUseOpen] = useState(false);
  const [isFullIngredientsOpen, setIsFullIngredientsOpen] = useState(false);

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  useEffect(() => {
    if (variantId) {
      fetchEachProductDetails();
    }
  }, [variantId]);

  const fetchEachProductDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Append _PDP to variantId for the API call
      const apiVariantId = `${variantId}_PDP`;
      const response = await fetchRequest(PRODUCT_BOTTOM_SHEET_API(apiVariantId));

      if (!response || response.status !== 200 || !response.data) {
        throw new Error(
          response?.data?.message ||
            "Failed to load product details. Please try again."
        );
      }

      const productData = response.data.data;

      setProduct(productData);
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

  const mostLoved = [
    {
      title: "Most Loved",
      products: [
        {
          id: "1",
          name: "Protini™ Polypeptide Cream",
          image: product1,
          rating: 4.5,
          price: "₹ X",
          tag: "Radiance",
        },
        {
          id: "2",
          name: "Protini™ Polypeptide Cream",
          image: product2,
          rating: 4.5,
          price: "₹ XXXX",
          tag: "Radiance",
        },
      ],
    },
  ];

  const routineProduct = {
    name: "CLEAR RITUAL kit",
    image: ProductImage,
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full mx-auto p-4 md:p-8 bg-white font-sophiaPro">
        <ProductErrorState
          error={error}
          onRetry={handleRetry}
          onCancel={() => window.history.back()}
        />
      </div>
    );
  }

  // Show empty state
  if (!product || !product.content) {
    return (
      <div className="w-full mx-auto p-4 md:p-8 bg-white font-sophiaPro">
        <ProductEmptyState onCancel={() => window.history.back()} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-between p-4 lg:p-8 bg-white">
        {/* Left: Product gallery */}
        <div className="w-full lg:w-1/3">
          <ProductGallery
            images={product?.content?.image}
            mainImage={product?.content?.image}
          />
        </div>

        {/* Right: Info + sections */}
        <div className="flex flex-col gap-2 w-full lg:w-1/2">
          <ProductInfo
            title={product?.content?.name}
            subtitle={product?.content?.by_line}
            description={product?.content?.description}
            benefits={product?.content?.benefits}
            feels={product?.content?.feels_like}
            smells={product?.content?.smells}
            btw={product?.content?.btw}
            price={product?.content?.price}
            size={product?.content?.size}
          />

          {/* Key Ingredients Section */}
          {product?.content?.key_ingredients && product?.content?.key_ingredients.length > 0 && (
            <>
              <Divider style={{ margin: "8px 0" }} />
              <div>
                <ProductCollapsibleSection
                  title="Key Ingredients"
                  isExpanded={expandedSections.keyIngredients}
                  onToggle={() => toggleSection("keyIngredients")}
                >
                  <KeyIngredients
                    ingredients={product?.content?.key_ingredients
                      ?.map((item) => {
                        const singleIngredient = ingredientsMap?.get(item);
                        if (!singleIngredient) return null;
                        return singleIngredient;
                      })
                      .filter(Boolean)}
                  />
                </ProductCollapsibleSection>
              </div>
            </>
          )}

          <CompleteRoutine product={routineProduct} />

          {/* Full Ingredients Section */}
          {product?.content?.full_ingredients && (
            <>
              <Divider style={{ margin: "0px 0" }} />
              <div>
                <ProductCollapsibleSection
                  title="Full Ingredients List"
                  isExpanded={isFullIngredientsOpen}
                  onToggle={() => setIsFullIngredientsOpen(!isFullIngredientsOpen)}
                >
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product?.content?.full_ingredients
                      ?.split(/,|\n|•/g)
                      .map((ingredient, index) => {
                        const trimmed = ingredient.trim();
                        if (!trimmed) return null;
                        return (
                          <span
                            key={index}
                            className="text-[14px] text-white bg-Secondary/500 px-3 py-1"
                          >
                            {trimmed}
                          </span>
                        );
                      })}
                  </div>
                </ProductCollapsibleSection>
              </div>
            </>
          )}

          {/* Who is this for Section */}
          {product?.content?.who_is_this_for && (
            <>
              <Divider style={{ margin: "8px 0" }} />
              <div>
                <ProductCollapsibleSection
                  title="Who is this for?"
                  isExpanded={isFaqOpen}
                  onToggle={() => setIsFaqOpen(!isFaqOpen)}
                >
                  <div className="text-sm text-gray-700 leading-relaxed mt-4">
                    {product?.content?.who_is_this_for}
                  </div>
                </ProductCollapsibleSection>
              </div>
            </>
          )}

          {/* How to use Section */}
          {product?.content?.how_to_use && (
            <>
              <Divider style={{ margin: "8px 0" }} />
              <div>
                <ProductCollapsibleSection
                  title="How to use?"
                  isExpanded={isHowToUseOpen}
                  onToggle={() => setIsHowTowUseOpen(!isHowToUseOpen)}
                >
                  <div className="text-sm text-gray-700 leading-relaxed mt-4">
                    {product?.content?.how_to_use}
                  </div>
                </ProductCollapsibleSection>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="">
        <AcneApproach />
        {/* <IngredientsThatWork /> */}
        <OddsSection />

        {/* Reviews Section */}
        {product?.content?.reviews && product?.content?.reviews.length > 0 && (
          <>
            <div className="mt-10 md:mt-10 text-[24px] md:text-[40px] mx-auto p-4 md:p-8">
              Customer Reviews
            </div>
            <div className="mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.content.reviews.map((review, index) => (
                  <BottomSheetReviews
                    key={index}
                    name={review?.name}
                    location={review?.location}
                    review={review?.review}
                    rating={review?.rating}
                    date={review?.date}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mx-auto px-4 md:px-8">
          <RoutineCards />
        </div>
        <HighlightSection />
        <div className="mx-auto px-4 md:px-8">
          <ResultsTimeline />
        </div>
        <NoteCard note={product?.content?.note_from_team}/>
        {/* <VideoTestimonialsGrid /> */}
        {/* {mostLoved?.map((concern) => (
          <ConcernSection key={concern.title} concern={concern} />
        ))} */}

        <div className="border-2 border-b-black mt-10"></div>
        <div className="mt-10 md:mt-20">
          <IngredientsFaqSection showTitle={true} />
        </div>
      </div>
    </>
  );
};

export default SkinFoodMainContent;
