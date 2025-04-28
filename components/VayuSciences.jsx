import { CDN_BASE_URL } from "@/constants/config";
import Image from "next/image";
import React from "react";

const creameOne = `${CDN_BASE_URL}website_images/vayu_images/cream_2.webp`;
const creameDesktop = `${CDN_BASE_URL}website_images/vayu_images/desktop_cream12.webp`;
const vayuMockupDesktop = `${CDN_BASE_URL}website_images/vayu_images/vayu_mockup_33.webp`;


const VayuSciences = () => {
  return (
    <>
      <div className="px-4 mb-6 mt-14 relative block xl:hidden lg:hidden md:hidden ">
        <Image
          height={457}
          width={300}
          loading="lazy"
          src={creameOne}
          className="absolute -z-50 top-[-10rem] right-0"
          alt="creame"
        />
        <h2 className="xs:text-[36px] pb-4 font-jakara text-[#212121] font-[700]">
          3 Sciences
        </h2>
        <h2 className="xs:text-[24px] pb-4 font-jakara text-[#212121] font-[600]">
          Vayuskin’s Holistic Cure
          <br /> For Skin Problems
        </h2>
        <p className="xs:text-[18px] pb-4 font-jakara text-[#414042] font-[400]">
          Our approach combines the
          <br /> goodness of three sciences.
        </p>
        <div className="flex items-center xs:text-[16px] font-jakara text-[#A98F7A] font-[700]">
          <p>Ayurveda</p>
          <span className="px-3">+</span>
          <p>Dermatology</p>
          <span className="px-3">+</span>
          <p>Nutrition</p>
        </div>
      </div>
      <div className="px-4 mb-6 mt-14 relative hidden xl:block lg:block md:block py-24">
        <Image
          height={606}
          width={512}
          loading="lazy"
          src={creameDesktop}
          className="absolute -z-50 top-[-17rem] right-0"
          alt="creame"
        />
        <Image
          height={606}
          width={512}
          loading="lazy"
          src={vayuMockupDesktop}
          className="absolute -z-50 top-[-5rem] left-0"
          alt="creame"
        />
        <h2 className="xs:text-[36px] xl:text-center pb-4 font-jakara text-[#212121] font-[700]">
          3 Sciences
        </h2>
        <h2 className="xs:text-[24px] xl:text-center pb-4 font-jakara text-[#212121] font-[600]">
          Vayuskin’s Holistic Cure
          <br /> For Skin Problems
        </h2>
        <p className="xs:text-[18px] xl:text-center pb-4 font-jakara text-[#414042] font-[400]">
          Our approach combines the goodness of
          <br />
          three sciences.
        </p>
        <div className="flex items-center justify-center xs:text-[16px] font-jakara text-[#A98F7A] font-[700]">
          <p>Ayurveda</p>
          <span className="px-3">+</span>
          <p>Dermatology</p>
          <span className="px-3">+</span>
          <p>Nutrition</p>
        </div>
      </div>
    </>
  );
};

export default VayuSciences;
