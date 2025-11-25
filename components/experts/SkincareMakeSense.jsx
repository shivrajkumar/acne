import { CDN_BASE_URL } from "../../constants/config";
import Image from "next/image";

const SkincareMakeSense = ({ reviewPage = false, heading, subText }) => {
  const defaultHeading = " Skincare That Finally Makes Sense";
  const defaultText =
    "No more confusion, no more wasted products. Get recommendations that truly fit your skin, lifestyle, and needs—so you can focus on feeling good in your skin, every day.";
  return (
    <section className="relative w-full h-auto md:h-[65vh] flex items-center bg-gray-100">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={
            reviewPage
              ? `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/skin_make_expert_desktop.webp`
              : `${CDN_BASE_URL}website_images/clear_rituals/about_us_page/skin_make_expert_desktop.webp`
          }
          alt="Skincare"
          fill
          className={`${reviewPage ? "object-cover md:h-[65vh] h-[30vh] " : "object-cover"
            }`}
          objectPosition="center"
          style={{
            transform: "scale(1)",
            transformOrigin: "center",
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl  py-6 px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-black">
          <h1
            className={`md:text-[44px] text-[40px] font-[600] leading-[1.2] tracking-[0.02em] ${reviewPage ? "md:text-white" : "md:text-Text/Heading-Text"
              }  text-white font-sophiaPro`}
          >
            {heading ? heading : defaultHeading}
          </h1>
          <p
            className={`mt-4 md:text-[16px] text-[14px] ${reviewPage
                ? "md:text-white md:w-[250px]"
                : "md:text-Text/Body-Text"
              } font-sophiaPro text-white leading-[1.5] tracking-[-0.01]`}
          >
            {subText ? subText : defaultText}
          </p>
          <button
            className={` px-14 py-4    ${reviewPage
              ? "bg-white  text-black mt-12 "
              : "md:bg-black bg-white md:text-white text-black mt-6 "
              } text-[14px] uppercase font-[600] leading-[24px] rounded-full`}
          >
            TAKE THE SKIN DIAGNOSIS
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkincareMakeSense;
