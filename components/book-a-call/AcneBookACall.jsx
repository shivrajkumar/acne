"use client";
import React, { useEffect, useMemo, useState } from "react";
import { fetchRequest } from "../../helpers/fetchRequest";
import { GET_AVAILABLE_SLOTS, BOOK_SLOT_API } from "@/constants/urls";
import Loader from "../generic/Loader";
import {
  getBookingStatusFromStorage,
  handleBookCall,
  transformSlotData,
} from "../../utils/bookacall";
import BookFreeCall from "../AcneSlotBooking";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/AcneHeader";
import SlotConfirmPop from "../SlotConfirmPop";

const AcneBookACallPage = ({ searchParams }) => {
  const [availableSlots, setAvailableSlots] = useState({});
  const [caseId, setCaseId] = useState(null);

  // UI states
  const [loading, setLoading] = useState(true);
  const [closeConfirm, setCloseConfirm] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  // Selection states
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Transform slots data when available
  const transformedSlots = useMemo(
    () => (bookedSuccess ? {} : transformSlotData(availableSlots?.slotDetails)),
    [availableSlots?.slotDetails, bookedSuccess]
  );

  useEffect(() => {
    let idFromParams = searchParams?.caseId;
    let idFromLocalStorage = null;

    setLoading(true);

    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("acne_result_data");
        idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;

        // Get booking info and update state
        const bookingInfo = getBookingStatusFromStorage();
        if (bookingInfo?.isBooked) {
          setBookedSuccess(true);
          setSelectedDate(bookingInfo.date);
          setSelectedTime(bookingInfo.time);
        }
      } catch (err) {
        console.error("Error accessing localStorage:", err);
      }
    }

    setCaseId(idFromParams || idFromLocalStorage || null);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [searchParams]);

  // Load slots when we have a caseId and booking hasn't happened yet
  useEffect(() => {
    if (caseId && !bookedSuccess) {
      getAvailableSlots(caseId);
    }
  }, [caseId, bookedSuccess]);

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
      BOOK_SLOT_API,
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

  // Then check loading state after caseId check
  if (loading) {
    return <Loader />;
  }

  // Determine which view to show
  const renderContent = () => {
    // First check if no caseId exists (regardless of loading state)
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
            bookACallOnly={true}
          />
          {!bookedSuccess && selectedTime !== null && (
            <div className="fixed bottom-0 left-0 right-0 md:h-[104px] h-[88px] bg-white flex justify-center items-center">
              <button
                className="md:w-[400px] w-[360px] justify-center items-center h-[56px] bg-Tertiary/600 px-[56px] py-[16px] rounded-full my-[24px] text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%]"
                onClick={bookACall}
              >
                BOOK A CALL
              </button>
            </div>
          )}
        </div>
      </div>
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

export default AcneBookACallPage;
