"use client"
import { CDN_BASE_URL } from "@/constants/config";
import React, { useEffect } from "react";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";

const mobile_video = `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/HeroBannerVideoMobile.mp4`;
const desktop_video = `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/HeroBannerVideoDesktop.mp4`;

const BannerSection = () => {
  const [syntheticId, setSyntheticId] = React.useState(null);

  useEffect(() => {
    const synthetic_Id = localStorage.getItem("syntheticId");
    if (synthetic_Id) {
      setSyntheticId(synthetic_Id);
    }
  }, []);



  return (
    <>
      {/* Mobile Banner with Video */}
      <div className="flex sm:hidden flex-col items-start relative justify-center min-h-[250px]">
        <div className="relative w-full h-full">
          {/* Video */}
          <video
            src={mobile_video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* Overlay with the custom gradient */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.315) 74.39%, rgba(0, 0, 0, 0.7) 95.58%)",
            }}
          ></div>

          {/* Text positioned over the video */}
          <div className="absolute bottom-8 left-0 w-full z-20 px-4 font-lato">
            <div className="flex flex-col gap-[8px] font-lato text-[#FFFFFF]">
              <p className="font-lato font-[500] text-[16px] leading-[130%] -tracking-[1%]">
                Designed by Dermatologists
              </p>
              <p className="font-lato font-[500] text-[40px] leading-[120%] -tracking-[3%]">
                Personalised
                <br />
                Acne Care
                <br />
                That Works
              </p>
              <p className="font-lato font-[500] text-[14px] leading-[140%] -tracking-[1%]">
                Discover acne treatments crafted
                <br />for your unique skin needs
              </p>
            </div>
            <div className="mt-[32px]">
              <AcneTakeTheSkinTest
                variant="white"
                text={`${syntheticId ? "Retake skin test" : "TAKE THE SKIN TEST"}`}
                tm={" "}
                redirectTo={"/skin-test"}
                deskSize="mobileSmall"
              />
            </div>
            {syntheticId && <div className=" -mt-[8px]">
              <AcneTakeTheSkinTest
                variant="black"
                text={"My Recommended plan"}
                tm={" "}
                redirectTo={`/result?tid=${syntheticId}`}
                deskSize="mobileSmall"
              />
            </div>}
          </div>
        </div>
      </div>

      {/* Desktop Banner with Video */}
      < div className="sm:flex hidden flex-col items-start relative justify-center custom-black min-h-[20%]" >
        <div className="relative w-full">
          <video
            src={desktop_video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 "
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.315) 74.39%, rgba(0, 0, 0, 0.7) 95.58%)",
            }}
          ></div>
        </div>
        <div className="absolute items-start ps-[80px] flex flex-col font-lato">
          <div className="flex flex-col gap-[8px] mb-[32px]">
            <p className="font-lato font-[500] text-[18px] leading-[135%] tracking-[-1%] text-[#FFFFFF]">
              Designed by Dermatologists
            </p>
            <p className="font-lato font-[500] text-[54px] leading-[120%] tracking-[-2%] text-[#FFFFFF]">
              Personalised
              <br />
              Acne Care
              <br />
              That Works
            </p>
            <p className="font-lato font-[500] text-[18px] leading-[135%] tracking-[-1%] text-[#FFFFFF]">
              Discover acne treatments crafted for
              <br />your unique skin needs
            </p>
          </div>
          <div className="flex justify-start" >
            <AcneTakeTheSkinTest
              variant="white"
              text={`${syntheticId ? "Retake skin test" : "TAKE THE SKIN TEST"}`}
              tm={" "}
              redirectTo={"/skin-test"}
              deskSize="desktopBig"
            />
          </div>
          {syntheticId && <div className="flex justify-start mt-[8px]" >
            <AcneTakeTheSkinTest
              variant="black"
              text={"My Recommended plan"}
              tm={" "}
              redirectTo={`/result?tid=${syntheticId}`}
              deskSize="desktopBig"
            />
          </div>}
        </div>
      </div >
    </>
  );
};

export default BannerSection;
