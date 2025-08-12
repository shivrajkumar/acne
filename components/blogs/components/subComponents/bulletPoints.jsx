import React from "react";
import ContentRenderer from "./contentRenderer";

const BulletPoint = ({ point, className = "", showBullet = true }) => {
  if (!showBullet) {
    return (
      <div className={`text-[16px] ${className}`}>
        <ContentRenderer content={point} />
      </div>
    );
  }

  return (
    <ul className={`list-disc ${className}`}>
      <li className="text-[16px] leading-relaxed">
        <ContentRenderer content={point} />
      </li>
    </ul>
  );
};

export default BulletPoint;
