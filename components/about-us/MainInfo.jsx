"use client";
import Image from "next/image";
import CheckCircle from "@assets/images/Tick.png";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";

const MainInfo = ({
  heading,
  description,
  features,
  buttonText,
  imageSrc,
  imageAlt,
  contentBg = "",
  imagePosition = "right",
  descriptionClassName = "",
}) => {
  const isImageLeft = imagePosition === "left";

  return (
    <section
      className={`w-full flex flex-col h-auto md:h-[720px] ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
        } justify-between`}
    >
      <div className="w-full md:w-1/2 relative">
        <Image
          src={imageSrc}
          alt={imageAlt || "info image"}
          width={600}
          height={600}
          className="object-cover w-full h-full"
          loading="eager"
        />
      </div>

      <div
        className={`w-full md:w-1/2 p-4 md:p-10 ${contentBg} flex items-center justify-center`}
      >
        <div>
          {heading && (
            <h2 className="font-lato text-[28px] md:text-[40px] font-[500] leading-[130%]">
              {heading}
            </h2>
          )}
          {description && (
            <p
              className={`font-lato text-[#171819] font-[400] leading-[150%] md:text-[16px] pt-2 text-[16px] ${descriptionClassName}`}
            >
              {description}
            </p>
          )}

          {features?.length > 0 && (
            <ul className="space-y-3 mt-4">
              {features.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-800">
                  <Image src={CheckCircle} alt="tick icon" width={20} height={20} />
                  <span className="font-[400] font-lato text-[14px] md:text-[18px] leading-[135%] tracking-normal">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {buttonText && (
            <>
              <div className="flex md:hidden justify-center my-[28px] z-50">
                <AcneTakeTheSkinTest
                  variant="black"
                  text={buttonText}
                  tm={" "}
                  redirectTo="/skin-test"
                  deskSize="mobileBig"
                />
              </div>
              <div className="hidden md:flex mt-[32px] z-50 ">
                <AcneTakeTheSkinTest
                  variant="black"
                  text={buttonText || "TAKE THE SKIN TEST"}
                  tm={" "}
                  redirectTo="/skin-test"
                  deskSize="desktopBig"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainInfo;