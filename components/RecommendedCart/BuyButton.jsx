import { CDN_BASE_URL } from "@/constants/constants";
import Image from "next/image";

const yellowCoin = `${CDN_BASE_URL}website_images/localImages/yellow_coin.gif`;

const BuyButton = (props) => {
    const show1monthDiscount =
        props.discountCode && props.discountValidityByPlan?._1Month;
    const show3MonthsDiscount =
        props.newDiscountCode && props.discountValidityByPlan?._3Month;
    return (
        <>
            {props.cartData?.length > 0 && (
                <div
                    className="fixed flex flex-col bg-white bottom-0 mt-8  w-full text-black z-40 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] cursor-pointer"
                    onClick={() => {
                        props.placeOrder()

                    }}
                >
                    <div className="flex justify-between px-[16px] py-[16px] md:px-[32px] md:py-[20px] h-full items-center bg-white">
                        <div className=" flex flex-col">
                            <div className="flex flex-row">
                                <div className=" text-[16px] md:text-[24px] text-[#414042]">
                                    <div className="flex flex-col">
                                        <div className="flex  -mb-2 items-center">
                                            {(props.isMonth === "1"
                                                ? show1monthDiscount
                                                : show3MonthsDiscount) && (
                                                    <span
                                                        className="font-[400] line-through text-center text-[11px] md:text-[20px] ml-[8px]  xs:px-0"
                                                        style={{
                                                            color: "#929292",
                                                            alignSelf: "center",
                                                        }}
                                                    >
                                                        ₹
                                                        {props.isMonth === "1"
                                                            ? Number(props.totalPrice)?.toLocaleString()
                                                            : Number(props.newTotalPrice)?.toLocaleString()}
                                                    </span>
                                                )}
                                            <span className="text-[16px] md:text-[20px] font-[600] ml-[8px]">
                                                ₹{" "}
                                                {props.isMonth === "1"
                                                    ? Math.round(
                                                        Number(show1monthDiscount ? props.discountPrice : props?.totalPrice)
                                                    )?.toLocaleString()
                                                    : Math.round(
                                                        Number(props.newDiscountPrice)
                                                    )?.toLocaleString()}
                                            </span>

                                            {props.isMonth === "1" && show1monthDiscount && (
                                                <span className="text-[12px]  text-[#E15E5E] ml-[4px]">
                                                    ({"-" + props.discountCode}
                                                    %OFF)
                                                </span>
                                            )}
                                            {props.isMonth === "3" && show3MonthsDiscount && (
                                                <span className="text-[12px] text-[#E15E5E] ml-[4px]">
                                                    ({"-" + props.newDiscountCode}
                                                    %OFF)
                                                </span>
                                            )}
                                            <span className="hidden md:flex text-[12px] md:text-[14px] text-brand-dark font-[400] ml-4">
                                                (Inclusive of all taxes)
                                            </span>
                                        </div>
                                        <div>
                                            <span className="flex md:hidden text-[12px] md:text-[14px] text-brand-dark font-[400]">
                                                (Inclusive of all taxes)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            id="order_summary_continue"
                            className={`w-[176px] h-[40px] md:w-[266px] md:h-[56px] flex justify-center bg-Primary/500
                                 items-center xl:py-3 xs:py-3 xl:px-14 xs:px-10  text-white font-sophiaPro font-[500] text-[14px] md:text-[16px] rounded-full`}
                        >
                            CONTINUE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default BuyButton;