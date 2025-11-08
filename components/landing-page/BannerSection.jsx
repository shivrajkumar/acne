"use client";
import React, { useEffect, useState } from "react";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import { logGtmEvent } from "../generic/Gtm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { generateEventId } from "@/helpers/metaCapiHelper";
import { trackMoEngageEvent } from "@/utils/moegage";
import BannerWeb from "@assets/images/banner-web.png";
import BannerMobile from "@assets/images/banner-mobile.png";

const BannerSection = () => {
  const [syntheticId, setSyntheticId] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const orderCountFromStorage = window.localStorage.getItem("order_count");
    const storedData = localStorage.getItem("acne_result_data");
    const idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;
    setOrderCount(orderCountFromStorage);
    setCaseId(idFromLocalStorage);

    const synthetic_Id = localStorage.getItem("syntheticId");
    if (synthetic_Id) {
      setSyntheticId(synthetic_Id);
    }
  }, []);

  const logGTM = () => {
    logGtmEvent("HB_Form_Start", {
      event_id: generateEventId({ eventName: "HB_Form_Start" }),
    });
    trackMoEngageEvent("skin_test_started");
  };

  return (
    <>
      {/* Mobile Banner */}
      <div className="flex sm:hidden flex-col items-start relative justify-center min-h-[550px]">
        <div className="relative w-full h-full">
          <div className="bg-[#DFE6F4] h-[550px]"></div>

          {/* Content Container */}
          <div className="absolute inset-0 flex flex-col justify-between px-4 py-4 font-sophiaPro">
            {/* Top Text Section */}
            <div className="flex flex-col gap-[8px] text-black">
              <p className="font-sophiaPro font-[400] text-[14px] leading-[130%] -tracking-[1%]">
                Designed by Dermatologists
              </p>
              <p className="font-sophiaPro text-[28px] leading-[120%] -tracking-[3%] font-bold">
                Acne needs
                <br />
                Personalisation
              </p>
              <p className="font-sophiaPro font-[400] text-[13px] leading-[140%] -tracking-[1%]">
                Get a Dermatologist <br /> Recommend Routine Now!
              </p>
              <div className="inline-block w-fit px-3 py-1 bg-yellow-300 text-xs font-semibold rounded">
                FREE AI SKIN SCAN
              </div>
            </div>

            {/* Center Image */}
            <div className="absolute inset-0 flex items-end justify-end mt-16">
              <div className="relative w-full h-full">
                <Image
                  src={BannerMobile}
                  alt="banner-mobile"
                  fill
                  className="object-right scale-90 mt-6 ml-4"
                  priority
                />
              </div>
            </div>

            {/* Bottom Section - Badge and Buttons */}
            <div className="flex flex-col z-10 w-full">
              <div className="flex flex-col w-full">
                {!orderCount ? (
                  <div onClick={logGTM} className="w-full">
                    <AcneTakeTheSkinTest
                      variant="black"
                      text={`${
                        syntheticId ? "RETAKE SKIN DIAGNOSIS" : "TAKE THE SKIN DIAGNOSIS"
                      }`}
                      tm={" "}
                      redirectTo={"/skin-test"}
                      deskSize="mobileBig"
                    />
                  </div>
                ) : (
                  <div className="w-full">
                    <AcneTakeTheSkinTest
                      variant="white"
                      text={`Book Your Call Now`}
                      tm={" "}
                      redirectTo={`/book-a-call?caseId=${caseId}&redirect=home`}
                      deskSize="mobileBig"
                    />
                  </div>
                )}

                {syntheticId && !orderCount && (
                  <div onClick={logGTM} className="w-full">
                    <AcneTakeTheSkinTest
                      variant="white"
                      text={"My Recommended plan"}
                      tm={" "}
                      redirectTo={`/result?tid=${syntheticId}`}
                      deskSize="mobileBig"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Banner */}
      <div className="sm:flex hidden relative w-full h-[600px] bg-[#DFE6F4]">
        {/* Left Content - Text and Buttons */}
        <div className="absolute left-0 top-0 h-full flex items-center ps-[80px] z-10">
          <div className="flex flex-col font-sophiaPro">
            <div className="flex flex-col gap-[8px] mb-[32px]">
              <p className="font-sophiaPro font-[400] text-[14px] leading-[135%] tracking-[-1%] text-black bg-[#FFF88A] w-fit px-8 py-1">
                FREE AI SKIN SCAN
              </p>
              <p className="font-sophiaPro font-[400] text-[24px] leading-[135%] tracking-[-1%] text-black">
                Designed by Dermatologists
              </p>
              <p className="font-sophiaPro font-[400] text-[80px] leading-[120%] tracking-[-2%] text-black">
                Acne needs
                <br />
                Personalisation
              </p>
              <p className="font-sophiaPro font-[400] text-[20px] leading-[135%] tracking-[-1%] text-black">
                Get a Dermatologist Recommend Routine Now!
              </p>
            </div>
            <div className="flex justify-start">
              {!orderCount ? (
                <div onClick={logGTM}>
                  <AcneTakeTheSkinTest
                    variant="black"
                    text={`${
                      syntheticId ? "RETAKE SKIN DIAGNOSIS" : "TAKE THE SKIN DIAGNOSIS"
                    }`}
                    tm={" "}
                    redirectTo={"/skin-test"}
                    deskSize="desktopBig"
                  />
                </div>
              ) : (
                <AcneTakeTheSkinTest
                  variant="white"
                  text={`Book Your Call Now`}
                  tm={" "}
                  redirectTo={`/book-a-call?caseId=${caseId}&redirect=home`}
                  deskSize="desktopBig"
                />
              )}
            </div>
            {syntheticId && !orderCount && (
              <div className="flex justify-start mt-[8px]">
                <AcneTakeTheSkinTest
                  variant="black"
                  text={"My Recommended plan"}
                  tm={" "}
                  redirectTo={`/result?tid=${syntheticId}`}
                  deskSize="desktopBig"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="absolute right-0 top-0 h-[600px]">
          <div className="relative h-full w-auto">
            <Image
              src={BannerWeb}
              alt="banner-img"
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerSection;
