import React from "react";
import ContentRenderer from "./contentRenderer";

const BulletPoint = ({ point, className = "", showBullet = true }) => {
  if (!showBullet) {
    return (
      <div className={`text-lg ${className}`}>
        <ContentRenderer content={point} />
      </div>
    );
  }

  return (
    <ul className={`list-disc ${className}`}>
      <li className="text-xl leading-relaxed">
        <ContentRenderer content={point} />
      </li>
    </ul>
  );
};

export default BulletPoint;
