import React from "react";
import ContentRenderer from "./contentRenderer";

const NestedPointsList = ({ points, className = "space-y-6" }) => (
  <div className={className}>
    {points.map((nested, index) => (
      <div key={index}>
        <h5 className="text-base font-medium text-gray-800 mb-2">
          {nested.title}
        </h5>
        <ul className="list-disc space-y-2 text-gray-700 text-base">
          {nested.points.map((point, pointIndex) => (
            <li key={pointIndex}>
              <ContentRenderer content={point} />
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default NestedPointsList;
