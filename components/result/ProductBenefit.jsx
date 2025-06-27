import React from "react";
import Image from "next/image";
import tickIcon from "@assets/svg/tick.svg";

const ProductBenefit = ({ benefits }) => {
  if (!benefits) return null;

  return (
    <div className="mb-8">
      <h2 className="md:text-[24px] text-[18px] font-[600] leading-[140%] text-primary/700">
        Benefits
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 pt-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`
                    flex items-center gap-2
                    ${
                      index % 2 === 0
                        ? "border-r border-Elements/Divider-Stroke"
                        : ""
                    }
                    ${
                      index % 4 !== 3
                        ? "md:border-r border-Elements/Divider-Stroke"
                        : "md:border-r-0"
                    }
                  `}
          >
            <Image src={tickIcon} alt={benefit?.label} width={24} height={24} />
            <span className="text-[12px] leading-[140%] font-[400] text-primary/700">
              {benefit?.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBenefit;
