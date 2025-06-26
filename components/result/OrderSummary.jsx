"use client";
import CartDetails from "./CartDetails";
import { useCartContext } from "../../context/CartContext";
import { useState, useRef, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { Modal } from "antd";
import closeIcon from "@assets/svg/close-circle.svg";
import ProductPageModal from "./ProductDetailsModal";
import Image from "next/image";
import { trackMoEngageEvent } from "@/utils/moegage";
import { logGtmEvent } from "../generic/Gtm";
import useMediaQuery from "@/hooks/useMediaQuerry";

const OrderSummary = () => {
  const { productsDetails, optionalProductsDetails, addProductToCart } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [hasTrackedOptionalProductSeen, setHasTrackedOptionalProductSeen] = useState(false);
  const optionalProductsSectionRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isModalOpenRef = useRef(false);

  useBodyScrollLock(isModalOpen);

  // Sync ref with modal state to avoid stale values in event listeners (closure issue)
  useEffect(() => {
    isModalOpenRef.current = isModalOpen; // Update ref whenever modal state changes
  } , [isModalOpen]);

  // Handle mobile back button to close modal instead of navigating
  useEffect(() => {
    if (isDesktop) return; // Skip on desktop

    const handlePopState = (e) => {
      // Use ref to get current modal state (avoids stale closure)
      if (isModalOpenRef.current) {
        e.preventDefault(); // Prevent default back nav
        setIsModalOpen(false);
        setSelectedVariantId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isDesktop]);

  useEffect(() => {
    // Only proceed if there are optional products and event hasn't been tracked
    if (optionalProductsDetails?.length > 0 && !hasTrackedOptionalProductSeen) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Track the event only once
              trackMoEngageEvent("addon_scar_seen", {
                product: optionalProductsDetails,
              });
              logGtmEvent("addon_scar_seen", {
                product: optionalProductsDetails,
              });

              // Mark as tracked and disconnect observer
              setHasTrackedOptionalProductSeen(true);
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0.1 // Trigger when at least 10% of the section is visible
        }
      );

      // Start observing the optional products section
      if (optionalProductsSectionRef.current) {
        observer.observe(optionalProductsSectionRef.current);
      }

      // Cleanup function
      return () => {
        if (optionalProductsSectionRef.current) {
          observer.unobserve(optionalProductsSectionRef.current);
        }
      };
    }
  }, [optionalProductsDetails, hasTrackedOptionalProductSeen]);

  const showModal = useCallback((variantId) => {
    const fullVariantId = `${variantId}_PDP`;
    setSelectedVariantId(fullVariantId);
    setIsModalOpen(true);

    // Push a history state to handle back button on mobile
    if (!isDesktop) {
      window.history.pushState(
        { modalOpen: true, variantId: fullVariantId }, // state
        '', // title (ignored)
        window.location.href // no URL change
      );
    }
  }, [isDesktop]);


  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setSelectedVariantId(null);

    // Remove virtual history entry added for modal on mobile
    if (!isDesktop && window.history.state?.modalOpen) {
      window.history.back();
    }
  }, [isDesktop]);


  // Helper function to determine which icons to show based on dosageCode
  const getDosageIcons = (dosageCode) => {
    if (!dosageCode) return { showAM: false, showNoon: false, showPM: false };

    // Split the dosage code and convert to numbers
    const segments = dosageCode.split("-").map((num) => parseInt(num));

    // Handle both 2-segment and 3-segment formats
    if (segments.length === 2) {
      const [morning, evening] = segments;
      return {
        showAM: morning > 0,
        showNoon: false,
        showPM: evening > 0,
      };
    } else if (segments.length === 3) {
      const [morning, noon, evening] = segments;
      return {
        showAM: morning > 0,
        showNoon: noon > 0,
        showPM: evening > 0,
      };
    }

    // Default case if format is unexpected
    return { showAM: false, showNoon: false, showPM: false };
  };

  return (
    <div className="md:px-[40px] w-full flex flex-col md:flex-row justify-between gap-[24px] md:gap-[60px] bg-Secondary/50  rounded-[24px]">
      <div className="w-full md:w-[56%]">
        <h1
          className="text-Text/Heading-Text font-lato font-[500] text-[28px] md:text-[32px]"
          id="order_summary"
        >
          Order Summary
        </h1>
        <p className="font-lato font-[500] text-[18px] text-Text/Label">
          Your Cart
        </p>
        <div className="flex flex-col gap-[24px] md:gap-[32px] mt-[24px] md:mt-[40px]">
          {productsDetails?.map((product) => {
            const { showAM, showPM } = getDosageIcons(product.dosageCode);

            return (
              <div key={product.variantId}>
                <ProductCard
                  product={product}
                  showAM={showAM}
                  showPM={showPM}
                  addProductToCart={addProductToCart}
                  showModal={showModal}
                  isOptional={product?.isOptionalProduct} />
                {/* Divider */}
                <div className="border-[1px] border-Elements/Divider-Stroke h-[1px] mt-[24px] md:mt-[32px]"></div>
              </div>
            );
          })}
          {
            optionalProductsDetails?.length > 0 && (
              <div
                ref={optionalProductsSectionRef}
                className="flex flex-col border-[2px] border-neutral-700 md:border-none"
              >
                {optionalProductsDetails.map((product) => {
                  const { showAM, showPM } = getDosageIcons(product.dosageCode);
                  return (
                    <div key={product.variantId}>
                      <ProductCard
                        key={product.variantId}
                        product={product}
                        showAM={showAM}
                        showPM={showPM}
                        enableAddToCart={true}
                        addProductToCart={addProductToCart}
                        showModal={showModal}
                      />
                      {/* Divider */}
                      <div className="border-[1px] border-Elements/Divider-Stroke h-[1px] mt-[24px] md:mt-[32px]"></div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </div>
      </div>
      <div className="w-full md:w-[35%]">
        <CartDetails enableOptin />
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        title={null}
        closable={false}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '70%',
          xxl: '70%',
        }}
       centered={isDesktop}
      styles={{ 
            body: { 
              position: "relative",
              borderRadius: 0,
            },
            content: {
              borderRadius: 0,
            },
            mask: {
              borderRadius: 0,
            }
          }}
      >
        {/* Custom Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-[-56px] right-[-24px] m h-[36px] w-[36px] bg-Neutral/800 text-white flex items-center justify-center "
        >
          <Image src={closeIcon} alt="close-icon" width={20} height={20} />
        </button>

        {/* Your modal content */}
        <ProductPageModal variantId={selectedVariantId} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default OrderSummary;