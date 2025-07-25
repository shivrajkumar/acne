"use client";
import React from "react";
import Link from "next/link";
import BuildYourRitual from "@assets/images/NavbarCTA.webp"
import ArrowRight from "@assets/icons/ArrowRight.webp";
import Image from "next/image";


const CallToActionSection = () => {
    return (
        <div className="w-[370px]  py-[24px] px-[16px] text-white relative" style={{ backgroundImage: `url(${BuildYourRitual.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="relative z-10 mt-[30px]">
                <h4 className="font-sophiaPro text-[18px] font-[400] mb-[10px] text-[#2E2930] tracking-[0.5px]">
                    Build your Ritual <br />now.
                </h4>
                <Link href="/skin-test">
                    <button className="bg-Primary/500 text-white px-6 py-2 rounded-full text-[14px] font-[500] hover:bg-[#171819] transition-colors flex items-center space-x-2">
                        <span>TAKE THE SKIN TEST</span>
                        <Image
                            src={ArrowRight}
                            alt="Arrow"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CallToActionSection;
