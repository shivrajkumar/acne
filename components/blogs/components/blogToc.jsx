"use client";
import React, { useState } from "react";
import { smoothScrollTo, generateSectionId } from "../helpers/utils";

export const BlogTableOfContents = ({ items, sections }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleTocClick = (e, link, index) => {
    e.preventDefault();
    setSelectedIndex(index);

    // Clean the target ID (remove # if present)
    const targetId = link.startsWith("#") ? link.substring(1) : link;

    console.log(`TOC Click: Trying to scroll to: "${targetId}"`);
    console.log(`TOC item index: ${index}`);

    // Debug: Show all section titles and their generated IDs
    console.log("All sections with generated IDs:");
    sections?.forEach((s, i) => {
      const generatedId = generateSectionId(s.title || s.heading, i);
      console.log(`  ${i}: "${s.title || s.heading}" -> "${generatedId}"`);
    });

    // Direct approach: find the section that matches our target ID
    if (sections && sections.length > 0) {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const generatedId = generateSectionId(
          section.title || section.heading,
          i
        );

        if (generatedId === targetId) {
          console.log(
            `Found matching section ${i}: "${section.title || section.heading}"`
          );

          // Try the regular ID first
          if (document.getElementById(generatedId)) {
            console.log(`Scrolling to: "${generatedId}"`);
            smoothScrollTo(generatedId);
            return;
          }

          // Try with heading suffix
          const headingId = `${generatedId}-heading`;
          if (document.getElementById(headingId)) {
            console.log(`Scrolling to: "${headingId}"`);
            smoothScrollTo(headingId);
            return;
          }

          console.log(
            `Neither "${generatedId}" nor "${headingId}" found in DOM`
          );
        }
      }
    }

    // Fallback: try direct ID match
    const element = document.getElementById(targetId);
    if (element) {
      console.log(`TOC: Direct fallback match found: "${targetId}"`);
      smoothScrollTo(targetId);
    } else {
      console.warn(`TOC: No element found with ID "${targetId}"`);

      // Debug: show all elements with IDs
      const allElementsWithIds = document.querySelectorAll("[id]");
      console.log(
        "All elements with IDs on page:",
        Array.from(allElementsWithIds).map((el) => el.id)
      );
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="p-6 rounded-lg mb-8 mt-12">
      <h3 className="text-lg font-sophiaPro font-normal text-gray-900 mb-4">
        Contents
      </h3>
      <ul className="space-y-4 border-l border-gray-200 ">
        {items.map((item, index) => {
          const isActive = selectedIndex === index;

          return (
            <li key={index}>
              <a
                href={item.link}
                onClick={(e) => handleTocClick(e, item.link, index)}
                className={`block text-sm pl-4 border-l-2 
                  ${
                    isActive
                      ? "border-primary-dark text-primary-dark font-semibold"
                      : "border-transparent text-gray-600"
                  }
                  hover:text-black transition-all duration-200
                `}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
