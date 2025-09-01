import React from "react";

const ContentRenderer = ({ content, className = "" }) => {
  const renderContent = (text) => (
    <span dangerouslySetInnerHTML={{ __html: text }} />
  );

  if (Array.isArray(content)) {
    return (
      <ul className={`list-disc pl-3 space-y-2 ${className}`}>
        {content.map((item, index) => (
          <li key={index} className="text-[14px] md:text-base text-[#727678] md:text-black leading-relaxed">
            {renderContent(item)}
          </li>
        ))}
      </ul>
    );
  }

  return <div className={className}>{renderContent(content)}</div>;
};

export default ContentRenderer;
