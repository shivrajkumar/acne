"use client";
import { useEffect, useState, useRef } from "react";

import ResultBanner from "./ResultBanner";
import FeaturedReview from "./FeaturedReview";
import FAQSection from "../landing-page/FaqSection";
import { FAQResultPage } from "../../constants/allVayuData";
import VisibleResultsInThreeWeeks from "./VisibleResultsInThreeWeeks";
import { fetchRequest } from "../../helpers/fetchRequest";
import { GET_ACTIVE_SLOTS_API, RESULT_V2 } from "@constants/urls";
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

const ResultLandingPage = ({ searchParams }) => {
  const [resultData, setResultData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [capiPayload, setCapiPayload] = useState({});
  const [bookingStatus, setBookingStatus] = useState(false);
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);
  const resultBannerRef = useRef(null);
  const tId = searchParams?.tid;
  const [cacheData, setCacheData] = useState(null);
  const isLoading = useMediaLoader();
  const [thumbmarkValue, setThumbmarkValue] = useState(null);
  const [ipApiValue, setIpApiValue] = useState(null);
  
  // Add flags to prevent multiple calls
  const hasFetchedResult = useRef(false);
  const isFetchingResult = useRef(false);

  console.log(thumbmarkValue, ipApiValue, "values");

  useEffect(() => {
    const fetchThumbmark = async () => {
      try {
        const tm = await getThumbmark();
        console.log("thumbmark", tm);
        setThumbmarkValue(tm);
        setCapiPayload((prev) => ({ ...prev, thumbmark: tm?.thumbmark || tm }));
      } catch (err) {
        console.error("Error getting thumbmark:", err);
      }
    };
    fetchThumbmark();
  }, []);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("/api/ip");
        const result = await response.json();
        if (result.success) {
          console.log("IP data fetched:", result.data);
          setIpApiValue(result.data);
        } else {
          console.error("Failed to fetch IP data:", result.error);
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

  // Single useEffect to handle result fetching
  useEffect(() => {
    // Only fetch if we have all required data and haven't fetched yet
    if (
      typeof window !== "undefined" &&
      tId &&
      ipApiValue?.ip &&
      thumbmarkValue &&
      !hasFetchedResult.current &&
      !isFetchingResult.current
    ) {
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

  const fetchResult = async () => {
    // Prevent multiple simultaneous calls
    if (isFetchingResult.current) {
      console.log("Already fetching result, skipping...");
      return;
    }

    isFetchingResult.current = true;
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

  return (
    <CartProvider value={contextValue}>
      <AcneMarqueeBanner />
      <div className="sticky top-0 z-50">
        <AcneHeader />
      </div>
      <div className="mx-[40px] xs:mx-[16px] gap-[40px] flex flex-col">
        <div ref={resultBannerRef}>
          <ResultBannerV2 />
        </div>
        {resultData?.skinAnalysisResponse == null ||
        resultData?.skinAnalysisResponse == undefined ? null : (
          <SkinDiagnosis />
        )}
        <OrderSummary />
        <AcneReviews />
        <VisibleResultsInThreeWeeks />
        <AcneWhatsInYourKit />
        <FeaturedReview />
        <FAQSection data={FAQResultPage} />
      </div>
      <AcneFooter />
      {showSticky && <CartSummarySticky />}
    </CartProvider>
  );
};

export default ResultLandingPage