"use client";
import CartDetails from "./CartDetails";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import ProductCard from "./ProductCard";

const OrderSummary = () => {
  const { productsDetails, optionalProductsDetails, addProductToCart } = useCartContext();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [productAdded, setProductAdded] = useState(false)



  // useBodyScrollLock(isModalOpen);


  // const showModal = (variantId) => {
  //  setSelectedVariantId(`${variantId}_PDP`);
  //   setIsModalOpen(true);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  //   setSelectedVariantId(null);
  // };

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
                  isOptional={product?.isOptionalProduct} />
                {/* Divider */}
                <div className="border-[1px] border-Elements/Divider-Stroke h-[1px] mt-[24px] md:mt-[32px]"></div>
              </div>
            );
          })}
          {
            optionalProductsDetails?.length > 0 && (
              <div className="flex flex-col gap-[16px] border-[2px] border-neutral-700 md:border-none">

                {optionalProductsDetails.map((product) => {
                  const { showAM, showPM } = getDosageIcons(product.dosageCode);
                  return (
                    <>
                      <div className=" ">
                        <ProductCard
                          key={product.variantId}
                          product={product}
                          showAM={showAM}
                          showPM={showPM}
                          enableAddToCart={true}
                          addProductToCart={addProductToCart}
                        />
                        {/* Divider */}
                      </div>
                      <div className="border-[1px] border-Elements/Divider-Stroke h-[1px] mt-[24px] md:mt-[32px]"></div>
                    </>

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
      {/*} <Modal
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
      {/* <button
        onClick={handleCancel}
        className="absolute md:top-[-22px]  top-[-56px] right-[-24px] md:right-[-60px] h-[36px] w-[36px] bg-Neutral/800 text-white flex items-center justify-center "
      >
        <Image src={closeIcon} alt="close-icon" width={20} height={20} />
      </button>

      {/* Your modal content */}
      {/* <ProductPageModal variantId={selectedVariantId} handleCancel={handleCancel} />
    </Modal>  */}
    </div >
  );
};

export default OrderSummary;
