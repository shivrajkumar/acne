import React from "react";

export const Heading = ({ heading }) => {
  return (
    <div className="flex flex-col text-left sm:px-0 mt-8">
      <h2 className="text-[26px] md:text-[40px] font-normal font-sophiaPro text-[#0F1B28] ">
        {heading}
      </h2>
    </div>
  );
};