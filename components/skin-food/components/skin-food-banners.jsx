import { CDN_BASE_URL } from "@/constants/constants";
import Image from "next/image";

export default function SkinFoodBanners() {
  const banners = [
    {
      text: "Btw, SKIN FOOD works well.",
      backgroundImage: "acne/skin-food/banner-1.webp",
    },
    {
      text: "But works best in your personalised RITUAL.",
      backgroundImage: "acne/skin-food/banner-2.webp",
    },
  ];

  return (
    <section className="space-y-6 px-4 md:px-10 py-10">
      {banners.map((banner, index) => (
        <div
          key={index}
          className="relative w-full h-44 md:h-48 rounded-xl overflow-hidden"
        >
          <Image
            src={`${CDN_BASE_URL}${banner.backgroundImage}`}
            alt="Banner"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <p className="text-white text-[34px] md:text-[40px] font-normal text-center px-4 font-sophiaPro tracking-wide">
              {banner.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}