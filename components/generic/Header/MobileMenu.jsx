"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RightOutlined } from "@ant-design/icons";
import ArrowRight from "@assets/icons/ArrowRight.webp";
import { Divider } from "antd";

const MobileMenu = ({
    isOpen,
    onToggle,
    totalTopOffset,
    headerHeight,
    PageClickEvent,
    navigationItems
}) => {
    const [expandedSection, setExpandedSection] = useState(null);

    if (!isOpen) return null;

    const toggleSection = (sectionName) => {
        setExpandedSection(expandedSection === sectionName ? null : sectionName);
    };

    return (
        <div
            className="fixed w-[90%] bg-white z-50 md:hidden border-t overflow-y-scroll"
            style={{
                top: `${totalTopOffset}px`,
                height: `calc(100vh - ${totalTopOffset}px)`,
            }}
        >

            <nav className="flex-1">
                <div className={`px-[16px] py-[12px] ${expandedSection ? "pb-10" : "pb-40"}`}>
                    {navigationItems.map((item, index) => (
                        <div key={index} className="mb-4">
                            {item.hasDropdown && item.dropdownContent ? (
                                <div>
                                    {/* Section Header */}
                                    <button
                                        className="w-full flex items-center justify-between py-3 font-sophiaPro text-[16px] font-[700] text-[#1F1F1F]"
                                        onClick={() => toggleSection(item.name.toLowerCase())}
                                    >
                                        <div className="flex items-center space-x-2 font-sophiaPro text-[14px] font-[700]">
                                            <span>{item.title}</span>
                                            <RightOutlined className="w-3 h-3" />
                                        </div>
                                    </button>

                                    {/* Expandable Content */}
                                    {expandedSection === item.name.toLowerCase() && (
                                        <div className="ml-4 space-y-2">
                                            {item.dropdownContent.sections.map((section, sectionIndex) => (
                                                <div key={sectionIndex} className="space-y-2">
                                                    {section.items.map((subItem, subIndex) => (
                                                        <div key={subIndex} className="flex items-center justify-between py-2">
                                                            <Link
                                                                href={subItem.href}
                                                                className={`${subItem.name == 'View All Products' ? 'font-semibold' : ''} font-sophiaPro text-[14px] font-[400] text-Grey/900 hover:text-Primary/900 transition-colors`}
                                                                onClick={() => {
                                                                    PageClickEvent(subItem.name.replace(/\s+/g, ''), subItem.href);
                                                                    onToggle();
                                                                }}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                            {subItem.badge && (
                                                                <span className="bg-[#F4E06B] text-[#0F1B28] px-2 py-1 rounded text-xs font-medium">
                                                                    {subItem.badge}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                            {item?.name === "Products" && <p className="text-[9px] font-[400] text-Grey/900 leading-[1.5]">{`(We can't wait for you to try this)`}</p>}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Simple Navigation Items */
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-between py-3 font-sophiaPro text-[16px] font-[700] text-Grey/900 hover:text-Primary/500 transition-colors"
                                    onClick={() => {
                                        PageClickEvent(item.name, item.href);
                                        onToggle();
                                    }}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span>{item.title}</span>
                                        <RightOutlined className="w-3 h-3" />
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </nav>
            {/* Call to action button */}
            <div className="sticky bottom-0 left-0 right-0 px-4 bg-white border-t pt-4 pb-20">
                <Link href="/skin-test">
                    <button
                        className="w-full bg-Primary/500 text-white py-4 rounded-full font-medium flex items-center justify-center space-x-2"
                        onClick={onToggle}
                    >
                        <span>TAKE THE SKIN TEST</span>
                        <Image
                            src={ArrowRight}
                            alt="Arrow"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MobileMenu;