import React from "react";

const VisibleResultsInThreeWeeks = () => {
    const timelineData = [
        {
            period: "1-2 WEEKS",
            benefits: [
                "Skin feels more balanced",
                "Mild purging may occur"
            ]
        },
        {
            period: "2-3 WEEKS",
            benefits: [
                "Reduced breakouts and calmer skin"
            ]
        },
        {
            period: "3+ WEEKS",
            benefits: [
                "Clearer skin with fewer breakouts"
            ]
        }
    ];

    return (
        <div className=" bg-Secondary/50 border border-[#AFA792] p-4 md:p-10 flex flex-col gap-0 md:gap-[48px] rounded-[24px]">
            <h1 className="md:block hidden font-lato  leading-[120%]font-[500] text-[28px] md:text-[44px] text-Text/Heading-Text text-center mb-8 md:mb-12">
                Visible Results in Less Than 3 <br /> Weeks
            </h1>
            <h1 className=" md:hidden flex font-lato font-[500] text-[28px] md:text-[44px] text-Text/Heading-Text text-center mb-8 md:mb-12">
                Visible Results in Less Than 3 Weeks
            </h1>

            {/* Desktop Timeline (Horizontal) */}
            <div className="hidden md:flex justify-between items-start relative mx-12 pb-[5rem]">
                {/* Timeline Line */}
                <div className="absolute top-4 left-0 right-0 h-[3px] bg-Tertiary/400" ></div>

                {/* Timeline Items */}
                {timelineData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center w-1/3 relative">
                        {/* Timeline Bubble */}
                        <div className="w-fit h-[32px] py-[4px] px-[16px] mb-6 flex items-center justify-center rounded-full bg-Tertiary/400 text-white text-center text-[12px] md:text-[14px] font-[400] font-lato ">
                            {item.period}
                        </div>

                        {/* Benefits List */}
                        <ul className="list-disc w-[294px] flex flex-col justify-center items-center">
                            {item.benefits.map((benefit, i) => (
                                <li key={i} className="text-[14px] md:text-[18px] font-[400] font-lato text-Text/Body-Text">{benefit}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Mobile Timeline (Vertical) */}
            <div className="md:hidden">
                <div className="relative mx-auto max-w-xs">
                    <div
                        className="absolute left-1/2 top-0 w-0.5 bg-Tertiary/400 -ml-px"
                        style={{
                            zIndex: 1,
                            height: 'calc(100% - 80px)'
                        }}
                    ></div>

                    {/* Timeline Items with Centered Layout */}
                    <div className="flex flex-col items-center">
                        {timelineData.map((item, index) => (
                            <div key={index} className={`relative ${index !== timelineData.length - 1 ? 'mb-24' : 'mb-10'} w-full text-center`}>
                                {/* Timeline Bubble - Higher z-index */}
                                <div className="mx-auto w-fit h-[32px] py-[4px] px-[16px] rounded-[40px] bg-Tertiary/400 flex items-center justify-center text-center font-medium relative" >
                                    <span className="text-[12px]  text-white font-[400] font-lato text-center">{item.period}</span>
                                </div>

                                {/* Benefits List - Higher z-index with background to cover line */}
                                <div className="pt-8 relative" >
                                    <ul className="list-disc flex flex-col pl-12 pr-4 items-center justify-center  bg-Secondary/50 py-[2px]">
                                        {item.benefits.map((benefit, i) => (
                                            <li key={i} className="relative   text-wrap">
                                                <span className="relative ">
                                                    <span className="absolute  text-[14px] font-[400] font-lato text-Text/Body-Text" style={{ zIndex: -1 }}></span>
                                                    {benefit}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisibleResultsInThreeWeeks;