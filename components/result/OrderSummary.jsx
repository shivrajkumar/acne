"use client";
import Image from "next/image";
import { startCase } from "lodash";
import CartDetails from "./CartDetails";
import { CDN_BASE_URL } from "@/constants/config";
import { useCartContext } from "../../context/CartContext";
import AMIcon from "@assets/svg/AM.svg";
import PMIcon from "@assets/svg/PM.svg";
import TickIcon from "@assets/svg/tick.svg";
import { Modal } from "antd";
import { useState } from "react";
import ProductPageModal from "./ProductDetailsModal";
import closeIcon from "@assets/svg/close-circle.svg";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const OrderSummary = () => {
  const { productsDetails } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  useBodyScrollLock(isModalOpen);


  const showModal = (variantId) => {
   setSelectedVariantId(`${variantId}_PDP`);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedVariantId(null);
  };
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
                {/* Desktop View */}
                <div className="hidden md:flex justify-between gap-[24px]">
                  {/* Image + Dosage */}
                  <div>
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      width={168}
                      height={168}
                      className="w-[168px] h-[168px]"
                      onClick={() => showModal(product?.variantId)} // ← Pass ID on click
                    />
                    <div className="flex justify-center gap-[16px] mt-[16px]">
                      {showAM && (
                        <div className="flex items-center gap-1">
                          <Image src={AMIcon} alt="AM" width={24} height={24} />
                          <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                            AM
                          </span>
                        </div>
                      )}
                      {showPM && (
                        <div className="flex items-center gap-1">
                          <Image src={PMIcon} alt="PM" width={22} height={22} />
                          <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                            PM
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-[16px] flex-1">
                    <div className="flex flex-col gap-[4px]">
                      <p className="font-lato font-[500] text-[18px] text-Text/Heading-Text">
                        {product?.name}
                      </p>
                      {product?.composition && (
                        <p className="font-lato font-[500] text-[18px] text-Text/Heading-Text">
                          {product?.composition}
                        </p>
                      )}
                      {product?.size && (
                        <p className="font-lato font-[400] text-Text/Label text-[14px]">
                          Container: {product?.size}
                        </p>
                      )}
                      {product?.dosage && (
                        <p className="font-lato font-[400] text-Text/Label text-[14px]">
                          Dosage: {startCase(product?.dosage)}
                        </p>
                      )}
                    </div>

                    {product?.tags?.length > 0 && (
                      <div className="flex gap-[8px] flex-wrap">
                        {product.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="border border-Neutral/600 px-[8px] font-[1400] h-[28px] text-[14px] flex items-center leading-[140%] font-lato  text-primary/700 "
                          >
                            <Image
                              src={TickIcon}
                              alt="Tick"
                              width={23}
                              height={23}
                            />
                            <span className="ml-[8px]"> {tag}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {product?.rating && product?.price && (
                      <div className="flex gap-[16px]">
                        <p className="font-lato font-[400] text-[16px] text-Text/Body-Text">
                          <span className="w-[20px] h-[20px] mr-[4px]">★</span>
                          {product?.rating} ({product?.ratingPeopleCount})
                        </p>
                        <p className="font-lato font-[600] text-[16px] text-Text/Heading-Text">
                          ₹{product?.price}
                        </p>
                      </div>
                    )}

                    {product?.description && (
                      <p className="font-lato font-[400] text-[16px] text-Text/Body-Text -tracking-[1%]">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mobile View */}
                <div className="flex md:hidden flex-col gap-[12px]  p-[12px]  relative">
                  {/* AM/PM icons */}
                  <div className="absolute top-[8px] left-[8px] flex flex-col gap-[4px]">
                    {showAM && (
                      <div className="flex items-center gap-1">
                        <Image src={AMIcon} alt="AM" width={16} height={16} />
                        <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                          AM
                        </span>
                      </div>
                    )}
                    {showPM && (
                      <div className="flex items-center gap-1">
                        <Image src={PMIcon} alt="PM" width={16} height={16} />
                        <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                          PM
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Image */}
                  <div className="w-full flex justify-center">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      width={300}
                      height={220}
                      className="object-contain w-[300px] h-[220px]"
                      onClick={() => showModal(product?.variantId)} // ← Pass ID on click
                    />
                  </div>

                  {/* Title + Price */}
                  <div className="flex justify-between items-center">
                    <p className="font-lato font-[600] text-[18px]  text-primary/700 leading-[140%]">
                      {product?.name}
                    </p>
                    <p className="font-lato font-[500] text-[18px]  text-color/cyan/6 leading-[23px]">
                      ₹{product?.price}
                    </p>
                  </div>

                  {/* Rating */}
                  {product?.rating && (
                    <p className="font-lato font-[400] text-[14px] text-Text/Body-Text flex items-center leading-[140%]">
                      <span className="text-[20px] mr-[4px] text-Neutral/800">
                        ★
                      </span>
                      {product?.rating} ({product?.ratingPeopleCount})
                    </p>
                  )}

                  {/* Composition */}
                  {product?.composition && (
                    <p className="italic font-lato font-[500] text-[16px] leading-[130%] text-primary/700 ">
                      {product?.composition}
                    </p>
                  )}

                  {/* Tags */}
                  {product?.tags?.length > 0 && (
                    <div className="flex gap-[8px] flex-wrap">
                      {product.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="border border-Neutral/600 px-[8px] font-[1400] h-[28px] text-[14px] flex items-center leading-[140%] font-lato  text-primary/700 "
                        >
                          <Image
                            src={TickIcon}
                            alt="Tick"
                            width={23}
                            height={23}
                          />
                          <span className="ml-[8px]"> {tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex   justify-between font-lato font-[400] text-[14px] leading-[140%]  text-primary/700 ">
                    {/* Container info */}
                    {product?.size && <p>Container: {product?.size}</p>}

                    {product?.dosage && (
                      <p>Dosage: {startCase(product?.dosage)}</p>
                    )}
                  </div>

                  {/* Description */}
                  {product?.description && (
                    <p className="font-lato font-[400] leading-[140%] text-[14px] text-Neutral/800 -tracking-[1%] my-1">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="border-[1px] border-Elements/Divider-Stroke h-[1px] mt-[24px] md:mt-[32px]"></div>
              </div>
            );
          })}
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
        styles={{ body: { position: "relative" } }}
      >
        {/* Custom Close Button */}
        <button
          onClick={handleCancel}
          className="absolute md:top-[-22px]  top-[-56px] right-[-24px] md:right-[-60px] h-[36px] w-[36px] bg-Neutral/800 text-white flex items-center justify-center "
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
