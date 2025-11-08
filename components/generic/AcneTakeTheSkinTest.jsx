"use client";
import React from "react";
import Cookies from "js-cookie";
import { trackMoEngageEvent } from "@/utils/moegage";
import _ from 'lodash';
import { logGtmEvent } from "./Gtm";
import { generateEventId } from "@/helpers/metaCapiHelper";

const AcneTakeTheSkinTest = ({
  variant,
  redirectTo,
  cookiesOne,
  cookiesTwo,
  hairTestId,
  text,
  tm,
  size,
  deskSize,
  loading = false,
}) => {
  const hairTestButtonColor = {
    white: "bg-[#fff] text-[#000] hover:bg-Primary/500 hover:text-white",
    black: "bg-[#171819]  text-[#fff] hover:bg-Primary/500 hover:text-[#fff]",
    green: "bg-[#3e3e3e] hover:bg-[#b7d340] text-[#fff] hover:text-[#fff]",
    dark: "bg-[#3e3e3e] hover:bg-[#272728] text-[#fff]",
    blue: "bg-Primary/500 text-[#fff]",
    disabled: "bg-Tertiary/200 text-[#fff] cursor-not-allowed",
    mobileSmall: "w-[224px] h-[56px] text-[14px]",
    mobileBig: "w-full h-[56px] text-[14px] px-[40px]",
    mobileMedium: "w-[236px] h-[56px] text-[14px] px-[40px]",
    mobileLarge: "w-[314px] h-[56px] text-[14px] px-[40px]",
    desktopBig: "h-[56px] w-[246px] text-[14px]",
    desktopSmall: "h-[56px] w-[246px] text-[14px]",
    desktopLarge: "2xl:w-[490px] md:w-[300px] h-[56px] text-[14px] px-[40px]",

  };

  const handleClick = () => {
    Cookies.set(`${cookiesOne}`, `${cookiesTwo}`);
    trackMoEngageEvent(`Button_${text ?? "Take-The-Skin-Test"}_Clicked`, {
      cta_text: text ?? "Take-The-Skin-Test",
      page_name: window.location.pathname,
      timestamp: new Date().toISOString()
    });
    const phone = window.localStorage.getItem("user_phone");
    logGtmEvent(`${_.kebabCase(text)}-CTA`, { location: window.location.pathname, event_id: generateEventId({ eventName: `${_.kebabCase(text)}-CTA`, phone: phone}) });
  };

  return (
    <div>
      <div className="block xl:hidden lg:hidden md:hidden">
        <a
          href={redirectTo}
          onClick={handleClick}
          className={`flex ${hairTestButtonColor[variant]}  ${hairTestButtonColor[size]}  ${hairTestButtonColor[deskSize]} font-[400] mt-4 items-center justify-center font-sophiaPro rounded-[1000px] uppercase  shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
           ${variant === "disabled" ? "cursor-not-allowed" : "cursor-pointer"} leading-[24px] tracking-[0.5px] py-[16px] `}
          id={hairTestId}

        >
          {text ? text : "Take The Hair Test"}{" "}
          <sup
            style={{
              fontSize: 4,
              position: "relative",
              top: 3,
              left: 3,
            }}
          >
            {tm ? tm : "TM"}
          </sup>
        </a>
      </div>
      <div className="hidden xl:flex lg:flex md:flex justify-start ">
        <a
          href={redirectTo}
          onClick={handleClick}
          className={`flex ${hairTestButtonColor[variant]} justify-center items-center ${hairTestButtonColor[deskSize]}  font-sophiaPro font-[400] rounded-[1000px] uppercase shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-[14px] ${hairTestButtonColor[size]}
          ${variant === "disabled" ? "cursor-not-allowed" : "cursor-pointer"} leading-[24px] tracking-[0.5px] py-[16px]`}
          id={hairTestId}
        >
          {text ? text : "Take The Skin Test"}{" "}
          <sup
            style={{
              fontSize: 9,
              position: "relative",
              top: 5,
              left: 5,
            }}
          >
            {tm ? tm : "TM"}
          </sup>
        </a>
      </div>
    </div>
  );
};

export default AcneTakeTheSkinTest;
