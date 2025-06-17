import Image from "next/image";
import React from "react";
import AcneTakeTheSkinTest from "./generic/AcneTakeTheSkinTest";
import { CDN_BASE_URL } from "@/constants/constants";

const scintificBg = `${CDN_BASE_URL}website_images/vayu_images/scintific_bg_12.webp`;
const diagnoseBg = `${CDN_BASE_URL}website_images/vayu_images/diagnose_bg_12.webp`;
const creamOne = `${CDN_BASE_URL}website_images/vayu_images/cream_1.webp`;
const vayuMockup = `${CDN_BASE_URL}website_images/vayu_images/vayu_mockup_22.webp`;
const ScintificAndDiagnose = ({ safeAndScintific }) => {
  return (
    <div className="flex items-center xs:flex-col xl:flex-row gap-14 mb-32 xl:justify-center">
      <div className="relative xs:w-[90%] xs:h-[30rem] xl:w-[38rem] xl:h-[30rem]">
        <Image
          src={scintificBg}
          alt="safe & scintific"
          fill
          objectFit="cover"
          className="xl:rounded-lg xs:rounded-lg"
        />
        <h2 className="relative xs:text-[36px] xl:text-[60px] font-[700] font-jakara text-white xs:w-[15rem] xs:pt-5 xs:ps-5 xs:leading-10 xl:leading-[4rem]">
          Safe & <br /> Scientific
        </h2>
        <div className="relative xs:ps-5 xs:pt-6 xl:flex xl:flex-wrap xl:w-[20rem]">
          {safeAndScintific.map((value, index) => (
            <div key={index} className="flex gap-4 items-center xs:pt-6 xl:pt-10">
              <Image
                height={30}
                width={32}
                src={value.src}
                className={"xs:h-[36px] xs:w-[32px]"}
                alt={value.alt}
              />
              <p className="xs:w-[5rem] xs:text-[12px] font-[400] font-jakara text-white">
                {value.name}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 right-0">
          <Image
            height={150}
            width={260}
            src={creamOne}
            className={""}
            alt="cream"
          />
        </div>
      </div>
      <div className="relative xs:w-[90%] xs:h-[30rem] xl:w-[38rem] xl:h-[30rem]">
        <Image
          src={diagnoseBg}
          alt="safe & scintific"
          fill
          objectFit="cover"
          className="xl:rounded-lg xs:rounded-lg"
        />
        <h2 className="relative xs:text-[36px] font-[700] font-jakara text-white xs:w-[17rem] xs:pt-7 xs:ps-5 xs:leading-10">
          Diagnose your skin to get customised plan
        </h2>
        <p className="relative xs:text-[18px] font-[400] font-jakara text-white xs:w-[13rem] xs:pt-7 xs:ps-5">
          Take our skin test for personalised product recommendations that suit
          your unique needs
        </p>
        <div className="absolute bottom-0 right-0">
          <Image
            height={150}
            width={260}
            src={vayuMockup}
            className={""}
            alt="vayu mockup"
          />
        </div>
        <div className="relative xs:ps-5 xs:pt-3">
          <AcneTakeTheSkinTest
            redirectTo={'/skin-test'}
            variant={"white"}
            text={"TAKE THE SKIN TEST"}
            tm={" "}
            size={"mobileSmall"}
            deskSize={"desktopBig"}
          />
        </div>
      </div>
    </div>
  );
};

export default ScintificAndDiagnose;
