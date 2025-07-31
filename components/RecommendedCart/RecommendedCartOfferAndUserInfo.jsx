import startCase from "lodash/startCase";
import { useEffect, useState, useMemo, useCallback } from "react";

const RecommendedCartOfferAndUserInfo = ({
    setSavings = () => { },
    ...props
}) => {

    useEffect(() => { props?.getOneMonthCart() }, [])

    const greetingText = useMemo(() => {
        const name = startCase(props.cxName);
        return `Hi ${name}!`
    }, [props.cxName]);



    // Memoized styling functions
    const getButtonContainerStyle = useCallback((isSelected) => {
        const baseStyle = `w-[50%] px-[8px] py-[16px] md:px-[16px] md:py-[16px] relative`;
        const backgroundStyle = isSelected
            ? "bg-Grey/100"
            : "bg-white";

        return `${baseStyle} ${backgroundStyle}`;
    }, [props.isMale]);

    const getRadioButtonStyle = useCallback((isSelected) => {
        const containerStyle = ` rounded-[50%] border-[5px] `;
        const borderColor = isSelected
            ? "border-Primary/500"
            : "border-[#B0B0B0]";

        return `${containerStyle} ${borderColor}`;
    }, [props.isMale]);

    const getRadioButtonInnerStyle = useCallback((isSelected) => {
        const size = "w-[8px] h-[8px]";
        const background =
            "bg-[transparent]";

        return `${size} rounded-[50%] ${background}`;
    }, [props.isMale]);

    const getKitLabelStyle = useCallback((isSelected) => {
        const textColor = isSelected ? "text-[#414042]" : "text-[#4140427e]";

        return `text-[14px] md:text-[19px] font-sophiaPro font-[700] ${textColor} tracking-[0.5px] leading-[1.4] flex items-center`;
    }, []);

    const formatPrice = useCallback((price) => {
        return `Rs. ${Math.round(Number(price)).toLocaleString()}`;
    }, []);

    const formatOriginalPrice = useCallback((price) => {
        return `Rs. ${Number(price).toLocaleString()}`;
    }, []);



    // Memoized calculation
    const getSavings = useCallback(() => {
        const perMonthCost = Math.round(props?.newDiscountPrice / 3);
        const savings = Math.round((props?.discountPrice - perMonthCost) * 3);
        setSavings(savings);
        return savings;
    }, [props?.newDiscountPrice, props?.discountPrice, setSavings]);

    const perKitPrice = useMemo(() =>
        Math.round(Number(props.newDiscountPrice) / 3),
        [props.newDiscountPrice]
    );

    // Effects
    useEffect(() => {
        getSavings();
    }, [getSavings]);

    // Memoized components
    const OneMonthButton = useMemo(() => {
        const isSelected = props.isMonth === "1";
        const kitText = "1 MONTH KIT";

        return (
            <div className={getButtonContainerStyle(isSelected)} onClick={props.getOneMonthCart}>
                <button
                    onClick={props.getOneMonthCart}
                    className=" h-fit text-left font-sophiaPro w-full text-[#414042] text-[16px] md:text-[20px] font-[600] focus:outline-none flex flex-col md:flex-row justify-between"
                >
                    <div className="flex gap-[8px] md:gap-[16px]  ">
                        <div className="mt-1 md:mt-2">
                            <div className={getRadioButtonStyle(isSelected)}>
                                <div className={getRadioButtonInnerStyle(isSelected)}></div>
                            </div>

                        </div>
                        <div className="flex-col gap-[12px]">
                            <p className={getKitLabelStyle(isSelected)}>
                                {kitText}
                            </p>
                            <p className="font-[400] font-sophiaPro md:text-[16px] ">
                                <span className="hidden md:block">{`A 1-month supply. `}</span>
                            </p>
                            <p className="font-[400] font-sophiaPro text-[12px] md:text-[14px] leading-[1.5]">Free shipping.</p>
                        </div>
                    </div>

                    <div className="justify-start flex md:static mt-auto md:mt-0 absolute bottom-3 ">
                        <p className="whitespace-normal overflow-hidden ">
                            {props.discountCode && props.discountValidityByPlan?._1Month && (
                                <span className={"font-[300] line-through text-center text-[10px] md:text-[13px] whitespace-nowrap font-sophiaPro xl:px-1 xs:px-0 mx-1 md:mx-1 text-[#C2C2C2]"}>
                                    {formatOriginalPrice(props.totalPrice)}
                                </span>
                            )}
                            <span className={"text-[14px] md:text-[20px] ml-[2px] whitespace-nowrap font-sophiaPro font-[600] "}>
                                {props.discountCode && props.discountValidityByPlan?._1Month ? formatPrice(props.discountPrice) : formatPrice(props?.totalPrice)}
                            </span>

                        </p>
                    </div>
                </button >
            </div >
        );
    }, [
        props.isMonth, props.getOneMonthCart, props.discountCode, props.discountValidityByPlan,
        props.totalPrice, props.discountPrice, getButtonContainerStyle,
        getRadioButtonStyle, getRadioButtonInnerStyle, getKitLabelStyle,
        formatOriginalPrice, formatPrice
    ]);


    const ThreeMonthButton = useMemo(() => {
        const isSelected = props.isMonth === "3";
        const kitText = "3 MONTH KIT";

        return (
            <div className={getButtonContainerStyle(isSelected)} onClick={props.getThreeMonthCart}>
                <button
                    onClick={props.getThreeMonthCart}
                    className=" h-fit text-left font-sophiaPro w-full text-[#414042] 
                    text-[16px] md:text-[20px] font-[600] focus:outline-none
                     flex flex-col md:flex-row justify-between pb-5 md:pb-0"
                >
                    <div className="flex gap-[8px] md:gap-[16px]  ">
                        <div className="mt-1 md:mt-2">
                            <div className={getRadioButtonStyle(isSelected)}>
                                <div className={getRadioButtonInnerStyle(isSelected)}></div>
                            </div>

                        </div>
                        <div className="flex-col gap-[12px]">
                            <p className={getKitLabelStyle(isSelected)}>
                                {kitText}
                                {props.newDiscountCode && props.discountValidityByPlan?._3Month && (
                                    <span className={"hidden md:block font-[400] whitespace-nowrap font-sophiaPro ml-[8px] bg-Warning/500 text-center text-[12px] md:text-[13px] px-[4px] rounded-[2px] leading-[1.5]"
                                    } style={{ alignSelf: "center" }}>
                                        {` SAVE ${props?.newDiscountCode}%  `}
                                    </span>
                                )}
                            </p>
                            <p className="font-[400] font-sophiaPro text-Grey/900 text-[14px] md:text-[16px] ">
                                <span className="hidden md:block">{`A 3-month supply. With ${props?.newDiscountCode}% off. `}</span>
                                <span className="font-[400] md:font-[700] block ">{`(Just ${formatPrice(Math.ceil(props.newDiscountPrice / 3))} per kit)`}</span>
                            </p>
                            <p className="font-[400] font-sophiaPro  text-Grey/500 text-[12px] md:text-[14px] leading-[1.5]">And Free shipping.</p>
                        </div>
                    </div>
                    <div className=" flex-col hidden md:flex items-center justify-start gap-[4px]">
                        <span className={"text-[14px] md:text-[20px] ml-[1px] font-[600] whitespace-nowrap font-sophiaPro"}>
                            {formatPrice(props.newDiscountPrice)}
                        </span>
                        {props.newDiscountCode && props.discountValidityByPlan?._3Month && (
                            <span className={"font-[300] line-through text-center text-[10px] md:text-[13px] font-sophiaPro xl:px-1 xs:px-0 sm:mx-1 mx-1 whitespace-nowrap text-Grey/500"}>
                                {formatOriginalPrice(props.newTotalPrice)}
                            </span>
                        )}

                    </div>
                    <div className="flex md:hidden items-center justify-start gap-[4px] mt-auto absolute bottom-3">
                        {props.newDiscountCode && props.discountValidityByPlan?._3Month && (
                            <div className={"text-Grey/500 font-[300] line-through text-center text-[10px] md:text-[13px] font-sophiaPro xl:px-1 xs:px-0 sm:mx-1 mx-1 whitespace-nowrap "}>
                                {formatOriginalPrice(props.newTotalPrice)}
                            </div>
                        )}
                        <div className={"text-[14px] md:text-[20px] ml-[1px] font-[600] whitespace-nowrap font-sophiaPro"}>
                            {formatPrice(props.newDiscountPrice)}
                        </div>
                    </div>
                </button>
            </div>
        );
    }, [
        props.isMonth, props.getThreeMonthCart, props.newDiscountCode, props.discountValidityByPlan,
        props.newTotalPrice, props.newDiscountPrice, getButtonContainerStyle,
        getRadioButtonStyle, getRadioButtonInnerStyle, getKitLabelStyle,
        formatOriginalPrice, formatPrice, perKitPrice
    ]);

    return (
        <>
            <div>

                <p className={`font-[400] text-[#45474A] text-[24px] md:text-[40px] text-left font-sophiaPro leading-[1.3] tracking-[0.5px] mb-[12px] md:mb-[16px]`
                }>
                    {greetingText}
                </p>

            </div>

            <div className="w-[100%] flex  items-stretch mt-3 border-[1px] border-Grey/300 rounded-[12px] overflow-hidden">
                {OneMonthButton}
                {ThreeMonthButton}
            </div>
        </>
    );
};

export default RecommendedCartOfferAndUserInfo;