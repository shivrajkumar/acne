import Image from "next/image";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import { CDN_BASE_URL } from "@/constants/constants";

const SkincareMakeSense = ({ expertsPage = false, heading = "", subText }) => {
  const defaultHeading = "Skincare That Finally Makes Sense";
  const defaultSubText = `No more second-guessing or wasting money on products that don’t work. With Clear Ritual, you get personalised recommendations that suit your acne type, lifestyle, and skin goals—so you can feel confident in your skin every single day.`;

  return (
    <div className=" pb-11">
      <section className={`relative w-full  md:h-[560px] ${expertsPage ? "h-[695px]" : "h-[620px]"} flex items-center `}>
        {/* Desktop Background */}
        <div className="absolute inset-0 hidden md:block z-0 ">
          <Image
            src={` ${expertsPage
              ? `${CDN_BASE_URL}website_images/clear_rituals/experts_page/skin_make_expert_desktop.webp`
              : `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/skin_make_about_desktop.webp`
              }`}
            alt="Skincare"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        {/* Mobile Background */}
        <div className="absolute inset-0 block md:hidden z-0">
          <Image
            src={` ${expertsPage
              ? `${CDN_BASE_URL}website_images/clear_rituals/experts_page/skin_make_expert_mobile.webp`
              : `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/skin_make_about_mobile.webp`
              }`}
            alt="Skincare"
            fill
            style={{ objectFit: "cover", objectPosition: `${expertsPage ? "center 700%" : "70% center"}` }}
          />
        </div>

        {/* Content */}
        <div className={`relative z-10 max-w-7xl w-full px-6  md:px-20 ${expertsPage ? "pt-[26rem]" : "pt-[2rem]"}  pb-[4rem] md:pt-16 md:pb-0 `}>
          <div className="text-black max-w-[600px] flex flex-col gap-[10px] md:gap-[con32px]">
            <h1 className="text-[40px] md:text-[44px] md:w-[399px]  w-[312px] text-wrap font-[500] leading-[120%] tracking-[0.02em] font-sophiaPro">
              {heading ? heading : defaultHeading}
            </h1>
            <p className="text-[14px] md:text-[16px] leading-[1.5] tracking-[-0.01em] font-sophiaPro md:w-[420px] text-wrap">
              {subText ? subText : defaultSubText}
            </p>

            <div className="hidden md:flex ">
              <AcneTakeTheSkinTest
                variant="black"
                text="TAKE THE SKIN DIAGNOSIS"
                tm=" "
                redirectTo="/skin-test"
                deskSize="desktopSmall"
              />
            </div>
            <div className={`flex justify-center items-center md:hidden ${expertsPage ? "mt-0" : "mt-6"} `}>
              <AcneTakeTheSkinTest
                variant="black"
                text="TAKE THE SKIN DIAGNOSIS"
                tm=" "
                redirectTo="/skin-test"
                deskSize="mobileBig"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkincareMakeSense;
