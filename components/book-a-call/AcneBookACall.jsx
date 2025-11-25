"use client";
import React, { useEffect, useMemo, useState } from "react";
import { fetchRequest } from "../../helpers/fetchRequest";
import {
  GET_AVAILABLE_SLOTS,
  BOOK_SLOT_API,
  GET_ACTIVE_SLOTS_API,
} from "@/constants/urls";
import Loader from "../generic/Loader";
import { handleBookCall, transformSlotData } from "../../utils/bookacall";
import BookFreeCall from "../slot-booking/AcneSlotBooking";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/Header/AcneHeader";
import SlotConfirmPop from "../slot-booking/SlotConfirmPop";
import moment from "moment";
import { logGtmEvent } from "../generic/Gtm";
import { generateEventId } from "@/helpers/metaCapiHelper";

const AcneBookACallPage = ({ searchParams }) => {
  const [availableSlots, setAvailableSlots] = useState({});
  const [caseId, setCaseId] = useState(null);

  // UI states
  const [loading, setLoading] = useState(true);
  const [loadingBookCall, setLoadingBookCall] = useState(false);
  const [closeConfirm, setCloseConfirm] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  // Error states
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  // Selection states
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Transform slots data when available
  const transformedSlots = useMemo(
    () => (bookedSuccess ? {} : transformSlotData(availableSlots?.slotDetails)),
    [availableSlots?.slotDetails, bookedSuccess]
  );

  useEffect(() => {
    const phone = typeof window != undefined && window.localStorage.getItem("user_phone");
    logGtmEvent("book-call-confirmed-without-order", {
      gender: window.localStorage.getItem("user_gender"),
      event_id: generateEventId({ eventName: 'book-call-confirmed-without-order', phone: phone })
    })
  }, [])

  useEffect(() => {
    let idFromParams = searchParams?.caseId;
    let idFromLocalStorage = null;

    setLoading(true);
    // Clear errors when component re-mounts or parameters change
    setError(null);
    setBookingError(null);

    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("acne_result_data");
        idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;
      } catch (err) {
        console.error("Error accessing localStorage:", err);
        setError("Failed to retrieve your data. Please refresh the page.");
      }
    }

    setCaseId(idFromParams || idFromLocalStorage || null);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [searchParams]);

  // Load slots when we have a caseId and booking hasn't happened yet
  useEffect(() => {
    if (caseId == null) return;

    if (bookedSuccess === false) {
      getAvailableSlots(caseId);
    }

    getActiveSlotDetails(caseId);
  }, [caseId, bookedSuccess]);

  const getActiveSlotDetails = async (id) => {
    try {
      setError(null);
      const response = await fetchRequest(GET_ACTIVE_SLOTS_API(id));

      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch active slot details");
      }

      const reminderDate = response?.data?.reminderDate;

      if (reminderDate) {
        const formattedDate = moment(reminderDate).format("ddd, MMM D, YYYY");
        const formattedTime = moment(reminderDate).format("hh:mm A");
        setSelectedDate(formattedDate);
        setSelectedTime(formattedTime);
        setBookedSuccess(true);
      }
    } catch (error) {
      console.error("Error fetching active slot details:", error);
      setError(
        "Failed to fetch your active appointment details. Please try again later."
      );
    }
  };

  // Fetch available slots
  const getAvailableSlots = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchRequest(GET_AVAILABLE_SLOTS(id));

      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch available slots");
      }

      setAvailableSlots(response?.data || {});
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setError("Failed to load available time slots. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle booking a call
  const bookACall = async () => {
    setBookingError(null);
    setLoadingBookCall(true);

    try {
      if (!selectedDate || !selectedTime) {
        setBookingError(
          "Please select both a date and time for your appointment."
        );
        setLoadingBookCall(false);
        return;
      }

      await handleBookCall({
        selectedDate,
        selectedTime,
        caseId,
        availableSlots,
        transformedSlots,
        setCloseConfirm,
        BOOK_SLOT_API,
        onError: (error) => {
          console.error("Booking failed:");
          setBookingError(
            error.message ||
            "Failed to book your appointment. Please try again."
          );
        },
      });
    } catch (error) {
      console.error("Error in bookACall:");
      setBookingError(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoadingBookCall(false);
    }
  };

  // Redirect to skin test
  const handleTakeSkinTest = () => {
    window.location.href = "/skin-test";
  };

  // Handle booking confirmation
  const handleConfirmBooking = (confirmed) => {
    setCloseConfirm(false);

    if (confirmed) {
      const phone = window.localStorage.getItem("user_phone");
      setBookedSuccess(true);
      setBookingError(null); // Clear any previous errors
      logGtmEvent("book-call-confirmed-without-order", {
        gender: window.localStorage.getItem("user_gender"),
        event_id: generateEventId({ eventName: 'book-call-confirmed-without-order', phone: phone })
      })
    }
  };

  // Display error message component
  const ErrorMessage = ({ message, isBookingError = false }) => {
    if (!message) return null;

    return (
      <div
        className={`bg-red-50 border-l-4 border-red-500 p-4 mb-4 ${isBookingError ? "mt-4" : ""
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

  // Button loader component
  const ButtonLoader = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      </div>
    );
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
            TAKE THE SKIN DIAGNOSIS
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center md:space-y-6 px-0 py-[32px] md:px-[80px] md:py-[32px]">
        <div className="w-full max-w-[720px] mx-auto">
          {/* <div className="md:block hidden">
          <ErrorMessage message={error} />
          <ErrorMessage message={bookingError} isBookingError={true} />
        </div> */}

          <BookFreeCall
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            setAvailableSlots={setAvailableSlots}
            transformedSlots={transformedSlots}
            bookedSuccess={bookedSuccess}
            bookACallOnly={true}
            error={error}
            bookingError={bookingError}
            setBookingError={setBookingError}
            setError={setError}
          />


          {!bookedSuccess && selectedTime !== null && (
            <div className="fixed bottom-0 left-0 right-0 md:h-[104px] h-[88px] bg-white flex justify-center items-center z-[48] shadow-lg border-t border-gray-200">
              <button
                className="md:w-[400px] w-[360px] justify-center items-center h-[56px] bg-Primary/500 px-[56px] py-[16px] rounded-full my-[24px] text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%] active:opacity-90 cursor-pointer flex"
                onClick={bookACall}
                disabled={loadingBookCall}
              >
                {loadingBookCall ? <ButtonLoader /> : "BOOK A CALL"}
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
      <div className="sticky top-0 z-50">
        <AcneHeader />
      </div>


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