"use client";
import Image from "next/image";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import { Carousel } from "antd";
import RightArrowCircelLight from "@assets/icons/RightArrowCircleLight.svg";
import { useRef, useState, useEffect } from "react";

export default function AcneIngredients({ ingredients }) {
  const carouselRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after component mounts to prevent initial animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-Background/AirBlue py-[28px] px-4 pb-[40px] md:p-[40px] md:pb-[80px] rounded-[24px] w-full mx-auto md:h-[700px] relative">
      <div className="bg-white border-[1px] border-[#E3E3E2] rounded-[12px] py-2 px-4 font-lato font-normal text-[12px] md:text-[14px] w-fit ">
        Ingredients
      </div>
      <div className="flex justify-between mt-[16px] mb-[16px] md:mt-[16px] md:mb-[40px] ">
        <div className="flex flex-col justify-between items-start">
          <h2 className="text-[28px] md:text-[40px]  font-[500] text-Text/Heading-Text font-lato leading-[130%]">
            Ingredients You Can Trust - Safe &<br />
            Effective.
          </h2>
        </div>
        <div className="hidden items-end md:flex">
          <AcneTakeTheSkinTest
            variant="black"
            text="TAKE THE SKIN TEST"
            tm=" "
            redirectTo="/skin-test"
            deskSize="desktopBig"
          />
        </div>
      </div>

      {/* Single Slider for both Desktop and Mobile */}
      <div
        className={`w-full custom-slider-container ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        id="carousel-id"
        style={{ transition: "opacity 0.3s ease-in" }}
      >
        {/* Right Arrow */}
        <div
          onClick={() => carouselRef.current?.next()}
          className="hidden md:block absolute right-0 top-[60%] transform -translate-y-1/2 z-10 cursor-pointer opacity-1"
        >
          <Image
            src={RightArrowCircelLight}
            width={56}
            height={56}
            alt="Next"
          />
        </div>

        <Carousel
          ref={carouselRef}
          dots
          autoplay={isLoaded}
          speed={500}
          autoplaySpeed={5000}
          infinite
          slidesToShow={2}
          slidesToScroll={1}
          className="custom-slider-dots-root-causes"
          variableWidth
          adaptiveHeight
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {ingredients.map((ingredient, index) => (
            <div key={index} className="px-2">
              <div className="bg-white rounded-2xl overflow-hidden p-4 flex flex-col min-h-[383px] w-[258px] md:w-[370px] md:min-h-[400px] ">
                <div className="flex xs:hidden w-full justify-center mb-4">
                  <Image
                    src={ingredient.src}
                    alt={ingredient.alt}
                    width={256}
                    height={256}
                    className="rounded-lg w-[256px] h-[256px] object-contain"
                  />
                </div>
                <div className="hidden xs:flex w-full justify-center mb-4">
                  <Image
                    src={ingredient.src}
                    alt={ingredient.alt}
                    width={256}
                    height={256}
                    className="rounded-lg w-[256px] h-[256px] object-cover"
                  />
                </div>
                <div className="text-left w-full">
                  <p className="text-[24px] md:text-[16px] xs:text-[16px] font-[500] font-lato text-Text/Heading-Text leading-[130%]">
                    {ingredient.name}
                  </p>
                  <p className="text-[14px] md:text-[14px] xs:text-[14px] text-Text/Heading-Text font-normal mt-1 leading-[140%]">
                    {ingredient.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Mobile CTA */}
      <div className="flex items-end md:hidden mt-[40px] justify-center ">
        <AcneTakeTheSkinTest
          variant="black"
          text="TAKE THE SKIN TEST"
          tm=" "
          redirectTo="/skin-test"
          deskSize="mobileBig"
        />
      </div>
    </div>
  );
}