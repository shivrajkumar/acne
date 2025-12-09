import Cookies from "js-cookie";
import { env } from "next-runtime-env";

const PUBLIC_API_BASE_URL = env("NEXT_PUBLIC_PUBLIC_API_URL_BASE");
const INTERNAL_GATEWAY_API_URL = env("NEXT_PUBLIC_INTERNAL_GATEWAY_API_URL");
// function to generate url

const PROXY_PREFIX = "/api/proxy";

const getUrl = (url) => `${PROXY_PREFIX}/${url}`; // ends

export function getValidJSONFromString(strOrNull) {
  if (typeof strOrNull !== "string") {
    return {};
  }

  try {
    return JSON.parse(strOrNull);
  } catch {
    return {};
  }
}

export const getUtmCookiesInObjectForm = () => {
  const existingCookie = Cookies.get("__CLEAR_RITUAL_UTM__");

  return getValidJSONFromString(existingCookie);
};

export const INGESTION_API = () => {
  return getUrl(`consumer-api/service/consumers/customer/responses`);
};
export const RESPONSES_API = getUrl("responses");
export const UPLOAD_API = (caseId) => getUrl(`case/${caseId}/upload`);

//Consult call api
export const CONSULT_CALL_API = getUrl("consult_slots");
export const GET_CONSULT_CALL_API = (case_id) =>
  getUrl(`consult_slots/${case_id}`);

export const SLOTS_API = getUrl("slots");
export const NEW_SLOTS_API = getUrl("v3/slots/slot-booking");
export const DOCTOR_FORM_SLOT = (sessionId) =>
  getUrl(`v4/doctor_form_slot?session_id=${sessionId}`);
export const BOOK_FOLLOW_UP_CALL = getUrl(`v4/doctor_form_slot`);
export const CONFIRM_DOCTOR_FORM_SLOT_API = (sessionId) =>
  getUrl(`v4/confirm_doctor_form_slot?session_id=${sessionId}`);
export const INITIATE_SLOT_REFUND = (sessionId) =>
  getUrl(`v4/refund-and-release-slot?session_id=${sessionId}`);
export const BOOK_APPOINTMENT_API = getUrl("book-appointment");
export const DOWNLOAD_INVOICE = getUrl("downloadInvoiceURL");
export const GET_SLOTS_API = (
  case_id,
  firstBooking,
  sessionId,
  is_transplant
) => {
  if (firstBooking) {
    return getUrl(
      `v3/slots/${case_id}?first_booking=${firstBooking}&session_id=${sessionId}`
    );
  } else if (is_transplant) {
    return getUrl(`v3/slots/${case_id}?is_transplant=${is_transplant}`);
  } else {
    return getUrl(`v3/slots/${case_id}?session_id=${sessionId}`);
  }
};
export const GET_SLOTS_API_REACTIONS = (case_id) => {
  return getUrl(`v3/slots/${case_id}?is_medical_escalation=true&level=1`);
};
export const BOOK_REACTION_SLOTS = () => {
  return getUrl(`book-allergy-medical-slot`);
};
export const RESCHEDULE_DOCTOR_SLOT = (case_id, sessionId) =>
  getUrl(`v4/reschedule-doctor-booking/${case_id}?session_id=${sessionId}`);

export const GET_ONBOARDING_SLOTS_API = (case_id, firstBooking) => {
  if (firstBooking) {
    return getUrl(
      `v3/slots/onboarding?caseId=${case_id}&first_booking=${firstBooking}`
    );
  }
  return getUrl(`v3/slots/onboarding?caseId=${case_id}`);
};
export const GET_DOCTOR_SLOTS_API = (case_id, sessionId, reschedule) =>
  getUrl(
    `v4/slots/doctor/${case_id}?session_id=${sessionId}&is_rescheduling=${reschedule}`
  );

export const TRANSACTION_API = (transactionId) => {
  return getUrl(`consumer-api/service/acne-forms/submit/${transactionId}`);
};
export const PHOTO_TRANSACTION_API = (transactionId) => {
  return getUrl(`photoTransaction/${transactionId}`);
};

export const DOCS_TRANSACTIONAPI = (transactionId) => {
  return getUrl(`otherdocs/${transactionId}`);
};
export const DOCS_UPLOAD = (caseId) => {
  return getUrl(`case/${caseId}/uploaddocs`);
};
//mini Form
export const MF_ONBOARDING_API = getUrl("v2/on-boarding");

export const MF_TRANSACTION_API = (transactionId, value) => {
  if (value) {
    return getUrl(`v2/transaction/${transactionId}?source=${value}`);
  }
  return getUrl(`v2/transaction/${transactionId}`);
};

export const MF_SUBMIT = (transactionId) => {
  return getUrl(`v2/on-boarding/${transactionId}`);
};

//Calendly Form
export const CF_ONBOARDING_API = (value) => {
  return getUrl(`v2/onboard-user?source=${value}`);
};

export const V4_ONBOARDING_API = (value, is_rescheduling, sessionId) => {
  if (is_rescheduling) {
    return getUrl(
      `v4/slots/onboard-user?source=${value}&is_rescheduling=${is_rescheduling}&session_id=${sessionId}`
    );
  } else {
    return getUrl(
      `v4/slots/onboard-user?source=${value}&session_id=${sessionId}`
    );
  }
};

export const GET_CHOLESTROL_SLOTS_API = (case_id) => {
  return getUrl(`cholestrol-form-slots/${case_id}`);
};
export const GET_RAZORPAY_PAYMENT_INFO_API = (caseId) => {
  return getUrl(`razorPay-payment-info/${caseId}`);
};

export const CREATE_RESPONSE_GUEST_FORM = getUrl(`v5/create-response`);

export const UPDATE_RESPONSE_GUEST_FORM = (id) => {
  return getUrl(`v5/update-response/${id}`);
};

export const LOCK_CONSULT_DOCTOR_API = (slotId) => {
  return getUrl(`lock-consult-doctor-slot/${slotId}`);
};

export const NEW_RESULT_API = (syntheticID) => {
  return getUrl(`dgReport/result?id=${syntheticID}`);
};
export const SHOP_FLO_API = (syntheticID) => {
  return getUrl(`retrieve-cart?provider=shopflo&userId=${syntheticID}`);
};
export const UPLOAD_MULTIPLE_IMAGES = (userId) => {
  return getUrl(`uploadMultipleImages/${userId}`);
};

export const USER_ACTIVITY_LOG = getUrl("log-user-activity");

export const GET_PRODUCTS = `${PUBLIC_API_BASE_URL}/getProducts`;
export const CHALLENGE_API = getUrl("auth/challenge");
export const VALIDATE_API = getUrl("auth/validate");
export const CUSTOMER_DETAILS_API = getUrl("getCustomerDetails");
export const PRODUCT_CONTENT_API = (id, language) => {
  return `${PUBLIC_API_BASE_URL}/productContent/${id}?language=${language}`;
};
export const GET_DOCTORS_BY_CITY = `${PUBLIC_API_BASE_URL}/doctors/`;

export const GET_SKIN_TEST_CONFIG = (hautAiResponse) => {
  const config = 'ACNE_NEW_FORM_CONFIG';
  return `${PROXY_PREFIX}/consumer-api/service/static-content/data/${config}`;
};
// export const GET_SKIN_TEST_CONFIG = (hautAiResponse) => {
//   const config = hautAiResponse === false ? 'ACNE_ADD_ON_FORM_CONFIG' : 'ACNE_FORM_CONFIG';
//   return `${PROXY_PREFIX}/consumer-api/service/static-content/data/${config}`;
// };

export const GET_USER_FORM_RESPONSES = (tranasctionId) =>
  getUrl(`consumer-api/service/acne-forms/responses/${tranasctionId}`);

export const RESULT_V2 = (tranasctionId) =>
  getUrl(`consumer-api/service/recommendations/acne-result/${tranasctionId}`);

export const HAUT_AI_IMAGE_CAPTURE_CHECK = (tranasctionId) => getUrl(`consumer-api/service/recommendations/acne/haut-ai/skinAnalysis/${tranasctionId}`);

export const RETRIEVE_CART_SHOPFLO = (caseId) =>
  getUrl(`consumer-api/service/shopflo/v3/retrieve-cart/${caseId}`);

export const ORDER_DETAILS = (orderId) =>
  getUrl(
    `consumer-api/service/orders/orders/get-order-details-by-order-id-number?orderId=${orderId}`
  );

export const GET_AVAILABLE_SLOTS = (caseId) =>
  getUrl(`consumer-api/service/engagements/slot/available/customer/${caseId}`);

export const GET_STATIC_DOCTOR_DETAILS = getUrl(
  `consumer-api/service/static-content/data/ACNE_DOCTOR_CONTENT`
);

export const BOOK_SLOT_API = getUrl(
  `consumer-api/service/engagements/slot/book`
);

export const GET_ACTIVE_SLOTS_API = (caseId) =>
  getUrl(
    `consumer-api/service/engagements/engagement/active-slot-engagement/${caseId}`
  );

export const CAPI_TRACKING_API = getUrl(
  `consumer-api/service/consumers/conversion-api/tracking`
);

export const GET_PRESCRIPTION_API = (userId) =>
  getUrl(`consumer-api/service/doctors/prescriptions/order/${userId}`);

export const IMAGE_UPLOAD_API = (userId) => {
  return getUrl(
    `consumer-api/service/consumers/customer-images/upload-scalpie/${userId}`
  );
};

export const PRODUCT_BOTTOM_SHEET_API = (variantId) => {
  return getUrl(`consumer-api/service/static-content/data/${variantId}`);
};

export const GENERATE_OTP_API = () => `${PROXY_PREFIX}/auth/otp/generate`;

export const RESEND_OTP_API = () =>
  `${PROXY_PREFIX}/auth/otp/generate?resend=true`;

export const VALIDATE_OTP_API = () => `${PROXY_PREFIX}/auth/otp/validate`;

export const LOGOUT_API = () => `${PROXY_PREFIX}/auth/otp/logout`;

export const REFRESH_TOKEN_API = (token) =>
  `${PROXY_PREFIX}/auth/refresh-token/${token}`;

export const REPEAT_ORDER_DETAILS = (caseId) =>
  getUrl(`consumer-api/service/recommendations/acne-reorder/${caseId}`);

export const UPDATE_FINGERPRINT_API = (transactionId) =>
  getUrl(`consumer-api/service/recommendations/fingerprint/${transactionId}`);

export const SUBMIT_CONTACT_US_FORM = () => getUrl(`consumer-api/service/consumers/contact-us/submit`);

export const GET_ACTIVE_FORM_ID = (caseId) => getUrl(`consumer-api/service/customer-details/active-form/${caseId}`)

export const GET_ACNE_PRODUCTS = () => getUrl('consumer-api/service/recommendations/acne-products');

export const GET_INGREDIENTS = () => {
  return `${PROXY_PREFIX}/consumer-api/service/static-content/data/ACNE_PRODUCTS_INGREDIENTS`;
};

export const GET_PRODUCT_CATEGORY = () => {
  const config = 'ACNE_PRODUCT_CATEGORY';
  return `${PROXY_PREFIX}/consumer-api/service/static-content/data/${config}`;
};
export const SITE_BASE_URL = env("NEXT_PUBLIC_SITE_BASE_URL") || "https://clearritual.com";


export const GET_USER_DETAILS = (caseId) => getUrl(`/consumer-api/service/consumers/profile/details?userId=${caseId}&customerColumns=gender,firstName,lastName`);
