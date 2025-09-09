"use client";
import React from "react";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import KeyIngredients from "./components/KeyIngredients";
import CompleteRoutine from "./components/CompleteRoutine";
import FAQSection from "./components/FAQSection";
import BestValueSection from "./components/BestValueSection";
import ProductImage from "../../assets/images/products-1.webp";
import IngredientsThatWork from "./components/ingredientsThatWork";
import OddsSection from "./components/oddsSection";
import AcneReviews from "../result/AcneReviews";
import RoutineCards from "./components/routineCards";
import HighlightSection from "./components/highlightSection";
import ResultsTimeline from "./components/resultsTimeline";
import NoteCard from "./components/noteCard";
import VideoTestimonialsGrid from "./components/videoTestimonialsGrid";
import product1 from "@assets/images/products-1.webp";
import product2 from "@assets/images/products-2.webp";
import ConcernSection from "../products-landing/components/concern-section";
import IngredientsFaqSection from "../ingredientsLanding/components/ingredientsFaq";

const ProductDetailsIndex = () => {
  const productImages = [
    ProductImage,
    ProductImage,
    ProductImage,
    ProductImage,
    ProductImage,
  ];

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

  const customerReviews = [
    {
      name: "Lindsey",
      description:
        "I have noticed a lot better skin texture. I don’t have to wear makeup to the gym anymore.",
      stage: "Mild Acne",
      images: [
        {
          src: "/images/lindsey-before.jpg",
          label: "Before",
        },
        {
          src: "/images/lindsey-after.jpg",
          label: "After 12 Weeks",
        },
      ],
    },
    {
      name: "Emily",
      description:
        "My breakouts became less frequent, and the overall appearance of my skin looks really great.",
      stage: "Mild Acne",
      images: [
        {
          src: "/images/emily-before.jpg",
          label: "Before",
        },
        {
          src: "/images/emily-after.jpg",
          label: "After 12 Weeks",
        },
      ],
    },
    {
      name: "Kayla",
      description:
        "It has nourished my skin. I'm able to walk around with no makeup.",
      stage: "Mild Acne",
      images: [
        {
          src: "/images/kayla-before.jpg",
          label: "Before",
        },
        {
          src: "/images/kayla-after.jpg",
          label: "After 4 Weeks",
        },
      ],
    },
  ];

  const productData = {
    title: "Glazing mist",
    subtitle: "The hydrating face spray",
    description:
      "Instant glazed skin wherever you go. Glazing Mist is a superfine mist that hydrates and refreshes for a next-level glowy finish. Take it everywhere for clinically proven hydration and nourished, supple skin on the go. Our formula also has added purifying benefits, helping skin feel more balanced and clarified over time. Size: 80ml/ 2.7oz.",
    benefits: "All skin types, including sensitive and acne-prone skin",
    feels: "A superfine, refreshing mist",
    smells: "Fragrance-Free",
    btw: "Cruelty-Free • Vegan • Gluten-Free Dermatologist-Tested • Ophthalmologist-Tested",
  };

  const ingredients = [
    {
      name: "Rhodiola",
      image: ProductImage,
      partUsed: "Lorem ipsum",
      from: "Lorem ipsum",
    },
    {
      name: "Rhodiola",
      image: ProductImage,
      partUsed: "Lorem ipsum",
      from: "Lorem ipsum",
    },
    {
      name: "Rhodiola",
      image: ProductImage,
      partUsed: "Lorem ipsum",
      from: "Lorem ipsum",
    },
  ];

  const routineProduct = {
    name: "CLEAR RITUAL kit",
    image: ProductImage,
  };

  const faqs = [
    {
      question: "What Are The Benefits",
      answer: "Lorem ipsum dolor sit amet...",
    },
    { question: "How To Use?", answer: "Lorem ipsum dolor sit amet..." },
    {
      question: "Full Ingredient List",
      answer: "Lorem ipsum dolor sit amet...",
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:gap-[123px] gap-6 items-start justify-start p-4 lg:p-8 bg-white min-h-screen">
        <div className="w-full lg:shrink-0 lg:w-auto">
          <ProductGallery images={productImages} mainImage={productImages[0]} />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <ProductInfo {...productData} />
          <KeyIngredients ingredients={ingredients} />
          <CompleteRoutine product={routineProduct} />
          <FAQSection faqs={faqs} />
          <BestValueSection />
        </div>
      </div>

      <div className="">
        <IngredientsThatWork />
        <OddsSection />
        <div className="mt-20 text-[24px] md:text-[40px] mx-auto p-4 md:p-8">Lorem Ipsum Dummy</div>
        <div className="mx-auto p-4 md:p-8">
          <AcneReviews data={customerReviews} />
        </div>
        <RoutineCards />
        <HighlightSection />
        <ResultsTimeline />
        <NoteCard />
        <VideoTestimonialsGrid />
        {mostLoved?.map((concern) => (
          <ConcernSection key={concern.title} concern={concern} />
        ))}

        <div className="mt-20 text-[34px] md:text-[64px] mx-auto p-4 md:p-8">
          We’re flipping the script on acne with a whole-body approach that
          targets BIO-SPECIFIC ROOT CAUSES of mild to moderate acne from within.
        </div>

        <div className="border-2 border-b-black"></div>
        <div className="mt-20">
          <IngredientsFaqSection />
        </div>
      </div>
    </>
  );
};

export default ProductDetailsIndex;
