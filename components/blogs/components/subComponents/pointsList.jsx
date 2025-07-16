import React from "react";
import BulletPoint from "./bulletPoints";

const PointsList = ({ points, className = "space-y-3", itemClassName }) => {
  const showBullets = points.length > 1;

  return (
    <div className={className}>
      {points.map((point, index) => (
        <BulletPoint
          key={index}
          point={point}
          className={itemClassName}
          showBullet={showBullets}
        />
      ))}
    </div>
  );
};

export default PointsList;
