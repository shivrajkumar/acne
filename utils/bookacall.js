import { isEmpty } from "lodash";
import moment from "moment";
import MorningIcon from "@assets/svg/morning.svg";
import AfternoonIcon from "@assets/svg/afternoon.svg";
import EveningIcon from "@assets/svg/evening.svg";
import NightIcon from "@assets/svg/night.svg";
import { fetchRequest } from "@/helpers/fetchRequest";

/**
 * Transforms slot data from API into a more usable format for the UI
 */
export const transformSlotData = (slotDetails) => {
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

/**
 * Groups time slots into periods of the day
 * @param {Array} slots - Array of slot objects with time property
 * @returns {Object} Object with period keys (Morning, After Noon, Evening, Night)
 */
export const groupSlotsByPeriod = (slots = []) => {
  const groups = { Morning: [], "After Noon": [], Evening: [], Night: [] };

  if (!Array.isArray(slots) || slots.length === 0) {
    return groups;
  }

  slots.forEach(({ time }) => {
    const localTime = moment.utc(time).local();
    const hour = localTime.hour();
    const formattedTime = localTime.format("hh:mm A");

    if (hour >= 5 && hour < 12) {
      groups.Morning.push(formattedTime);
    } else if (hour >= 12 && hour < 17) {
      groups["After Noon"].push(formattedTime);
    } else if (hour >= 17 && hour < 21) {
      groups.Evening.push(formattedTime);
    } else {
      groups.Night.push(formattedTime);
    }
  });

  return groups;
};

/**
 * Returns the appropriate icon for each time period
 * @param {string} period - Time period name
 * @returns {string} Icon path
 */
export const getIconForPeriod = (period) => {
  switch (period) {
    case "Morning":
      return MorningIcon;
    case "After Noon":
      return AfternoonIcon;
    case "Evening":
      return EveningIcon;
    case "Night":
      return NightIcon;
    default:
      return MorningIcon;
  }
};


/**
 * Retrieves booking status and details from localStorage.
 * Promotes a pending booking to a successful booking if found.
 *
 * @returns {{ isBooked: boolean, date: string | null, time: string | null } | null}
 * An object containing:
 * - `isBooked`: Whether the booking is confirmed or pending
 * - `date`: The stored booking date, or null if not set
 * - `time`: The stored booking time, or null if not set
 * Returns `null` if not in a browser environment.
 */
export const getBookingStatusFromStorage = () => {
  if (typeof window === "undefined") return null;

  const storedBookingStatus = localStorage.getItem("acne_booking_success");
  const storedBookingPending = localStorage.getItem("acne_booking_pending");
  const storedDate = localStorage.getItem("acne_booking_date");
  const storedTime = localStorage.getItem("acne_booking_time");

  const isBooked =
    storedBookingStatus === "true" || storedBookingPending === "true";

  // Promote pending to success
  if (storedBookingPending === "true") {
    localStorage.setItem("acne_booking_success", "true");
    localStorage.removeItem("acne_booking_pending");
  }

  return {
    isBooked,
    date: storedDate || null,
    time: storedTime || null,
  };
};



/**
 * Common function to handle booking a call
 * @param {string} selectedDate - The selected date in YYYY-MM-DD format
 * @param {string} selectedTime - The selected time in HH:MM format
 * @param {string} caseId - The customer ID
 * @param {Object} availableSlots - Available slots data
 * @param {Object} transformedSlots - Transformed slots by date
 * @param {function} setCloseConfirm - Function to set close confirmation modal state
 * @param {function} onSuccess - Optional callback for successful booking
 * @param {function} onError - Optional callback for error handling
 * @returns {Promise<Object|null>} The API response or null if error
 */
export const handleBookCall = async ({
  selectedDate,
  selectedTime,
  caseId,
  availableSlots,
  transformedSlots,
  setCloseConfirm,
  BOOK_SLOT_API,
  onSuccess=()=>{},
  onError=()=>{}
}) => {
  // Validate required parameters
  if (!selectedDate || !selectedTime || !caseId || !availableSlots) {
    const error = new Error("Missing required data for slot booking");
    console.error(error);
    if (onError) onError(error);
    return null;
  }

  try {
    // Find the selected slot
    const selectedDateSlots = transformedSlots?.[selectedDate] || [];
    const date = new Date(`${selectedDate} ${selectedTime}`);
    const selectedTimeISOString = date.toISOString();

    const selectedSlot = selectedDateSlots.find(
      (slot) => slot.time === selectedTimeISOString
    );

    if (!selectedSlot) {
      const error = new Error("Selected slot not found");
      console.error(error);
      if (onError) onError(error);
      return null;
    }

    // Prepare payload for booking
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

    // Make API request
    const response = await fetchRequest(BOOK_SLOT_API, {
      method: "POST",
      body: JSON.stringify(slotPayload),
    });

    // Handle successful response
    if (response.status === 200) {
      // Store booking details in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("acne_booking_pending", "true");
        localStorage.setItem("acne_booking_date", selectedDate);
        localStorage.setItem("acne_booking_time", selectedTime);
      }

      // Show confirmation modal
      if (setCloseConfirm) {
        setCloseConfirm(true);
      }

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } else {
      throw new Error(`Booking failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error booking slot:", error);
    if (onError) {
      onError(error);
    }
    return null;
  }
};