"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import arrowIcon from "@assets/icons/up-arrow.png";
import CrossIconIcon from "@assets/icons/close-circle.png";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import handleBuyNowClick from "../result/handleBuyNowClick";
import { trackMoEngageEvent } from "@/utils/moegage";
import { getCookieValue } from "@/helpers/cookieHelper";
import { metaCapi } from "@/helpers/metaCapiHelper";
import { logGtmEvent } from "../generic/Gtm";
import { pixelCustomeEvent } from "../generic/Pixel";

const CartPageHome = () => {
  const [isBreakdownDrawerOpen, setIsBreakdownDrawerOpen] = useState(false);
  const [orderDisplayId, setOrderDisplayId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const orderDisplayIdFromStorage =
      window.localStorage.getItem("order_count");

    setOrderDisplayId(orderDisplayIdFromStorage);

    // Only set cart data if no order has been placed
    if (!orderDisplayIdFromStorage) {
      const cartData = JSON.parse(
        window.localStorage.getItem("acne_result_data")
      );
      setData(cartData);
    }
  }, []);

  const placeOrder = () => {
    handleBuyNowClick(data?.productsDetails, data?.customerDetails?.caseId);
    const phone = window.localStorage.getItem("user_phone");
    const eventAttributes = {
      cart_value: `${data?.cartDetails?.totalCartValue}`,
      item_count: `${data?.productsDetails.length}`,
      timestamp: new Date().toISOString(),
      syntheticId: `${window.localStorage.getItem("syntheticId")}`,
      caseId: `${data?.customerDetails?.caseId}`,
      transactionId: `${window.localStorage.getItem("user_tid")}`,
      fb_external_id: generateEventId({ eventName: 'book-call-confirmed-without-order', phone: phone })
    }
    trackMoEngageEvent("BeginCheckout", eventAttributes)
    logGtmEvent("Add to Cart", eventAttributes)
    pixelCustomeEvent("Add to Cart", eventAttributes);

    const fbp = getCookieValue('_fbp', document.cookie.split(';'));
    const fbc = getCookieValue('_fbc', document.cookie.split(';'));
    const email = window.localStorage.getItem("user_email");
    const gender = window.localStorage.getItem("gender");

    const capiPayload = {
      email: email,
      phone: phone,
      fbc: fbc,
      fbp: fbp,
      url: window.location.href,
      gender: gender,
    };
    metaCapi(capiPayload, "CheckoutInitiated");
  };

  // Empty cart with order display ID UI
  const renderOrderDisplayIdEmptyCart = () => {
    return (
      <div className="flex flex-col justify-center items-center my-auto text-center px-4 overflow-y-hidden">
        <h2 className="text-[24px] font-[700] text-Text/Heading-Text mb-3">
          Your cart is empty!
        </h2>
      </div>
    );
  };

  // Regular empty cart UI
  const renderRegularEmptyCart = () => {
    return (
      <div className="flex flex-col justify-center items-center my-auto text-center px-4 overflow-y-hidden">
        <h2 className="text-[24px] font-[700] text-Text/Heading-Text mb-3">
          Your cart is empty!
        </h2>
        <p className="text-[16px] font-[400] text-Text/Body-Text mb-6 max-w-[320px]">
          Take our free skin test to get personalized product recommendations
          based on your skin needs.
        </p>
        <AcneTakeTheSkinTest
          variant="black"
          text="TAKE THE SKIN TEST"
          tm=" "
          redirectTo="/skin-test"
          deskSize="desktopBig"
        />
      </div>
    );
  };

  return (
    <>
      {data ? (
        <>
          {/* Custom Breakdown Drawer */}
          {isBreakdownDrawerOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end overflow-y-scroll font-sophiaPro"
              onClick={() => setIsBreakdownDrawerOpen(false)}
            >
              {/*  Title */}
              <div
                className="fixed bottom-[0] right-[0] md:w-[480px] w-[100%] h-[592px] bg-white  shadow-xl z-50 transform transition-transform duration-300 ease-in-out translate-x-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="flex justify-between items-center mb-4 py-[16px] px-[12px] border-b-[1px]  border-b-Overlay Popup/Divider Stroke ">
                  <h2 className="text-[16px] font-[500] leading-[130%]  text-Text/Heading-Text -tracking-[1%] font-sophiaPro">
                    Estimated Total
                  </h2>

                  <div
                    onClick={() => setIsBreakdownDrawerOpen(false)}
                    className="cursor-pointer"
                  >
                    <Image
                      src={CrossIconIcon}
                      alt="Cross Icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-[16px]">
                  <div className="flex items-center gap-4 bg-[#EDF9F4] p-3 rounded-lg mb-4">
                    <Image
                      src={data?.doctorDetails?.image}
                      alt="doctor"
                      width={104}
                      height={104}
                      className="rounded-full w-[104px] h-[104px] object-cover"
                    />

                    <div className="flex flex-col flex-grow font-sophiaPro">
                      <p className="font-sophiaPro font-[400] text-[16px] -tracking-[1%] ">
                        {data?.doctorDetails?.name}
                      </p>
                      <p className="font-sophiaPro text-[12px] md:text-[14px] font-[400]">
                        {data?.doctorDetails?.education}
                      </p>
                      <p className="font-sophiaPro text-[12px] md:text-[14px] font-[400]">
                        {data?.doctorDetails?.experience}
                      </p>
                    </div>
                  </div>
                  {/*  Product info */}

                  <div className={`flex flex-col gap-[16px] mt-[24px]`}>
                    {data?.productsDetails.map((product, index) => (
                      <div
                        key={index}
                        className="flex gap-[24px] justify-between"
                      >
                        <p className="font-sophiaPro font-[400] text-[16px] text-Text/Body-Text -tracking-[1%] overflow-ellipsis">{`(${product?.quantity}) ${product?.name}`}</p>
                        <p className="font-sophiaPro font-[400] text-[16px] text-Text/Body-Text -tracking-[1%] ">
                          ₹{product.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Cart details */}
                  <div
                    className={` flex border-[1px] border-Elements/Divider-Stroke h-[1px] mt-[24px]`}
                  ></div>

                  <div className={`flex  flex-col gap-[16px] mt-[16px]`}>
                    <div className="flex justify-between">
                      <p className="font-sophiaPro font-[400] text-[14px] tmd:ext-[18px] text-Text/Body-Text -tracking-[1%] overflow-ellipsis">
                        Subtotal
                      </p>
                      <p className="font-sophiaPro font-[400] text-[14px] tmd:ext-[18px] text-Text/Body-Text -tracking-[1%]">
                        ₹{data?.cartDetails?.totalCartValue?.toFixed(2)}
                      </p>
                    </div>

                    <div className={` flex  justify-between`}>
                      <p className="font-sophiaPro font-[400] text-[14px] tmd:ext-[18px] text-Text/Body-Text -tracking-[1%] overflow-ellipsis">
                        Shipping
                      </p>
                      <p className="font-sophiaPro font-[400] text-[14px] tmd:ext-[18px] text-[#FFFFFF] -tracking-[1%] bg-Semantic/Success w-fit h-[28px] py-[4px] px-[16px] rounded-[8px] flex items-center">
                        {data?.cartDetails?.shippingCharges}
                      </p>
                    </div>

                    <div className={` flex justify-between`}>
                      <p className="font-sophiaPro font-[600] text-[16px] tmd:ext-[18px] text-Text/Body-Text -tracking-[1%] overflow-ellipsis">
                        {"Total (pre-tax)"}
                      </p>
                      <p className="font-sophiaPro font-[500] text-[16px] tmd:ext-[18px] text-Text/Body-Text -tracking-[1%]">
                        ₹{data?.cartDetails?.totalCartValue?.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-Elements/DividerStroke mt-[16px]">
                    <p className="flex text-[14px] font-sophiaPro font-[400] pt-[12px] text-Text/Label text-center justify-center">
                      {data?.cartDetails?.disclaimer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/*  First Drawer info */}

          <div className="w-full h-full flex flex-col ">
            {/* Cart Items with scroll */}
            <div className="flex-1 overflow-y-auto ">
              <div className="flex flex-col gap-4">
                {data?.productsDetails.map((product) => (
                  <div
                    key={product.variantId}
                    className="flex items-center gap-[8px]  border rounded-lg  bg-Elements/Highlight"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={104}
                      height={104}
                      className="object-contain rounded p-[8px]"
                    />
                    <div className="flex flex-col justify-between py-[12px] pl-[8px] pr-[12px]">
                      <p className="text-[14px] font-[500] leading-[140%]">
                        {product.name}
                      </p>
                      <p className="text-[12px] text-Text/Label font-[400] leading-[150%]">
                        {product.size}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[16px]  font-[400] leading-[150%]">
                          ₹{product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkbox */}
              <div className="mt-4 flex items-center gap-2 cursor-pointer pl-2">
                <input
                  type="checkbox"
                  className="h-[18px] w-[18px] cursor-pointer rounded-[100px]"
                  style={{ accentColor: "#237AB1" }}
                />
                <label className="text-[14px] font-[400] leading-[140%] text-Text/Label">
                  Keep me posted about sales and offers
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-4 flex justify-between items-center">
              <div className="flex flex-col">
                <div className="text-[18px] font-[400] tracking-[0.5px]">
                  ₹{data?.cartDetails?.totalCartValue}/-
                </div>
                <div
                  className="text-[12px] font-[400] leading-[150%] text-Tertiary/600 cursor-pointer flex items-center gap-1"
                  onClick={() => setIsBreakdownDrawerOpen(true)}
                >
                  <span>Estimated Total</span>
                  <Image src={arrowIcon} alt="arrow" width={12} height={12} />
                </div>
              </div>
              <button
                className="flex bg-Tertiary/600 px-[40px] py-[16px] rounded-[100px] md:w-[273px] w-[189px] h-[56px] text-[#FFFFFF] text-[14px] font-[500] leading-[24px] -tracking-[1%] justify-center"
                onClick={placeOrder}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </>
      ) : // Show different empty cart UI based on whether orderDisplayId exists
        orderDisplayId ? (
          renderOrderDisplayIdEmptyCart()
        ) : (
          renderRegularEmptyCart()
        )}
    </>
  );
};

export default CartPageHome;
