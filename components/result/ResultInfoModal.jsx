import React, { useState, useRef, useEffect } from 'react';
import { Popover } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';

const ResultInfoPopover = ({ content, styles, size = "small", id }) => {
    const [open, setOpen] = useState(false);
    const iconRef = useRef(null);

    const scrollToModalInfo = () => {
        if (iconRef.current) {
            const rect = iconRef?.current?.getBoundingClientRect();
            const scrollPosition = window?.pageYOffset + rect?.bottom - 150;

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    const acneLevel = [
        {
            title: "Mild",
            description: "Small pimples, whiteheads, and blackheads caused by sebum buildup and clogged pores."
        },
        {
            title: "Moderate",
            description: "Frequent breakouts with red pimples, visible pore congestion, and excess sebum production."
        },
        {
            title: "Severe",
            description: "Bigger acne with deep congestion, inflamed pores, excess sebum, and post-acne marks."
        },
        {
            title: "Skin Type",
            description: "Describes your skin's natural state—oiliness, dryness, sensitivity, and barrier health."
        },
        {
            title: "Skin Profile",
            description: "Your skin stage is your skin score. At Clear Ritual, we map 21 stages based on sebum levels, acne type, skin type, and internal health. Your personalised routine helps you progress toward A1—your healthiest skin."
        }
    ];

    const concern = acneLevel.find(item => item.title.toLowerCase() === content.toLowerCase());

    const modalContent = (
        <div className="w-[160px] md:w-[380px] px-[8px] relative">
            <div
                className={`absolute right-[-12%] ${content === "Skin Profile" ? "top-[-10%]" : "top-[-20%]"} md:top-[-30%] md:right-[-5%] p-2 w-[32px] h-[32px] flex items-center justify-center cursor-pointer rounded-full bg-white shadow-lg z-50`}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                }}
            >
                <CloseOutlined
                    className="text-Grey/500 hover:text-Grey/700"
                    width={10}
                    height={10}
                />
            </div>
            <div className="flex flex-col gap-[8px]">
                <h2 className="text-[16px] font-semibold text-Grey/900">{concern?.title}</h2>
                <p className="text-[14px] text-Grey/700 leading-[1.5]">
                    {concern?.description}
                </p>
            </div>
        </div>
    );

    return (
        <Popover
            content={modalContent}
            open={open}
            onOpenChange={(visible) => setOpen(visible)}
            trigger="click"
            placement="bottomRight"
        >
            <span
                ref={iconRef}
                className="cursor-pointer"
                onClick={() => {
                    if (window.innerWidth < 768) {
                        scrollToModalInfo();
                    }
                }}
            >
                <InfoCircleOutlined
                    className={styles}
                    style={{
                        fontSize: typeof size === 'number' ? `${size}px` :
                            size === 'small' ? '14px' :
                                size === 'large' ? '24px' : '16px'
                    }}
                />
            </span>
        </Popover>
    );
};

export default ResultInfoPopover;