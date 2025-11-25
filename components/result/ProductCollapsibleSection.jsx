import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const ProductCollapsibleSection = ({
  title,
  isExpanded,
  onToggle,
  children,
  className = "my-4",
}) => {
  return (
    <div className={className}>
      <div className="transition-all duration-300">
        <button
          className="w-full flex justify-between items-center text-left"
          onClick={onToggle}
        >
          <span className="md:text-[18px] text-[16px] leading-[140%] font-normal text-primary/700 w-3/4">
            {title}
          </span>
          {isExpanded ? (
            <AiFillMinusCircle className="text-[20px] text-[#505354]" />
          ) : (
            <AiFillPlusCircle className="text-[20px] text-[#505354]" />
          )}
        </button>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isExpanded ? "700px" : "0px",
            opacity: isExpanded ? 1 : 0,
            paddingBottom: isExpanded ? "1rem" : "0px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProductCollapsibleSection;
