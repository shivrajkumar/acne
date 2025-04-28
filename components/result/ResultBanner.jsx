"use client";
import RightArrow from "@assets/icons/arrow-right.svg";
import Image from "next/image";
import AssignedDoctor from "./AssignDoctor";
import RootCauses from "./RootCauses"
import { startCase } from "lodash";
import { useCartContext } from "../../context/CartContext";

const ResultBanner = () => {
  const { customerDetails, skinType, acneGrading } = useCartContext()

  return (
    <div className="w-full  bg-Secondary/50 border border-[#AFA792]  p-[40px] xs:p-[24px] sm:p-[24px]md:p-[40px] rounded-[24px] mt-[16px] sm:mt-[16px] md:mt-[32px] flex flex-col md:flex-row justify-between ">
      <div className="w-full  sm:w-full flex flex-col gap-[16px] md:gap-[40px] ">
        <h1 className="text-[28px] md:text-[44px] font-lato font-[500] text-Text/Heading-Text leading-[1.3] -tracking-[2%]">
          Thank you {startCase(customerDetails?.firstName)}!
          <br /> Your Personalised Skin<br />Analysis is Ready.
        </h1>
        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px]">
            <Image
              src={RightArrow}
              width={24}
              height={24}
              alt="Right Arrow Icon"
            />
            <p className="text-Text/Body-Text text-[14px] md:text-[16px] sm:text-[14px] font-[400] leading-[1.5] -tracking-[1%]">
              Skin Type:
            </p>
            <p className="text-Text/Body-Text text-[14px] md:text-[16px] sm:text-[14px] font-[600] leading-[1.5] -tracking-[1%]">
              {startCase(skinType)}
            </p>
          </div>
          <div className="flex gap-[8px]">
            <Image
              src={RightArrow}
              width={24}
              height={24}
              alt="Right Arrow Icon"
            />
            <p className="text-Text/Body-Text text-[14px] md:text-[16px] sm:text-[14px] font-[400] leading-[1.5] -tracking-[1%]">
              Acne Grading:
            </p>
            <p className="text-Text/Body-Text text-[14px] md:text-[16px] sm:text-[14px] font-[600] leading-[1.5] -tracking-[1%]">
              {startCase(acneGrading)}
            </p>
          </div>
          <div className="mt-[16px] md:mt-[32px]">
            <AssignedDoctor showAssignedDoctorLabel={true} isSmall={true} /></div>

        </div>
      </div>
      <div className="mt-[32px] md:mt-0">
        <RootCauses />
      </div>

    </div>
  );
};

export default ResultBanner;
