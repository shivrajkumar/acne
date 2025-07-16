import React from "react";
import ContentRenderer from "./contentRenderer";

const Paragraph = ({ paragraph, className = "text-black text-sm" }) => {
  if (Array.isArray(paragraph)) {
    return (
      <>
        {paragraph.map((para, index) => (
          <div key={index} className={`${className}`}>
            <ContentRenderer content={para} />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className={className}>
      <ContentRenderer content={paragraph} />
    </div>
  );
};

export default Paragraph;
