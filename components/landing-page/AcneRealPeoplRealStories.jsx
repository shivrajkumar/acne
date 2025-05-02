"use client";
import Image from "next/image";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import { Carousel } from "antd";
import { CustomRightArrow, CustomLeftArrow } from "@constants/CustomArrow";
import { useEffect, useRef, useState } from "react";

export default function AcneRealPeoplRealStories({
  testimonials = [],
  bgColor = "bg-Background/Beige",
  slidesToShow = 2,
  showNameBeforeQuote = false,
  showHelpedSolve = false,
  whiteBg = false,
  reviewPage = false,
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

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

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showCustomSlider = !reviewPage;

  //  Dynamic value based on both class & screen size
  const dotsBottom = showCustomSlider
    ? isDesktop
      ? "17px"
      : "7px"
    : isDesktop
      ? "-30px"
      : "-17px";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: reviewPage ? testimonials.length / 3 : 1,
    // autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1156,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1018,
        settings: {
          slidesToShow: reviewPage ? Math.min(2, slidesToShow) : 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: reviewPage ? false : true,
          centerPadding: "20px",
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section
      className={`${bgColor} ${reviewPage
        ? " md:p-[4rem]"
        : " p-[40px] xs:p-[28px] md:p-10 md:h-[670px] h-[615px]"
        }  rounded-[24px] font-lato`}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {/* Header */}
      <div
        className={`flex justify-between mb-[1.5rem] ${reviewPage ? " flex-col p-[12px] xl:p-0 xl:flex-row" : "items-center "
          }`}
      >
        <div>
          <div className="bg-white border-[1px] border-Elements/Divider-Stroke rounded-[12px] py-[8px] px-[16px] font-lato text-[12px] md:text-[14px] w-fit ">
            Reviews
          </div>
          <h2
            className={`font-lato text-[40px] xs:text-[28px] md:text-[40px] font-medium leading-[130%] tracking-[-0.02em] my-[40px] ${reviewPage ? "xs:my-[12px]" : "xs:my-[16px]"
              } `}
          >
            <span className="hidden md:inline">Real People, Real Stories</span>

            <span className="md:hidden block">Real People,Real Stories</span>
          </h2>
        </div>
        <div className="hidden items-end md:flex">
          <AcneTakeTheSkinTest
            variant="black"
            text="TAKE THE SKIN TEST"
            tm=" "
            redirectTo="/skin-test"
            deskSize="desktopSmall"
          />
        </div>
        {reviewPage && (
          <div className=" flex md:hidden ">
            <AcneTakeTheSkinTest
              variant="black"
              text="TAKE THE SKIN TEST"
              tm=" "
              redirectTo="/skin-test"
              deskSize="desktopSmall"
            />
          </div>
        )}
      </div>

      {/* Testimonials Slider */}
      <div
        className={`testimonials-slider relative ${!reviewPage ? "custom-slider-carousel" : ""
          }`}
        id="realPeople-carousel-id"
        style={{ "--dots-bottom": dotsBottom }}
      >
        {testimonials.length > 0 ? (
          <>
            <Carousel {...settings} ref={sliderRef}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-3 ">
                  <div className={`${reviewPage ? "mb-6" : ""} `}>
                    <div
                      className={`relative rounded-[24px] xs:rounded-[16px] h-full flex flex-col gap-[4px]  
                     ${reviewPage ? "overflow-hidden" : ""}
                     ${whiteBg ? "bg-white p-[16px] rounded-[24px] " : ""}`}
                    >
                      <div
                        className={`relative flex gap-2 rounded-[24px] xs:rounded-[16px] overflow-hidden ${reviewPage ? "h-[248px]" : "md:h-[326px] h-[160px]"
                          }`}
                      >
                        <div className="relative w-1/2">
                          <Image
                            src={testimonial.beforeImg} // Update to use the "before" image
                            alt="Before using Clear Ritual"
                            width={reviewPage ? 192 : 310}
                            height={reviewPage ? 248 : 326}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-[12px] py-[4px] rounded-[32px] text-[14px]  font-[400]">
                            BEFORE
                          </div>
                        </div>

                        <div className="relative w-1/2">
                          <Image
                            src={testimonial.afterImg} // Update to use the "after" image
                            alt="After using Clear Ritual"
                            width={reviewPage ? 192 : 310}
                            height={reviewPage ? 248 : 326}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-[12px] py-[4px] rounded-[32px] text-[14px]  font-[400]">
                            AFTER
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-4 ">
                        <div
                          className={`${reviewPage
                            ? "h-[104px] md:h-[134px] lg:h-[154px] xl:h-[124px]"
                            : ""
                            }`}
                        >
                          {showNameBeforeQuote && (
                            <p className="font-lato text-[18px] text-[#171819] md:text-[16px] xs:text-[14px] font-[600] text-left leading-[135%] tracking-[-0.01rem]">
                              {testimonial.name}
                            </p>
                          )}
                          {showNameBeforeQuote && (
                            <p className="font-lato text-[16px] md:text-[16px] xs:text-[14px] mb-6 mt-4 font-[400] text-left leading-[150%] tracking-[-0.01rem]">
                              {`${testimonial.quote}`}
                            </p>
                          )}
                          {!showNameBeforeQuote && (
                            <p className="font-lato text-[16px] md:text-[16px] xs:text-[14px] font-[400] mb-[8px] text-center leading-[140%]">
                              {`"${testimonial.quote}"`}
                            </p>
                          )}
                          {!showNameBeforeQuote && (
                            <p className="font-lato text-[16px] md:text-[16px] xs:text-[14px] font-[600] text-center leading-[150%]">
                              {testimonial.name}
                            </p>
                          )}
                        </div>

                        {showHelpedSolve &&
                          testimonial.helped_solve?.length > 0 && (
                            <div className="text-left min-h-[120px]  md:min-h-[130px] lg:min-h-[130px] xl:min-h-[130px] max-h-[150px] mt-[20px]">
                              <p className="md:text-[14px] font-lato font-[400] text-Text/Body-Text mb-2">
                                Helped Solve
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {testimonial.helped_solve.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 border rounded-[40px] text-sm bg-white text-[#2872A1] border-[#2872A1] uppercase"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
            {showArrows && (
              <>
                <div
                  className={`absolute ${reviewPage ? "top-[0]" : "top-[-33px]"
                    } left-2  transform -translate-y-1/2 z-10 cursor-pointer hidden md:block`}
                  onClick={goToPrev}
                >
                  <CustomLeftArrow reviewPage={true} />
                </div>
                <div
                  className={`absolute right-2  ${reviewPage ? "top-[0]" : "top-[-33px]"
                    } transform -translate-y-1/2 z-10 cursor-pointer hidden md:block`}
                  onClick={goToNext}
                >
                  <CustomRightArrow reviewPage={true} />
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center p-4 font-lato">
            No testimonials available
          </div>
        )}
      </div>

      {/* Mobile CTA */}
      {!reviewPage && (
        <div className="mt-10 flex md:hidden justify-center mx-auto">
          <AcneTakeTheSkinTest
            variant="black"
            text="TAKE THE SKIN TEST"
            tm=" "
            redirectTo="/skin-test"
            deskSize="mobileBig"
          />
        </div>
      )}
    </section>
  );
}
