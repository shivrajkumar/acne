"use client";
import React, { useEffect, useMemo, useState } from "react";
import { fetchRequest } from "../../helpers/fetchRequest";
import {
  BOOK_SLOT_API,
  GET_ACTIVE_SLOTS_API,
  GET_AVAILABLE_SLOTS,
  GET_STATIC_DOCTOR_DETAILS,
  ORDER_DETAILS,
} from "@/constants/urls";
import Loader from "../generic/Loader";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/Header/AcneHeader";
import SlotConfirmPop from "../slot-booking/SlotConfirmPop";
import OrderConfirmationView from "./OrderConfimationView";
import { handleBookCall, transformSlotData } from "../../utils/bookacall";
import { logGtmEvent } from "../generic/Gtm";
import moment from "moment";
// import { pixelCustomeEvent } from "../generic/Pixel";
import { trackMoEngageEvent } from "@/utils/moegage";
import { trackUmamiEvent } from "@components/generic/UmamiTracker";
import { generateEventId } from "@/helpers/metaCapiHelper";

const ThankYouLandingPage = ({ searchParams }) => {
  // Core data states
  const [orderDetails, setOrderDetails] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});

  // UI states
  const [loading, setLoading] = useState(true); // Start with loading true
  const [loadingBookCall, setLoadingBookCall] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [closeConfirm, setCloseConfirm] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  // Selection states
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [caseId, setCaseId] = useState(null);

  // Error states
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  // Transform slots data when available
  const transformedSlots = useMemo(
    () => (bookedSuccess ? {} : transformSlotData(availableSlots?.slotDetails)),
    [availableSlots?.slotDetails, bookedSuccess]
  );

  // Check booking status from localStorage on mount
  useEffect(() => {
    const fetchData = async () => {
      let idFromLocalStorage = null;

      if (typeof window !== "undefined") {
        try {
          const storedData = localStorage.getItem("acne_result_data");
          idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId || localStorage.getItem("caseId");
        } catch (err) {
          console.error("Error accessing localStorage:", err);
        }
      }

      setCaseId(idFromLocalStorage || null);

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
    };

    fetchData();

    // Return empty cleanup function
    return () => { };
  }, [searchParams]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (caseId) {
        const booked = await getActiveSlotDetails(caseId); // returns true if already booked
        if (!booked) {
          await getAvailableSlots(caseId);
        } else {
          setLoading(false);
        }
      } else if (orderDetails !== null) {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [caseId, orderDetails]);

  // Fetch order details
  const getOrderDetails = async (orderId) => {
    try {
      const res = await fetchRequest(ORDER_DETAILS(orderId));
      if (res.status === 200) {
        setOrderDetails(res.data);
        const updatedCart = localStorage.getItem(`acne_result_data`);
        const optionalProductAdded = JSON.parse(updatedCart)?.productsDetails?.filter((prod) => prod?.isOptionalProduct);
        window.localStorage.setItem("order_count", res.data?.orderDetails?.orderSequence);
        logGtmEvent("Purchase", {
          gender: window.localStorage.getItem("user_gender"),
          orderId: `${res.data?.orderDetails?.orderId}`,
          order_value: `${res.data?.orderDetails?.totalPrice}`,
          currency: "INR",
          order_items: res.data?.orderDetails?.orderLineItems,
          caseId: `${caseId}`,
          transactionId: `${window.localStorage.getItem("user_tid")}`,
          event_id: generateEventId({ eventName: 'Purchase',phone: res.data?.customerDetail?.phoneNumber, orderId: res.data?.orderDetails?.orderId })
        });
        // pixelCustomeEvent("Purchase", {
        //   gender: window.localStorage.getItem("user_gender"),
        //   orderId: `${res.data?.orderDetails?.orderId}`,
        //   order_value: `${res.data?.orderDetails?.totalPrice}`,
        //   currency: "INR",
        //   order_items: res.data?.orderDetails?.orderLineItems,
        //   caseId: `${caseId}`,
        //   transactionId: `${window.localStorage.getItem("user_tid")}`,
        // });
        trackUmamiEvent('order_placed', {
          syntheticId: `${window.localStorage.getItem("user_tid")}`,
          revenue: res.data?.orderDetails?.totalPrice,
          currency: 'INR'
        });

        if (optionalProductAdded?.length > 0) {
          logGtmEvent("addon_scar_checkout_success", {
            product: optionalProductAdded, caseId: `${caseId}`,
            transactionId: `${window.localStorage.getItem("user_tid")}`,
            event_id: generateEventId({ eventName: 'addon_scar_checkout_success' })
          });
          trackMoEngageEvent("addon_scar_checkout_success", {
            product: optionalProductAdded,
            caseId: `${caseId}`,
            transactionId: `${window.localStorage.getItem("user_tid")}`,
            timestamp: new Date().toISOString(),
          });
        }
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

  // Button loader component
  const ButtonLoader = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      </div>
    );
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
          setBookingError(
            error.message ||
            "Failed to book your appointment. Please try again."
          );
        },
      });
      logGtmEvent("book-call-confirmed-with-order", {
        gender: window.localStorage.getItem("user_gender"),
        event_id: generateEventId({ eventName: 'book-call-confirmed-with-order' })
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
      setBookedSuccess(true);
    }
  };

  const getActiveSlotDetails = async (caseId) => {
    try {
      setError(null);
      const response = await fetchRequest(GET_ACTIVE_SLOTS_API(caseId));

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
        error={error}
        bookingError={bookingError}
        loadingBookCall={loadingBookCall}
        ButtonLoader={ButtonLoader}
        setError={setError}
        setBookingError={setBookingError}
      />
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

export default ThankYouLandingPage;
