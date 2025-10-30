"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { fetchRequest } from "@/helpers/fetchRequest";
import Loader from "../generic/Loader";
import { PRODUCT_BOTTOM_SHEET_API, GET_INGREDIENTS } from "@/constants/urls";
import ProductInfo from "@/components/productDetails/components/ProductInfo";
import KeyIngredients from "@/components/productDetails/components/KeyIngredients";
import IngredientsFaqSection from "@/components/ingredientsLanding/components/ingredientsFaq";
import ProductCarousel from "./ProductCarousel";
import ProductCollapsibleSection from "./ProductCollapsibleSection";
import ProductErrorState from "./ProductErrorState";
import ProductEmptyState from "./ProductEmptyState";
import { Divider, Modal } from "antd";
import useMediaQuery from "@/hooks/useMediaQuerry";
import closeIcon from "@assets/svg/close-circle.svg";
import "@/styles/bottomSheet.css";
import FaqItem from "../faq/components/FaqItem";
import AcneReviews from "./AcneReviews";
import BottomSheetReviews from "./bottomSheetReviews";

const ProductPageModal = ({
  variantId,
  handleCancel,
  open,
  ingredientsMap,
}) => {
  const [product, setProduct] = useState(null);
  const [ingredientDetails, setIngredientDetails] = useState(null);
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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isHowToUseOpen, setIsHowTowUseOpen] = useState(false);
  const [isFullIngredientsOpen, setIsFullIngredientsOpen] = useState(false);

  const dragStartY = useRef(0);
  const sheetRef = useRef(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  useEffect(() => {
    if (variantId && open) {
      fetchEachProductDetails();
      fetchIngredientDetails();
    }
  }, [variantId, open]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
      setDragOffset(0);
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [open]);

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

  const fetchIngredientDetails = async () => {
    try {
      const response = await fetchRequest(GET_INGREDIENTS());

      if (response && response.status === 200 && response.data) {
        // Find the ingredient data for the current product variant
        // Adjust based on actual API response structure
        let currentProductIngredients = null;

        // Check if data is an array or object
        if (Array.isArray(response.data?.data)) {
          currentProductIngredients = response.data.data.find(
            (item) =>
              item.variantId === variantId || item.variant_id === variantId
          );
        } else if (response.data?.data) {
          // If it's an object, check if variantId is a key
          currentProductIngredients = response.data.data[variantId];
        }

        if (currentProductIngredients) {
          setIngredientDetails(currentProductIngredients);
        }
      }
    } catch (error) {
      console.error("Error fetching ingredient details:", error);
    }
  };

  const handleRetry = () => {
    fetchEachProductDetails();
    fetchIngredientDetails();
  };

  // Drag handlers for mobile
  const handleDragStart = (e) => {
    if (!isMobile) return;

    const touch = e.touches?.[0] || e;
    dragStartY.current = touch.clientY;
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isMobile || !isDragging) return;

    const touch = e.touches?.[0] || e;
    const diff = touch.clientY - dragStartY.current;

    // Only allow dragging down
    if (diff > 0) {
      setDragOffset(diff);
    }
  };

  const handleDragEnd = () => {
    if (!isMobile) return;

    setIsDragging(false);

    // If dragged more than 150px, close the sheet
    if (dragOffset > 150) {
      handleCancel();
    }

    // Reset offset
    setDragOffset(0);
  };

  const ayurvedafn = (ingredient) => {
    return ingredient;
  };

  const cosmeticsfn = (ingredient) => {
    return ingredient;
  };

  const drugsfn = (ingredient) => {
    return ingredient;
  };

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300"
            onClick={handleCancel}
            style={{
              opacity: open ? 1 : 0,
            }}
          />
        )}

        {/* Bottom Sheet */}
        <div
          ref={sheetRef}
          className="fixed inset-x-0 bottom-0 z-[1001] bg-white rounded-t-[24px] shadow-2xl transition-transform duration-300 ease-out"
          style={{
            transform: open
              ? `translateY(${dragOffset}px)`
              : "translateY(100%)",
            maxHeight: "90vh",
            height: "90vh",
          }}
        >
          {/* Drag Handle Header */}
          <div
            className="sticky top-0 bg-white z-20 px-4 pt-3 pb-2 border-b border-gray-100 rounded-t-[24px]"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div className="flex flex-col items-center">
              {/* Drag Handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mb-3" />
            </div>
          </div>

          {/* Content Container */}
          <div className="h-[calc(90vh-60px)] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <Loader />
              </div>
            ) : error ? (
              <div className="w-full mx-auto p-4 bg-white font-sophiaPro">
                <ProductErrorState
                  error={error}
                  onRetry={handleRetry}
                  onCancel={handleCancel}
                />
              </div>
            ) : !product || !product.content ? (
              <div className="w-full mx-auto p-4 bg-white font-sophiaPro">
                <ProductEmptyState onCancel={handleCancel} />
              </div>
            ) : (
              <div className="w-full mx-auto bg-white font-sophiaPro flex-col">
                {/* Carousel Section */}
                <div className="w-full h-[300px] flex-shrink-0">
                  <ProductCarousel
                    image={product?.content?.image}
                    name={product?.name}
                  />
                </div>

                {/* Scrollable Content Section */}
                <div className="w-full px-4 pb-6 pt-4">
                  {/* Product Info Section */}
                  <ProductInfo
                    title={product?.content?.name || "Product Name"}
                    subtitle={product?.content?.by_line}
                    description={product?.content?.description}
                    benefits={product?.content?.benefits}
                    feels={product?.content?.feels_like}
                    smells={product?.content?.smells_like}
                    btw={product?.content?.btw}
                    price={product?.content?.price || "xxxx"}
                    size={product?.content?.size || "80ml/ 2.7oz."}
                  />

                  <Divider />

                  {/* Key Ingredients Section */}
                  {product?.content?.key_ingredients &&
                    product?.content?.key_ingredients.length > 0 && (
                      <div className="mt-1">
                        <ProductCollapsibleSection
                          title="KEY INGREDIENTS"
                          isExpanded={expandedSections.keyIngredients}
                          onToggle={() => toggleSection("keyIngredients")}
                        >
                          <div className="overflow-x-auto">
                            <KeyIngredients
                              ingredients={product?.content?.key_ingredients
                                ?.map((item) => {
                                  const singleIngredient =
                                    ingredientsMap?.get(item);
                                  if (!singleIngredient) {
                                    return null;
                                  }

                                  // Process based on type and return the processed ingredient
                                  if (singleIngredient.type === "ayurveda") {
                                    return ayurvedafn(singleIngredient);
                                  } else if (
                                    singleIngredient.type === "cosmetics"
                                  ) {
                                    return cosmeticsfn(singleIngredient);
                                  } else if (
                                    singleIngredient.type === "drugs"
                                  ) {
                                    return drugsfn(singleIngredient);
                                  } else {
                                    return singleIngredient;
                                  }
                                })
                                .filter(Boolean)} // Remove null values
                            />
                          </div>
                        </ProductCollapsibleSection>
                      </div>
                    )}
                  <Divider style={{ margin: "8px 0" }} />

                  {product?.content?.full_ingredients && (
                    <div className="">
                      <ProductCollapsibleSection
                        title="Full Ingredients List"
                        isExpanded={isFullIngredientsOpen}
                        onToggle={() =>
                          setIsFullIngredientsOpen(!isFullIngredientsOpen)
                        }
                      >
                        <div className="flex flex-wrap gap-2 mt-6">
                          {product?.content?.full_ingredients
                            ?.split(/,|\n|•/g) // Split by commas, newlines, or bullet points
                            .map((ingredient, index) => {
                              const trimmed = ingredient.trim();
                              if (!trimmed) return null; // skip empty values
                              return (
                                <span
                                  key={index}
                                  className="text-[12px] text-white bg-Secondary/500 px-3 py-1"
                                >
                                  {trimmed}
                                </span>
                              );
                            })}
                        </div>
                      </ProductCollapsibleSection>
                    </div>
                  )}
                  <Divider style={{ margin: "8px 0" }} />

                  {product?.content?.who_is_this_for && (
                    <div className="">
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
                  )}
                  <Divider style={{ margin: "8px 0" }} />
                  {product?.content?.how_to_use && (
                    <div className="">
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
                  )}
                  <Divider style={{ margin: "8px 0" }} />
                  <div className="text-2xl font-sophiaPro font-normal text-[#0F1B28]">Reviews</div>
                  {product?.content?.reviews?.map((review, index) => (
                    <div className="mt-5">
                      <BottomSheetReviews
                        key={index}
                        name={review?.name}
                        location={"Mumbai"}
                        review={review?.review}
                        rating={review?.rating}
                      />
                    </div>
                  ))}

                  {/* FAQs Section */}
                  {product?.content?.FAQ?.length > 0 && (
                    <div className="mb-4 mt-10">
                      <h3 className="text-2xl font-normal text-[#0F1B28] mb-4">
                        FAQS
                      </h3>
            <Divider className="my-2 border-gray-200" />

                      <div className="space-y-3">
                        {product.content.FAQ.map((faq, index) => (
                          <div key={index}>
          <ProductCollapsibleSection
            title={faq.question}
            isExpanded={expandedSections[`faq_${index}`] || false}
            onToggle={() =>
              setExpandedSections((prev) => ({
                ...prev,
                [`faq_${index}`]: !prev[`faq_${index}`],
              }))
            }
          >
            <div className="text-sm text-gray-700 leading-relaxed">
              {faq.answer}
            </div>
          </ProductCollapsibleSection>

          {/* Divider below each FAQ */}
          {index !== product.content.FAQ.length - 1 && (
            <Divider className="my-2 border-gray-200" />
          )}
        </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Desktop Modal (unchanged)
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      title={null}
      closable={false}
      width={{
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "70%",
        xxl: "70%",
      }}
      centered
      styles={{
        body: {
          position: "relative",
          padding: 0,
        },
        content: {
          padding: 0,
          maxHeight: "90vh",
        },
      }}
    >
      <button
        onClick={handleCancel}
        className="absolute -top-4 -right-4 z-10 h-[36px] w-[36px] bg-[#0f1b28] text-white flex items-center justify-center rounded-full hover:bg-[#1a2937] transition-colors drop-shadow-xl"
        aria-label="Close modal"
      >
        <Image src={closeIcon} alt="close-icon" width={20} height={20} />
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader />
        </div>
      ) : error ? (
        <div className="w-full mx-auto p-4 md:p-[10px] bg-white font-sophiaPro">
          <ProductErrorState
            error={error}
            onRetry={handleRetry}
            onCancel={handleCancel}
          />
        </div>
      ) : !product || !product.content ? (
        <div className="w-full mx-auto p-4 md:p-[10px] bg-white font-sophiaPro">
          <ProductEmptyState onCancel={handleCancel} />
        </div>
      ) : (
        <div className="w-full mx-auto bg-white font-sophiaPro md:flex md:flex-row md:gap-5">
          <div className="md:w-[30%] md:h-[600px] mt-10">
            <ProductCarousel
              image={product?.content?.image}
              name={product?.content?.name}
            />
          </div>

          <div
            className="md:w-[70%] md:h-[600px] md:overflow-y-auto md:p-[40px] p-4 focus:outline-none"
            tabIndex={0}
            role="region"
            aria-label="Product details"
          >
            <ProductInfo
              title={product?.content?.name}
              subtitle={product?.content?.by_line}
              description={product?.content?.description}
              benefits={product?.content?.benefits}
              feels={product?.content?.feels_like}
              smells={product?.content?.smells_like}
              btw={product?.content?.btw}
              price={product?.content?.price || "xxxx"}
              size={product?.content?.size || "80ml/ 2.7oz."}
            />
            <Divider style={{ margin: "8px 0" }} />

            {product?.content?.key_ingredients &&
              product?.content?.key_ingredients.length > 0 && (
                <div className="mt-10">
                  <ProductCollapsibleSection
                    title="KEY INGREDIENTS"
                    isExpanded={expandedSections.keyIngredients}
                    onToggle={() => toggleSection("keyIngredients")}
                  >
                    <KeyIngredients
                      ingredients={product?.content?.key_ingredients
                        ?.map((item) => {
                          const singleIngredient = ingredientsMap?.get(item);
                          if (!singleIngredient) {
                            return null;
                          }

                          // Process based on type and return the processed ingredient
                          if (singleIngredient.type === "ayurveda") {
                            return ayurvedafn(singleIngredient);
                          } else if (singleIngredient.type === "cosmetics") {
                            return cosmeticsfn(singleIngredient);
                          } else if (singleIngredient.type === "drugs") {
                            return drugsfn(singleIngredient);
                          } else {
                            return singleIngredient;
                          }
                        })
                        .filter(Boolean)}
                    />
                  </ProductCollapsibleSection>
                </div>
              )}

            <Divider style={{ margin: "8px 0" }} />

            {product?.content?.full_ingredients && (
              <div className="mb-4">
                <ProductCollapsibleSection
                  title="Full Ingredients List"
                  isExpanded={isFullIngredientsOpen}
                  onToggle={() =>
                    setIsFullIngredientsOpen(!isFullIngredientsOpen)
                  }
                >
                  <div className="flex flex-wrap gap-2">
                    {product?.content?.full_ingredients
                      ?.split(/,|\n|•/g) // Split by commas, newlines, or bullet points
                      .map((ingredient, index) => {
                        const trimmed = ingredient.trim();
                        if (!trimmed) return null; // skip empty values
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
            )}
            <Divider style={{ margin: "8px 0" }} />

            {product?.content?.who_is_this_for && (
              <div className="mb-4">
                <ProductCollapsibleSection
                  title="Who is this for?"
                  isExpanded={isFaqOpen}
                  onToggle={() => setIsFaqOpen(!isFaqOpen)}
                >
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {product?.content?.who_is_this_for}
                  </div>
                </ProductCollapsibleSection>
              </div>
            )}
            <Divider style={{ margin: "8px 0" }} />
            {product?.content?.how_to_use && (
              <div className="mb-4">
                <ProductCollapsibleSection
                  title="How to use?"
                  isExpanded={isHowToUseOpen}
                  onToggle={() => setIsHowTowUseOpen(!isHowToUseOpen)}
                >
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {product?.content?.how_to_use}
                  </div>
                </ProductCollapsibleSection>
              </div>
            )}
            <Divider style={{ margin: "8px 0" }} />
            <div className="text-[40px] font-sophiaPro font-normal">Reviews</div>
                  {product?.content?.reviews?.map((review, index) => (
                    <div className="mt-5">
                      <BottomSheetReviews
                        key={index}
                        name={review?.name}
                        location={"Mumbai"}
                        review={review?.review}
                        rating={review?.rating}
                      />
                    </div>
                  ))}
                  <Divider style={{ margin: "8px 0" }} />

            {product?.content?.FAQ && product?.content?.FAQ.length > 0 && (
              <div className="mb-4">
                <div className="text-[40px] font-sophiaPro font-normal">FAQS</div>
                {product.content.FAQ.map((faq, index) => (
                          <ProductCollapsibleSection
                            key={index}
                            title={faq.question}
                            isExpanded={
                              expandedSections[`faq_${index}`] || false
                            }
                            onToggle={() =>
                              setExpandedSections((prev) => ({
                                ...prev,
                                [`faq_${index}`]: !prev[`faq_${index}`],
                              }))
                            }
                          >
                            <div className="text-sm text-gray-700 leading-relaxed">
                              {faq.answer}
                            </div>
                          </ProductCollapsibleSection>
                        ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProductPageModal;
