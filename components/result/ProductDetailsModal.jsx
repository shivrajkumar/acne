import React, { useState, useEffect, useRef } from "react";
import ExpandIcon from "@assets/svg/expandIcon.svg";
import CollapseIcon from "@assets/svg/collapseIcon.svg";
import tickIcon from "@assets/svg/tick.svg";
import Image from "next/image";
import RightArrowCircelLight from "@assets/svg/rightArrow.svg";
import { Carousel } from "antd";

// Sample product data 
const productData = {
  "day-serum-blemishes": {
    name: "Day Serum for Blemishes",
    images: [
      {
        id: 1,
        src: "https://dvv8w2q8s3qot.cloudfront.net/acne/products/Acnestar_facewash.webp",
        alt: "product-1",
      },
      {
        id: 2,
        src: "https://dvv8w2q8s3qot.cloudfront.net/acne/products/Acnestar_facewash.webp",
        alt: "product-2",
      },
    ],
    subtitle: "3% Succinic Acid + Copper PCA",
    rating: { stars: 4.5, reviews: 1548 },
    ph_score: 7,
    description: "Provides Lightweight Moisturization & Repairs Skin",
    detailed_description:
      "An everyday moisturizing, smoothing and energizing skin's functioning with Skin rejuvenation that soothes and Copper PCA. Succinic Acid reduces naturally for oily combination skin.",
    features: ["Fragrance free", "Cruelty-free"],
    benefits: [
      {
        label: "Firmness",
        image: "/icons/firmness.svg",
      },
      {
        label: "Wrinkles",
        image: "/icons/wrinkles.svg",
      },
      {
        label: "Sensitive Skin",
        image: "/icons/sensitive-skin.svg",
      },
      {
        label: "Uneven Tone",
        image: "/icons/uneven-tone.svg",
      },
    ],
    ideal_for: ["Skin Type: Oily, Combination", "Pregnancy Safe"],
    course_duration: {
      duration: "3 months",
      sub_text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    key_ingredients: [
      {
        name: "Vitamin B5 (Panthenol)",
        description:
          "Locks moisture in the skin while reducing redness and minimizing irritation.",
      },
      {
        name: "Biosaccharide Gum",
        description:
          "Deeply hydrates the skin and reduces the visible signs of aging and environmental damage.",
      },
      {
        name: "Zinc, Copper & Magnesium",
        description: "Essential minerals for skin health and repair.",
      },
    ],
    faqs: [
      {
        question: "Can I use this with other products?",
        answer:
          "Recommend to start skincare slow and listen to your skin, rather than overwhelming mixture.",
      },
      {
        question: "How often should I use this serum?",
        answer:
          "Use once daily in the morning. Start with every other day for the first week.",
      },
      {
        question: "Is this suitable for sensitive skin?",
        answer:
          "Yes, this formula is gentle and suitable for sensitive skin types.",
      },
    ],
    reviews: [
      {
        reviewer: "Anonymous",
        sub_text: "Verified Buyer",
        date: "March 24, 2025",
        location: "France",
        rating: 5,
        review_heading: "Bluffing",
        review_about:
          "About Day Serum for Blemishes 3% Succinic Acid + Copper PCA",
        review_text:
          "In just a few days, my blemishes have improved. My skin has never looked better since I started using this serum.",
      },
      {
        reviewer: "Sarah M.",
        sub_text: "Verified Buyer",
        date: "March 24, 2025",
        location: "France",
        rating: 4,
        review_heading: "Bluffing",
        review_about:
          "About Day Serum for Blemishes 3% Succinic Acid + Copper PCA",
        review_text:
          "In just a few days, my blemishes have improved. My skin has never looked better since I started using this serum.",
      },
      {
        reviewer: "Sarah M.",
        sub_text: "Verified Buyer",
        date: "March 24, 2025",
        location: "France",
        rating: 4,
        review_heading: "Bluffing",
        review_about:
          "About Day Serum for Blemishes 3% Succinic Acid + Copper PCA",
        review_text:
          "In just a few days, my blemishes have improved. My skin has never looked better since I started using this serum.",
      },
    ],
  },
  "night-serum-anti-aging": {
    name: "Night Serum for Anti-Aging",
    subtitle: "2% Retinol + Hyaluronic Acid",
    images: [
      {
        id: 1,
        src: "https://dvv8w2q8s3qot.cloudfront.net/acne/products/Acnestar_facewash.webp",
        alt: "product-1",
      },
      {
        id: 2,
        src: "https://dvv8w2q8s3qot.cloudfront.net/acne/products/Acnestar_facewash.webp",
        alt: "product-2",
      },
    ],
    rating: { stars: 4.7, reviews: 2341 },
    ph_score: 6,
    description: "Advanced Anti-Aging Formula for Overnight Repair",
    detailed_description:
      "A powerful overnight treatment that combines retinol with hyaluronic acid to reduce fine lines, improve skin texture, and provide deep hydration while you sleep.",
    features: ["Fragrance free", "Cruelty-free", "Dermatologist tested"],
    benefits: [
      {
        label: "Firmness",
        image: "/icons/firmness.svg",
      },
      {
        label: "Wrinkles",
        image: "/icons/wrinkles.svg",
      },
      {
        label: "Sensitive Skin",
        image: "/icons/sensitive-skin.svg",
      },
      {
        label: "Uneven Tone",
        image: "/icons/uneven-tone.svg",
      },
    ],
    ideal_for: ["Skin Type: All Types", "Age: 25+"],
    course_duration: {
      duration: "6 months",
      sub_text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    key_ingredients: [
      {
        name: "Retinol 2%",
        description:
          "Promotes cell turnover and reduces visible signs of aging.",
      },
      {
        name: "Hyaluronic Acid",
        description: "Provides intense hydration and plumps the skin.",
      },
    ],
    faqs: [
      {
        question: "When should I use this serum?",
        answer:
          "Use only at night, 2-3 times per week initially, then build up to nightly use.",
      },
    ],
    reviews: [
      {
        reviewer: "Emma K.",
        sub_text: "Verified Buyer",
        date: "March 24, 2025",
        location: "France",
        rating: 5,
        review_heading: "Bluffing",
        review_about:
          "About Day Serum for Blemishes 3% Succinic Acid + Copper PCA",
        review_text:
          "In just a few days, my blemishes have improved. My skin has never looked better since I started using this serum.",
      },
    ],
  },
};

const ProductPageModal = ({
  variantId = "day-serum-blemishes",
  handleCancel,
}) => {
  const [product, setProduct] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [expandedIngredient, setExpandedIngredient] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const carouselRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after component mounts to prevent initial animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Simulate API call based on variant ID
    const loadProduct = () => {
      const productInfo = productData[variantId];
      if (productInfo) {
        setProduct(productInfo);
      } else {
        // Fallback to default product
        setProduct(productData["day-serum-blemishes"]);
      }
    };

    loadProduct();
  }, [variantId]);

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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 md:p-[40px] bg-white font-lato overflow-hidden">
       {/* Carousel Section - Fixed container */}
      <div
        className={`relative h-[400px] md:h-[450px]  pt-6  md:mb-8 overflow-hidden ${
          isLoaded ? "opacity-100" : "opacity-0"
        } `}
        id="carousel-id"
        style={{ transition: "opacity 0.3s ease-in" }}
      >
        {/* Right Arrow - Hidden on mobile */}
        <div
          onClick={() => carouselRef.current?.next()}
          className=" absolute right-[0px] top-[50%] transform -translate-y-1/2 z-10 cursor-pointer"
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
            {product.images.map((productImage, idx) => (
              <div
                key={idx}
                className="flex justify-center items-center h-[300px] md:h-[400px] px-2 mb-4"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src={productImage.src}
                    alt={productImage.alt}
                    width={280}
                    height={280}
                    className="rounded-lg max-w-[280px] md:max-w-[328px] w-auto h-[280px] md:h-[328px] object-cover "
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Header Section */}
      <div className=" mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="md:text-[28px]  text-[18px] leading-[130%] font-[400] text-primary/700 ">
              {product.name}
            </h1>
            <p className="md:text-[28px]  text-[18px] leading-[130%] font-[600] text-primary/700 ">
              {product.subtitle}
            </p>
            <div className="flex md:flex-row flex-col md:items-center md:gap-3  gap-1 mb-2">
              {renderStars(product.rating.stars, "text-primary/700")}
              <div className="text-[14px] font-[400] leading-[150%] text-primary/700">
                <span className="mr-2">{product.rating.stars}</span>
                <span className="mr-4">
                  {product.rating.reviews.toLocaleString()} reviews
                </span>
                <div className=" px-4 border-l-Elements/Divider-Stroke border-l-[2px] inline-block ">
                  ph score: {""}
                  {product.ph_score}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="md:text-[24px] text-[16px] font-400 leading-[140%] text-primary/700 mb-2">
          {product.description}
        </p>
        <p className="text-[14px] font-400 leading-[150%] text-primary/700 mb-2">
          {product.detailed_description}
        </p>

        <div className="flex flex-col flex-wrap gap-2 mb-4">
          {product.features.map((feature, index) => (
            <div
              key={index}
              className=" text-[14px] text-primary/700 leading-[150%] font-[400] flex items-center"
            >
              <Image src={tickIcon} alt="tick Icon" width={23} height={23} />
              <span className="ml-1">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            className=" bg-Neutral/800 text-[#fff] hover:bg-Primary/500 hover:text-[#fff] w-[296px] h-[56px] px-[40px]  py-[16px] rounded-[100px] font-medium "
            onClick={handleCancel}
          >
            BACK TO DIAGNOSTIC
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-8">
        <h2 className="md:text-[24px]  text-[18px] font-[600] leading-[140%] text-primary/700 ">
          Benefits
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2">
          {product.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2  pt-4">
              <Image
                src={ExpandIcon}
                alt={benefit.label}
                width={24}
                height={24}
              />
              <span className="text-[12px] leading-[140%] font-[400] text-primary/700">
                {benefit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ideal For Section */}
      <div className="mb-8">
        <h2 className="md:text-[24px]  text-[18px] font-[600] mb-4">Ideal For:</h2>
        <div className="space-y-2 flex flex-col md:gap-2 gap-1">
          {product.ideal_for.map((item, index) => (
            <div
              key={index}
              className="flex items-center  text-[14px] text-primary/700 leading-[150%] font-[400] "
            >
              <Image src={tickIcon} alt="tick Icon" width={23} height={23} />
              <span className="ml-1">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Duration */}
      <div className="mb-8 p-4  flex flex-col  border-[1px] border-Elements/Divider-Stroke rounded-[4px] ">
        <div className="flex items-center gap-2">
          <h3 className="font-[400] md:text-[24px] text-[18px] text-primary/700">
            Course Duration
          </h3>
          <p className=" bg-Tertiary/500 w-[67px] h-[21px] py-[2px] px-[8px] rounded-[4px] text-[12px] font-[400] leading-[140%] text-white">
            {product.course_duration.duration}
          </p>
        </div>

        <p className=" text-Grey-Neutral/400 text-[12px] font-[400] leading-[140%]">
          {product.course_duration.sub_text}
        </p>
      </div>

      {/* Key Ingredients */}
      <div className="mb-8">
        <h2 className="md:text-[24px] text-[18px] font-[600] leading-[140%]  text-primary/700 mb-2">
          Key Ingredients
        </h2>
        <div className="space-y-3">
          {product.key_ingredients.map((ingredient, index) => {
            const isOpen = expandedIngredient === index;

            return (
              <div
                key={index}
                className="border-b border-b-Elements/Divider-Stroke"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left"
                  onClick={() => setExpandedIngredient(isOpen ? null : index)}
                >
                  <span className="font-[400] md:text-[18px] text-[14px] leading-[140%] text-primary/700">
                    {ingredient.name}
                  </span>
                  <Image
                    src={isOpen ? CollapseIcon : ExpandIcon}
                    alt="toggle icon"
                    width={20}
                    height={20}
                  />
                </button>

                {/* Animated content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-4`}
                  style={{
                    maxHeight: isOpen ? "500px" : "0",
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? "1rem" : "0",
                  }}
                >
                  <div className="text-Grey-Neutral/400  md:text-[14px] text-[12px] leading-[150%] font-[400]">
                    {ingredient.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-8">
        <h2 className="md:text-[24px] text-[18px] font-[600] leading-[140%]  text-primary/700 mb-2">
          FAQs
        </h2>
        <div className="space-y-3">
          {product.faqs.map((faq, index) => {
            const isOpen = expandedFAQ === index;

            return (
              <div
                key={index}
                className="border-b border-b-Elements/Divider-Stroke"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left"
                  onClick={() => setExpandedFAQ(isOpen ? null : index)}
                >
                  <span className="font-[400] md:text-[18px] text-[14px] leading-[140%] text-primary/700">
                    {faq.question}
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
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-8">
        <h2 className="md:text-[24px] text-[18px] font-[600] leading-[140%]  text-primary/700 mb-4">
          Review Highlights
        </h2>
        <div className="space-y-4">
          {product.reviews
            .slice(0, showAllReviews ? product.reviews.length : 2)
            .map((review, index) => (
              <div
                key={index}
                className="border-b  border-b-Elements/Divider-Stroke "
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[16px] font-[400] leading-[130%]  text-primary/700">
                      {review.reviewer}
                    </span>
                    <span className=" ml-2 text-[12px] font-[400] leading-[130%] text-Text/Disabled">
                      {review.sub_text}
                    </span>
                    <div className="text-[12px] font-[400] leading-[130%] text-Text/Disabled">
                      {review.date},{review.location}
                    </div>
                    {renderStars(review.rating, "text-Secondary/400")}
                  </div>
                </div>
                <p className="text-[16px] font-[400] leading-[130%]  text-primary/700">
                  {review.review_heading}
                </p>
                <p className="text-[12px] font-[400] leading-[130%] text-Text/Disabled py-1">
                  {review.review_about}
                </p>
                <p className="text-[14px] font-[400] leading-[130%]  text-primary/700 py-2 pb-4">
                  {review.review_text}
                </p>
              </div>
            ))}
        </div>
        {product.reviews.length > 2 && (
          <button
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews
              ? "Show Less"
              : `See all ${product.reviews.length} reviews`}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductPageModal;
