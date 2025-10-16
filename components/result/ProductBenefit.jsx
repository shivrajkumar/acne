import React from "react";
import Image from "next/image";
import tickIcon from "@assets/svg/tick.svg";

const ProductBenefit = ({ benefits }) => {
  if (!benefits) return null;

  const getBorderClass = (index) => {
    const isLastInRowMobile = (index + 1) % 2 === 0;
    const isLastInRowDesktop = (index + 1) % 4 === 0;

    return `
      ${!isLastInRowMobile ? "border-r border-Elements/Divider-Stroke" : ""}
      ${!isLastInRowDesktop ? "md:border-r md:border-Elements/Divider-Stroke" : "md:border-r-0"}
    `;
  };

  return (
    <div className="mb-8 flex justify-between">
      <h2 className="md:text-[24px] text-[18px] font-[600] leading-[140%] text-primary/700">
        Benefits
      </h2>

      {/* Layout: grid on mobile, flex with wrap on md+ */}
      <div className="grid grid-cols-2 gap-y-4 pt-4 md:grid-cols-none md:flex md:flex-wrap">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`flex px-3 py-2 w-full md:w-fit`}
          >
            <div className="flex items-start gap-2">
              <span className="text-[12px] leading-[140%] font-[400] text-primary/700 break-words">
                {benefit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBenefit;
