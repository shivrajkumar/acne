"use client";
import Image from "next/image";
import { featureGridData } from "@/constants/allVayuData";
import { CDN_BASE_URL } from "@/constants/config";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import arrowIcon from "@assets/icons/ArrowIcon.png";
import { Carousel } from "antd";

const SkinProgressCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false, // Disable center mode to prevent overlap
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 0.4,
          slidesToScroll: 1,
          dots: true,
          centerMode: false, // disable centering
          initialSlide: 0, // ensure it starts from the beginning
        },
      },
    ],
  };

  const skinProgressImages = [
    {
      id: 1,
      imageSrc: `${CDN_BASE_URL}website_images/vayu/experts_page/before-one.webp`,
      label: "Before",
    },
    {
      id: 2,
      imageSrc: `${CDN_BASE_URL}website_images/vayu/experts_page/after-one.webp`,
      label: "After",
    },
    {
      id: 3,
      imageSrc: `${CDN_BASE_URL}website_images/vayu/experts_page/before-two.webp`,
      label: "Before",
    },
    {
      id: 4,
      imageSrc: `${CDN_BASE_URL}website_images/vayu/experts_page/after-two.webp`,
      label: "After",
    },
    {
      id: 5,
      imageSrc: `${CDN_BASE_URL}website_images/vayu/experts_page/before-three.webp`,
      label: "Before",
    },
    {
      id: 6,
      imageSrc: `${CDN_BASE_URL}website_images/vayu/experts_page/after-three.webp`,
      label: "After",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center  pt-6" id="carousel-id">
      <div className="w-full">
        <Carousel {...settings} className=" px-2">
          {Array.from({ length: skinProgressImages.length / 2 }).map(
            (_, index) => {
              const before = skinProgressImages[index * 2];
              const after = skinProgressImages[index * 2 + 1];

              return (
                <div
                  key={before.id}
                  className="pt-4 md:px-8 px-2 !w-auto"
                  style={{ width: "auto !important" }}
                >
                  <div className="flex items-center gap-3 sm:gap-[5px]">
                    {/* Before Image */}
                    <div className="relative">
                      <Image
                        src={before.imageSrc}
                        alt="Before"
                        width={192}
                        height={240}
                        className="!rounded-[13px] sm:!rounded-[16px]object-cover w-[250px] h-[301px] sm:w-[192px] sm:h-[240px]"
                      />
                      <div className="md:w-auto w-[99px] absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-[16px] font-[400] leading-[150%] px-[16px] py-[8px] rounded-[50px] shadow-sm">
                        Before
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <Image src={arrowIcon} alt="Arrow" width={24} height={24} />
                    </div>

                    {/* After Image */}
                    <div className="relative">
                      <Image
                        src={after.imageSrc}
                        alt="After"
                        width={192}
                        height={240}
                        className="!rounded-[13px] sm:!rounded-[16px] object-cover w-[250px] h-[301px] sm:w-[192px] sm:h-[240px]"
                      />
                      <div className=" md:w-auto w-[99px] absolute bottom-2 left-1/2 -translate-x-1/2 bg-white  text-[16px] font-[400] leading-[150%] px-[16px] py-[8px] rounded-[50px] shadow-sm">
                        After
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </Carousel>
      </div>

    </div>
  );
};
const FeatureGrid = () => {
  return (
    <div className="bg-white px-[16px] md:px-[40px] p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 relative">
        {featureGridData.map((item) => {
          const words = item.title.split(" ");
          const firstLine = words.slice(0, 2).join(" ");
          const secondLine = words.slice(2).join(" ");
          return (
            <div
              key={item.id}
              className={` bg-Background/Beige rounded-3xl flex flex-col items-center text-center   md:relative
              ${item.id === 3 ? "md:mb-[153px] md:mt-[-150px]" : "mt-0"}
              ${item.id === 1 && "md:mb-[153px]"}
 ${item.id === 2 ? "md:mt-[153px]" : "mt-0"}`}
            >
              <h3 className="text-[34px] md:text-[40px] font-[400] md:mt-[32px] mt-[24px] tracking-[-0.02em] md:leading-[130%] leading-[1.2] text-Text/Heading-Text font-lato">
                {firstLine} <br /> {secondLine}
              </h3>
              <p className="text-[14px] md:text-[18px] md:leading-[135%] font-lato text-Text/Body-Text tracking-[-0.01em] leading-[1.4] font-[400]  md:mt-3 mt-2">
                {item.description}
              </p>
              {item?.buttonText && (
                <div className="md:mt-10 mt-[24px]">
                  <AcneTakeTheSkinTest
                    variant="black"
                    text={item.buttonText}
                    tm=" "
                    redirectTo={item.redirect}
                    deskSize="desktopBig"
                  />
                </div>
              )}

              {item.title === "Track Your Skin’s Progress" ? (
                <SkinProgressCarousel />
              ) : (
                <div className="md:mt-auto mt-[24px] pb-0 w-full flex justify-center">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    className={`object-cover ${item?.id === 1
                      ? "md:h-[460px] h-[380px] mt-[2rem]"
                      : item?.id === 3
                        ? "md:h-[480px] mt-[-50px] h-[305px]"
                        : "md:h-[450px] h-[328px]"
                      }`}
                    width={400}
                    height={item?.id === 3 ? 450 : 350}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FeatureGrid;
