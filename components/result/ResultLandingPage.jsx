"use client";
import { useEffect, useState, useRef } from "react";
import FeaturedReview from "./FeaturedReview";
import FAQSection from "../landing-page/FaqSection";
import { FAQResultPage } from "../../constants/allVayuData";
import VisibleResultsInThreeWeeks from "./VisibleResultsInThreeWeeks";
import { fetchRequest } from "../../helpers/fetchRequest";
import {
  GET_ACTIVE_SLOTS_API,
  RESULT_V2,
  UPDATE_FINGERPRINT_API,
} from "@constants/urls";
import Loader from "@/components/generic/Loader";
import OrderSummary from "./OrderSummary";
import CartSummarySticky from "./CartSummarySticky";
import handleBuyNowClick from "./handleBuyNowClick";
import { CartProvider } from "../../context/CartContext";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/Header/AcneHeader";
import AcneWhatsInYourKit from "./WhatIsInYourKit";
import AcneFooter from "../generic/AcneFooter";
import { trackMoEngageEvent } from "@/utils/moegage";
import { getCookieValue } from "@/helpers/cookieHelper";
import { generateEventId, metaCapi } from "@/helpers/metaCapiHelper";
import { pixelCustomeEvent } from "../generic/Pixel";
import { logGtmEvent } from "../generic/Gtm";
import useMediaLoader from "@/hooks/useMediaLoader";
import ResultBannerV2 from "./ResultBannerV2";
import { trackUmamiEvent } from "@components/generic/UmamiTracker";
import AcneReviews from "./AcneReviews";
import SkinDiagnosis from "./SkinDiagnosis";
import { getThumbmark } from "@thumbmarkjs/thumbmarkjs";
import Login from "@/components/login/Login";
import RootCausesV2 from "./RootCausesV2";

const ResultLandingPage = ({}) => {
  const [resultData, setResultData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [capiPayload, setCapiPayload] = useState({});
  const [bookingStatus, setBookingStatus] = useState(false);
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const resultBannerRef = useRef(null);
  const [tId, setTId] = useState(null);
  const [cacheData, setCacheData] = useState(null);
  const isLoading = useMediaLoader();
  const [thumbmarkValue, setThumbmarkValue] = useState(null);
  const [ipApiValue, setIpApiValue] = useState(null);
  const [userId, setUserId] = useState(null);

  // Add flags to prevent multiple calls
  const hasFetchedResult = useRef(false);
  const isFetchingResult = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const tidFromUrl = url.searchParams.get("tid");

      const userDataFromStorage = localStorage.getItem("user_details");
      if (userDataFromStorage) {
        try {
          const parsedUserData = JSON.parse(userDataFromStorage);
          const extractedUserId = parsedUserData.caseId || parsedUserData.id;

          if (extractedUserId) {
            setUserId(extractedUserId);
          } else {
            console.error("No userId found in any field");
          }
        } catch (e) {
          console.error("Error parsing userData:", e);
          console.error("Failed to parse:", userDataFromStorage);
        }
      }

      if (tidFromUrl) {
        setTId(tidFromUrl);
      } else {
        // Fallback to localStorage if not in URL
        const tidFromStorage = window.localStorage.getItem("user_tid");
        setTId(tidFromStorage);
      }
    }
  }, []);

  useEffect(() => {
    const fetchThumbmark = async () => {
      try {
        const tm = await getThumbmark();
        setThumbmarkValue(tm);
        setCapiPayload((prev) => ({ ...prev, thumbmark: tm?.thumbmark || tm }));
      } catch (err) {
        console.error("Error getting thumbmark:", err);
      }
    };
    fetchThumbmark();

    const fetchIpAddress = async () => {
      try {
        const response = await fetch("/api/ip");
        const result = await response.json();
        if (result.success) {
          setIpApiValue(result.data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching IP data:", error);
      }
    };
    fetchIpAddress();
  }, []);

  // Initialize tracking data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fbp = getCookieValue("_fbp", document.cookie.split(";"));
      const fbc = getCookieValue("_fbc", document.cookie.split(";"));
      const email = window.localStorage.getItem("user_email");
      const phone = window.localStorage.getItem("user_phone");
      const gender = window.localStorage.getItem("user_gender");
      const url = window.location.href;
      const storedOrderId = window.localStorage.getItem("order_count");

      if (storedOrderId) {
        setHasPlacedOrder(true);
      }

      const capiPayloadRes = {
        email,
        phone,
        fbc,
        fbp,
        url,
        gender,
      };
      pixelCustomeEvent("ReportGenerated", { gender: capiPayloadRes?.gender });
      setCapiPayload(capiPayloadRes);
      metaCapi(capiPayloadRes, "ReportGenerated");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && tId && ipApiValue && thumbmarkValue) {
      const phone = window.localStorage.getItem("user_phone");
      logGtmEvent("ReportGenerated", {
        gender: window.localStorage.getItem("user_gender"),
        event_id: generateEventId({
          eventName: "ReportGenerated",
          phone: phone,
        }),
      });
      fetchResult();
    }
  }, [tId, ipApiValue, thumbmarkValue]);

  // Handle sticky cart visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (resultBannerRef.current) {
        const bannerBottom =
          resultBannerRef.current.getBoundingClientRect().bottom;
        setShowSticky(bannerBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateFingerprint = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tidForFingerprint = urlParams.get("tid") || tId;

      if (!tidForFingerprint) {
        return false;
      }

      const fingerprintData = {
        fingerprint: thumbmarkValue?.thumbmark || thumbmarkValue || "",
        ip: ipApiValue?.ip || "",
      };

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": "acne",
        },
        body: JSON.stringify(fingerprintData),
      };

      const response = await fetchRequest(
        UPDATE_FINGERPRINT_API(tidForFingerprint),
        options
      );
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const fetchResult = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-ip-address": ipApiValue?.ip || "",
        "x-fp-id": thumbmarkValue ? thumbmarkValue?.thumbmark : "",
      },
    };

    try {
      const res = await fetchRequest(RESULT_V2(tId), options);
      if (res.status === 200) {
        const caseId = res?.data?.customerDetails?.caseId;
        if (caseId) {
          await getActiveSlotDetails(caseId);
        }

        // Check if enableLogin is true in the response (only on initial load)
        if (res.data?.enableLogin === true) {
          setShowLoginModal(true);
          setLoading(false);
          isFetchingResult.current = false;
          return;
        }

        // Check if we have cached data and merge it with fresh data
        const _cachedData = localStorage.getItem(`acne_result_data`);
        setCacheData(_cachedData);
        let finalData = res.data;

        if (_cachedData) {
          try {
            const parsedCachedData = JSON.parse(_cachedData);
            // If cached data exists and is for the same case, preserve cart modifications
            if (parsedCachedData?.customerDetails?.caseId === caseId) {
              finalData = {
                ...res.data,
                productsDetails:
                  parsedCachedData.productsDetails || res.data.productsDetails,
                optionalProductsDetails:
                  parsedCachedData.optionalProductsDetails ||
                  res.data.optionalProductsDetails,
                cartDetails:
                  parsedCachedData.cartDetails || res.data.cartDetails,
              };
            }
          } catch (e) {
            console.error("Error parsing cached data during merge:", e);
          }
        }
        setResultData(finalData);
        localStorage.setItem(`acne_result_data`, JSON.stringify(finalData));

        metaCapi(capiPayload, "ReportGenerated");
        hasFetchedResult.current = true;
      }
    } catch (e) {
      console.error("Error fetching results:", e);
    } finally {
      setLoading(false);
      isFetchingResult.current = false;
    }
  };

  // Function to handle post-login flow
  const handlePostLogin = async () => {
    // First update fingerprint
    if (thumbmarkValue && ipApiValue && tId) {
      await updateFingerprint();
    }
    // Then fetch results again (not initial load)
    await fetchResult();
  };

  const getActiveSlotDetails = async (caseId) => {
    try {
      const response = await fetchRequest(GET_ACTIVE_SLOTS_API(caseId));
      const reminderDate = response?.data?.reminderDate;

      if (reminderDate) {
        setBookingStatus(true);
      }
    } catch (error) {
      console.error("Error fetching active slot details:", error);
    }
  };

  const placeOrder = () => {
    handleBuyNowClick(
      resultData?.productsDetails,
      resultData?.customerDetails?.caseId
    );
    const updatedCart = cacheData || localStorage.getItem(`acne_result_data`);
    const optionalProductAdded = JSON.parse(
      updatedCart
    )?.productsDetails?.filter((prod) => prod?.isOptionalProduct);
    const eventAttributes = {
      cart_value: `${resultData?.cartDetails?.totalCartValue}`,
      item_count: `${resultData?.productsDetails?.length}`,
      timestamp: new Date().toISOString(),
      syntheticId: tId ?? window.localStorage.getItem("syntheticId"),
      caseId: `${resultData?.customerDetails?.caseId}`,
      currency: "INR",
      transactionId: `${tId}`,
      optionalProductAdded:
        optionalProductAdded?.length > 0 ? optionalProductAdded : null,
    };

    // Track events
    trackMoEngageEvent("BeginCheckout", eventAttributes);
    logGtmEvent("Add to Cart", {
      ...eventAttributes,
      event_id: generateEventId({ eventName: "Add to Cart" }),
    });
    pixelCustomeEvent("Add to Cart", eventAttributes);
    metaCapi(capiPayload, "CheckoutInitiated");
    trackUmamiEvent("checkout_initiated", {
      syntheticId: tId ?? window.localStorage.getItem("syntheticId"),
    });
  };

  // Show loader while media is loading
  if (isLoading) {
    return <Loader />;
  }

  // Show loader while fetching results
  if (loading) {
    return <Loader />;
  }

  const addProductToCart = (product) => {
    let updatedProductsDetails = [...(resultData?.productsDetails || [])];
    let updatedOptionalProductsDetails = [
      ...(resultData?.optionalProductsDetails || []),
    ];

    if (product) {
      updatedProductsDetails.push({ ...product, isOptionalProduct: true });
      updatedOptionalProductsDetails = updatedOptionalProductsDetails.filter(
        (optProduct) => optProduct.variantId !== product.variantId
      );

      const newCartTotal = updatedProductsDetails.reduce(
        (total, prod) => total + (prod.price || 0),
        0
      );

      const newResultData = {
        ...resultData,
        productsDetails: updatedProductsDetails,
        optionalProductsDetails: updatedOptionalProductsDetails,
        cartDetails: {
          ...resultData.cartDetails,
          totalCartValue: newCartTotal,
        },
      };

      setResultData(newResultData);
      localStorage.setItem(`acne_result_data`, JSON.stringify(newResultData));
      logGtmEvent("addon_scar_added", {
        product: product,
        event_id: generateEventId({ eventName: "addon_scar_added" }),
      });
      trackMoEngageEvent("addon_scar_added", {
        timestamp: new Date().toISOString(),
        syntheticId: tId ?? localStorage.getItem("syntheticId"),
        caseId: resultData?.customerDetails?.caseId,
        optionalProductAdded: product,
      });
    }
  };

  const removeProductFromCart = (product) => {
    let updatedProductsDetails = [...(resultData?.productsDetails || [])];
    let updatedOptionalProductsDetails = [
      ...(resultData?.optionalProductsDetails || []),
    ];

    if (product) {
      // Remove from main products (only if it was originally optional)
      updatedProductsDetails = updatedProductsDetails.filter(
        (prod) =>
          !(prod.variantId === product.variantId && prod.isOptionalProduct)
      );

      // Add back to optional products if it was originally optional
      if (product.isOptionalProduct) {
        const { isOptionalProduct, ...productWithoutFlag } = product;
        updatedOptionalProductsDetails.push(productWithoutFlag);
      }

      const newCartTotal = updatedProductsDetails.reduce(
        (total, prod) => total + (prod.price || 0),
        0
      );

      const newResultData = {
        ...resultData,
        productsDetails: updatedProductsDetails,
        optionalProductsDetails: updatedOptionalProductsDetails,
        cartDetails: {
          ...resultData.cartDetails,
          totalCartValue: newCartTotal,
        },
      };

      setResultData(newResultData);
      localStorage.setItem(`acne_result_data`, JSON.stringify(newResultData));
      logGtmEvent("addon_scar_removed", {
        product: product,
        event_id: generateEventId({ eventName: "addon_scar_removed" }),
      });
      trackMoEngageEvent("addon_scar_removed", {
        timestamp: new Date().toISOString(),
        syntheticId: tId ?? localStorage.getItem("syntheticId"),
        caseId: resultData?.customerDetails?.caseId,
        optionalProductAdded: product,
      });
    }
  };

  const contextValue = {
    cartDetails: resultData?.cartDetails,
    productsDetails: resultData?.productsDetails,
    doctorDetails: resultData?.doctorDetails,
    handleBuyNowClick: placeOrder,
    customerDetails: resultData?.customerDetails,
    skinType: resultData?.skinType,
    acneGrading: resultData?.acneGrading,
    rootCausesDetails: resultData?.rootCausesDetails,
    caseId: resultData?.customerDetails?.caseId,
    acne_booking_success: bookingStatus,
    hasPlacedOrder: hasPlacedOrder,
    optionalProductsDetails: resultData?.optionalProductsDetails,
    addProductToCart: addProductToCart,
    removeProductFromCart: removeProductFromCart,
    acneStageDetails: resultData?.acneStageDetails,
    reviewDetails: resultData?.reviewsDetails,
    skinAnalysisResponse: resultData?.skinAnalysisResponse,
  };

  console.log("caseid and userid", resultData?.customerDetails?.caseId, userId);

  return (
    <CartProvider value={contextValue}>
      <AcneMarqueeBanner />
      <div className="sticky top-0 z-50">
        <AcneHeader />
      </div>
      <div className="mx-[40px] xs:mx-[16px] gap-[40px] flex flex-col">
        <div
          ref={resultBannerRef}
          className="p-[40px] xs:p-[4px] sm:p-[24px] md:p-[30px]"
        >
          <ResultBannerV2 />
          
          {/* Desktop: RootCausesV2 then SkinDiagnosis */}
          <div className="hidden md:block">
            <RootCausesV2 />
          </div>
        </div>
        
        {/* Mobile: SkinDiagnosis then RootCausesV2 */}
        <div className="md:hidden">
          {resultData?.skinAnalysisResponse &&
          (!userId ||
            String(userId) === String(resultData?.customerDetails?.caseId)) ? (
            <SkinDiagnosis />
          ) : (
            resultData?.skinAnalysisResponse && (
              <div className="flex flex-col items-center justify-center p-8 mx-6 my-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 shadow-sm">
                <div className="w-16 h-16 mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  Skin Diagnosis Not Available
                </h3>
                <p className="text-gray-600 text-center max-w-md mb-4">
                  This skin analysis report is associated with a different
                  account. Please log in with the correct account to view your
                  personalized skin diagnosis.
                </p>
                <p className="text-sm text-gray-500 text-center">
                  If you believe this is an error, please contact our support
                  team.
                </p>
              </div>
            )
          )}
          <div className="p-[40px] xs:p-[4px] sm:p-[24px]">
            <RootCausesV2 />
          </div>
        </div>
        
        {/* Desktop: SkinDiagnosis after RootCausesV2 */}
        <div className="hidden md:block">
          {resultData?.skinAnalysisResponse &&
          (!userId ||
            String(userId) === String(resultData?.customerDetails?.caseId)) ? (
            <SkinDiagnosis />
          ) : (
            resultData?.skinAnalysisResponse && (
              <div className="flex flex-col items-center justify-center p-8 mx-6 my-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 shadow-sm">
                <div className="w-16 h-16 mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  Skin Diagnosis Not Available
                </h3>
                <p className="text-gray-600 text-center max-w-md mb-4">
                  This skin analysis report is associated with a different
                  account. Please log in with the correct account to view your
                  personalized skin diagnosis.
                </p>
                <p className="text-sm text-gray-500 text-center">
                  If you believe this is an error, please contact our support
                  team.
                </p>
              </div>
            )
          )}
        </div>
        <OrderSummary />
        <AcneReviews />
        <VisibleResultsInThreeWeeks />
        <AcneWhatsInYourKit />
        <FeaturedReview />
        <FAQSection data={FAQResultPage} />
      </div>
      <AcneFooter />
      {showSticky && <CartSummarySticky />}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <Login
              closeModal={() => {
                setShowLoginModal(false);
                handlePostLogin();
              }}
              phone={""}
              tid={tId}
            />
          </div>
        </div>
      )}
    </CartProvider>
  );
};

export default ResultLandingPage;
