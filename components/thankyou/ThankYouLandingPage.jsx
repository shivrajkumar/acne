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

const ThankYouLandingPage = ({ searchParams, bookACallOnly = false }) => {
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});
  const [resultData, setResultData] = useState(null);
  const [closeConfirm, setCloseConfirm] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  useEffect(() => {
    // Set loading to true when component mounts
    setLoading(true);

    // Check if booking was successful from localStorage
    if (typeof window !== "undefined") {
      const storedBookingStatus = localStorage.getItem("acne_booking_success");
      const storedBookingPending = localStorage.getItem("acne_booking_pending");
      const storedBookingDate = localStorage.getItem("acne_booking_date");
      const storedBookingTime = localStorage.getItem("acne_booking_time");

      if (storedBookingStatus === "true" || storedBookingPending === "true") {
        setBookedSuccess(true);

        if (storedBookingPending === "true") {
          localStorage.setItem("acne_booking_success", "true");
          localStorage.removeItem("acne_booking_pending");
        }

        if (storedBookingDate) setSelectedDate(storedBookingDate);
        if (storedBookingTime) setSelectedTime(storedBookingTime);
      }
    }

    // Load order details from API if platform_order_id exists
    if (searchParams?.platform_order_id) {
      getOrderDetails();
      getDoctorDetails();
    } else {
      setLoading(false);
    }

    //  result data from localStorage
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("acne_result_data");
        if (stored) {
          setResultData(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Error loading result data from localStorage:", error);
      } finally {
        if (!searchParams?.platform_order_id) {
          setLoading(false);
        }
      }
    }
  }, [searchParams?.platform_order_id]);

  //slots api
  useEffect(() => {
    if (
      (orderDetails?.customerDetail?.caseId ||
        resultData?.customerDetails?.caseId) &&
      !bookedSuccess
    ) {
      getAvailableSlots();
    } else if (orderDetails !== null || resultData !== null) {
      setLoading(false);
    }
  }, [bookedSuccess, orderDetails, resultData]);

  // Check if there's a valid caseId from either orderDetails or resultData
  const hasCaseId = useMemo(() => {
    if (loading) return true;

    return !!(
      orderDetails?.customerDetail?.caseId ||
      resultData?.customerDetails?.caseId
    );
  }, [orderDetails, resultData, loading]);

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

  const getAvailableSlots = async () => {
    setLoading(true);
    try {
      const response = await fetchRequest(
        GET_AVAILABLE_SLOTS(
          orderDetails?.customerDetail.caseId ||
            resultData?.customerDetails.caseId
        )
      );
      setAvailableSlots(response?.data || {});
    } catch (error) {
      console.error("Error fetching available slots:", error);
    } finally {
      setLoading(false);
      console.log("Loading state set to false");
    }
  };

  const transformedSlots = useMemo(() => {
    if (bookedSuccess) return []; // or null, or whatever is appropriate
    return transformSlotData(availableSlots?.slotDetails);
  }, [availableSlots?.slotDetails, bookedSuccess]);

  const handleBookCall = useCallback(async () => {
    try {
      if (
        !selectedDate ||
        !selectedTime ||
        (resultData && !resultData?.customerDetails?.caseId) ||
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
        customerId:
          orderDetails?.customerDetail.caseId ||
          resultData?.customerDetails.caseId,
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
    loading ||
    (searchParams?.platform_order_id === undefined &&
      orderDetails === null &&
      resultData === null);

  // Handle the case where data has loaded but no caseId exists
  const showTakeSkinTest = !initialLoading && !hasCaseId && !bookedSuccess;

  return initialLoading ? (
    <Loader />
  ) : (
    <>
      <AcneMarqueeBanner />
      <AcneHeader />
      {bookACallOnly ? (
        // Book a call only view
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
            />
            <div className="fixed bottom-0 left-0 right-0 md:h-[104px] h-[88px] bg-white flex justify-center items-center">
              <button
                className={`${
                  bookedSuccess ? "hidden" : "flex"
                } md:w-[400px] w-[360px] justify-center items-center h-[56px] bg-Tertiary/600 px-[56px] py-[16px] rounded-full my-[24px] text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%]`}
                onClick={handleBookCall}
              >
                BOOK A CALL
              </button>
            </div>
          </div>
        </div>
      ) : searchParams?.platform_order_id !== undefined ? (
        // Full view with order confirmation
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
      ) : showTakeSkinTest ? (
        // Show "Take the Skin Test" option as the last option
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
      ) : null}

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
                    localStorage.setItem("acne_booking_success", "true");
                    localStorage.removeItem("acne_booking_pending");
                  }
                }
              }}
              setBookedSuccess={setBookedSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ThankYouLandingPage;
