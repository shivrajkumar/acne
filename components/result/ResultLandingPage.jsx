"use client"
import { useEffect, useState, useRef } from "react";

import ResultBanner from "./ResultBanner";
import FeaturedReview from "./FeaturedReview";
import FAQSection from "../landing-page/FaqSection";
import { FAQResultPage } from "../../constants/allVayuData";
import VisibleResultsInThreeWeeks from "./VisibleResultsInThreeWeeks";
import { fetchRequest } from "../../helpers/fetchRequest";
import { RESULT_V2 } from "@constants/urls";
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

const ResultLandingPage = ({ searchParams }) => {
  const [resultData, setResultData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const resultBannerRef = useRef(null);
  const tId = searchParams?.tid;

  useEffect(() => {
    fetchResult();
  }, [tId]);

  useEffect(() => {
    const handleScroll = () => {
      if (resultBannerRef.current) {
        const bannerBottom = resultBannerRef.current.getBoundingClientRect().bottom;
        setShowSticky(bannerBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const fetchResult = async () => {
    setLoading(true);
    try {
      const res = await fetchRequest(RESULT_V2(tId));
      if (res.status === 200) {
        setResultData(res.data);
        localStorage.setItem(`acne_result_data`, JSON.stringify(res.data));
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const placeOrder = () => {
    handleBuyNowClick(resultData?.productsDetails, resultData?.customerDetails?.caseId);
    const eventAttributes = {
      cart_value: resultData?.cartDetails?.totalCartValue,
      tem_count: resultData?.productsDetails.length,
      timestamp: new Date().toISOString(),
      syntheticId: tId ?? window.localStorage.getItem("syntheticId"),
      caseId: resultData?.customerDetails?.caseId
    }
    trackMoEngageEvent("acne-BeginCheckout", eventAttributes)
  };

  // Create the context value
  const contextValue = {
    cartDetails: resultData?.cartDetails,
    productsDetails: resultData?.productsDetails,
    doctorDetails: resultData?.doctorDetails,
    handleBuyNowClick: placeOrder,
    customerDetails: resultData?.customerDetails,
    skinType: resultData?.skinType,
    acneGrading: resultData?.acneGrading,
    rootCausesDetails: resultData?.rootCausesDetails,
    caseId:resultData?.customerDetails?.caseId
  };

  return loading ? (
    <Loader />
  ) :
    (
      <CartProvider value={contextValue}>
        <AcneMarqueeBanner />
        <AcneHeader />
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