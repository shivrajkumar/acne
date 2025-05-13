'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import CheckmarkOrder from '@assets/icons/Checkmark-Order.png';
import ArrowDown from '@assets/icons/arrow-down.png';



const OrderConfirmationCard = ({
  orderDetails,
  showSummaryToggle = true,
  setShowDrawer = () => { },
}) => {
  const orderData = orderDetails?.orderDetails;

   useEffect(() => {
    if (orderData?.orderDisplayId) {
      localStorage.setItem('orderDisplayId', orderData.orderDisplayId);
    }
  }, [orderData?.orderDisplayId]);

  return (
    <>
      {/* Main Order Confirmation Card */}
      <div className="bg-Background/Beige w-full p-[16px] md:p-[24px] rounded-none md:rounded-[24px]">
        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
          <div className="flex flex-col items-start md:gap-4 gap-[10px]">
            <div className="text-2xl w-[35px] h-[35px] md:w-[48px] md:h-[48px]">
              <Image src={CheckmarkOrder} alt="order-checkmark" />
            </div>

            <div>
              <h2 className="md:text-[32px] text-[24px] mb-4 text-[#171819] font-[500] hidden md:block">
                Order placed, thanks!
              </h2>
              <h2 className="md:text-[32px] text-[24px] mb-4 text-[#171819] font-[500] block md:hidden">
                Order Confirmed
              </h2>
              <div className='flex gap-[8px]'>
                <p className="text-[12px] md:text-[16px] font-[400] text-[#171819]">
                  Order ID {orderData?.orderDisplayId}
                </p>
                <p className="text-[12px] md:text-[16px] font-[400] text-[#171819]">
                  |
                </p>
                <p className="text-[12px] md:text-[16px] font-[400] text-[#171819]">
                  Amount: ₹ {orderData?.totalPrice}
                </p>
              </div>

              <p className="text-[12px] md:text-[16px] font-[400] text-[#171819]">
                {`Estimated Delivery ${(orderDetails?.deliveryTat) - 2}-${orderDetails?.deliveryTat} days`}
              </p>
            </div>
          </div>

          {/* Mobile Order Summary Toggle */}
          {showSummaryToggle && (
            <div className="block md:hidden" onClick={() => setShowDrawer(true)}>
              <div
                className="mt-4 text-[14px] text-[#171819] font-[500] cursor-pointer items-center gap-1 flex"

              >
                ORDER SUMMARY
                <Image src={ArrowDown} width={20} height={20} alt="Arrow-Down" />
              </div>
            </div>
          )}
        </div>
      </div>


    </>
  );
};

export default OrderConfirmationCard;
