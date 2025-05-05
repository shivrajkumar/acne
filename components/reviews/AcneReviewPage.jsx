"use client";
import Image from "next/image";
import { CDN_BASE_URL } from "../../constants/config";
import { reviewTestimonials } from "../../constants/allVayuData";
import GoogleReviewSection from "./GoogleReviewSection";
import { MorereviewTestimonials } from "../../constants/allVayuData";
import SkincareMakeSense from "../about-us/SkincareMakeSenseAboutUs";
import AcneRealPeoplRealStories from "../landing-page/AcneRealPeoplRealStories";

const AcneReviewPage = () => {
  return (
    <div className="">
      <div className="flex flex-col bg-[#F9F7F2]  lg:pl-[24px] pb-[16px] space-y-8 w-full items-center">
        <GoogleReviewSection reviewPage={true} />

        <div className="relative w-full h-[356px] lg:h-[384px] xl:h-[550px]">
          <Image
            src={`${CDN_BASE_URL}website_images/clear_rituals/reviewPage/ReviewGroupImage.webp`}
            fill
            alt="User"
            loading="eager"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9F7F2] from-[1%] via-transparent via-[45%] to-[#F9F7F2] to-[124%]" />
        </div>
      </div>

      <div className="w-full lg:p-[40px] p-[40px] px-[16px] space-y-10 bg-white">
        <AcneRealPeoplRealStories
          testimonials={reviewTestimonials}
          bgColor="bg-[#DCEBF2]"
          slidesToShow={3}
          dualImage={true}
          showNameBeforeQuote={true}
          showHelpedSolve={true}
          whiteBg={true}
          reviewPage={true}
        />

        <div className="flex flex-col bg-[#F9F7F2] lg:pt-10 pt-4 rounded-3xl border border-[#E3E3E2] w-full items-center">
          <GoogleReviewSection
            text="The Reviews Are In"
            showAdditionalText={true}
            reviewPage={true}
          />

          <div className="w-full space-y-8">
            <div className="lg:px-[260px] px-[16px] ">
              {MorereviewTestimonials.map((review, index) => (
                <div key={index} className="border-b  py-10 border-[#E3E3E2]">
                  <div className="flex gap-3">
                    {review.src && (
                      <div
                        className={`relative ${review.src2 ? "w-[120px]" : "w-[250px]"
                          }`}
                      >
                        <Image
                          src={review.src}
                          alt={review.name}
                          width={180}
                          height={260}
                          className="rounded-lg object-cover h-[160px] w-full"
                        />
                      </div>
                    )}
                    {review.src2 && (
                      <div className="relative w-[120px] ">
                        <Image
                          src={review.src2}
                          alt={review.name}
                          width={180}
                          height={260}
                          className="rounded-lg object-cover h-[160px] w-full"
                        />
                      </div>
                    )}
                  </div>

                  <p className="text-[12px] font-[500] leading-[130%] font-lato text-[#171819] mt-4">
                    {review.date}
                  </p>
                  <h3 className="text-[20px] font-lato font-[500] leading-[130%] tracking-[-0.02em]">
                    {review.name}, {review.location}
                  </h3>
                  <p className="mt-3 font-lato font-[400] text-[14px] leading-[140%] text-[#313233]">
                    {review.review}
                  </p>

                  <div className="flex items-center mt-2">
                    <span className="mr-2 text-gray-700 text-sm">
                      {review.rating}
                    </span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.round(review.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <SkincareMakeSense
          heading={"Real Results Start with Personalised Care"}
          subText={
            "Our skin test identifies your unique needs and recommends expert-approved care—rooted in Ayurveda, dermatology, and clinical science"
          }
        />
      </div>
    </div>
  );
};

export default AcneReviewPage;
