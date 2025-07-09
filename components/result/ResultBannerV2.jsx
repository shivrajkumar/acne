import React from 'react';
import { Progress } from 'antd';
import { startCase } from 'lodash';
import RightArrow from "@assets/icons/arrow-right.svg";
import Image from "next/image";
import AssignedDoctor from "./AssignDoctor";
import RootCauses from "./RootCauses";
import { useCartContext } from "../../context/CartContext";
import RootCausesV2 from './RootCausesV2';

const ResultBannerV2 = () => {
    const { customerDetails, skinType, acneGrading } = useCartContext();

    const getProgressPercent = (type) => {
        const severity = type === "level"
            ? acneGrading?.split(" ")[2]?.toLowerCase()
            : skinType?.split("+")[0]?.toLowerCase();
        console.log("severity", severity)
        switch (severity) {
            case "mild": return 25;
            case "moderate": return 50;
            case "severe": return 75;
            case "dry": return 25;
            case "normal": return 50;
            case "oily": return 75;
            default: return 0;
        }
    };
    console.log("skinType", skinType?.split("+")[0].toLowerCase())

    return (
        <div className="w-full overflow-hidden bg-Secondary/50 border border-[#AFA792] p-[40px] xs:p-[24px] sm:p-[24px] md:p-[40px] rounded-[24px] mt-[16px] sm:mt-[16px] md:mt-[32px] flex flex-col md:flex-row justify-between gap-[120px]">
            <div className="w-full flex flex-col gap-[16px] md:gap-[40px]">
                <div>
                    <h1 className="text-[28px] md:text-[44px] font-lato font-[500] text-Text/Heading-Text leading-[1.3] md:w-[600px] w-[260px] break-words">
                        {customerDetails?.firstName
                            ? startCase(customerDetails.firstName)
                            : ""}{" "}
                        <span>, Your Personalised Skin Analysis is Ready.</span>
                    </h1>

                    <p className="text-[14px] md:text-[16px] font-lato font-[500] text-Text/Heading-Text mt-[12px]">
                        Based on your skin type, acne type, and internal health,
                        we've created a personalised skincare ritual to help you achieve long-lasting results.
                    </p>
                </div>

                <div className="flex flex-col gap-[40px] md:gap-[57px] mt-[24px] md:mt-[60px]">
                    <div className="flex flex-col ">
                        <p className="text-Text/Body-Text text-[14px] md:text-[16px] sm:text-[14px] font-[400] leading-[1.5]">
                            Acne Level
                        </p>
                        <div className="relative w-full ">
                            <Progress
                                percent={getProgressPercent("level")}
                                strokeColor={{
                                    '0%': '#098215',
                                    '50%': '#F7F753',
                                    '100%': '#F01800'
                                }}
                                trailColor="#E9EDED"
                                showInfo={false}
                                className="absolute top-0 left-0 w-full"
                            />
                            <div className="relative w-full">
                                <p
                                    className="absolute text-Text/Body-Text text-[12px] font-[400] bg-Warning/300 py-[2px] px-[4px] leading-[1.5]"
                                    style={{
                                        left: `${getProgressPercent("level") + 6}%`,
                                        transform: 'translateX(-50%) translateY(-90%)'
                                    }}
                                >
                                    {acneGrading ? startCase(acneGrading.split(" ")[2]) : ""}
                                </p>
                            </div>
                            <div
                                className="absolute h-[20px] border-l-[1px] border-[#505354]"
                                style={{
                                    left: `${getProgressPercent("level")}%`,
                                    transform: 'translateX(-50%)',
                                    top: '50%'
                                }}
                            ></div>
                        </div>

                    </div>

                    <div className="flex flex-col  mt-[12px]">
                        <p className="text-Text/Body-Text text-[14px] md:text-[16px] sm:text-[14px] font-[400] ">
                            Skin Type
                        </p>
                        <div className="relative w-full ">
                            <Progress
                                percent={getProgressPercent("type")}
                                strokeColor={{
                                    '0%': '#098215',
                                    '50%': '#F7F753',
                                    '100%': '#F01800'
                                }}
                                trailColor="#E9EDED"
                                showInfo={false}
                                className="absolute top-0 left-0 w-full "
                            />
                            <div className="relative w-full">
                                <p
                                    className="absolute text-Text/Body-Text text-[12px] font-[400] bg-Warning/300 py-[2px] px-[4px] leading-[1.5]"
                                    style={{
                                        left: `${getProgressPercent("type") + 7}%`,
                                        transform: 'translateX(-50%) translateY(-90%)'
                                    }}
                                >
                                    {skinType ? startCase(skinType.split("+")[0]) : ""}
                                </p>
                            </div>
                            <div
                                className="absolute h-[20px] border-l-[1px] border-[#505354]"
                                style={{
                                    left: `${getProgressPercent("type")}%`,
                                    transform: 'translateX(-50%)',
                                    top: '50%'
                                }}
                            ></div>
                        </div>

                    </div>
                </div>
            </div>

            <div className=" md:mt-0">
                <RootCausesV2 />
            </div>
        </div>
    );
};

export default ResultBannerV2;