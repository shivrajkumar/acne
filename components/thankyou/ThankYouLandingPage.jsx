"use client";
import React, { useEffect, useMemo, useState } from "react";
import { fetchRequest } from "../../helpers/fetchRequest";
import {
  BOOK_SLOT_API,
  GET_AVAILABLE_SLOTS,
  GET_STATIC_DOCTOR_DETAILS,
  ORDER_DETAILS,
} from "@/constants/urls";
import Loader from "../generic/Loader";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/AcneHeader";
import SlotConfirmPop from "../slot-booking/SlotConfirmPop";
import OrderConfirmationView from "./OrderConfimationView";
import {
  getBookingStatusFromStorage,
  handleBookCall,
  transformSlotData,
} from "../../utils/bookacall";

const ThankYouLandingPage = ({ searchParams }) => {
  // Core data states
  const [orderDetails, setOrderDetails] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});

  // UI states
  const [loading, setLoading] = useState(true); // Start with loading true
  const [showDrawer, setShowDrawer] = useState(false);
  const [closeConfirm, setCloseConfirm] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  // Selection states
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

 // Get the caseId from orderDetails if available
 const caseId = useMemo(
  () => orderDetails?.customerDetail?.caseId || null,
  [orderDetails]
);

  // Transform slots data when available
  const transformedSlots = useMemo(
    () => (bookedSuccess ? {} : transformSlotData(availableSlots?.slotDetails)),
    [availableSlots?.slotDetails, bookedSuccess]
  );

  // Check booking status from localStorage on mount
  useEffect(async () => {
    const bookingInfo = getBookingStatusFromStorage();

    if (bookingInfo?.isBooked) {
      setBookedSuccess(true);
      if (bookingInfo.date) setSelectedDate(bookingInfo.date);
      if (bookingInfo.time) setSelectedTime(bookingInfo.time);
    }

    if (searchParams?.platform_order_id) {
      try {
        await Promise.all([
          getOrderDetails(searchParams.platform_order_id),
          getDoctorDetails(),
        ]);
      } catch (error) {
        console.error(error);
      }
    }
    // Load order details if platform_order_id exists
    if (searchParams?.platform_order_id) {
      try {
        await Promise.all([
          getOrderDetails(searchParams.platform_order_id),
          getDoctorDetails(),
        ]);
      } catch (error) {
        console.error(error);
      }
    } else {
      setLoading(false);
    }
  }, [])

  // Load slots when we have a caseId and booking hasn't happened yet
  useEffect(() => {
    if (caseId && !bookedSuccess) {
      getAvailableSlots(caseId);
    } else if (orderDetails !== null) {
      setLoading(false);
    }
  }, [caseId, bookedSuccess, orderDetails]);

  // Fetch order details
  const getOrderDetails = async (orderId) => {
    try {
      const res = await fetchRequest(ORDER_DETAILS(orderId));
      if (res.status === 200) {
        setOrderDetails(res.data);
        
      }
      return res;
    } catch (error) {
      console.error("Error fetching order details:", error);
      return null;
    }
  };

  // Fetch doctor details
  const getDoctorDetails = async () => {
    try {
      const res = await fetchRequest(GET_STATIC_DOCTOR_DETAILS);
      if (res.status === 200) {
        setDoctorDetails(res.data.data.content);
      }
      return res;
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      return null;
    }
  };

  // Fetch available slots
  const getAvailableSlots = async (id) => {
    setLoading(true);
    try {
      const response = await fetchRequest(GET_AVAILABLE_SLOTS(id));
      setAvailableSlots(response?.data || {});
    } catch (error) {
      console.error("Error fetching available slots:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle booking a call

  const bookACall = async () => {
    await handleBookCall({
      selectedDate,
      selectedTime,
      caseId,
      availableSlots,
      transformedSlots,
      setCloseConfirm,
      BOOK_SLOT_API
    });
  };

  // Redirect to skin test
  const handleTakeSkinTest = () => {
    window.location.href = "/skin-test";
  };

  // Handle booking confirmation
  const handleConfirmBooking = (confirmed) => {
    setCloseConfirm(false);

    if (confirmed) {
      setBookedSuccess(true);

      // Confirm the booking in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("acne_booking_success", "true");
        localStorage.removeItem("acne_booking_pending");
      }
    }
  };

  // Determine which view to show
  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    // No case ID - show take test button
    if (!caseId && !bookedSuccess) {
      return (
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
      );
    }

    // Order Confirmation view (default when order ID exists)
    return (
      <OrderConfirmationView
        orderDetails={orderDetails}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        setAvailableSlots={setAvailableSlots}
        transformedSlots={transformedSlots}
        bookedSuccess={bookedSuccess}
        doctorDetails={doctorDetails}
        handleBookCall={bookACall}
      />
    );
  };

  return (
    <>
      <AcneMarqueeBanner />
      <AcneHeader />

      {renderContent()}

      {closeConfirm && (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#00000050] z-[100000000]">
          <div className="absolute shadow-2xl transform translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] bf">
            <SlotConfirmPop
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setClose={(value) => handleConfirmBooking(!value)}
            />
          </div>
        </div>
      )}

    </>
  );
};

export default ThankYouLandingPage;
