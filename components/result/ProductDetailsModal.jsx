"use client";
import { CDN_BASE_URL } from "@/constants/constants";
import React, { useState, useEffect, useRef } from "react";
import ExpandIcon from "@assets/svg/expandIcon.svg";
import CollapseIcon from "@assets/svg/collapseIcon.svg";
import tickIcon from "@assets/svg/tick.svg";
import Image from "next/image";
import RightArrowCircelLight from "@assets/svg/rightArrow.svg";
import { Carousel } from "antd";
import { fetchRequest } from "@/helpers/fetchRequest";
import Loader from "../generic/Loader";
import { PRODUCT_BOTTOM_SHEET_API } from "@/constants/urls";

const ProductPageModal = ({ variantId, handleCancel }) => {
  const [product, setProduct] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [expandedIngredient, setExpandedIngredient] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const carouselRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after component mounts to prevent initial animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchEachProductDetails();
  }, [variantId]);

const fetchEachProductDetails = async () => {
  setIsLoading(true);
  setError(null); 

  try {
    const response = await fetchRequest(PRODUCT_BOTTOM_SHEET_API(variantId));

    if (!response || response.status !== 200 || !response.data) {
      throw new Error(
        response?.data?.message || 'Failed to load product details. Please try again.'
      );
    }

    setProduct(response.data.data);
  } catch (error) {
    console.error('Error fetching product details:', error);

    const errorMessage =
      error?.response?.data?.message || 
      error?.message || 
      'Something went wrong. Please try again.';

    setError(errorMessage);
  } finally {
    setIsLoading(false);
  }
};


  const handleRetry = () => {
    fetchEachProductDetails();
  };

  const renderStars = (rating, activeColor = "text-yellow-500") => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-[20px] ${
              i < Math.round(rating) ? activeColor : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Error State Component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="mb-4">
        <svg 
          className="w-16 h-16 text-red-500 mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {error}
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleRetry}
          className="bg-primary/700 text-white px-6 py-2 rounded-lg hover:bg-primary/800 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  // Loading State
  if (isLoading) {
    return <Loader />;
  }

  // Error State
  if (error) {
    return (
      <div className="w-full mx-auto p-4 md:p-[10px] bg-white font-lato">
        <ErrorState />
      </div>
    );
  }

  // No product data state
  if (!product || !product.content) {
    return (
      <div className="w-full mx-auto p-4 md:p-[10px] bg-white font-lato">
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="mb-4">
            <svg 
              className="w-16 h-16 text-gray-400 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Product Not Found
          </h3>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleCancel}
            className="bg-primary/700 text-white px-6 py-2 rounded-lg hover:bg-primary/800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 md:p-[10px] bg-white font-lato overflow-hidden flex md:flex-row md: gap-5 flex-col">
      {/* Carousel Section - Fixed container */}
      <div
        className={`relative h-[400px] md:h-[650px] pt-6 md:mb-8 overflow-hidden md:w-[50%] ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        id="carousel-id"
        style={{ transition: "opacity 0.3s ease-in" }}
      >
        {/* Right Arrow - Hidden on mobile */}
        <div
          onClick={() => carouselRef.current?.next()}
          className="absolute md:right-[46px] right-[0px] top-[50%] transform -translate-y-1/2 z-10 cursor-pointer"
        >
          <Image
            src={RightArrowCircelLight}
            width={32}
            height={32}
            alt="Next"
          />
        </div>

        {/* Carousel Container - Fixed width constraints */}
        <div className="w-full max-w-full overflow-hidden">
          <Carousel
            ref={carouselRef}
            dots
            autoplay={isLoaded}
            speed={500}
            autoplaySpeed={5000}
            infinite
            slidesToShow={1}
            slidesToScroll={1}
          >
            {product?.content?.images?.map((productImage, idx) => (
              <div
                key={idx}
                className="flex justify-center items-center h-[300px] md:h-[550px] px-2 mb-4"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src={`${CDN_BASE_URL}${productImage.src}`}
                    alt={productImage.alt || `Product image ${idx + 1}`}
                    width={280}
                    height={280}
                    className="rounded-lg max-w-[280px] md:max-w-[328px] w-auto h-[280px] md:h-[328px] object-cover"
                  />
                </div>
              </div>
            )) || (
              <div className="flex justify-center items-center h-[300px] md:h-[550px] px-2 mb-4">
                <div className="bg-gray-200 rounded-lg flex items-center justify-center w-[280px] h-[280px] md:w-[328px] md:h-[328px]">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              </div>
            )}
          </Carousel>
        </div>
      </div>

      <div className="md:w-[50%] md:h-[650px] md:overflow-y-scroll md:pr-3">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="md:text-[28px] text-[18px] leading-[130%] font-[400] text-primary/700">
                {product?.content?.name || 'Product Name Not Available'}
              </h1>
              <p className="md:text-[28px] text-[18px] leading-[130%] font-[600] text-primary/700">
                {product?.content?.subtitle}
              </p>
              <div className="flex md:flex-row flex-col md:items-center md:gap-3 gap-1 mb-2">
                {product?.content?.rating?.stars && renderStars(product?.content?.rating?.stars, "text-primary/700")}
                <div className="text-[14px] font-[400] leading-[150%] text-primary/700">
                  {product?.content?.rating?.stars && (
                    <span className="mr-2">{product?.content?.rating?.stars}</span>
                  )}
                  {product?.content?.rating?.reviews && (
                    <span className="mr-4">
                      {product?.content?.rating?.reviews.toLocaleString()} reviews
                    </span>
                  )}
                  {product?.content?.ph_score && (
                    <div className="px-4 border-l-Elements/Divider-Stroke border-l-[2px] inline-block">
                      ph score: {product?.content?.ph_score}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="md:text-[24px] text-[16px] font-400 leading-[140%] text-primary/700 mb-2">
            {product?.content?.description}
          </p>
          <p className="text-[14px] font-400 leading-[150%] text-primary/700 mb-2">
            {product?.content?.detailed_description}
          </p>

          {product?.content?.features && (
            <div className="flex flex-col flex-wrap gap-2 mb-4">
              {product?.content?.features.map((feature, index) => (
                <div
                  key={index}
                  className="text-[14px] text-primary/700 leading-[150%] font-[400] flex items-center"
                >
                  <Image
                    src={tickIcon}
                    alt="tick Icon"
                    width={23}
                    height={23}
                  />
                  <span className="ml-1">{feature}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <button
              className="bg-Neutral/800 text-[#fff] hover:bg-Primary/500 hover:text-[#fff] w-[296px] h-[56px] px-[40px] py-[16px] rounded-[100px] font-medium"
              onClick={handleCancel}
            >
              BACK TO DIAGNOSTIC
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        {product?.content?.benefits && (
          <div className="mb-8">
            <h2 className="md:text-[24px] text-[18px] font-[600] leading-[140%] text-primary/700">
              Benefits
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 pt-4">
              {product?.content?.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center gap-2
                    ${index % 2 === 0 ? "border-r border-Elements/Divider-Stroke" : ""}
                    ${
                      index % 4 !== 3
                        ? "md:border-r border-Elements/Divider-Stroke"
                        : "md:border-r-0"
                    }
                  `}
                >
                  <Image
                    src={tickIcon}
                    alt={benefit?.label}
                    width={24}
                    height={24}
                  />
                  <span className="text-[12px] leading-[140%] font-[400] text-primary/700">
                    {benefit?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ideal For Section */}
        {product?.content?.ideal_for && (
          <div className="mb-8">
            <h2 className="md:text-[24px] text-[18px] font-[600] mb-4">
              Ideal For:
            </h2>
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
          </div>
        )}

        {/* Course Duration */}
        {product?.content?.course_duration && (
          <div className="mb-8 p-4 flex flex-col border-[1px] border-Elements/Divider-Stroke rounded-[4px]">
            <div className="flex items-center gap-2">
              <h3 className="font-[400] md:text-[24px] text-[18px] text-primary/700">
                Course Duration
              </h3>
              <p className="bg-Tertiary/500 w-[67px] h-[21px] py-[2px] px-[8px] rounded-[4px] text-[12px] font-[400] leading-[140%] text-white">
                {product?.content?.course_duration?.duration}
              </p>
            </div>
            <p className="text-Grey-Neutral/400 text-[12px] font-[400] leading-[140%]">
              {product?.content?.course_duration?.sub_text}
            </p>
          </div>
        )}

        {/* Key Ingredients */}
        {product?.content?.key_ingredients && (
          <div className="mb-8">
            <h2 className="md:text-[24px] text-[18px] font-[600] leading-[140%] text-primary/700 mb-2">
              Key Ingredients
            </h2>
            <div className="space-y-3">
              {product?.content?.key_ingredients.map((ingredient, index) => {
                const isOpen = expandedIngredient === index;

                return (
                  <div
                    key={index}
                    className="border-b border-b-Elements/Divider-Stroke"
                  >
                    <button
                      className="w-full flex justify-between items-center p-2 text-left"
                      onClick={() =>
                        setExpandedIngredient(isOpen ? null : index)
                      }
                    >
                      <span className="font-[400] md:text-[18px] text-[14px] leading-[140%] text-primary/700">
                        {ingredient?.name}
                      </span>
                      <Image
                        src={isOpen ? CollapseIcon : ExpandIcon}
                        alt="toggle icon"
                        width={20}
                        height={20}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out px-4`}
                      style={{
                        maxHeight: isOpen ? "500px" : "0",
                        opacity: isOpen ? 1 : 0,
                        paddingBottom: isOpen ? "1rem" : "0",
                      }}
                    >
                      <div className="text-Grey-Neutral/400 md:text-[14px] text-[12px] leading-[150%] font-[400]">
                        {ingredient?.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQs */}
        {product?.content?.faqs && (
          <div className="mb-8">
            <h2 className="md:text-[24px] text-[18px] font-[600] leading-[140%] text-primary/700 mb-2">
              FAQs
            </h2>
            <div className="space-y-3">
              {product?.content?.faqs.map((faq, index) => {
                const isOpen = expandedFAQ === index;

                return (
                  <div
                    key={index}
                    className="border-b border-b-Elements/Divider-Stroke"
                  >
                    <button
                      className="w-full flex justify-between items-center p-2 text-left"
                      onClick={() => setExpandedFAQ(isOpen ? null : index)}
                    >
                      <span className="font-[400] md:text-[18px] text-[14px] leading-[140%] text-primary/700">
                        {faq?.question}
                      </span>
                      <Image
                        src={isOpen ? CollapseIcon : ExpandIcon}
                        alt="toggle icon"
                        width={20}
                        height={20}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out px-4`}
                      style={{
                        maxHeight: isOpen ? "500px" : "0",
                        opacity: isOpen ? 1 : 0,
                        paddingBottom: isOpen ? "1rem" : "0",
                      }}
                    >
                      <div className="text-Grey-Neutral/400 md:text-[14px] text-[12px] leading-[150%] font-[400]">
                        {faq?.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reviews */}
        {product?.content?.reviews && product?.content?.reviews.length > 0 && (
          <div className="mb-8">
            <h2 className="md:text-[24px] text-[18px] font-[600] leading-[140%] text-primary/700 mb-4">
              Review Highlights
            </h2>
            <div className="space-y-4">
              {product?.content?.reviews
                .slice(0, showAllReviews ? product?.content?.reviews.length : 2)
                .map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-b-Elements/Divider-Stroke"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[16px] font-[400] leading-[130%] text-primary/700">
                          {review?.reviewer}
                        </span>
                        <span className="ml-2 text-[12px] font-[400] leading-[130%] text-Text/Disabled">
                          {review?.sub_text}
                        </span>
                        <div className="text-[12px] font-[400] leading-[130%] text-Text/Disabled">
                          {review?.date},{review?.location}
                        </div>
                        {review?.rating && renderStars(review?.rating, "text-Secondary/400")}
                      </div>
                    </div>
                    <p className="text-[16px] font-[400] leading-[130%] text-primary/700">
                      {review?.review_heading}
                    </p>
                    <p className="text-[12px] font-[400] leading-[130%] text-Text/Disabled py-1">
                      {review?.review_about}
                    </p>
                    <p className="text-[14px] font-[400] leading-[130%] text-primary/700 py-2 pb-4">
                      {review?.review_text}
                    </p>
                  </div>
                ))}
            </div>
            {product?.content?.reviews.length > 2 && (
              <button
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews
                  ? "Show Less"
                  : `See all ${product?.content?.reviews.length} reviews`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPageModal;