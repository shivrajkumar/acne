"use client"
import React, { useEffect, useState } from "react";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import { logGtmEvent } from "../generic/Gtm";
import { CDN_BASE_URL } from "@/constants/constants";

const mobile_video = `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/HeroBannerVideoMobile.mp4`;
const desktop_video = `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/HeroBannerVideoDesktop.mp4`;

const BannerSection = () => {
  const [syntheticId, setSyntheticId] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [caseId, setCaseId] = useState(null);

  useEffect(() => {

    const orderCountFromStorage = window.localStorage.getItem("order_count");
    const storedData = localStorage.getItem("acne_result_data");
    const idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;
    setOrderCount(orderCountFromStorage);
    setCaseId(idFromLocalStorage)

    const synthetic_Id = localStorage.getItem("syntheticId");
    if (synthetic_Id) {
      setSyntheticId(synthetic_Id);
    }
  }, [])

  const logGTM = () => {
    logGtmEvent("HB_Form_Start")
  }


  return (
    <>
      {/* Mobile Banner with Video */}
      <div className="flex sm:hidden flex-col items-start relative justify-center min-h-[520px]">
        <div className="relative w-full h-full">
          {/* Video */}
          <video
            src={mobile_video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full min-h-[520px] object-cover"
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
          <div className={`absolute bottom-8 left-0 w-full z-20 px-4 font-sophiaPro `}>
            <div className="flex flex-col gap-[8px] font-sophiaPro text-[#FFFFFF]">
              <p className="font-sophiaPro font-[500] text-[16px] leading-[130%] -tracking-[1%]">
                Designed by Dermatologists
              </p>
              <p className="font-sophiaPro font-[500] text-[40px] leading-[120%] -tracking-[3%]">
                Personalised
                <br />
                Acne Care
                <br />
                That Works
              </p>
              <p className="font-sophiaPro font-[500] text-[14px] leading-[140%] -tracking-[1%]">
                Discover acne treatments crafted
                <br />for your unique skin needs
              </p>
            </div>
            <div className="mt-[32px]"
            >
              {!orderCount ?
                <div onClick={logGTM}>
                  <AcneTakeTheSkinTest
                    variant="white"
                    text={`${syntheticId ? "Retake skin test" : "TAKE THE SKIN TEST"}`}
                    tm={" "}
                    redirectTo={"/skin-test"}
                    deskSize="mobileSmall"
                  /></div>
                : <AcneTakeTheSkinTest
                  variant="white"
                  text={`Book Your Call Now`}
                  tm={" "}
                  redirectTo={`/book-a-call?caseId=${caseId}&redirect=home`}
                  deskSize="mobileSmall"
                />}
            </div>
            {syntheticId && !orderCount && < div className=" -mt-[8px]" onClick={logGTM}>
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
      <div className="sm:flex hidden flex-col items-start relative justify-center custom-black min-h-[20%]">
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
        <div className="absolute items-start ps-[80px] flex flex-col font-sophiaPro">
          <div className="flex flex-col gap-[8px] mb-[32px]">
            <p className="font-sophiaPro font-[500] text-[18px] leading-[135%] tracking-[-1%] text-[#FFFFFF]">
              Designed by Dermatologists
            </p>
            <p className="font-sophiaPro font-[500] text-[54px] leading-[120%] tracking-[-2%] text-[#FFFFFF]">
              Personalised
              <br />
              Acne Care
              <br />
              That Works
            </p>
            <p className="font-sophiaPro font-[500] text-[18px] leading-[135%] tracking-[-1%] text-[#FFFFFF]">
              Discover acne treatments crafted for
              <br />your unique skin needs
            </p>
          </div>
          <div className="flex justify-start"
          >
            {!orderCount ?
              <div onClick={logGTM}>
                <AcneTakeTheSkinTest
                  variant="white"
                  text={`${syntheticId ? "Retake skin test" : "TAKE THE SKIN TEST"}`}
                  tm={" "}
                  redirectTo={"/skin-test"}
                  deskSize="desktopBig"
                />
              </div> :
              <AcneTakeTheSkinTest
                variant="white"
                text={`Book Your Call Now`}
                tm={" "}
                redirectTo={`/book-a-call?caseId=${caseId}&redirect=home`}
                deskSize="desktopBig"
              />}
          </div>
          {syntheticId && !orderCount &&
            < div className="flex justify-start mt-[8px]" >
              <AcneTakeTheSkinTest
                variant="black"
                text={"My Recommended plan"}
                tm={" "}
                redirectTo={`/result?tid=${syntheticId}`}
                deskSize="desktopBig"
              />
            </div>}
        </div>
      </div>
    </>
  );
};

export default BannerSection;
