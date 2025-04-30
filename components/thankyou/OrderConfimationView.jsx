"use client";

import React from "react";
import { Drawer } from "antd";
import CrossIcon from "@assets/icons/close-circle.png";
import Image from "next/image";
import AssignedDoctor from "../result/AssignDoctor";
import OrderConfirmationCard from "./OrderConfirmationCard";
import CartItems from "../result/CartItems";
import BookFreeCall from "../AcneSlotBooking";
import moment from "moment";

const OrderConfirmationView = ({
  orderDetails,
  setShowDrawer,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  setAvailableSlots,
  transformedSlots,
  bookedSuccess,
  doctorDetails,
  handleBookCall,
  showDrawer,
}) => {
  return (
    <>
      <div className="flex flex-col items-center md:space-y-6 px-0 py-[32px] md:px-[80px] md:py-[32px] min-h-screen relative">
        <OrderConfirmationCard
          orderDetails={orderDetails}
          setShowDrawer={setShowDrawer}
        />
        <div className="flex flex-col w-full lg:flex-row lg:gap-[40px]">
          <div className="lg:w-[50%]">
            {!bookedSuccess ? (
              <>
                <BookFreeCall
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  setAvailableSlots={setAvailableSlots}
                  transformedSlots={transformedSlots}
                  bookedSuccess={bookedSuccess}
                />
              </>
            ) : (
              <>
                <div className="flex flex-col items-center px-4 py-8 md:px-20 md:py-12 bg-[#F9FAFB] min-h-[60vh]">
                  <div className="w-full max-w-[720px] mx-auto">
                    <div className="bg-white border border-Elements/Divider-Stroke rounded-3xl shadow-sm p-6 md:p-10 flex flex-col items-center gap-6 md:gap-10 text-center">
                      <h2 className="text-[20px] md:text-[24px] font-medium tracking-wide leading-snug text-gray-900">
                        You're all set for your consultation with our Skin
                        Expert Doctors.
                      </h2>
                      <div className="text-[18px] md:text-[22px] font-normal text-gray-700">
                        {moment(selectedDate || new Date()).format("MMM Do")} at{" "}
                        {selectedTime}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="hidden lg:block lg:w-[50%] border-[1px] border-Elements/Divider-Stroke p-[24px] rounded-[24px] h-fit mx-auto">
            <CartItems
              cartItems={orderDetails?.orderDetails?.orderLineItems}
              totalCartValue={orderDetails?.orderDetails?.totalPrice}
              isThankYouPage={true}
            />
          </div>
        </div>
        {/* Mobile Drawer Overlay + Order Summary Drawer */}
        {showDrawer && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowDrawer(false)}
            />
            {/* Drawer */}
            <Drawer
              placement="bottom"
              closable={false}
              onClose={() => setShowDrawer(false)}
              open={showDrawer}
              height={"90%"}
              className="mobile-cart-drawer"
              title={
                <div className="flex flex-row items-center justify-between w-full">
                  <h2 className="font-lato font-[400] leading-[130%] text-[16px] text-Text/Heading-Text -tracking-[1%]">
                    Order Summary
                  </h2>
                  <div
                    onClick={() => setShowDrawer(false)}
                    className="cursor-pointer"
                  >
                    <Image
                      src={CrossIcon}
                      alt="Cross Icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              }
            >
              <AssignedDoctor
                isSmall={true}
                enableFees={true}
                isDrawer={true}
                doctorData={doctorDetails?.[0]}
              />
              <CartItems
                cartItems={orderDetails?.orderDetails?.orderLineItems}
                totalCartValue={orderDetails?.orderDetails?.totalPrice}
                isThankYouPage={true}
                isMobile={true}
              />
            </Drawer>
          </>
        )}
        {/* Sticky button at bottom */}
        <div
          className={`${
            !bookedSuccess && selectedTime !== null ? "" : "hidden"
          } fixed bottom-0 left-0 right-0 z-10 bg-white shadow-md`}
        >
          <div className="flex justify-center items-center md:h-[104px] h-[88px] border-t-[1px] border-t-Elements/Divider-Stroke">
            <button
              className="flex md:w-[400px] w-[360px] justify-center items-center h-[56px] bg-Tertiary/600 px-[56px] py-[16px] rounded-full text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%]"
              onClick={handleBookCall}
            >
              BOOK A CALL
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationView;
