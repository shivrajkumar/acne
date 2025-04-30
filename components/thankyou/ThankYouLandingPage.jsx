"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import OrderConfirmationCard from "./OrderConfirmationCard";
import { fetchRequest } from "../../helpers/fetchRequest";
import {
  BOOK_SLOT_API,
  GET_AVAILABLE_SLOTS,
  GET_STATIC_DOCTOR_DETAILS,
  ORDER_DETAILS,
} from "@/constants/urls";
import CartItems from "../result/CartItems";
import Loader from "../generic/Loader";
import { Drawer } from "antd";
import CrossIcon from "@assets/icons/close-circle.png";
import Image from "next/image";
import AssignedDoctor from "../result/AssignDoctor";
import BookFreeCall from "../AcneSlotBooking";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/AcneHeader";
import SlotConfirmPop from "../SlotConfirmPop";
import { isEmpty } from "lodash";
import moment from "moment";

const ThankYouLandingPage = ({ searchParams }) => {
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});
  const [closeConfirm, setCloseConfirm] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  useEffect(() => {
    // Set loading to true when component mounts
    setLoading(true);

    // Check if booking was successful from localStorage
    if (typeof window !== "undefined") {
      const storedBookingStatus = localStorage.getItem("vayu_booking_success");
      const storedBookingPending = localStorage.getItem("vayu_booking_pending");

      if (storedBookingStatus === "true") {
        setBookedSuccess(true);
      } else if (storedBookingPending === "true") {
        // If booking was pending but page refreshed, convert to success
        setBookedSuccess(true);
        localStorage.setItem("vayu_booking_success", "true");
        localStorage.removeItem("vayu_booking_pending");
      }
    }

    // Load order details from API if platform_order_id exists
    if (searchParams?.platform_order_id) {
      getOrderDetails();
      getDoctorDetails();
    } else {
      setLoading(false);
    }
  }, [searchParams?.platform_order_id]);

  //slots api
  useEffect(() => {
    if (orderDetails?.customerDetail?.caseId) {
      getAvailableSlots();
    } else if (orderDetails !== null) {
      setLoading(false);
    }
  }, [orderDetails]);

  // Check if there's a valid caseId from either orderDetails or resultData
  const hasCaseId = useMemo(() => {
    if (loading) return true;

    return !!orderDetails?.customerDetail?.caseId;
  }, [orderDetails, loading]);

  const getOrderDetails = async () => {
    try {
      const res = await fetchRequest(
        ORDER_DETAILS(searchParams?.platform_order_id)
      );
      if (res.status == 200) {
        setOrderDetails(res.data);
      }
    } catch (error) {
      console.error("Error parsing order details from localStorage:", error);
      return null;
    }
  };

  //doctors details api
  const getDoctorDetails = async () => {
    try {
      const res = await fetchRequest(GET_STATIC_DOCTOR_DETAILS);
      if (res.status === 200) {
        setDoctorDetails(res.data.data.content);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const transformSlotData = (slotDetails) => {
    if (isEmpty(slotDetails)) {
      console.log("Slot details empty, returning empty object");
      return {};
    }

    const groupedSlots = Object.entries(slotDetails).reduce(
      (acc, [datetime, users]) => {
        const dateStr = moment.utc(datetime).format("YYYY-MM-DD");
        acc[dateStr] = acc[dateStr] || [];
        acc[dateStr].push({ time: datetime, users });
        return acc;
      },
      {}
    );

    Object.keys(groupedSlots).forEach((date) => {
      groupedSlots[date].sort((a, b) => a.time.localeCompare(b.time));
    });

    return groupedSlots;
  };

  const getAvailableSlots = async () => {
    setLoading(true);
    try {
      const response = await fetchRequest(
        GET_AVAILABLE_SLOTS(orderDetails?.customerDetail.caseId)
      );
      setAvailableSlots(response?.data || {});
    } catch (error) {
      console.error("Error fetching available slots:", error);
    } finally {
      setLoading(false);
      console.log("Loading state set to false");
    }
  };

  const transformedSlots = useMemo(
    () => transformSlotData(availableSlots?.slotDetails),
    [availableSlots?.slotDetails]
  );

  const handleBookCall = useCallback(async () => {
    try {
      if (
        !selectedDate ||
        !selectedTime ||
        (orderDetails && !orderDetails.customerDetail?.caseId) ||
        !availableSlots
      ) {
        console.error("Missing required data for slot booking");
        return;
      }
      const selectedDateSlots = transformedSlots?.[selectedDate] ?? [];
      const date = new Date(`${selectedDate} ${selectedTime}`);
      const SelectedTimeISOString = date.toISOString();

      const selectedSlot = selectedDateSlots.find(
        (slot) => slot.time === SelectedTimeISOString
      );

      if (!selectedSlot) {
        console.error("Selected slot not found");
        return;
      }

      const slotPayload = {
        customerId: orderDetails?.customerDetail.caseId,
        slotStartTime: SelectedTimeISOString,
        availableSlots: selectedSlot.users ?? [],
        tagDetails: availableSlots.tagDetails ?? {},
        isRescheduling: false,
        fromCrm: false,
        requestFromWeb: true,
        isOfflineSlot: false,
        bookedUrl: window.location.href,
        bookedPlatform: null,
        bookedReason: "",
      };

      const _options = {
        method: "POST",
        body: JSON.stringify(slotPayload),
      };

      const response = await fetchRequest(BOOK_SLOT_API, _options);
      if (response.status === 200) {
        // Store booking information for persistence without changing state yet
        if (typeof window !== "undefined") {
          // Store the booking details but mark as pending confirmation
          localStorage.setItem("vayu_booking_pending", "true");
        }

        // Show confirmation modal
        setCloseConfirm(true);
      }
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  }, [
    selectedDate,
    selectedTime,
    orderDetails,
    availableSlots,
    transformedSlots,
  ]);

  const handleTakeSkinTest = () => {
    window.location.href = "/skin-test";
  };

  //  initial loading state
  const initialLoading =
    loading || (searchParams?.platform_order_id && orderDetails === null);

  // Handle the case where data has loaded but no caseId exists
  const showTakeSkinTest = !initialLoading && !hasCaseId;

  const link = `orders?platform_order_id=${searchParams?.platform_order_id}&page=thank_you`;

  return initialLoading ? (
    <Loader />
  ) : (
    <>
      <AcneMarqueeBanner />
      <AcneHeader />
      {showTakeSkinTest ? (
        // Show "Take the Skin Test" option if no caseId
        <div className="flex flex-col items-center justify-center px-0 py-[32px] md:px-[80px] md:py-[64px] min-h-[60vh]">
          <div className="text-center mb-8">
            <h2 className="text-[24px] md:text-[32px] font-[700] mb-4 text-Text/Heading-Text">
              Complete Your Skincare Journey
            </h2>
            <p className="text-[16px] md:text-[18px] text-Text/Body-Text max-w-[600px] mx-auto">
              To book a call with our skin specialists, please take our skin
              assessment first.
            </p>
          </div>
          <button
            className="flex justify-center items-center h-[56px] bg-Tertiary/600 px-[56px] py-[16px] rounded-full text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%]"
            onClick={handleTakeSkinTest}
          >
            TAKE THE SKIN TEST
          </button>
        </div>
      ) : (
        // Full view with order confirmation
        <div className="flex flex-col items-center md:space-y-6 px-0 py-[32px] md:px-[80px] md:py-[32px] min-h-screen relative">
          <OrderConfirmationCard
            orderDetails={orderDetails}
            setShowDrawer={setShowDrawer}
          />
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
                />
              ) : (
                <div className="flex flex-col justify-center items-center mx-auto md:p-[24px] rounded-[24px] md:rounded-[24px] border border-Elements/Divider-Stroke w-full relative font-lato md:gap-[40px] gap-0 bg-white">
                  <h2 className="font-[400] md:text-[24px] text-[20px] tracking-[0.5px] leading-[130%]">
                    You&#39;re all set for your consultation with our Skin
                    expert doctors.
                  </h2>
                  <div className="font-[400] md:text-[24px] text-[20px] tracking-[0.5px] leading-[130%]">
                    {moment(selectedDate || new Date()).format("MMM Do")}{" "}
                    {selectedTime}
                  </div>
                </div>
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
          {!bookedSuccess && (
            <div className="fixed bottom-0 left-0 right-0 z-10 bg-white shadow-md ">
              <div className="flex justify-center items-center md:h-[104px] h-[88px] border-t-[1px] border-t-Elements/Divider-Stroke">
                <button
                  className="flex md:w-[400px] w-[360px] justify-center items-center h-[56px] bg-Tertiary/600 px-[56px] py-[16px] rounded-full text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%]"
                  onClick={handleBookCall}
                >
                  BOOK A CALL
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {closeConfirm && (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#00000050] z-[100000000]">
          <div className="absolute shadow-2xl transform translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] bf">
            <SlotConfirmPop
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setClose={(value) => {
                setCloseConfirm(value);
                if (value === false) {
                  // User confirmed the booking
                  setBookedSuccess(true);

                  // Confirm the booking in localStorage
                  if (typeof window !== "undefined") {
                    localStorage.setItem("vayu_booking_success", "true");
                    localStorage.removeItem("vayu_booking_pending");
                  }
                }
              }}
              link={link}
              setBookedSuccess={setBookedSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ThankYouLandingPage;
