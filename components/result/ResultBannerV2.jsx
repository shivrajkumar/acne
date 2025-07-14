import React, { useMemo } from 'react';
import { Progress } from 'antd';
import { startCase } from 'lodash';
import RootCausesV2 from './RootCausesV2';
import { useCartContext } from "../../context/CartContext";

const progressMapping = {
    // Acne Levels
    mild: 25,
    moderate: 50,
    severe: 75,

    // Skin Types
    dry: 25,
    normal: 50,
    oily: 80,
    combination: 75
};

const ResultBannerV2 = () => {
    const { customerDetails, skinType, acneGrading } = useCartContext();

    const acneProgress = useMemo(() => {
        const condition = acneGrading?.split(" ")[2]?.toLowerCase().trim();
        return progressMapping[condition] || 0;
    }, [acneGrading]);

    const skinTypeProgress = useMemo(() => {
        const condition = skinType?.split("+")[0]?.toLowerCase().trim();
        return progressMapping[condition] || 0;
    }, [skinType]);

    const customerName = useMemo(() =>
        customerDetails?.firstName ? startCase(customerDetails.firstName) : "",
        [customerDetails]
    );

    return (
        <div className="w-full overflow-hidden bg-Secondary/50 border border-[#AFA792] p-[40px] xs:p-[24px] sm:p-[24px] md:p-[40px] rounded-[24px] mt-[16px] sm:mt-[16px] md:mt-[32px] flex flex-col md:flex-row justify-between gap-[40px] md:gap-[120px] ">
            <div className="w-full flex flex-col gap-[16px] md:gap-[40px]">
                <div>
                    <h1 className="text-[28px] md:text-[44px] font-lato font-[500] text-Text/Heading-Text leading-[1.3] md:w-[600px] w-[260px] break-words">
                        {customerName}{" "}
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
                                percent={acneProgress}
                                strokeColor={{
                                    '0%': '#098215',
                                    '50%': '#F7F753',
                                    '100%': '#F01800'
                                }}
                                trailColor="#E9EDED"
                                showInfo={false}
                                className="absolute top-0 left-0 w-full"
                            />
                            <div
                                className="absolute h-[20px] border-l-[1px] border-[#505354]"
                                style={{
                                    left: `${acneProgress}%`,
                                    transform: 'translateX(-50%)',
                                    top: '50%'
                                }}
                            ></div>
                            <div className="relative w-full">
                                <p
                                    className="absolute text-Text/Body-Text text-[12px] font-[400] bg-Warning/300 py-[2px] px-[4px] leading-[1.5] "
                                    style={{
                                        left: `${acneProgress + (typeof window !== 'undefined' && window.innerWidth < 576 ? 6 : 3)}%`,
                                        transform: 'translateX(-50%) translateY(-90%)'
                                    }}
                                >
                                    {acneGrading ? startCase(acneGrading.split(" ")[2]) : ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-[12px]">
                        <p className="text-Text/Body-Text text-[14px] md:text-[16px] sm:text-[14px] font-[400] ">
                            Skin Type
                        </p>
                        <div className="relative w-full ">
                            <Progress
                                percent={skinTypeProgress}
                                strokeColor={{
                                    '0%': '#476EEF',
                                    '50%': '#F7F753',
                                    '100%': '#F01800'
                                }}
                                trailColor="#E9EDED"
                                showInfo={false}
                                className="absolute top-0 left-0 w-full "
                            />
                            <div
                                className="absolute h-[20px] border-l-[1px] border-[#505354]"
                                style={{
                                    left: `${skinTypeProgress}%`,
                                    transform: 'translateX(-50%)',
                                }}
                            ></div>
                            <div className="relative w-full">
                                <p
                                    className="absolute text-Text/Body-Text text-[12px] font-[400] bg-Warning/300 py-[2px] px-[4px] leading-[1.5] w-fit"
                                    style={{
                                        left: `${skinTypeProgress + (typeof window !== 'undefined' && window.innerWidth < 576 ? 12 : 8)}%`,
                                        transform: 'translateX(-50%) translateY(-200%)'
                                    }}
                                >
                                    {skinType ? startCase(skinType.split("+")[0]) : ""}
                                </p>
                                <p
                                    className="absolute text-Text/Body-Text text-[12px] font-[400] bg-Warning/300 py-[2px] px-[4px] leading-[1.5] min-w-[125px] flex"
                                    style={{
                                        left: `${skinTypeProgress + (typeof window !== 'undefined' && window.innerWidth < 576 ? 15 : 8)}%`,
                                        transform: `translateX(-50%)  translateY(-90%)`,
                                    }}
                                >
                                    {skinType ? `+ ${startCase(skinType.split("+")[1])}` : ""}
                                </p>
                            </div>
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