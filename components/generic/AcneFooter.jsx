"use client";

import Link from "next/link";
import React from "react";
import {
  InstagramIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@assets/svg/Social_Icons";
import Image from "next/image";
import ClearRitualLogo from "@assets/images/Clear_Ritual_Logo_Whte.png";
import PhoneIcon from "@assets/icons/phone_icon.png"
import MailIcon from "@assets/icons/mail_Icon.png"


// Import social media icons

const AcneFooter = () => {

  return (
    <div className="bg-Neutral/900">
      {/* Desktop Footer */}
      <div className="px-[16px] pt-[32px] pb-[8px] md:px-[80px] md:pt-[80px] md:pb-[80px]">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-[28px]">
              <Link href="/">
                <Image src={ClearRitualLogo} alt="Clear Ritual" height={72} width={430} />
              </Link>
              <p className="font-lato font-[400] text-[14px] leading-[1.4%] text-neutral-50">Targeted Acne Care, Visible Results.</p>

            </div>


            <div className="block md:flex  gap-8 justify-between">
              <div className="flex flex-col gap-[12px]">

                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/skin-test"
                      className="text-neutral-50 font-lato text-[14px] leading-[140%]"
                    >
                      Take Our Skin Test
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us"
                      className="text-neutral-50 font-lato text-[14px] leading-[140%]"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/experts"
                      className="text-neutral-50 font-lato text-[14px] leading-[140%]"
                    >
                      Our Experts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reviews"
                      className="text-neutral-50 font-lato text-[14px] leading-[140%]"
                    >
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-neutral-50 font-lato text-[14px] leading-[140%]"
                    >
                      Privacy & Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-conditions"
                      className="text-neutral-50 font-lato text-[14px] leading-[140%]"
                    >
                      Terms of Use
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col mt-[16px] md:mt-0 gap-[12px]">
                <a
                  href="tel:+911000234235"
                  className="text-neutral-50 font-lato text-[14px] leading-[140%] flex gap-[8px]"
                >
                  <span><Image src={PhoneIcon} alt="Phone Icon" width={24} height={24} /></span>
                  +91 9167611114
                </a>
                <a href="mailto:customersupport@clearritual.com"
                  className="text-neutral-50 font-lato text-[14px] leading-[140%] flex gap-[8px] items-center"
                >
                  <span>
                    <Image src={MailIcon} alt="Mail Icon" width={24} height={24} />
                  </span>
                  customersupport@clearritual.com
                </a>
              </div>
              <div className="flex my-[32px] md:my-0 md:flex-col items-center gap-[12px]">
                <Link
                  href="https://www.instagram.com/clear.ritual/"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 mb-0 md:mb-[12px]"
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href="https://wa.me/919167611114"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 mb-0 md:mb-[12px]"
                >
                  <WhatsAppIcon />
                </Link>
                <Link
                  href="https://x.com/ClearRitual"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 mb-0 md:mb-[12px]"
                >
                  <TwitterIcon />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div >



      {/* Copyright Section - both desktop and mobile */}
      <div className="ms-[16px] md:ms-[80px] text-[14px] pb-[16px]  md:py-[24px] font-lato font-[400] text-neutral-50 text-left leading-[1.4%]">
        © 2025 Clear Ritual. All rights reserved.
      </div>
    </div >
  );
};

export default AcneFooter;
