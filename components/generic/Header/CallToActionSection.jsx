"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BuildYourRitual from "@assets/images/NavbarCTA.webp";
import ArrowRight from "@assets/icons/ArrowRight.webp";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CallToActionSection = ({}) => {
  const [orderCount, setOrderCount] = useState(null);
  const [syntheticId, setSyntheticId] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const pathName = usePathname()

  useEffect(() => {
    if (typeof window !== undefined) {

      const orderCountFromStorage = window.localStorage.getItem("order_count");
      const syntheticId = window.localStorage.getItem('syntheticId');
      const caseId = window.localStorage.getItem('caseId');

      if (syntheticId) {
        setSyntheticId(syntheticId);
      }
      if (caseId) {
        setCaseId(caseId);
      }
      if (orderCountFromStorage) {
        setOrderCount(orderCountFromStorage);
      }
    }

  }, [])

  return (
    <div
      className="w-[370px]  py-[24px] px-[16px] text-white relative"
      style={{
        backgroundImage: `url(${BuildYourRitual.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 mt-[30px]">
        <h4 className="font-sophiaPro text-[18px] font-[400] mb-[10px] text-[#2E2930] tracking-[0.5px]">
          Build your Ritual <br />
          now.
        </h4>
        {!pathName.includes("recommendedcart") && !orderCount ? (
          <Link href="/skin-test">
            <button className="bg-Primary/500 text-white px-6 py-2 rounded-full text-[14px] font-[500] hover:bg-[#171819] transition-colors flex items-center space-x-2">
              <span>
                {syntheticId ? "Retake skin test" : "TAKE THE SKIN TEST"}
              </span>
              <Image
                src={ArrowRight}
                alt="Arrow"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </button>
          </Link>
        ) : (
          <Link href={`/book-a-call?caseId=${caseId}&redirect=home`}>
            <button className="bg-Primary/500 text-white px-6 py-2 rounded-full text-[14px] font-[500] hover:bg-[#171819] transition-colors flex items-center space-x-2">
              <span>Book Your Call Now</span>
              <Image
                src={ArrowRight}
                alt="Arrow"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CallToActionSection;
