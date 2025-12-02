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
  GET_INGREDIENTS,
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
// import { pixelCustomeEvent } from "../generic/Pixel";
import { logGtmEvent } from "../generic/Gtm";
import useMediaLoader from "@/hooks/useMediaLoader";
import ResultBannerV2 from "./ResultBannerV2";
import { trackUmamiEvent } from "@components/generic/UmamiTracker";
import AcneReviews from "./AcneReviews";
import SkinDiagnosis from "./SkinDiagnosis";
import { getThumbmark } from "@thumbmarkjs/thumbmarkjs";
import Login from "@/components/login/Login";
import RootCausesV2 from "./RootCausesV2";
import DoctorDetailsCard from "./DoctorDetailsCard";
import ExpectationSetting from "./ExpectationSetting";

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [ingredientsMap, setIngredientsMap] = useState(null);

  // Add flags to prevent multiple calls
  const hasFetchedResult = useRef(false);
  const isFetchingResult = useRef(false);

  // Function to initialize/re-initialize user data
  const initializeUserData = () => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const tidFromUrl = url.searchParams.get("tid");
      const userIdFromUrl = url.searchParams.get("userId");
      
      // Priority 1: Check URL params first
      if (userIdFromUrl) {
        setUserId(userIdFromUrl);
      } else {
        // Priority 2: Check localStorage only if no URL param
        const userDataFromStorage = localStorage.getItem("user_details");
        
        if (userDataFromStorage) {
          try {
            const parsedUserData = JSON.parse(userDataFromStorage);
            const extractedUserId = parsedUserData.caseId || parsedUserData.id;

            if (extractedUserId) {
              setUserId(extractedUserId);
            } 
          } catch (e) {
            console.error("Error parsing userData:", e);
          }
        }
      }

      if (tidFromUrl) {
        setTId(tidFromUrl);
      } else {
        const tidFromStorage = window.localStorage.getItem("user_tid");
        setTId(tidFromStorage);
      }
      
      // Small delay to ensure state updates are processed
      setTimeout(() => {
        setIsInitialized(true);
      }, 100);
    }
  };

  // Initial load
  useEffect(() => {
    initializeUserData();

    // Push a state to track back button navigation
    window.history.pushState(null, '', window.location.href);

    // Listen for popstate events (browser back button)
    const handlePopState = () => {
      // Navigate to home page when back button is clicked
      window.location.href = '/';
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  useEffect(() => {
    const fetchThumbmark = async () => {
      try {
        const tm = await getThumbmark();
        setThumbmarkValue(tm);
        setCapiPayload((prev) => ({ ...prev, thumbmark: tm?.thumbmark || tm }));
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchThumbmark();

    const fetchIpAddress = async () => {
      try {
        const response = await fetch("/api/ip");
        const result = await response.json();
        if (result.success) {
          setIpApiValue(result.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchIpAddress();

    // Fetch ingredients data
    const fetchIngredients = async () => {
      try {
        const response = await fetchRequest(GET_INGREDIENTS());
        
        if (response.status === 200) {
          const data = response.data;
          
          // Check if content exists directly or nested
          const content = data?.data?.content || data;
          const processedMap = new Map();
          
          // Process ayurveda ingredients
          if (content.ayurveda && Array.isArray(content.ayurveda)) {
            content.ayurveda.forEach(item => {
              processedMap.set(item.id, { ...item, ingredientType: 'ayurveda' });
            });
          }
          
          // Process cosmetics ingredients
          if (content.cosmetics && Array.isArray(content.cosmetics)) {
            content.cosmetics.forEach(item => {
              processedMap.set(item.id, { ...item, ingredientType: 'cosmetics' });
            });
          }
          
          // Process drugs ingredients
          if (content.drugs && Array.isArray(content.drugs)) {
            content.drugs.forEach(item => {
              processedMap.set(item.id, { ...item, ingredientType: 'drugs' });
            });
          }
          
          setIngredientsMap(processedMap);
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();
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
      // pixelCustomeEvent("ReportGenerated", { gender: capiPayloadRes?.gender });
      setCapiPayload(capiPayloadRes);
      // metaCapi(capiPayloadRes, "ReportGenerated");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && tId && ipApiValue && thumbmarkValue && isInitialized) {
      // const phone = window.localStorage.getItem("user_phone");
      // logGtmEvent("ReportGenerated", {
      //   gender: window.localStorage.getItem("user_gender"),
      //   event_id: generateEventId({
      //     eventName: "ReportGenerated",
      //     phone: phone,
      //   }),
      // });
      fetchResult();
    } 
  }, [tId, ipApiValue, thumbmarkValue, isInitialized]);

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
      console.error("Error:", error);
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
          }
        }
        
        setResultData(finalData);
        localStorage.setItem(`acne_result_data`, JSON.stringify(finalData));

        hasFetchedResult.current = true;
      }
    } catch (e) {
    } finally {
      setLoading(false);
      isFetchingResult.current = false;
    }
  };

  // Function to handle post-login flow
  const handlePostLogin = async () => {
    // Show loader while fetching
    setLoading(true);
    
    // Re-initialize user data to pick up any changes from login
    initializeUserData();
    
    // Wait a bit for state to update
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (thumbmarkValue && ipApiValue && tId) {
      await updateFingerprint();
    }
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
      console.error("Error:", error);
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
    const phone = window?.localStorage?.getItem("user_phone");
    logGtmEvent("Add to Cart", {
      ...eventAttributes,
      event_id: generateEventId({ eventName: "Add to Cart", phone: phone }),
    });
    // pixelCustomeEvent("Add to Cart", eventAttributes);
    metaCapi(capiPayload, "Add to Cart");
    trackUmamiEvent("checkout_initiated", {
      syntheticId: tId ?? window.localStorage.getItem("syntheticId"),
    });
  };

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
      updatedProductsDetails = updatedProductsDetails.filter(
        (prod) =>
          !(prod.variantId === product.variantId && prod.isOptionalProduct)
      );

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
    grading: resultData?.grading,
    originalImageWithoutMask: resultData?.originalImageWithoutMask,
  };

  // Show loader while media is loading or when login modal is shown
  if (!isInitialized || isLoading || loading || showLoginModal) {
    return (
      <>
        {showLoginModal ? (
          // Show black screen with login modal
          <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
            <Login
              closeModal={() => {
                setShowLoginModal(false);
                handlePostLogin();
              }}
              phone={""}
              tid={tId}
              iscomingFromResultPage={true}
            />
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }

  return (
    <CartProvider value={contextValue}>
      <AcneMarqueeBanner />
      <div className="sticky top-0 z-50">
        <AcneHeader />
      </div>
      <div className="mx-[40px] xs:mx-[16px] gap-[30px] flex flex-col">
        <div
          ref={resultBannerRef}
          className="p-[40px] xs:p-[4px] sm:p-[24px] md:p-[30px]"
        >
          <ResultBannerV2 />
          <div className="text-[14px] md:text-[16px] mt-5">Here’s your personalized diagnosis and next steps.</div>
          
          {/* Desktop: RootCausesV2 and DoctorDetailsCard side by side */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-6 md:mt-6 items-center">
            <RootCausesV2 />
            <DoctorDetailsCard doctorDetails={resultData?.doctorDetails} />
          </div>
        </div>
        
        {/* Mobile: SkinDiagnosis, RootCausesV2, then DoctorDetailsCard */}
        <div className="md:hidden">
          <div className="mb-6 -mt-5">
              <DoctorDetailsCard doctorDetails={resultData?.doctorDetails} />
            </div>
          {resultData?.skinAnalysisResponse &&
          (!userId ||
            String(userId) === String(resultData?.customerDetails?.caseId)) ? (
            <SkinDiagnosis skinType={resultData?.skinType} originalImageWithoutMask={resultData?.originalImageWithoutMask}/>
          ) : (
            resultData?.skinAnalysisResponse && (
              <div className="flex flex-col items-center justify-center p-8 mx-0 md:mx-6 my-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 shadow-sm">
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
                <p className="text-gray-600 text-center text-sm md:text-xl max-w-md mb-4">
                  This skin analysis report is associated with a different
                  account. Please log in with the correct account to view your
                  personalized skin diagnosis.
                </p>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 mb-3"
                >
                  Login to View
                </button>
                <p className="text-sm text-gray-500 text-center">
                  If you believe this is an error, please contact our support
                  team.
                </p>
              </div>
            )
          )}
          <div className="p-[40px] xs:p-[4px] sm:p-[24px]">
          <div className="text-[24px] mt-6 mb-2">Your Root Causes</div>
            <RootCausesV2 />
          </div>
        </div>
        
        {/* Desktop: SkinDiagnosis after RootCausesV2 */}
        <div className="hidden md:block">
          {resultData?.skinAnalysisResponse &&
          (!userId ||
            String(userId) === String(resultData?.customerDetails?.caseId)) ? (
            <SkinDiagnosis skinType={resultData?.skinType} originalImageWithoutMask={resultData?.originalImageWithoutMask}/>
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
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 mb-3"
                >
                  Login to View
                </button>
                <p className="text-sm text-gray-500 text-center">
                  If you believe this is an error, please contact our support
                  team.
                </p>
              </div>
            )
          )}
        </div>
        <OrderSummary ingredientsMap={ingredientsMap}/>
        <AcneReviews />
        {/* <VisibleResultsInThreeWeeks /> */}
        <ExpectationSetting />
        <AcneWhatsInYourKit />
        <FeaturedReview />
        <FAQSection data={FAQResultPage} />
      </div>
      {showSticky && <CartSummarySticky />}
    </CartProvider>
  );
};

export default ResultLandingPage;