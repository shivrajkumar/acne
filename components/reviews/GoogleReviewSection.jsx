import Image from "next/image";
import React from "react";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import { CDN_BASE_URL } from "@/constants/constants";

const GoogleReviewSection = ({
  text,
  showAdditionalText = false,
  reviewPage = false,
}) => {

  const defaultText = reviewPage ? (
    <>
      Clear Ritual Success Stories:<br /> Real People, Real Results
    </>
  ) : (
    <>
      Personalised Acne Care with <br /> 100K+ 5-star reviews*
    </>
  );

  return (
    <div className=" lg:p-10 lg:text-center px-[24px] pt-[54px] xl:pt-0 text-left w-full lg:space-y-8">
      <div className="flex flex-col lg:items-center lg:mt-14">
        <Image
          src={`${CDN_BASE_URL}website_images/clear_rituals/reviewPage/Google_Review_Star.webp`}
          alt="Google Reviews"
          width={231}
          height={62}
        />
      </div>

      <div className="lg:text-[44px] text-[34px] font-[500] font-sophiaPro leading-[120%] tracking-[-0.02em] !mt-7">
        {text ? text : defaultText}
      </div>

      {showAdditionalText && (
        <div className="text-[16px] font-[400] font-sophiaPro leading-[150%] !mt-[6px]">
          Tried everything for acne? <br />
          See how Clear Ritual has helped people get clearer skin with real, visible
          results.
        </div>
      )}

      <div className="lg:mt-6 flex lg:justify-center">
        <AcneTakeTheSkinTest
          variant="black"
          text="TAKE THE SKIN TEST"
          tm=" "
          redirectTo="/skin-test"
          deskSize={reviewPage ? "desktopSmall" : "desktopBig"}
        />
      </div>
    </div>
  );
};

export default GoogleReviewSection;
