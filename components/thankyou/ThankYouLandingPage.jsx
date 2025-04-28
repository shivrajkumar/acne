"use client";

import React, { useEffect, useState } from "react";
import OrderConfirmationCard from "./OrderConfirmationCard";
import { fetchRequest } from "../../helpers/fetchRequest";
import { GET_STATIC_DOCTOR_DETAILS, ORDER_DETAILS } from "@/constants/urls";
import CartItems from "../result/CartItems";
import Loader from "../generic/Loader";
import { Drawer } from 'antd';
import CrossIcon from "@assets/icons/close-circle.png";
import Image from "next/image";
import AssignedDoctor from "../result/AssignDoctor";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/AcneHeader";

const ThankYouLandingPage = ({ searchParams }) => {
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null)

  useEffect(() => {
    if (searchParams?.platform_order_id) {
      getOrderDetails();
      getDoctorDetails();
    }
  }, [searchParams?.platform_order_id]);

  const getOrderDetails = async () => {
    setLoading(true);
    try {
      const res = await fetchRequest(ORDER_DETAILS(searchParams?.platform_order_id));
      if (res.status == 200) {
        setOrderDetails(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error parsing order details from localStorage:", error);
      setLoading(false);
      return null;
    }
  };

  const getDoctorDetails = async () => {
    try {
      const res = await fetchRequest(GET_STATIC_DOCTOR_DETAILS)
      if (res.status === 200) {
        setDoctorDetails(res.data.data.content)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return loading ? <Loader /> : (
    <>
      <AcneMarqueeBanner />
      <AcneHeader />
      <div className="flex flex-col items-center space-y-6 px-0 py-[32px] md:px-[80px] md:py-[32px]">
        <OrderConfirmationCard orderDetails={orderDetails} setShowDrawer={setShowDrawer} />
        <div className="flex flex-col w-full lg:flex-row lg:gap-[40px]">
          <div className="hidden lg:block lg:w-[40%] border-[1px] border-Elements/Divider-Stroke p-[24px] rounded-[24px] h-fit mx-auto">
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
                  <h2 className="font-lato font-[600] text-[18px] text-Text/Heading-Text -tracking-[1%]">
                    Order Summary
                  </h2>
                  <div onClick={() => setShowDrawer(false)} className="cursor-pointer">
                    <Image src={CrossIcon} alt="Cross Icon" width={24} height={24} />
                  </div>
                </div>
              }
            >
              <AssignedDoctor isSmall={true} enableFees={true} isDrawer={true} doctorData={doctorDetails[0]} />
              <CartItems
                cartItems={orderDetails?.orderDetails?.orderLineItems}
                totalCartValue={orderDetails?.orderDetails?.totalPrice}
                isThankYouPage={true}
                isMobile={true}
              />
            </Drawer>
          </>
        )}
      </div>
    </>
  );
};

export default ThankYouLandingPage;