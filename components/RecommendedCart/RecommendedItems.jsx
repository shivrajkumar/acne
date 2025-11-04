import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";
import removeProductData from "./removeProductData";
import RemoveProductModal from "./RemoveProductModal";

const RecommendedItems = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [productData, setProductData] = useState(null);
    const [validId, setValidId] = useState(false);

    // Memoized values
    const genderKey = useMemo(() => props?.isMale ? "M" : "F", [props?.isMale]);
    const removeData = useMemo(() => removeProductData(genderKey), [genderKey]);

    const hasCartData = useMemo(() =>
        props?.cartData?.length > 0, [props?.cartData?.length]
    );


    const getBadgeColor = useCallback(() =>
        "bg-Primary/500", [props.isMale]
    );

    const getImageContainerWidth = useCallback(() =>
        validId ? "w-full" : "w-[70%]", [validId]
    );



    // Callbacks
    const handleReduce = useCallback((event, cart, index) => {
        event.stopPropagation();
        if (cart.itemCount >= 2) {
            props.decItem(cart, index);
        } else {
            returnProductBenefit(cart, index);
        }
    }, [props.decItem]);

    const returnProductBenefit = useCallback((product, index) => {
        const benefit = product?.description ||
            `${product.title} supports healthier skin by addressing key skin concerns.`;

        setProductData({ ...product, benefit, index });
        setShowPopup(true);
    }, [removeData]);

    const removeProduct = useCallback(() => {
        if (!productData) return;

        const removedProduct = { ...productData };
        delete removedProduct.benefit;
        delete removedProduct.index;

        props.deleteItem(removedProduct, productData.index);
        setShowPopup(false);
        props.showToastForWhile("remove", "Item removed successfully");
    }, [productData, props.deleteItem, props.showToastForWhile]);

    const handleCancel = useCallback(() => {
        setProductData(null);
        setShowPopup(false);
    }, []);

    const handleProductClick = useCallback((cart) => (e) => {
        e.stopPropagation();
        // props.getProductInfoAndOpen(cart.id);
        props.setOtherProductInfo(cart);
    }, [props.getProductInfoAndOpen, props.setOtherProductInfo]);

    const handleIncrement = useCallback((e, cart, index) => {
        e.stopPropagation();
        props.incItem(cart, index);
    }, [props.incItem]);

    // Memoized components
    const ProductBadge = useCallback(({ cart }) => {
        const badgeColor = getBadgeColor();

        if (cart.product_added_newly) {
            return (
                <div className={`absolute z-[30] top-0 left-0 ${badgeColor} text-white rounded-[2px] px-2 text-sm`}>
                    Newly Added
                </div>
            );
        }

        if (cart.product_added) {
            return (
                <div className={`absolute z-[30] top-0 left-0 ${badgeColor} text-white rounded-[2px] text-sm px-2`}>
                    Added
                </div>
            );
        }

        return null;
    }, [getBadgeColor]);

    const ProductImage = useCallback(({ cart }) => {
        if (validId) return null;

        return (
            <div className="flex flex-col justify-end w-[30%]">
                <div style={{ width: "100%", borderRadius: "4px" }}>
                    <div className="w-[100%]">
                        {/* <a href={cart.onlineStoreUrl}> */}
                            <Image
                                src={cart.img}
                                width={180}
                                height={180}
                                priority={true}
                                alt="Medicine Image"
                                className="rounded-xl"
                            />
                        {/* </a> */}
                    </div>
                </div>
            </div>
        );
    }, [validId]);

    const ProductInfo = useCallback(({ cart }) => {

        return (
            <div>
                <p className={`text-left font-sophiaPro text-[#414042] font-[500] text-[17px] md:text-[22px]`}>
                    {cart.title}
                </p>
                {/* <p className="text-left text-[12px] md:text-[17px] font-[500] text-[#777777]">
                    {cart.description}
                </p> */}
                {cart.size && <p className="text-left text-[12px] md:text-[17px] text-[#777777] capitalize">
                    Container : {cart.size}
                </p>}

                {cart.dosage && <p className="text-left text-[12px] md:text-[17px] text-[#777777] capitalize">
                    Dosage : {cart.dosage}
                </p>}
            </div>
        );
    }, []);

    const QuantityControls = useCallback(({ cart, index }) => {
        const isDisabled = props?.disableProductId?.includes(cart?.id);

        return (
            <div className=" font-sophiaPro border-Grey/200  text-[14px] font-[400] border-[1px] rounded-full flex items-center justify-between py-auto w-[80px] px-2">
                <button
                    type="button"
                    onClick={(e) => handleReduce(e, cart, index)}
                    disabled={isDisabled}
                    className={` font-[400] text-[20px] my-auto`}
                    aria-label="Decrease quantity"
                >
                    –
                </button>

                <input
                    type="text"
                    className="border-none text-Grey/900 font-[400] bg-transparent focus:outline-none text-[15px] w-[20px]"
                    disabled
                    style={{
                        color: "#000",
                        textAlign: "center",

                    }}
                    value={cart.itemCount}
                    readOnly
                    aria-label={`Quantity ${cart.itemCount}`}
                />

                <button
                    type="button"
                    onClick={(e) => { handleIncrement(e, cart, index) }}
                    disabled={isDisabled}
                    className={` font-[400] text-[20px] my-auto`}
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
        );
    }, [props?.disableProductId, handleReduce, handleIncrement]);


    const CartItem = useCallback(({ cart, index }) => {
        const imageContainerWidth = getImageContainerWidth();

        return (
            <div
                className="border border-solid p-[12px] md:p-[24px] rounded-[8px] my-2 relative bg-white transition-all ease-in cursor-pointer"
                key={index}
                onClick={handleProductClick(cart)}
            >
                <ProductBadge cart={cart} />
                <div className="flex w-[100%] space-x-4 pl-[1%]">
                    <ProductImage cart={cart} />
                    <div className={imageContainerWidth}>
                        <div
                            style={{ width: "100%", height: "100%" }}
                            className=" flex flex-col justify-between"
                        >
                            <ProductInfo cart={cart} />
                            <div className="">
                                <div className="flex justify-between">
                                    <div className="flex w-[100%] space-x-2">
                                        <div className="w-[55%] md:w-[75%]">
                                            <p className="text-[18px] md:text-[20px] font-[500] align-top font-sophiaPro text-[#414042] text-left">
                                                ₹ {cart.price}
                                            </p>
                                        </div>
                                        <div className="w-[45%] md:w-[25%] flex justify-end">
                                            <QuantityControls cart={cart} index={index} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [getImageContainerWidth, ProductBadge, ProductImage, ProductInfo, QuantityControls]);

    const EmptyState = useCallback(() => (
        <h5
            className="font-[500] text-center text-lg mt-4"
            style={{ color: "#414042" }}
        >
            No products
        </h5>
    ), []);

    return (
        <>
            <div className="md:w-[100%] mt-4">
                {showPopup && productData && (
                    <RemoveProductModal
                        removedProduct={productData}
                        open={showPopup}
                        cancel={handleCancel}
                        remove={removeProduct}
                        isMale={props?.isMale}
                    />
                )}

                {hasCartData ? (
                    props.cartData.map((cart, index) => (
                        <CartItem key={index} cart={cart} index={index} />
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>
        </>
    );
};

export default RecommendedItems;