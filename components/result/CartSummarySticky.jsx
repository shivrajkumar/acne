import Image from "next/image";
import ExpandUp from "@assets/svg/ExpandUp.svg";
import { useEffect, useState } from "react";
import { Drawer } from "antd";
import CartDetails from "./CartDetails";
import CrossIcon from "@assets/icons/close-circle.png";
import { useCartContext } from "../../context/CartContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const CartSummarySticky = () => {
  const [open, setOpen] = useState(false);
  const {
    cartDetails: cartData,
    productsDetails: productDetails,
    doctorDetails,
    handleBuyNowClick,
    caseId,
    acne_booking_success,
    hasPlacedOrder,
  } = useCartContext();

  // Add body scroll lock effect when drawer is open
  useBodyScrollLock(open);

  // Get first 3 products to display
  const displayProducts = productDetails?.slice(0, 3) || [];

  // Calculate number of remaining products
  const remainingCount =
    productDetails?.length > 3 ? productDetails.length - 3 : 0;

  const scrollToOrderSummary = (e) => {
    e.preventDefault();
    const orderSummaryElement = document.getElementById("order_summary");
    if (orderSummaryElement) {
      orderSummaryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const storedBookingStatus = acne_booking_success;

  return (
    <>
      <div
        className={`flex justify-between  py-[16px] px-[16px] md:py-[16px] md:px-[80px] items-center sticky bottom-0 bg-[#FFFFFF] w-full z-[44]  shadow-custom-medium`}
      >
        <div className="flex gap-[32px]">
          <div>
            <p
              className={`text-[24px] md:text-[30px] font-sophiaPro font-[600] text-Text/Heading-Text -tracking-[1%]`}
            >
              ₹{(cartData?.totalCartValue ?? 0).toFixed(2)}/-
            </p>
            <button
              onClick={scrollToOrderSummary}
              className="md:underline font-sophiaPro font-[500] text-[14px] -tracking-[2%] text-Neutral/800 hidden md:flex items-center "
            >
              Order Summary
            </button>
            <div
              className="md:underline font-sophiaPro font-[500] text-[14px] -tracking-[2%] text-Neutral/800 flex md:hidden items-center cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Order Summary
              <span className="ms-[4px]">
                <Image src={ExpandUp} alt="Expand Up" width={10} height={6} />
              </span>
            </div>
          </div>
          <div className="hidden md:flex gap-[8px]">
            {displayProducts.map((product, index) => (
              <button
                onClick={scrollToOrderSummary}
                key={index}
                className="border-[1px] border-Elements/Divider-Stroke rounded-[8px] p-[4px]"
              >
                <Image
                  src={product?.image}
                  alt={product?.name}
                  width={48}
                  height={48}
                />
              </button>
            ))}

            {remainingCount > 0 && (
              <button
                onClick={scrollToOrderSummary}
                className="flex items-center justify-center border-[1px] border-Elements/Divider-Stroke w-[56px] h-full rounded-[8px] p-[4px]"
              >
                <span className="font-sophiaPro text-[14px] font-[500] text-Neutral/800">
                  +{remainingCount} more
                </span>
              </button>
            )}
          </div>
        </div>
        <div
          className={` flex  
             items-center`}
        >
          {/* <a
            href={`/book-a-call?caseId=${caseId}&redirect=result`}
            className={`${storedBookingStatus && "hidden"}`}
          >
            <button className="w-fit bg-Tertiary/600 px-[24px] md:px-[56px] py-[16px] rounded-full text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%]">
              BOOK A CALL
            </button>
          </a> */}

          {!hasPlacedOrder && (
            <button
              className="w-full bg-Tertiary/600 px-[60px] md:px-[56px] py-[16px] rounded-full text-[#FFFFFF] text-[16px] font-[500] -tracking-[1%]"
              onClick={handleBuyNowClick}
            >
              {cartData?.cta}{" "}

            </button>
          )}
        </div>
      </div>

      <Drawer
        placement="bottom"
        closable={false} /* Hide the default close button */
        onClose={() => setOpen(false)}
        open={open}
        className="mobile-cart-drawer"
        title={
          <div className="flex flex-row items-center justify-between w-full ">
            <h2 className="font-sophiaPro font-[600] text-[18px] text-Text/Heading-Text -tracking-[1%]">
              Order Summary
            </h2>
            <div onClick={() => setOpen(false)} className="cursor-pointer ">
              <Image src={CrossIcon} alt="Cross Icon" width={24} height={24} />
            </div>
          </div>
        }
      >
        <CartDetails
          cartData={cartData}
          productData={productDetails}
          isMobile={true}
          doctorDetails={doctorDetails}
          isSmall={true}
          isDrawer={true}
        />
      </Drawer>
    </>
  );
};

export default CartSummarySticky;
