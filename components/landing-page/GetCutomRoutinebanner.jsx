import Image from "next/image";
import React from "react";
import { CDN_BASE_URL } from "@/constants/config";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";

export default function GetCustomRoutineBanner() {
  return (
    <section className="relative w-full rounded-[24px] xs:rounded-[16px]  overflow-hidden font-lato">
      {/* Desktop View - Hidden on Mobile */}
      <div className="hidden md:block relative">
        <div className="relative w-full h-[520px]">
          <Image
            src={`${CDN_BASE_URL}website_images/clear_rituals/landingPage/skincare_routine_desktop.webp`}
            alt="Woman with perfect skin"
            fill
            className="object-cover rounded-[24px]"
          />

          <div className="absolute inset-0 top-[35%] flex flex-col mx-auto items-center justify-center">
            <div className="text-center text-white  px-4">
              <h1 className="text-[44px] font-[500]  mb-8 font-lato">
                No More Guessing—Get a Skincare <br />Routine Made Just for You.
              </h1>
              <div className="flex justify-center">
                <AcneTakeTheSkinTest
                  variant="white"
                  text="TAKE THE SKIN TEST"
                  tm=" "
                  redirectTo="/skin-test"
                  deskSize="desktopBig"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Hidden on Desktop */}
      <div className="md:hidden relative">
        <div className="relative mx-auto w-[328px] h-[424px] rounded-[16px] overflow-hidden">
          <Image
            src={`${CDN_BASE_URL}website_images/clear_rituals/landingPage/skincare_routine_mobile.webp`}
            alt="Woman with perfect skin"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 top-[35%] flex flex-col items-center justify-center p-6">
            <div className="text-center text-white">
              <h2 className="text-[28px] font-[500] leading-tight mb-6 font-lato">
                No More Guessing—
                <br />
                Get a Skincare Routine
                <br />
                Made Just for You.
              </h2>

              <div className="mt-[32px] mx-auto flex justify-center">
                <AcneTakeTheSkinTest
                  variant="white"
                  text="TAKE THE SKIN TEST"
                  tm=" "
                  redirectTo="/skin-test"
                  deskSize="mobileBig"
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
