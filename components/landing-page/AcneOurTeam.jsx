"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
// import { CDN_BASE_URL } from "@/constants/config";
import FemaleGeneralPractitioner from "@assets/images/female-general-practitioner.webp"

export default function AcneOurTeam() {
  const [caseId, setCaseId] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("acne_result_data");
    const idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;
    setCaseId(idFromLocalStorage)
  }, [])


  return (
    <section className="bg-Background/Beige p-[28px] md:p-[40px]  rounded-[24px]">
      <div className="flex flex-col">
        {/* Header */}
        <div className="w-fit bg-white rounded-[12px] py-2 px-4 text-sm mb-3 font-sophiaPro ">
          Our Team
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px]">
          <h2 className="text-[28px] md:text-[40px]  font-[400] mb-[16px]  md:mb-[40px] font-sophiaPro">
            The Experts Behind Clear Ritual.
          </h2>

          <div className="hidden md:block xs:hidden mb-[16px]  md:mb-[40px]">
            <AcneTakeTheSkinTest
              variant="black"
              text="Book your call now"
              tm=" "
              redirectTo={`/book-a-call?caseId=${caseId}&redirect=home`}
              deskSize="desktopBig"
            />{" "}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-[24px] md:flex-row md:gap-[40px]  rounded-2xl">
          {/* Doctor Image - Full width on mobile, half width on desktop */}
          <div className="md:w-[45%]">
            <Image
              src={FemaleGeneralPractitioner}
              alt="Doctor"
              width={730}
              height={442}
              className=" h-[442px] w-[730px]  rounded-[16px] hidden md:block border-1"
            />
            <Image
              src={FemaleGeneralPractitioner}
              alt="Doctor"
              width={296}
              height={296}
              className="w-full h-full object-cover rounded-[16px] block md:hidden"
            />
          </div>

          {/* Quote Section - Full width on mobile, half width on desktop */}
          <div className=" bg-[#FFFFFF] w-full md:w-1/2 p-[24px] md:p-[40px] flex flex-col justify-center gap-[16px] rounded-[16px] flex-wrap">
            <div className=" text-[40px] xs:text-[24px] text-left md:text-left xs:text-center  ">
              <blockquote className="text-[20px] leading-[130%] md:text-[32px] font-[400] font-sophiaPro ">
                {`"At Clear Ritual, we go beyond surface-level solutions by combining advanced dermatology with Ayurvedic wisdom to target the root causes of acne — because clear skin begins with knowing your skin deeply."`}
              </blockquote>
              <p className="font-sophiaPro font-[400] text-[16px] md:text-[18px] mt-[16px] ">
                Dr. Anushka Agrawal, PHD
              </p>
            </div>
          </div>
        </div>

        {/* Mobile only button */}
        <div className="mt-6 md:hidden text-center mx-auto xs:mt-0">
          <AcneTakeTheSkinTest
            variant="black"
            text="Book your call now"
            tm=" "
            redirectTo={`/book-a-call?caseId=${caseId}&redirect=home`}
            deskSize="mobileBig"
          />{" "}
        </div>
      </div>
    </section>
  );
}
