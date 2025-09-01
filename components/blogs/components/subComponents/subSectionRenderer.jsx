import React from "react";
import Description from "./description";
import PointsList from "./pointsList";
import NestedPointsList from "./nestedPointsList";
import ContentRenderer from "./contentRenderer";

const SubSectionRenderer = ({ subSection }) => {
  const isStringArray = (points) =>
    Array.isArray(points) && typeof points[0] === "string";

  return (
    <div className="rounded-lg overflow-hidden">
      <h4 className="text-xl font-semibold text-gray-900">
        {subSection.title}
      </h4>
      <div className="">
        {subSection.description && (
          <div className="mb-4">
            <Description description={subSection.description} />
          </div>
        )}

        {subSection.points && (
          <div className="space-y-3">
            {isStringArray(subSection.points) ? (
              <PointsList points={subSection.points} />
            ) : (
              <NestedPointsList points={subSection.points} />
            )}
          </div>
        )}

        {subSection.additional && (
          <div className="mt-6 space-y-4">
            <div>{subSection.additional.title}</div>
            {subSection.additional.points && (
              <ContentRenderer
                content={subSection.additional.points}
                className="mt-4"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubSectionRenderer;
