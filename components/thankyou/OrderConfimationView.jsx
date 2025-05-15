"use client";

import React, { useEffect, useRef } from "react";
import { Drawer } from "antd";
import CrossIcon from "@assets/icons/close-circle.png";
import Image from "next/image";
import AssignedDoctor from "../result/AssignDoctor";
import OrderConfirmationCard from "./OrderConfirmationCard";
import CartItems from "../result/CartItems";
import BookFreeCall from "../slot-booking/AcneSlotBooking";
import ConfirmedSlotView from "../slot-booking/ConfirmedSlotView";

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
  error,
  bookingError,
  loadingBookCall,
  ButtonLoader,
}) => {
  const errorRef = useRef(null);

  // Scroll to top error block if needed (desktop)
  useEffect(() => {
    if ((error || bookingError) && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [error, bookingError]);

  // Error message component
  const ErrorMessage = ({ message, isBookingError = false }) => {
    if (!message) return null;

    return (
      <div
        ref={isBookingError ? null : errorRef}
        className={`bg-red-50 border-l-4 border-red-500 p-4 mb-4 ${
          isBookingError ? "mt-4" : ""
        }`}
      >
        <div className="flex items-start">
          <div className="ml-3">
            <p className="text-sm text-red-700">{message}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center md:space-y-6 px-0 py-[32px] md:px-[80px] md:py-[32px] min-h-screen relative">
        <OrderConfirmationCard
          orderDetails={orderDetails}
          setShowDrawer={setShowDrawer}
        />
        <div className="md:block hidden">
          {/* Display any API errors */}
          <ErrorMessage message={error} />
          {/* Display booking errors */}
          <ErrorMessage message={bookingError} isBookingError={true} />
        </div>

        <div className="flex flex-col w-full lg:flex-row lg:gap-[40px]">
          <div className="lg:w-[50%]">
            {!bookedSuccess ? (
              <BookFreeCall
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                setAvailableSlots={setAvailableSlots}
                transformedSlots={transformedSlots}
                bookedSuccess={bookedSuccess}
              />
            ) : (
              <ConfirmedSlotView
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                height="min-h-[30vh]"
              />
            )}
          </div>
          <div className="hidden md:block lg:w-[50%] border-[1px] border-Elements/Divider-Stroke p-[24px] rounded-[24px] h-fit mx-auto">
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

        {/* Mobile error message near button */}
        {(error || bookingError) && (
          <div className="fixed bottom-[88px] left-0 right-0 z-50 px-4 md:hidden">
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-sm text-red-700">{error || bookingError}</p>
            </div>
          </div>
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
              disabled={loadingBookCall}
            >
              {loadingBookCall ? <ButtonLoader /> : "BOOK A CALL"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationView;
