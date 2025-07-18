import React from "react";
import ContentRenderer from "./contentRenderer";
import PointsList from "./pointsList";
import Paragraph from "./paragraph";
import Description from "./description";
import SubSectionRenderer from "./subSectionRenderer";
import parse from "html-react-parser";


const WithTextPointsNote = ({ section }) => (
  <div className="space-y-5">
    {section.text && (
      <h3 className="text-base font-normal text-gray-900 mb-4">
        {parse(section.text)}
      </h3>
    )}
    {section.points && section.points.length > 0 && (
      <div className={`${section.points.length >= 2 ? "pl-9" : ""} mb-10`}>
        {section.points.length >= 2 ? (
          <ul className="list-disc space-y-4">
            {section.points.map((point, index) => (
              <li key={index} className="text-base font-normal leading-relaxed">
                <ContentRenderer content={point} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-base leading-relaxed">
            <ContentRenderer content={section.points[0]} />
          </div>
        )}
      </div>
    )}
    {section.paragraph && (
      <div className="mt-10">
        <Paragraph paragraph={section.paragraph} />
      </div>
    )}
  </div>
);

const WithoutText = ({ section }) => (
  <div className="space-y-6">
    {section.points && (
      <PointsList
        points={section.points}
        className="space-y-4"
        itemClassName="flex items-start space-x-4 p-2 rounded-lg"
      />
    )}
    {section.paragraph && (
      <div className="mt-6">
        <Paragraph paragraph={section.paragraph} />
      </div>
    )}
  </div>
);

const JustPoints = ({ section }) => (
  <div className="space-y-3">
    {section.points && (
      <PointsList
        points={section.points}
        itemClassName="flex items-start space-x-3 p-4"
      />
    )}
  </div>
);

const WithSubSectionsNote = ({ section }) => (
  <div>
    {section.subSections && (
      <div className="space-y-8 mt-5">
        {Array.isArray(section.subSections) ? (
          section.subSections.map((subSection, index) => (
            <SubSectionRenderer key={index} subSection={subSection} />
          ))
        ) : (
          <div className="overflow-hidden">
            <div className="p-6 bg-white">
              {section.subSections.description && (
                <div className="mb-4">
                  <Description description={section.subSections.description} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )}
    {section.paragraph && (
      <div className="mt-6 p-4">
        <Paragraph paragraph={section.paragraph} />
      </div>
    )}
  </div>
);

const WithoutNote = ({ section }) => (
  <div className="space-y-6">
    {section.points && (
      <PointsList
        points={section.points}
        className="space-y-4"
        itemClassName="flex items-start space-x-3 p-4"
      />
    )}
    {section.paragraph && (
      <div className="mt-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
        <Paragraph paragraph={section.paragraph} />
      </div>
    )}
  </div>
);

const DefaultDesign = ({ section }) => (
  <div className="space-y-4">
    {section.points && <PointsList points={section.points} />}
    {section.paragraph && (
      <div className="mt-4">
        <Paragraph paragraph={section.paragraph} />
      </div>
    )}
  </div>
);

export {
  WithTextPointsNote,
  WithoutText,
  JustPoints,
  WithSubSectionsNote,
  WithoutNote,
  DefaultDesign,
};
