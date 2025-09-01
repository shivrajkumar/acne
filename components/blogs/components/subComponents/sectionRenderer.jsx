import React from "react";
import {
  WithTextPointsNote,
  WithoutText,
  JustPoints,
  WithSubSectionsNote,
  WithoutNote,
  DefaultDesign,
} from "./sectionsDesign";
import { generateSectionId } from "../../helpers/utils";
import { Heading } from "./heading";
import { SubHeading } from "./subHeading";
import Description from "./description";
import { BlogTableOfContents } from "../blogToc";

const SectionRenderer = ({ section, index, blog }) => {
  const sectionId = generateSectionId(section.heading, index);
  console.log(sectionId, ": sectionId");

  const renderSectionDesign = () => {
    switch (section.if_design) {
      case "with-text-points-note":
        return <WithTextPointsNote section={section} />;
      case "without-text":
        return <WithoutText section={section} />;
      case "just-points":
        return <JustPoints section={section} />;
      case "with-sub-sections-note":
        return <WithSubSectionsNote section={section} />;
      case "without-note":
        return <WithoutNote section={section} />;
      default:
        return <DefaultDesign section={section} />;
    }
  };

  return (
    <div key={index} className="mb-2">
      {section.heading && (
        <div className="mt-2" id={`${sectionId}-heading`}>
          <Heading heading={section.heading} />
        </div>
      )}

      <div className="mb-8 mt-10">
        <SubHeading subHeading={section.title ?? ""} />
        {section.description && (
          <div className="mb-4">
            <Description description={section.description} />
          </div>
        )}
        {index === 0 && (
          <div className="block md:hidden">
            <BlogTableOfContents items={blog.toc} sections={blog.section} />
          </div>
        )}
      </div>

      {renderSectionDesign()}
    </div>
  );
};

export default SectionRenderer;
