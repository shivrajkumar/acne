import Image from "next/image";
import { startCase } from "lodash";
import CartDetails from "./CartDetails";
import { CDN_BASE_URL } from "@/constants/config";
import { useCartContext } from "../../context/CartContext";
import AMIcon from "@assets/svg/AM.svg"
import PMIcon from "@assets/svg/PM.svg"

const OrderSummary = () => {
  const { productsDetails } = useCartContext();
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
                <div className="flex justify-between gap-[16px] md:gap-[24px]">
                  <div>
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      width={168}
                      height={168}
                      className="hidden md:flex w-[168px] h-[168px]"
                    />
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      width={104}
                      height={104}
                      className="flex md:hidden w-[104px] h-[104px]"
                    />
                    <div className="flex justify-center gap-[16px] mt-[16px]">
                        {showAM && (
                      <div className="flex items-center gap-1">
                        {/* AM Icon */}
                        <Image
                          src={AMIcon}
                          alt="AM"
                          width={24}
                          height={24}
                          className="hidden md:flex"
                        />
                        <Image
                          src={AMIcon}
                          alt="AM"
                          width={24}
                          height={24}
                          className="flex md:hidden"
                        />

                        {/* AM text */}
                        <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                          AM
                        </span>
                      </div>)}
                      {showPM && (
                        <>
                          <div className="flex items-center gap-1">
                            <Image
                              src={PMIcon}
                              alt="PM"
                              width={22}
                              height={22}
                              className="hidden md:flex"
                            />
                            <Image
                              src={PMIcon}
                              alt="PM"
                              width={22}
                              height={22}
                              className="flex md:hidden"
                            />
                            {/* PM text */}
                            <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                              PM
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px] flex-1">
                    <div className="flex flex-col gap-[4px]">
                      <p className="font-lato font-[500] text-[16px] md:text-[18px] text-Text/Heading-Text">
                        {product?.name}
                      </p>
                      {product?.composition && (
                        <p className="font-lato font-[500] text-[16px] md:text-[18px] text-Text/Heading-Text">
                          {product?.composition}
                        </p>
                      )}
                      {product?.size && (
                        <p className="font-lato font-[400] text-Text/Label text-[14px]">
                          Container: <span>{product?.size}</span>
                        </p>
                      )}
                      {product?.dosage && (
                        <p className="font-lato font-[400] text-Text/Label text-[14px]">
                          Dosage: <span>{startCase(product?.dosage)}</span>
                        </p>
                      )}
                    </div>
                    {product?.tags && (
                      <div className="flex gap-[8px] flex-wrap">
                        {product?.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="bg-Background/Beige px-[8px] h-[32px] flex items-center w-fit font-lato font-[400] text-Neutral/800 text-[12px] md:text-[14px]"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    )}
                    {product?.rating && product?.price && (
                      <div className="flex gap-[16px]">
                        <p className="font-lato font-[400] text-[14px] md:text-[16px] text-Text/Body-Text">
                          <span className="w-[20px] h-[20px] mr-[4px]">★</span>
                          {product?.rating} ({product?.ratingPeopleCount})
                        </p>
                        <p className="font-lato font-[600] text-[14px] md:text-[16px] text-Text/Heading-Text">
                          ₹{product?.price}
                        </p>
                      </div>
                    )}
                    {product?.description && (
                      <div>
                        <p className="font-lato font-[400] text-[12px] md:text-[16px] text-Text/Body-Text -tracking-[1%]">
                          {" "}
                          {product?.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-[1px] border-Elements/Divider-Stroke h-[1px] mt-[24px] md:mt-[32px]"></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-[35%]">
        <CartDetails enableOptin />
      </div>
    </div>
  );
};

export default OrderSummary;
