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
import AcneHeader from "../generic/AcneHeader";
import AcneWhatsInYourKit from "./WhatIsInYourKit";
import AcneFooter from "../generic/AcneFooter";
import { trackMoEngageEvent } from "@/utils/moegage";
import { getCookieValue } from "@/helpers/cookieHelper";
import { metaCapi } from "@/helpers/metaCapiHelper";
import { pixelCustomeEvent } from "../generic/Pixel";
import { logGtmEvent } from "../generic/Gtm";
import useMediaLoader from "@/hooks/useMediaLoader";

const ResultLandingPage = ({ searchParams }) => {
  const [resultData, setResultData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [capiPayload, setCapiPayload] = useState({});
  const [bookingStatus, setBookingStatus] = useState(false);
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);
  const resultBannerRef = useRef(null);
  const tId = searchParams?.tid;

  const isLoading = useMediaLoader();

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
      metaCapi(capiPayloadRes, "ReportGenerated/Lead");
    }
  }, []);

  // Fetch result data when tId changes
  useEffect(() => {
    if (typeof window !== "undefined" && tId) {
      fetchResult();
      logGtmEvent("ReportGenerated", {
        gender: window.localStorage.getItem("user_gender"),
      });
    }
  }, [tId]);

  // Handle sticky cart visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (resultBannerRef.current) {
        const bannerBottom = resultBannerRef.current.getBoundingClientRect().bottom;
        setShowSticky(bannerBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchResult = async () => {
    setLoading(true);
    try {
      const res = await fetchRequest(RESULT_V2(tId));
      if (res.status === 200) {
        const caseId = res?.data?.customerDetails?.caseId;
        if (caseId) {
          await getActiveSlotDetails(caseId);
        }
        setResultData(res.data);
        localStorage.setItem(`acne_result_data`, JSON.stringify(res.data));
        metaCapi(capiPayload, "ReportGenerated/Lead");
      }
    } catch (e) {
      console.error("Error fetching results:", e);
    } finally {
      setLoading(false);
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

    const eventAttributes = {
      cart_value: `${resultData?.cartDetails?.totalCartValue}`,
      item_count: `${resultData?.productsDetails?.length}`,
      timestamp: new Date().toISOString(),
      syntheticId: tId ?? window.localStorage.getItem("syntheticId"),
      caseId: `${resultData?.customerDetails?.caseId}`,
      currency: "INR",
      transactionId: `${tId}`,
    };

    // Track events
    trackMoEngageEvent("BeginCheckout", eventAttributes);
    logGtmEvent("Add to Cart", eventAttributes);
    pixelCustomeEvent("Add to Cart", eventAttributes);
    metaCapi(capiPayload, "CheckoutInitiated");
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

    let updatedProductsDetails = [...resultData?.productsDetails];
    let updatedOptionalProductsDetails = [...resultData?.optionalProductsDetails];

    if (product) {
      updatedProductsDetails.push({ ...product, isOptionalProduct: true });
      updatedOptionalProductsDetails = updatedOptionalProductsDetails.filter(
        optProduct => optProduct.variantId !== product.variantId
      );

      const newCartTotal = updatedProductsDetails.reduce(
        (total, prod) => total + (prod.price || 0),
        0
      );

      setResultData((prevData) => ({
        ...prevData,
        productsDetails: updatedProductsDetails,
        optionalProductsDetails: updatedOptionalProductsDetails,
        cartDetails: {
          ...prevData.cartDetails,
          totalCartValue: newCartTotal
        }
      }));
    }
  }

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
    addProductToCart: addProductToCart
  };

  return (
    <CartProvider value={contextValue}>
      <AcneMarqueeBanner />
      <div className="sticky top-0 z-50">
        <AcneHeader />
      </div>
      <div className="mx-[40px] xs:mx-[16px] gap-[40px] flex flex-col">
        <div ref={resultBannerRef}>
          <ResultBanner />
        </div>
        <OrderSummary />
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

export default ResultLandingPage;