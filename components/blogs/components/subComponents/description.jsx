import React from "react";
import ContentRenderer from "./contentRenderer";

const Description = ({
  description,
  className = "text-black font-sophiaPro font-normal text-base md:text-[19px] leading-relaxed",
}) => {
  if (Array.isArray(description)) {
    return (
      <div className={`${className} space-y-4`}>
        {description.map((desc, index) => (
          <div key={index}>
            <ContentRenderer content={desc} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <ContentRenderer content={description} />
    </div>
  );
};

export default Description;
