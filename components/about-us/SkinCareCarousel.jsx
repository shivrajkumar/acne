"use client";

import React, { useRef, useState, useEffect } from "react";
import SkincareTestCard from "../SkincareTestCard";
import { CustomRightArrow, CustomLeftArrow } from "@constants/CustomArrow";
import { CDN_BASE_URL } from "@constants/config";
import { Carousel } from "antd";

const SkinCareCarousel = () => {
  const [showArrows, setShowArrows] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sliderRef = useRef(null);

  // Set isLoaded to true after component mounts to prevent initial animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Functions to handle navigation
  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.prev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.next();
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: isLoaded,
    autoplaySpeed: 3000,
    slidesToShow: 1.8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const cardsData = [
    {
      title: "Want a skincare routine that actually works?",
      buttonText: "TAKE THE SKIN TEST",
      mobileImage: `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/slider_background_one_mobileImg.webp`,
      desktopImage: `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/slider_background_one_deskImg.webp`,
    },
    {
      title: "Science-backed, and effective acne care.",
      buttonText: "TAKE THE SKIN TEST",
      mobileImage: `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/slider_background_two_mobileImg.webp`,
      desktopImage: `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/slider_background_two_deskImg.webp`,
    },
    {
      title: "Your skin is a mirror of your internal health.",
      buttonText: "TAKE THE SKIN TEST",
      mobileImage: `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/slider_background_three_mobileImg.webp`,
      desktopImage: `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/slider_background_three_deskImg.webp`,
    },
  ];

  return (
    <div className="w-full flex justify-center md:py-[6rem] py-5">
      <div
        id="about-us-carousel-id"
        className={`w-[100%] relative md:h-auto h-[470px] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
        style={{ transition: "opacity 0.3s ease-in" }}
      >


        <Carousel ref={sliderRef} {...settings} lazyLoad="ondemand">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-2 pb-3"
            >
              <SkincareTestCard {...card} />
            </div>
          ))}
        </Carousel>

        {/* Custom arrows that appear on hover */}
        {showArrows && isLoaded && (
          <>
            <div
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer hidden md:block"
              onClick={goToPrev}
            >
              <CustomLeftArrow />
            </div>
            <div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer hidden md:block"
              onClick={goToNext}
            >
              <CustomRightArrow />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkinCareCarousel;