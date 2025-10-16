import React from "react";

const ProductInfo = ({
  title = "Glazing mist",
  subtitle = "The hydrating face spray",
  description,
  benefits = "All skin types, including sensitive and acne-prone skin",
  feels = "A superfine, refreshing mist",
  smells = "Fragrance-Free",
  btw = "Cruelty-Free • Vegan • Gluten-Free Dermatologist-Tested • Ophthalmologist-Tested",
  price = "xxxx",
  size = '80ml/ 2.7oz.'
}) => {
  const defaultDescription = `Instant glazed skin wherever you go. Glazing Mist is a superfine mist that hydrates and refreshes for a next-level glowy finish. Take it everywhere for clinically proven hydration and nourished, supple skin on the go. Our formula also has added purifying benefits, helping skin feel more balanced and clarified over time.`;

  return (
    <div className="flex flex-col gap-6">
      {/* Title Section */}
      <div className="flex flex-col gap-4">
        <h1
          className="text-[24px] md:text-[40px] font-bold text-[#0F1B28] leading-[1.3] font-sophiaPro"
        >
          {title}
        </h1>
        <div className="flex flex-col gap-1">
          {/* Subtitle + Price (mobile only with justify-between) */}
          <div className="flex justify-between items-center md:block">
            <h2 className="text-[14px] md:text-[18px] font-light text-Grey/900 leading-[1.4] tracking-[0.5px] font-sophiaPro">
              {subtitle}
            </h2>
            {/* Price only visible on mobile */}
            {/* <span className="text-[14px] font-semibold text-gray-900 md:hidden">
              RS.{price}
            </span> */}
          </div>

          {/* Description */}
          <p className="text-[14px] md:text-[16px] text-[#505354] leading-[1.5] font-sophiaPro mt-5">
            {description || defaultDescription}
          </p>

          <p className="text-[14px] md:text-[16px] text-[#505354] leading-[1.5] font-sophiaPro">
            Size: {size}
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col gap-4">
        <InfoRow label="BENEFITS:" value={benefits} />
        <InfoRow label="FEELS LIKE:" value={feels} hasBorder />
        <InfoRow label="SMELLS LIKE:" value={smells} hasBorder />
        <InfoRow label="BTW," value={btw} hasBorder />
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
      <div className="text-sm md:text-[18px] text-[#0F1B28] uppercase font-sophiaPro w-full md:w-1/2">
        {label}
      </div>
      <div className="text-[14px] md:text-[16px] text-[#505354] font-sophiaPro w-full md:w-1/2 md:text-right mt-1 md:mt-0">
        {value}
      </div>
    </div>
  );
};

export default ProductInfo;
