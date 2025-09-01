"use client";
import React from "react";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import CallToActionSection from "./CallToActionSection";


const DropdownContent = ({
    sections,
    onLinkClick,
    PageClickEvent,
    showCTA = true
}) => {
    return (
        <div className="flex gap-[80px] justify-between">
            <div className={`${showCTA ? 'flex-1' : 'w-full'} `}>
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="flex-1">

                        <div className="space-y-2">
                            {section.mainLink && (
                                <div className="mb-2 flex items-center gap-[8px]">
                                    <p

                                        className="font-sophiaPro text-[14px] font-[700] text-Grey/900"

                                    >
                                        {section.mainLink.title}
                                    </p>
                                    <RightOutlined className="w-[10px] h-[10px] p-0 mt-1" />

                                </div>
                            )}
                            {section.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-[8px]">
                                    <Link
                                        href={item.href}
                                        className={`font-sophiaPro text-[14px] font-[400] text-Grey/900 hover:text-Primary/500 transition-colors ${item?.name.includes("View") ? "font-[600]" : ""}`}
                                        onClick={() => {
                                            PageClickEvent(item.name.replace(/\s+/g, ''), item.href);
                                            onLinkClick();
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.badge && (
                                        <span className="bg-Warning/500 text-Grey/900 px-[4px] py-[2px]  text-[12px] font-[400] flex justify-start items-center self-center">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            ))}
                            {section?.mainLink?.title === "Shop" && <p className="text-[9px] font-[400] text-Grey/900 leading-[1.5]">{`(We can't wait for you to try this)`}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {showCTA && <CallToActionSection />}
        </div>
    );
};

export default DropdownContent;