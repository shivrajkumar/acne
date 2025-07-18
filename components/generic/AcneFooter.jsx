"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  InstagramIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@assets/svg/Social_Icons";
import Image from "next/image";
import ClearRitualLogo from "@assets/images/Clear_Ritual_Logo_Whte.png";
import PhoneIcon from "@assets/icons/phone_icon.png";
import MailIcon from "@assets/icons/mail_Icon.png";
import { trackMoEngageEvent } from "@/utils/moegage";
import _ from 'lodash';
import { logGtmEvent } from "./Gtm";

const AcneFooter = () => {
  const [currentPath, setCurrentPath] = useState("");

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
    logGtmEvent(`footer-link-${_.kebabCase(name)}-clicked`, { location: currentPath });
  };

  const socialIconsClickEvent = (name, link) => {
    logGtmEvent(`footer-social-link-${_.kebabCase(name)}-clicked`, { location: currentPath });
    logGtmEvent(`outbound-link-${_.kebabCase(name)}-clicked`, { location: currentPath, link });
  };

  const contactIconsClickEvent = (name) => {
    logGtmEvent(`footer-contact-link-${_.kebabCase(name)}-clicked`, { location: currentPath });
  };

  return (
    <div className="bg-Neutral/900">
      {/* Desktop Footer */}
      <div id="site-footer" className="px-[16px] pt-[32px] pb-[8px] md:px-[80px] md:pt-[80px] md:pb-[80px]">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-[28px]">
              <Link href="/" onClick={() => PageClickEvent("Home", "/")}>
                <Image src={ClearRitualLogo} alt="Clear Ritual" height={72} width={430} />
              </Link>
              <p className="font-sophiaPro font-[400] text-[14px] leading-[1.4%] text-neutral-50">Targeted Acne Care, Visible Results.</p>
            </div>

            <div className="block md:flex gap-8 justify-between">
              <div className="flex flex-col gap-[12px]">
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/skin-test"
                      onClick={() => PageClickEvent("SkinTest", "/skin-test")}
                      className="text-neutral-50 font-sophiaPro text-[14px] leading-[140%]"
                    >
                      Take Our Skin Test
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us"
                      onClick={() => PageClickEvent("AboutUs", "/about-us")}
                      className="text-neutral-50 font-sophiaPro text-[14px] leading-[140%]"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/experts"
                      onClick={() => PageClickEvent("Experts", "/experts")}
                      className="text-neutral-50 font-sophiaPro text-[14px] leading-[140%]"
                    >
                      Our Experts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reviews"
                      onClick={() => PageClickEvent("Reviews", "/reviews")}
                      className="text-neutral-50 font-sophiaPro text-[14px] leading-[140%]"
                    >
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      onClick={() => PageClickEvent("PrivacyPolicy", "/privacy-policy")}
                      className="text-neutral-50 font-sophiaPro text-[14px] leading-[140%]"
                    >
                      Privacy & Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-conditions"
                      onClick={() => PageClickEvent("TermsConditions", "/terms-conditions")}
                      className="text-neutral-50 font-sophiaPro text-[14px] leading-[140%]"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/return-policy"
                      onClick={() => PageClickEvent("ReturnPolicy", "/return-policy")}
                      className="text-neutral-50 font-sophiaPro text-[14px] leading-[140%]"
                    >
                      Return Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      onClick={() => PageClickEvent("FAQ", "/faq")}
                      className="text-neutral-50 font-lato text-[14px] leading-[140%]"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      onClick={() => PageClickEvent("Blogs", "/blog")}
                      className="text-neutral-50 font-lato text-[14px] leading-[140%]"
                    >
                      Blogs
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col mt-[16px] md:mt-0 gap-[12px]">
                <a
                  href="tel:+918424004697"
                  className="text-neutral-50 font-sophiaPro text-[14px] leading-[140%] flex gap-[8px]"
                  onClick={() => contactIconsClickEvent("Phone")}
                >
                  <span><Image src={PhoneIcon} alt="Phone Icon" width={24} height={24} /></span>
                  +91 8424004697
                </a>
                <a
                  href="mailto:customercare@clearritual.com"
                  className="text-neutral-50 font-sophiaPro text-[14px] leading-[140%] flex gap-[8px] items-center"
                  onClick={() => contactIconsClickEvent("Email")}
                >
                  <span>
                    <Image src={MailIcon} alt="Mail Icon" width={24} height={24} />
                  </span>
                  customercare@clearritual.com
                </a>
              </div>
              <div className="flex my-[32px] md:my-0 md:flex-col items-center gap-[12px]">
                <Link
                  href="https://www.instagram.com/clear.ritual/"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 mb-0 md:mb-[12px]"
                  onClick={() => socialIconsClickEvent("Instagram", "https://www.instagram.com/clear.ritual/")}
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href="https://wa.me/918424004697"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 mb-0 md:mb-[12px]"
                  onClick={() => socialIconsClickEvent("Whatsapp", "https://wa.me/918424004697")}
                >
                  <WhatsAppIcon />
                </Link>
                <Link
                  href="https://x.com/ClearRitual"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 mb-0 md:mb-[12px]"
                  onClick={() => socialIconsClickEvent("X", "https://x.com/ClearRitual")}
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section - both desktop and mobile */}
      <div className="ms-[16px] md:ms-[80px] text-[14px] pb-[16px] md:py-[24px] font-sophiaPro font-[400] text-neutral-50 text-left leading-[1.4%]">
        © 2025 Clear Ritual. All rights reserved.
      </div>
    </div>
  );
};

export default AcneFooter;