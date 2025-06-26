import Image from 'next/image'
import React from 'react'
import CollapseIcon from "@assets/svg/downArrow.svg";

const ProductCollapsibleSection = (
    {
    title,
    isExpanded,
    onToggle,
    children,
    className = "mb-8",
  }
) => {
  return (
    <div className={className}>
        <div className="transition-all duration-300">
          <button
            className="w-full flex justify-between items-center py-2 text-left"
            onClick={onToggle}
          >
            <span className="md:text-[24px] text-[18px] font-[600] leading-[140%] text-primary/700">
              {title}
            </span>
            <Image
              src={CollapseIcon}
              alt="toggle icon"
              width={20}
              height={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isExpanded ? "500px" : "0px",
              opacity: isExpanded ? 1 : 0,
              paddingBottom: isExpanded ? "1rem" : "0px",
            }}
          >
            {children}
          </div>
        </div>
      </div>
  )
}

export default ProductCollapsibleSection