"use client";
import React from "react";
import Image from "next/image";
import Badge from "./badge";
import CarouselNav from "./carouselNav";
import StatCard from "./statCard";
import { FaArrowRight } from "react-icons/fa";
import jasmin from "@assets/images/jasmin.webp";
import foundIn from "@assets/images/found_in.webp";
import useMediaQuery from "@/hooks/useMediaQuerry";
import BreadcrumbNavigator from "@/components/generic/BreadcrumbNavigator";
import KeyIngredients from "@/components/productDetails/components/KeyIngredients";

export default function IngredientDetail({ data }) {
  const mobileScreen = useMediaQuery("(max-width: 600px)");

  return (
    <div className="px-0 md:px-24 py-8 flex flex-col mb-20">
      {/* Top Row: Name, Origin, Badges */}
      <div className="w-full mb-6 md:container mx-auto px-4 md:px-24 flex flex-col md:flex-row justify-between gap-y-4 md:gap-y-0 md:items-center">
        {/* Left: Name + Origin */}
        <div className="text-[28px] text-gray-600">
          {data.name}
        </div>

        {/* Right: Breadcrumbs + Badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-3/5">
          {/* Breadcrumb */}
          <div className="order-2 md:order-1 mt-4">
            <BreadcrumbNavigator />
          </div>

          {/* Badges */}
          <div className="order-1 md:order-2 flex flex-wrap gap-2">
            {data.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="flex flex-col md:flex-row md:container mx-auto gap-10 px-4 md:px-24 justify-between">
        {/* Left Column: Image + Product Info */}
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-start">
          {/* Ingredient Image */}
          <Image
            src={jasmin}
            alt={data.image.alt}
            width={mobileScreen ? 256 : 281}
            height={mobileScreen ? 318 : 333}
          />

          {/* Product Section */}
          <div className="w-full mt-6">
            {/* "Found in" label */}
            <div className="text-sm font-semibold md:font-medium text-[#0F1B28] mb-2">
              {data.productReference.found_in}
            </div>

            {/* Horizontal layout on mobile, vertical on desktop */}
            <div className="flex flex-row md:flex-col gap-4 items-center md:items-start">
              {/* Product Image */}
              <Image
                src={foundIn}
                alt={data.productReference.product_name}
                width={mobileScreen ? 90 : 100}
                height={mobileScreen ? 90 : 100}
                className="object-contain flex-shrink-0"
              />

              {/* Text & CTA */}
              <div className="flex flex-col justify-between w-full">
                <div className="text-base font-normal font-sophiaPro">
                  {data.productReference.product_name}
                </div>

                <button className="flex items-center justify-center gap-2 text-xs md:text-[16px] bg-[#2D4CF2] text-white rounded-full px-6 py-4 mt-2 w-3/4 md:w-full">
                  {data.productReference.button_label}
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Textual Content */}
        <div className="w-full md:w-3/5 flex flex-col">
          <p className="text-[#929798] text-sm md:text-base font-normal font-sophiaPro">
            {data.preText}
          </p>

          <div className="mt-10">
            {/* commented because business asked., uncomment it when it's necessary. */}
            <h2 className="text-[24px] md:text-[40px] font-sophiaPro font-normal">
              Score: <span className="text-blue-600">{data.score.value}</span>
            </h2>
            <p className="mt-2 text-[#0F1B28] leading-relaxed font-sophiaPro text-[14px] md:text-[24px]">
              {data.summary}
            </p>
          </div>

          <section className="mt-0">
            {data.sections?.map((section, index) => {
              if (section.heading && section.content) {
                return (
                  <section key={index} className="mt-10">
                    <h3 className="text-[24px] md:text-[40px] font-sophiaPro font-normal mb-2">
                      {section.heading}
                    </h3>
                    {section.content.map((paragraph, pIndex) => (
                      <div
                        key={pIndex}
                        className="text-[#929798] text-[15px] font-normal font-sophiaPro mb-4"
                      >
                        {paragraph}
                      </div>
                    ))}
                  </section>
                );
              }
              return null;
            })}
          </section>
        </div>
      </div>

      {/* Related Ingredients */}
      <div className="border-t mt-10 pt-10 flex flex-col gap-6 px-4 md:container mx-auto">
        <h2 className="text-lg md:text-[40px] font-sophiaPro font-normal mb-4 flex justify-center">
          {data.related_ingredients.heading}
        </h2>

        <CarouselNav
          previous={data.related_ingredients.previous}
          next={data.related_ingredients.next}
        />

        <div className="mt-4 flex justify-center">
          <button className="bg-[#2D4CF2] text-white px-6 py-4 rounded-full text-sm">
            {data.related_ingredients.button} →
          </button>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 md:px-0 md:container md:mx-auto">
        {data.bottom_highlights.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
}
