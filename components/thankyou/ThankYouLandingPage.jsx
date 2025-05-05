"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchRequest } from "../../helpers/fetchRequest";
import {
  BOOK_SLOT_API,
  GET_AVAILABLE_SLOTS,
  GET_STATIC_DOCTOR_DETAILS,
  ORDER_DETAILS,
} from "@/constants/urls";
import { isEmpty } from "lodash";
import moment from "moment";
import Loader from "../generic/Loader";
import BookFreeCall from "../AcneSlotBooking";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/AcneHeader";
import SlotConfirmPop from "../SlotConfirmPop";
import OrderConfirmationView from "./OrderConfimationView";

/**
 * Transforms slot data from API into a more usable format for the UI
 */
const transformSlotData = (slotDetails) => {
  if (isEmpty(slotDetails)) {
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

  // Sort times for each date
  Object.keys(groupedSlots).forEach((date) => {
    groupedSlots[date].sort((a, b) => a.time.localeCompare(b.time));
  });

  return groupedSlots;
};

const ThankYouLandingPage = ({ searchParams, bookACallOnly = false }) => {
  // Core data states
  const [orderDetails, setOrderDetails] = useState(null);
  const [resultData, setResultData] = useState(null);
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

  // Get the caseId from either source
  const caseId = useMemo(
    () =>
      orderDetails?.customerDetail?.caseId ||
      resultData?.customerDetails?.caseId,
    [orderDetails, resultData]
  );

  // Transform slots data when available
  const transformedSlots = useMemo(
    () => (bookedSuccess ? {} : transformSlotData(availableSlots?.slotDetails)),
    [availableSlots?.slotDetails, bookedSuccess]
  );

  // Check booking status from localStorage on mount
  useEffect(async () => {
    if (typeof window !== "undefined") {
      // Check existing booking status
      const storedBookingStatus = localStorage.getItem("acne_booking_success");
      const storedBookingPending = localStorage.getItem("acne_booking_pending");

      if (storedBookingStatus === "true" || storedBookingPending === "true") {
        setBookedSuccess(true);

        // Update localStorage if booking was pending
        if (storedBookingPending === "true") {
          localStorage.setItem("acne_booking_success", "true");
          localStorage.removeItem("acne_booking_pending");
        }

        // Restore booking details
        const storedDate = localStorage.getItem("acne_booking_date");
        const storedTime = localStorage.getItem("acne_booking_time");
        if (storedDate) setSelectedDate(storedDate);
        if (storedTime) setSelectedTime(storedTime);
      }

      // Load result data if available
      try {
        const stored = localStorage.getItem("acne_result_data");
        if (stored) {
          setResultData(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Error loading result data from localStorage:", error);
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
    } else if (orderDetails !== null || resultData !== null) {
      setLoading(false);
    }
  }, [caseId, bookedSuccess, orderDetails, resultData]);

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
  const handleBookCall = useCallback(async () => {
    if (!selectedDate || !selectedTime || !caseId || !availableSlots) {
      console.error("Missing required data for slot booking");
      return;
    }

    try {
      const selectedDateSlots = transformedSlots?.[selectedDate] || [];
      const date = new Date(`${selectedDate} ${selectedTime}`);
      const selectedTimeISOString = date.toISOString();

      const selectedSlot = selectedDateSlots.find(
        (slot) => slot.time === selectedTimeISOString
      );

      if (!selectedSlot) {
        console.error("Selected slot not found");
        return;
      }

      const slotPayload = {
        customerId: caseId,
        slotStartTime: selectedTimeISOString,
        availableSlots: selectedSlot.users || [],
        tagDetails: availableSlots.tagDetails || {},
        isRescheduling: false,
        fromCrm: false,
        requestFromWeb: true,
        isOfflineSlot: false,
        bookedUrl: window.location.href,
        bookedPlatform: null,
        bookedReason: "",
      };

      const response = await fetchRequest(BOOK_SLOT_API, {
        method: "POST",
        body: JSON.stringify(slotPayload),
      });

      if (response.status === 200) {
        // Mark booking as pending in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("acne_booking_pending", "true");
          localStorage.setItem("acne_booking_date", selectedDate);
          localStorage.setItem("acne_booking_time", selectedTime);
        }

        // Show confirmation modal
        setCloseConfirm(true);
      }
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  }, [selectedDate, selectedTime, caseId, availableSlots, transformedSlots]);

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

    // Book Call Only view
    if (bookACallOnly) {
      return (
        <div className="flex flex-col items-center md:space-y-6 px-0 py-[32px] md:px-[80px] md:py-[32px]">
          <div className="w-full max-w-[720px] mx-auto">
            <BookFreeCall
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              setAvailableSlots={setAvailableSlots}
              transformedSlots={transformedSlots}
              bookedSuccess={bookedSuccess}
              bookACallOnly={bookACallOnly}
            />
            {!bookedSuccess && selectedTime !== null && (
              <div className="fixed bottom-0 left-0 right-0 md:h-[104px] h-[88px] bg-white flex justify-center items-center">
                <button
                  className="md:w-[400px] w-[360px] justify-center items-center h-[56px] bg-Tertiary/600 px-[56px] py-[16px] rounded-full my-[24px] text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%]"
                  onClick={handleBookCall}
                >
                  BOOK A CALL
                </button>
              </div>
            )}
          </div>
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
        handleBookCall={handleBookCall}
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
