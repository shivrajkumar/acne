"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  InstagramIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@assets/svg/Social_Icons";
import Image from "next/image";
import PhoneIcon from "@assets/icons/phone_icon.png";
import MailIcon from "@assets/icons/mail_Icon.png";
import { trackMoEngageEvent } from "@/utils/moegage";
import _ from 'lodash';
import { logGtmEvent } from "./Gtm";
import AppStore from "@assets/images/app_store.webp";
import PlayStore from "@assets/images/google_play.webp";
import MobileFooter from "./Header/MobileFooter";
import ClearRitualLogo from "@assets/images/Clear_Ritual_Logo_Whte.png";
import { usePathname } from "next/navigation";
import { generateEventId } from "@/helpers/metaCapiHelper";



const AcneFooter = () => {
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname()

  // Safely get the current path when component mounts
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const PageClickEvent = (name, url) => {
    trackMoEngageEvent(`PageClicked_${name}`, {
      from_page: currentPath,
      to_page: url,
      time: new Date().toISOString()
    });
    const eventName = `footer-link-${_.kebabCase(name)}-clicked`;
    const phone = window.localStorage.getItem("user_phone");
    logGtmEvent(eventName, { location: currentPath, event_id: generateEventId({
      eventName: eventName, phone: phone,
    }) 
  });
  };

  const socialIconsClickEvent = (name, link) => {
    const phone = window.localStorage.getItem("user_phone");
    logGtmEvent(`footer-social-link-${_.kebabCase(name)}-clicked`, { location: currentPath, event_id: generateEventId({ eventName: `footer-social-link-${_.kebabCase(name)}-clicked`, phone: phone})});
    logGtmEvent(`outbound-link-${_.kebabCase(name)}-clicked`, { location: currentPath, link, event_id: generateEventId({ eventName: `outbound-link-${_.kebabCase(name)}-clicked`, phone: phone}) });
  };

  const contactIconsClickEvent = (name) => {
    const eventName = `footer-contact-link-${_.kebabCase(name)}-clicked`;
    const phone = window.localStorage.getItem("user_phone");
    logGtmEvent(eventName, { location: currentPath, event_id: generateEventId({ eventName: eventName, phone: phone}) });
  };

  return (
    <div className="bg-Grey/900 text-white ">
      {/* Main Footer Content */}
      <div className="px-[16px] pt-[32px] pb-[8px] md:px-[80px] md:pt-[80px] md:pb-[32px]">
        <div className="flex md:hidden px-[16px] md:px-[80px] pb-[60px]">
          <div className="text-center">
            <Image src={ClearRitualLogo} alt="Clear Ritual" height={72} width={430} />
            <p className="text-left text-[14px] font-sophiaPro font-[400] leading-[1.4] mt-[16px]">Targeted Acne Care, Visible Results.</p>
          </div>
        </div>
        <div className="md:hidden">
          <MobileFooter
            currentPath={currentPath}
            PageClickEvent={PageClickEvent}
            socialIconsClickEvent={socialIconsClickEvent}
            contactIconsClickEvent={contactIconsClickEvent}
          />
        </div>
        <div className="hidden md:block">
          <div className="flex justify-between">

            <div className="mr-[32px]">
              <div className="bg-white rounded-[24px] px-[40px] py-[24px] text-center text-black w-[328px] md:w-[397px] gap-[12px]">
                <p className="md:text-[16px] font-medium mb-2 text-gray-600">Customised Care. Clinical Results.</p>
                <h3 className="text-[24px] md:text-[40px] font-[400] mb-1 leading-tight">
                  Coming Soon.
                </h3>
                <h3 className="text-[24px] md:text-[40px] font-[400] mb-6 leading-tight">
                  Clear Ritual App.
                </h3>
                <p className="text-[16px] mb-8 text-black">For iOS and Android</p>
                <div className="flex flex-col sm:flex-row justify-center gap-[8px]">
                  <button className="  flex items-center justify-center ">
                    <Image src={AppStore} alt="App Store Download App" width={120} height={38} />
                  </button>
                  <button className=" flex items-center justify-center ">
                    <Image src={PlayStore} alt="App Store Download App" width={120} height={38} />

                  </button>
                </div>
              </div>
              <div className=" hidden md:flex ">
                <div className="text-center">
                  <Image
                    src={ClearRitualLogo}
                    alt="Clear Ritual Logo"
                    width={402}
                    height={57}
                    className=" h-[57px] mt-[48px]"
                  />
                </div>
              </div>
            </div>

            {/* Products Column */}
            <div className="">
              <h4 className="font-[700] font-sophiaPro text-[14px] leading-[1.4] md:text-[18px] mb-6 text-white">Products</h4>
              <ul className="space-y-4">
                <li className="flex gap-[4px]">
                  <Link
                    href="/"
                    onClick={() => PageClickEvent("Shop", "/")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Shop
                  </Link>
                  <div className="py-[2px] h-fit px-[4px] text-Grey/900 font-sophiaPro text-[12px] font-[400] leading-[1.4] bg-Warning/500">
                    Coming Soon
                  </div>
                </li>
              </ul>

            </div>

            {/* Navigate Column */}
            <div className="">
              <h4 className="font-[700] font-sophiaPro text-[14px] leading-[1.4] md:text-[18px] mb-6 text-white">Navigate</h4>
              <ul className="space-y-4">
                {!pathname?.includes("recommendedcart") && <li>
                  <Link
                    href="/skin-test"
                    onClick={() => PageClickEvent("SkinTest", "/skin-test")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Take the Skin Test
                  </Link>
                </li>}
                <li>
                  <Link
                    href="/about-us"
                    onClick={() => PageClickEvent("AboutUs", "/about-us")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experts"
                    onClick={() => PageClickEvent("Experts", "/experts")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Our Experts
                  </Link>
                </li>
                <li className="flex gap-[4px] items-center">
                  <Link
                    href="/blog"
                    onClick={() => PageClickEvent("Blogs", "/blog")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Ritual Blogs
                  </Link>
                  {/* <div className="py-[2px] px-[4px] h-fit text-Grey/900 font-sophiaPro text-[12px] font-[400] leading-[1.4] bg-Warning/500">
                    Coming Soon
                  </div> */}
                </li>
                <li className="flex gap-[4px] items-center">
                  <Link
                    href="/"
                    onClick={() => PageClickEvent("Ingredients", "/")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Know Your Ingredients
                  </Link>
                  <div className="py-[2px] px-[4px] h-fit text-Grey/900 font-sophiaPro text-[12px] font-[400] leading-[1.4] bg-Warning/500">
                    Coming Soon
                  </div>
                </li>
                <li>
                  <Link
                    href="/reviews"
                    onClick={() => PageClickEvent("Reviews", "/reviews")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Results
                  </Link>
                </li>
                <li className="flex gap-[4px]">
                  <Link
                    href="/editorial-standards"
                    onClick={() => PageClickEvent("EditorialStandards", "/editorial-standards")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Editorial Standards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div className="">
              <h4 className="font-[700] font-sophiaPro text-[14px] leading-[1.4] md:text-[18px] mb-6 text-white">Connect</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/faq"
                    onClick={() => PageClickEvent("FAQ", "/faq")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    FAQs
                  </Link>
                </li>
                  <li className="flex gap-[4px] items-center">
                <Link href='/contact-us'>
                    <div className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                    >Get in Touch</div>
                    {/* <div className="py-[2px] px-[4px] h-fit text-Grey/900 font-sophiaPro text-[12px] font-[400] leading-[1.4] bg-Warning/500">
                      Coming Soon
                      </div> */}
                </Link>
                  </li>
                <li>
                  <a
                    href="tel:+918424004697"
                    className="text-Grey/50 text-[12px] md:text-[16px] font-sophiaPro  leading-[140%] flex gap-[5px]"
                    onClick={() => contactIconsClickEvent("Phone")}
                  >
                    <span><Image src={PhoneIcon} alt="Phone Icon" width={24} height={24} /></span>
                    +91 8424004697
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:customercare@clearritual.com"
                    className="text-Grey/50  font-sophiaPro text-[16px] leading-[140%] flex gap-[5px]"
                    onClick={() => contactIconsClickEvent("Email")}
                  >
                    <span><Image src={MailIcon} alt="Mail Icon" width={24} height={24} />
                    </span>
                    customercare@clearritual.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="">
              <h4 className="font-[700] font-sophiaPro text-[14px] leading-[1.4] md:text-[18px] mb-6 text-white">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/privacy-policy"
                    onClick={() => PageClickEvent("PrivacyPolicy", "/privacy-policy")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-conditions"
                    onClick={() => PageClickEvent("TermsConditions", "/terms-conditions")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/return-policy"
                    onClick={() => PageClickEvent("ReturnPolicy", "/return-policy")}
                    className="text-Grey/50 text-[12px] md:text-[16px] font-[400]"
                  >
                    Return Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Icons Column */}
            <div className=" mt-3">
              <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-6 md:items-end">
                <Link
                  href="https://www.instagram.com/clear.ritual/"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors text-2xl"
                  onClick={() => socialIconsClickEvent("Instagram", "https://www.instagram.com/clear.ritual/")}
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href="https://wa.me/918424004697"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors text-2xl"
                  onClick={() => socialIconsClickEvent("Whatsapp", "https://wa.me/918424004697")}
                >
                  <WhatsAppIcon />
                </Link>
                <Link
                  href="https://x.com/ClearRitual"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors text-2xl"
                  onClick={() => socialIconsClickEvent("X", "https://x.com/ClearRitual")}
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>
          </div>

        </div>



        {/* Copyright Section */}
        <div className=" md:mt-[0px] py-[24px]  md:px-[80px] ">
          <div className="text-left md:text-center">
            <p className="text-gray-50 text-[12px]">
              © 2025 Clear Ritual. All rights reserved.
            </p>
          </div>
        </div>
      </div >
    </div >
  );
};

export default AcneFooter;