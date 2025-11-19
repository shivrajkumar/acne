import { CDN_BASE_URL } from "@/constants/constants";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";


// Product type to image mapping
const productTypeImages = {
  COSMETIC_CLEANSER: "acne/general/Cleanser.png",
  COSMETIC_MOISTURISER: "acne/general/Moisturiser.png",
  COSMETIC_PROTECTION: "acne/general/Sunscreen.png",
  SUPPLEMENT: "acne/general/Skin Food.png",
  DRUG: "acne/general/Treat.png",
};

// Product type to tube/packaging image mapping
const productTypeTubeImages = {
  COSMETIC_CLEANSER: "acne/general/tubes/cleanser-tube.png",
  COSMETIC_MOISTURISER: "acne/general/tubes/moisturiser-tube.png",
  COSMETIC_PROTECTION: "acne/general/tubes/protect-tube.png",
  SUPPLEMENT: "acne/general/tubes/skin-food-tube.png",
  DRUG: "acne/general/tubes/Treatment-tube.png",
};

const ProductInfo = ({
  title,
  subtitle,
  description,
  benefits,
  feels,
  smells,
  btw,
  price,
  size,
  type,
}) => {

  const pathname = usePathname();
  const isSkinFoodDetail = pathname.startsWith("/skin-food/") && pathname !== "/skin-food";

  // Get the image path based on product type
  const typeImage =
    type && productTypeImages[type]
      ? `${CDN_BASE_URL}${productTypeImages[type]}`
      : null;

  // Get the tube/packaging image path based on product type
  const tubeImage =
    type && productTypeTubeImages[type]
      ? `${CDN_BASE_URL}${productTypeTubeImages[type]}`
      : null;

  return (
    <div className="flex flex-col relative">
      {/* Title Section */}
      <div className="flex justify-end">
        <div className="w-fit bg-[#FFF88A] text-Grey/900 text-sm font-medium px-3 py-1 font-sophiaPro hidden md:block">
          ACNE CARE
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-[18px] md:text-[40px] font-bold text-[#0F1B28] tracking-wide font-sophiaPro">
          {title}
        </h1>
        <div className="flex flex-col gap-1">
          {/* Subtitle + Price */}
          <div className="flex justify-between items-center md:block">
            <h2 className="text-[16px] md:text-[18px] font-semibold text-Grey/500 tracking-[0.5px] font-sophiaPro">
              {subtitle}
            </h2>
          </div>

          <div className="flex items-center gap-1 text-[12px] md:text-[16px] font-normal text-[#0F1B28] font-sophiaPro mt-2">
            <div>Rs. {price}</div>
            <div>
              <span>| </span>
              {size}
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-[14px] md:text-[16px] text-[#505354] leading-[1.5] font-sophiaPro hidden md:block">
              {description}
            </p>
          )}

          {/* Product Type Image */}
          {!isSkinFoodDetail && typeImage && (
            <div className="w-full -mx-2">
              <Image
                src={typeImage}
                alt={type}
                width={1000}
                height={300}
                className="w-full h-[180px] md:h-[400px] object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col gap-4">
        {[
          { label: "BENEFITS:", value: benefits },
          { label: "FEELS LIKE:", value: feels, hasBorder: true },
          { label: "SMELLS LIKE:", value: smells, hasBorder: true },
          { label: "BTW,", value: btw, hasBorder: true },
        ]
          .filter(item => item.value && item.value.toString().trim().length > 0)
          .map((item, index) => (
            <InfoRow
              key={index}
              label={item.label}
              value={item.value}
              hasBorder={item.hasBorder}
            />
          ))}

        {/* Product Tube/Packaging Image */}
        {!isSkinFoodDetail && tubeImage && (
          <div className="w-full relative h-[150px] md:h-[200px] mt-6">
            <Image
              src={tubeImage}
              alt={`${type} packaging`}
              fill
              className="object-contain w-full h-full"
              sizes="100vw"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, hasBorder = false }) => {
  return (
    <div
      className={`flex flex-row md:gap-[100px] items-start pt-4 ${
        hasBorder ? "border-t border-[#E9EDED]" : ""
      }`}
    >
      <div className="text-sm md:text-[18px] text-[#0F1B28] uppercase font-sophiaPro w-1/3 md:w-2/6">
        {label}
      </div>
      <div className="text-[14px] md:text-[16px] text-[#505354] font-sophiaPro w-2/3 md:w-5/6 md:text-right md:mt-0">
        {value}
      </div>
    </div>
  );
};

export default ProductInfo;
