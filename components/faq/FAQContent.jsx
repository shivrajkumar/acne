"use client";
import React, { useState, useEffect } from "react";
import FAQContactInfo from "./FAQContactInfo";
import { faqDataHelpPage } from "@/constants/allVayuData";
import RightArrow from "@assets/svg/arrow-right.svg";
import Image from "next/image";
import PlusIcon from "@assets/svg/Plus.svg";
import MinusIcon from "@assets/svg/Minus.svg";

const FAQContent = () => {
  const [activeSection, setActiveSection] = useState("products");
  const [expandedItems, setExpandedItems] = useState({});

  // Initialize first item as expanded for each section
  useEffect(() => {
    setExpandedItems({
      [`${activeSection}-0`]: true,
    });
  }, [activeSection]);

  const toggleExpand = (section, index) => {
    const key = `${section}-${index}`;
    const isCurrentlyExpanded = expandedItems[key];

    if (isCurrentlyExpanded) {
      // If clicking on already expanded item, close it
      setExpandedItems({});
    } else {
      // If clicking on collapsed item, close all others and open this one
      setExpandedItems({
        [key]: true,
      });
    }
  };

  const sectionLabels = {
    products: "PRODUCTS",
    shipping: "SHIPPING",
    orders: "ORDERS AND PAYMENT",
    returns: "RETURNS AND PAYMENTS",
    contact: "CONTACT US",
  };

  const sections = Object.keys(sectionLabels);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const renderFAQItem = (item, section, index) => {
    const key = `${section}-${index}`;
    const isExpanded = expandedItems[key];

    return (
      <div
        key={index}
        className="border-b  border-b-Elements/Divider-Stroke last:border-b-0 bg-Background/Beige"
      >
        <button
          onClick={() => toggleExpand(section, index)}
          className="w-full flex items-center justify-between py-4 px-0 text-left  transition-colors duration-200"
        >
          <span className="font-[400] leading-[140%] tracking-[0.5px] text-[14px] lg:text-[18px] text-Grey/900">
            {item.question}
          </span>
          <div className="ml-4 flex-shrink-0">
            <div>
              <Image
                src={isExpanded ? MinusIcon : PlusIcon}
                alt="epxandicon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4 px-0">
            <p className=" text-Neutral/700  text-[12px] lg:text-[14px] leading-[150%] font-[400]">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileButtons = () => {
    return (
      <div className="px-2">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => handleSectionClick(section)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                activeSection === section
                  ? "bg-Secondary/500 text-white border border-Secondary/500"
                  : "bg-white text-Secondary/500 border border-Secondary/500"
              }`}
            >
              {sectionLabels[section]}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white font-lato">
      <div className=" max-w-full mx-auto lg:p-[80px] p-[16px]">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="bg-Background/Beige  p-[32px] lg:rounded-[32px] rounded-[12px] ">
              <h2 className="text-[40px] font-[700] text-primary/700  leading-[130%] tracking-[0.5px] mb-6">
                FAQ
              </h2>

              {/* Navigation */}
              <nav className="space-y-1 mb-8 bg-Background/Beige">
                {Object.keys(sectionLabels).map((section) => {
                  const isActive = activeSection === section;

                  return (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`block w-full text-left py-2 text-sm font-[700] transition-colors duration-200 ${
                        isActive
                          ? "text-primary/700 pl-5"
                          : "text-Neutral/700 hover:text-primary/700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`transition-all duration-300 w-[14px] h-[14px] flex items-center justify-center ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2"
                          }`}
                        >
                          <Image
                            src={RightArrow}
                            alt="right icon"
                            width={14}
                            height={14}
                          />
                        </span>
                        {sectionLabels[section]}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
            {/* Contact Info for Desktop */}
            <FAQContactInfo className="bg-white" />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-6 bg-Background/Beige rounded-[12px] p-[16px]">
            <h2 className="md:hidden block text-[18px] font-[700] text-primary/700  leading-[140%] tracking-[0.5px] mb-6">
              FAQ
            </h2>
            {renderMobileButtons()}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className=" bg-Background/Beige rounded-[12px] lg:rounded-[32px]">
              <div className="p-6">
                <h2 className="lg:text-[40px] text-[18px] font-[700] text-primary/700 leading-[130%] tracking-[0.5px] mb-6">
                  {sectionLabels[activeSection]}
                </h2>
                <div className="space-y-0">
                  {faqDataHelpPage[activeSection]?.map((item, index) =>
                    renderFAQItem(item, activeSection, index)
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Contact Info for Mobile */}
          <FAQContactInfo className="md:hidden block p-6" />
        </div>
      </div>
    </div>
  );
};

export default FAQContent;
