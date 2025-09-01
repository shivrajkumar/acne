import { useEffect, useState, lazy, useRef, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CourseCompletedSlide from "./CourseCompletedSlide";
import BuyButton from "./BuyButton";
import RecommendedItems from "./RecommendedItems";
import RecommendedCartOfferAndUserInfo from "./RecommendedCartOfferAndUserInfo";
import ProductPageModal from "../result/ProductDetailsModal";



// Lazy load SliderSample component
const SliderSample = lazy(() => import("./SliderSample"), {
    ssr: false,
});

// Constants
const TOAST_DURATION = 2000;


function RecommendedCartMiddleComponent({
    headingDetails,
    orderCount,
    coinsData,
    disableProductId,
    validCaseId,
    discountDaysLeft,
    ...props
}) {
    // State management
    const [discountPrice, setDiscountPrice] = useState(null);
    const [newDiscountPrice, setNewDiscountPrice] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [otherProductInfo, setOtherProductInfo] = useState(null);
    const [open, setOpen] = useState(false);
    const [showToast, setShowToast] = useState({ show: false, text: "" });


    // Hooks
    const recommendedItemsRef = useRef(null);


    const containerBgClass = useMemo(() =>
        props.isMale ? "bg-white" : "bg-white",
        [props.isMale]
    );


    // Calculate discount prices
    useEffect(() => {
        const calculateDiscountPrice = (price, discountPercent) => {
            return price - price * (discountPercent / 100);
        };

        setDiscountPrice(calculateDiscountPrice(props.totalPrice, props.discountCode));
        setNewDiscountPrice(calculateDiscountPrice(props.newTotalPrice, props.newDiscountCode));
    }, [props.totalPrice, props.newTotalPrice, props.discountCode, props.newDiscountCode]);

    // Memoized functions
    const getProductInfoAndOpen = useCallback(async (id) => {
        const fullVariantId = `${id}_PDP`;
        setProductInfo(fullVariantId);
        setOpen(true)

    }, [props.id, props.isMale]);

    const showToastForWhile = useCallback((addOrRemove, text) => {
        setShowToast({ show: true, text });
        setTimeout(() => {
            setShowToast({ show: false, text: "" });
        }, TOAST_DURATION);
    }, []);

    const handleAddItem = useCallback((val, index) => {
        props._addItem(val, index);
        showToastForWhile("add", "Item added successfully");
    }, [props._addItem, showToastForWhile]);

    // Render banner component
    const renderBanner = () => {

        return (
            <>
                {/* Mobile banner */}
                <div className="relative">
                    <div className="bg-custom-blue-gradient px-[40px] md:px-[60px] py-[24px] md:py-[80px] flex flex-col gap-[10px]">
                        <p className="font-sophiaPro font-[400] text-[28px] md:text-[87px] leading-[1.3] tracking-[0.5px]">Keep Up The Progress!</p>
                        <p className="font-sophiaPro font-[400] text-[16px] md:text-[24px] leading-[1.3] tracking-[0.5px]">Well done on completing your personalised kit—consistency is the real secret to lasting clear skin.</p>
                    </div>
                </div>
            </>
        );
    };

    // Render upsell products section
    const renderUpSellProducts = () => {
        if (!props.upSellProduct?.length) return null;

        return (
            <div className="md:px-[14%] xs:p-3">
                <p className="font-sophiaPro text-[#414042] text-[20px] font-[600] px-1 ">
                    Products You Might Like
                </p>
                <p className="font-sophiaPro text-[#727272] text-[14px] md:text-[16px] font-[300] px-1 my-[4px] md:my-[12px]">
                    Feel free to add them as per your need
                </p>
                <div className="flex justify-center md:mt-[1.5%] text-center">
                    <SliderSample
                        SliderData={props.upSellProduct}
                        setProductData={props.setProductData}
                        setUpSellProduct={props.setUpSellProduct}
                        setRemovedProduct={props.setRemovedProduct}
                        _addItem={handleAddItem}
                        isMale={props.isMale}
                        getProductInfoAndOpen={getProductInfoAndOpen}
                        setOtherProductInfo={setOtherProductInfo}
                    />
                </div>
            </div>
        );
    };

    // Render course completed slide
    const renderCourseCompletedSlide = () => {
        if (!props.courseCompletedProductDetails?.length) return null;

        return (
            <CourseCompletedSlide
                isMale={props.isMale}
                contents={props.courseCompletedProductDetails}
            />
        );
    };



    return (
        <>

            <div className={`pb-[25%] md:pb-[10%] ${containerBgClass} font-sophiaPro overflow-hidden bg-white`}>
                {renderBanner()}

                <div className="flex flex-col items-center content-center justify-center text-center xl:px-10 xl:pt-4 xl:pb-10 xs:py-4 xs:px-3 overflow-hidden">

                    <div className="xl:w-9/12 xs:w-full">

                        <RecommendedCartOfferAndUserInfo
                            {...props}
                            discountPrice={discountPrice}
                            newDiscountPrice={newDiscountPrice}
                            orderCount={orderCount}
                            validCaseId={validCaseId}
                            discountDaysLeft={discountDaysLeft}
                        />
                        <p className="text-left my-[20px] md:my-[40px] text-[24px] md:text-[40px] font-[400] leading-[1.3] tracking-[0.5px]">
                            Your Next Personalised Skincare Kit
                        </p>
                        <div ref={recommendedItemsRef}>
                            {renderCourseCompletedSlide()}
                        </div>

                        <RecommendedItems
                            {...props}
                            showToastForWhile={showToastForWhile}
                            getProductInfoAndOpen={getProductInfoAndOpen}
                            setOtherProductInfo={setOtherProductInfo}
                            disableProductId={disableProductId}
                        />
                    </div>
                </div>

                {renderUpSellProducts()}
            </div>

            <BuyButton
                {...props}
                discountPrice={discountPrice}
                newDiscountPrice={newDiscountPrice}
                orderCount={orderCount}
                coinsData={coinsData}
            />

            {open && (
                <ProductPageModal variantId={productInfo} handleCancel={() => { setOpen(false) }} open={open} />
            )}
        </>
    );
}

export default RecommendedCartMiddleComponent;