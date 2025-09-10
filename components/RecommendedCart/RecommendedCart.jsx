"use client";
import { useState, useEffect } from "react";

import { getCurrentTimeInReadableForm } from "@helpers/timeFormatter";
import { PLATFORM } from "@constants/constants";
import { usePathname } from "next/navigation";
import { REPEAT_ORDER_DETAILS } from "@/constants/urls";
import { getParamValue } from "@/helpers/getParamValue";
import RecommendedCartMiddleComponent from "./RecommendedCartMiddleComponent";
import { fetchRequest } from "@/helpers/fetchRequest";
import RecommendedCartHeader from "./RecommendedCartHeader";
import handleBuyNowClick from "../result/handleBuyNowClick";
import { ReorderErrorHandler } from "./ReorderErrorHandler";
import AcneHeader from "../generic/Header/AcneHeader";
import AcneFooter from "../generic/AcneFooter";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import Loader from "../generic/Loader";
import {
    callAfterMoegageIsLoaded,
    trackMoEngageEvent,
} from "@/utils/moegage";
import { logGtmEvent } from "../generic/Gtm";
import moengage from "@moengage/web-sdk";
import { generateEventId } from "@/helpers/metaCapiHelper";




function RecommendedCart({ searchParams, coinsData, isJuspay, params }) {
    const pathname = usePathname();
    const id = searchParams?.case_id || pathname.split("/").pop();
    const [showSidebar, setShowSidebar] = useState(false);
    const [cartBed, setCartBed] = useState(true);
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [newTotalPrice, setNewTotalPrice] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(null);
    const [discountCode, setDiscountCode] = useState(null);
    const [newDiscountCode, setNewDiscountCode] = useState(null);
    const [discountType, setDiscountType] = useState(null);
    const [discountCodeShopflo, setDiscountCodeShopflo] = useState(null);
    const [newDiscountCodeShopflo, setNewDiscountCodeShopflo] = useState(null);
    const [userName, setUserName] = useState({});
    const [placeOrderClicked, setPlaceOrderClicked] = useState(false);
    const [productData, setProductData] = useState([]);
    const [buttonText, setButtonText] = useState("Add to cart");
    const [upSellProduct, setUpSellProduct] = useState([]);
    const [removedProduct, setRemovedProduct] = useState([]);
    const [cxName, setCxName] = useState("");
    const [isMonth, setIsMonth] = useState("1");
    const [discountArr, setDiscountArr] = useState([]);
    const [isDiscountValid, setIsDiscountValid] = useState(false);
    const [noteAttributes, setNoteAttributes] = useState([]);
    const [isError, setIsError] = useState(false);
    const [headingDetails, setHeadingDetails] = useState({});
    const [courseCompletedProductDetails, setCourseCompletedProductDetails] =
        useState([]);
    const [discountValidityByPlan, setDiscountValidityByPlan] = useState({});
    const [nextMonthProductDetailsFromApi, setNextMonthProductDetailsFromApi] =
        useState([]);
    const [isMale, setIsMale] = useState(true);
    const [oneMonthCart, setOneMonthCart] = useState([]);
    const [threeMonthCart, setThreeMonthCart] = useState([]);
    const [reorderBanner, setReorderBannerImage] = useState("");
    const [orderCount, setOrderCount] = useState();
    const caseId = params?.id;
    const disableProductId = ["45277154377906", "45584051339442"];
    const validCaseId = /^[0-1a-f]/.test(caseId);
    const [latestOrderDate, setLatestOrderDate] = useState('');
    const [deletedProduct, setDeletedProducts] = useState([])



    useEffect(() => {
        window.localStorage.setItem("caseId", id);
        window.localStorage.removeItem("is_order_thankyou_loaded");
    }, [id]);



    useEffect(() => {
        if (id) {
            (async () => {

                callAfterMoegageIsLoaded(() => {
                    moengage.update_unique_user_id(id);
                    moengage.add_user_attribute("synthetic_id", id);
                    moengage.add_user_attribute("case_id", id);
                });
                await getProductList(id);
            })();
        }
    }, [id]);

    useEffect(() => {
        getProductDetail(id);
    }, [productData]);

    const getUtmDetails = () => {
        const queryString = window.location;
        const _utmDetails = ["utm_source", "utm_campaign", "utm_medium"].reduce(
            (acc, nextValue) => {
                const value = getParamValue(queryString.href, nextValue);
                acc[nextValue] = value;
                return acc;
            },
            {}
        );
        return _utmDetails;
    };

    const getProductList = async (id,) => {

        let url = REPEAT_ORDER_DETAILS(id)
        try {
            const _res = await fetchRequest(url);
            if (_res.status === 200) {
                setCxName(_res.data.customerName);

                let _productsData = _res.data?.nextMonthProductDetails;
                let _upSellProduct = _res.data?.upSellProductDetails;
                let _removedProduct = _res.data?.courseCompletedProductDetails;
                const _discountArr = _res.data?.repeatOrderDiscountCodes?.discount;
                const headingDetailsFromApi = _res.data?.headingDetails;
                setHeadingDetails(headingDetailsFromApi);
                setIsDiscountValid(_res.data?.repeatOrderDiscountCodes?.isDiscountValid);
                setDiscountValidityByPlan(
                    _res.data?.repeatOrderDiscountCodes?.discountValidityByPlan
                );
                setReorderBannerImage(_res.data?.reoderBanner);
                setDiscountArr(_discountArr);
                setCourseCompletedProductDetails(_removedProduct ? _removedProduct : []);
                setOrderCount(_res.data?.orderCount);
                setLatestOrderDate(_res?.data?.latestOrderedDate);
                window.localStorage.setItem("gender", _res.data.gender);
                setIsMale(_res.data.gender == "M");
                _productsData = _res.data.nextMonthProductDetails.map((item) => ({
                    id: item.variantId,
                    title: item.name,
                    img: item.image,
                    price: item.price,
                    totalPrice: item.price,
                    itemCount: item.quantity,
                    isCombo: false,
                    dosage: item.dosage,
                    description: item.description,
                    size: item.size
                }));

                setProductData(_productsData);
                setOneMonthCart(_productsData)
                setNextMonthProductDetailsFromApi(_res.data.nextMonthProductDetails);

                _upSellProduct = _res.data.upSellProductDetails.map((item) => ({
                    id: item.variantId,
                    title: item.name,
                    img: item.image,
                    price: item.price,
                    totalPrice: item.price,
                    isCombo: false,
                    dosage: item.dosage,
                    description: item.description,
                    size: item.size,
                    rating: item.rating,
                }));

                setUpSellProduct([..._upSellProduct]);

                _removedProduct = _res.data.courseCompletedProductDetails.map((item) => ({
                    id: item.variantId,
                    title: item.name,
                    img: item.image,
                    price: item.price,
                    totalPrice: item.price,
                    isCombo: false,
                }));
                setRemovedProduct(_removedProduct);

                trackMoEngageEvent("repurchase_page_load", {
                    case_id: id,
                    platform: PLATFORM,
                    timestamp: getCurrentTimeInReadableForm(),
                    screenName: "repurchase_page",
                    cartValue: cartValue,
                    utm_source: utmDetails.utm_source,
                    utm_campaign: utmDetails.utm_campaign,
                    utm_medium: utmDetails.utm_medium,
                    order_count: _res?.data?.orderCount,
                });
            } else if (_res.hasError) {
                setIsError(true);
            }
        } catch (e) { console.error(e); setIsError(true) }


        const utmDetails = getUtmDetails();

        let _utmData = [];

        Object.entries(utmDetails).forEach(([key, value]) => {
            _utmData.push({ name: `${key}`, value: `${value}` });
        });
        _utmData.push({
            name: "landing_page",
            value: pathname,
        });
        setNoteAttributes(_utmData);

    };

    const getProductDetail = async () => {
        let tempItemData = productData;
        let cartData = [];
        let totalTemp = 0;
        let count = 0;
        tempItemData &&
            tempItemData?.length > 0 &&
            tempItemData?.forEach((val, i) => {
                if (val) {
                    val.itemCount = val.itemCount;
                    val.totalPrice = Number(val.price) * val.itemCount;
                    val.img = val.img;
                    val.dosage = val.dosage;
                    val.description = val.description;
                    val.size = val.size

                    cartData.push(val);
                    totalTemp = Number(val.totalPrice) + Number(totalTemp);
                    count = Number(val.itemCount) + Number(count);
                }
            });
        let _3monthPrice = 0;
        nextMonthProductDetailsFromApi.forEach((item) => {
            _3monthPrice =
                Number(_3monthPrice) + Number(item.price) * (item.quantity * 3);
        });
        let _3month_cart = nextMonthProductDetailsFromApi.map((item) => {
            return {
                id: item.variantId,
                title: item.name,
                img: item.image,
                price: item.price,
                totalPrice: item.price,
                itemCount: item.quantity * 3,
                isCombo: false,
                dosage: item.dosage,
                description: item.description,
                size: item.size
            };
        });

        getDiscount(totalTemp);
        getNewDiscount(_3monthPrice);
        setCartItemCount(count);
        setTotalPrice(totalTemp);
        setNewTotalPrice(_3monthPrice);
        setOneMonthCart(cartData);
        setThreeMonthCart(_3month_cart);

        if (cartData.length > 0) {
            // let gtmObj = {
            //     totalPrice: totalPrice,
            //     cartData: cartData,
            //     section: "login",
            //     pagename: "recommendation",
            // };
            // gtmEcommerce(gtmObj, "1monthPlan_Clicked");
        }
    };

    const getDiscount = (totalPrice) => {
        let _temp = [];
        discountArr.map((code, i) => {
            _temp.push({
                diff: totalPrice - code.validCartValue,
                value: code.value,
                code: code.code,
            });
        });
        const positiveValues = _temp.filter((number) => number.diff >= 0);
        const lowestPositiveValue = Math.min(
            ...positiveValues.map((item) => item.diff)
        );
        const _lowestPositiveValue = _temp.filter(
            (number) => number.diff === lowestPositiveValue
        );

        if (
            _lowestPositiveValue[0]?.value !== undefined &&
            discountValidityByPlan._1Month
        ) {
            setDiscountCode(_lowestPositiveValue[0]?.value);
            setDiscountCodeShopflo(_lowestPositiveValue[0]?.code);
        } else if (_lowestPositiveValue.length === 0) {
            setDiscountCode(null);
            setDiscountCodeShopflo(null);
        }
    };

    const getNewDiscount = (newTotalPrice) => {
        let _temp = [];
        discountArr.map((code, i) => {
            _temp.push({
                diff: newTotalPrice - code.validCartValue,
                value: code.value,
                code: code.code,
            });
        });
        const positiveValues = _temp.filter((number) => number.diff >= 0);
        const lowestPositiveValue = Math.min(
            ...positiveValues.map((item) => item.diff)
        );
        const _lowestPositiveValue = _temp.filter(
            (number) => number.diff === lowestPositiveValue
        );
        if (
            _lowestPositiveValue[0]?.value !== undefined &&
            discountValidityByPlan._3Month
        ) {
            setNewDiscountCode(_lowestPositiveValue[0]?.value);
            setNewDiscountCodeShopflo(_lowestPositiveValue[0]?.code);
        } else if (_lowestPositiveValue.length === 0) {
            setNewDiscountCode(null);
            setNewDiscountCodeShopflo(null);
        }
    };

    const decItem = (item, index) => {
        if (item.itemCount > 1) {
            const counters = [...cartData];
            counters[index] = {
                ...cartData[index],
                itemCount: cartData[index].itemCount - 1,
                totalPrice:
                    Number(cartData[index].totalPrice) - Number(cartData[index].price),
            };
            if (isMonth === "1") {
                setTotalPrice(Number(totalPrice) - Number(item.price));
                getDiscount(Number(totalPrice) - Number(item.price));
                setOneMonthCart(counters);
            } else if (isMonth === "3") {
                setNewTotalPrice(Number(newTotalPrice) - Number(item.price));
                getNewDiscount(Number(newTotalPrice) - Number(item.price));
                setThreeMonthCart(counters);
            }
            setCartItemCount(Number(cartItemCount) - 1);
            setCartData(counters);
            let gtmObj = {
                totalPrice: totalPrice,
                cartData: cartData,
                section: "login",
                pagename: "recommendation",
            };
            // gtmEcommerce(gtmObj, "remove_from_cart");
        }
    };

    const incItem = (item, index) => {
        const counters = [...cartData];
        counters[index] = {
            ...cartData[index],
            itemCount: cartData[index].itemCount + 1,
            totalPrice:
                Number(cartData[index].totalPrice) + Number(cartData[index].price),
        };
        setCartItemCount(Number(cartItemCount) + 1);
        if (isMonth === "1") {
            setTotalPrice(Number(totalPrice) + Number(item.price));
            getDiscount(Number(totalPrice) + Number(item.price));
            setOneMonthCart(counters);
        } else if (isMonth === "3") {
            setNewTotalPrice(Number(newTotalPrice) + Number(item.price));
            getNewDiscount(Number(newTotalPrice) + Number(item.price));
            setThreeMonthCart(counters);
        }
        setCartData(counters);
        // let gtmObj = {
        //     totalPrice: totalPrice,
        //     cartData: cartData,
        //     section: "login",
        //     pagename: "recommendation",
        // };
        // gtmEcommerce(gtmObj, "add_to_cart");
    };

    const addItem = (item, index) => {
        let obj = {
            id: item.id,
            title: item.title,
            img: item.img,
            price: item.price,
            totalPrice: item.price,
            itemCount: isMonth === "1" ? 1 : 3,
            isCombo: false,
        };
        const counters = [...cartData, obj];
        setCartItemCount(Number(cartItemCount) + 1);
        setTotalPrice(Number(totalPrice) + Number(item.price));
        setNewTotalPrice(Number(newTotalPrice) + Number(item.price * 3));
        if (isMonth === "1") {
            setOneMonthCart(counters);
        } else if (isMonth === "3") {
            setThreeMonthCart(counters);
        }
        setCartData(counters);

        const updatedRemovedProduct = removedProduct.filter(
            (items) => items.id !== item.id
        );
        setRemovedProduct(updatedRemovedProduct);
    };

    const _addItem = (item) => {
        const recommendedProduct = productData?.filter((product) => product?.id == item?.id)
        let obj = {
            ...item,
            id: item.id,
            title: item.title,
            img: item.img,
            price: item.price,
            totalPrice: Number(item.price),
            itemCount: isMonth === "1" ? 1 : 3,
            isCombo: false,
            product_added: recommendedProduct.length > 0 ? false : true,
        };

        const counters = [...cartData, obj];
        setCartItemCount(Number(cartItemCount) + 1);
        setTotalPrice(totalPrice + Number(item.price));
        setNewTotalPrice(Number(newTotalPrice) + Number(item.price * 3));
        setCartData(counters);
        setOneMonthCart([...oneMonthCart, { ...obj, itemCount: 1 }]);
        setThreeMonthCart([...threeMonthCart, { ...obj, itemCount: 3 }]);
        const updatedUpSellProduct = upSellProduct.filter(
            (items) => items.id !== item.id
        );
        setUpSellProduct(updatedUpSellProduct);

        if (isMonth === "1") {
            getDiscount(Number(totalPrice) + Number(item.price));
        } else if (isMonth === "3") {
            getNewDiscount(Number(newTotalPrice) + Number(item.price));
        }
        trackMoEngageEvent("product_added_repurchase", {
            case_id: id,
            platform: PLATFORM,
            timestamp: getCurrentTimeInReadableForm(),
            screenName: "repurchase_page",
            cartValue: isMonth == 1 ? totalPrice : newTotalPrice,
            plan_selected: isMonth === "1" ? "1" : "3",
            addedProduct: item
        })
    };

    const deleteItem = (item, index) => {
        setDeletedProducts([...deletedProduct, item])
        let counters = [...cartData];
        let _counters = [...upSellProduct];
        let _newItem = cartData[index];

        _counters = [_newItem, ..._counters];
        counters.splice(index, 1);

        if (isMonth === "1") {
            setTotalPrice(totalPrice - item.itemCount * item.price);
            getDiscount(totalPrice - item.itemCount * item.price);
            setOneMonthCart(counters);
        } else if (isMonth === "3") {
            setNewTotalPrice(newTotalPrice - item.itemCount * item.price);
            getNewDiscount(newTotalPrice - item.itemCount * item.price);
            setThreeMonthCart(counters);
        }
        setCartData(counters);
        setUpSellProduct(_counters);
        setCartItemCount(Number(cartItemCount) - Number(item.itemCount));
        trackMoEngageEvent("product_removed_repurchase", {
            case_id: id,
            platform: PLATFORM,
            timestamp: getCurrentTimeInReadableForm(),
            screenName: "repurchase_page",
            cartValue: isMonth == 1 ? totalPrice : newTotalPrice,
            plan_selected: isMonth === "1" ? "1" : "3",
            removedProduct: item
        })
    };

    const getOneMonthCart = () => {
        setIsMonth("1");

        let _1Month_Price = 0;
        [...oneMonthCart].forEach((item) => {
            _1Month_Price =
                Number(_1Month_Price) + Number(item.price) * item.itemCount;
        });
        getDiscount(_1Month_Price);
        setTotalPrice(_1Month_Price);
        setCartData([...oneMonthCart]);

    };

    const getThreeMonthCart = () => {
        setIsMonth("3");
        let _3Month_Price = 0;
        [...threeMonthCart].forEach((item) => {
            _3Month_Price =
                Number(_3Month_Price) + Number(item.price) * item.itemCount;
        });
        getNewDiscount(_3Month_Price);
        setNewTotalPrice(_3Month_Price);
        setCartData([...threeMonthCart]);


    };

    const placeOrder = async () => {
        const gender = window.localStorage.getItem("gender");
        const queryString = typeof window != "undefined" ? window.location : "";
        const utmDetails = ["utm_source", "utm_campaign", "utm_medium"].reduce(
            (acc, nextValue) => {
                const value = getParamValue(queryString.href, nextValue);
                acc[nextValue] = value;
                return acc;
            },
            {}
        );
        trackMoEngageEvent("repurchase_checkout_initiated", {
            case_id: id,
            gender: gender,
            platform: PLATFORM,
            timestamp: getCurrentTimeInReadableForm(),
            screenName: "repurchase_page",
            cartValue: isMonth == 1 ? totalPrice : newTotalPrice,
            product: cartData,
            utm_source: utmDetails.utm_source,
            utm_campaign: utmDetails.utm_campaign,
            utm_medium: utmDetails.utm_medium,
            plan_selected: isMonth === "1" ? "1" : "3",
        });
        logGtmEvent("repurchase_page_activity",
            {
                user_id: id,
                products_selected: cartData,
                products_removed: (deletedProduct ?? []).filter(
                    (deleted) => !cartData.some((item) => item.id === deleted.id)
                ),
                cart_value: isMonth == 1 ? totalPrice : newTotalPrice,
                checkout_status: "Initiated",
                fb_external_id: generateEventId({ eventName: 'repurchase_page_activity' })
            }

        )

        handleBuyNowClick(cartData, id, isMonth === "1" ? discountCodeShopflo : newDiscountCodeShopflo)

        localStorage.setItem("journey_type", "recommendedcart");
    };

    const loaderProp = ({ src }) => {
        return src;
    };

    function chatHandler(e) {
        e.preventDefault();

        window.open(
            "https://api.whatsapp.com/send/?phone=918828006272&text=Hey%21+I+have+a+query&type=phone_number&app_absent=0",
            "_blank"
        );
    }

    if (isError) {
        <ReorderErrorHandler chatHandler={chatHandler} />
    }

    // Main render
    if (productData?.length < 1 && !isError) {
        return <Loader />;
    }

    return (
        <>
            <RecommendedCartHeader />
            <AcneMarqueeBanner />
            <div className=" sticky top-0 z-50">
                <AcneHeader />
            </div>
            <RecommendedCartMiddleComponent
                showSidebar={showSidebar}
                setShowSidebar={(val) => setShowSidebar(val)}
                placeOrderClicked={placeOrderClicked}
                setPlaceOrderClicked={(val) => setPlaceOrderClicked(val)}
                cartBed={cartBed}
                loader={loaderProp}
                cartData={cartData}
                totalPrice={totalPrice}
                newTotalPrice={newTotalPrice}
                cartItemCount={cartItemCount}
                incItem={(val, index) => incItem(val, index)}
                decItem={(val, index) => decItem(val, index)}
                deleteItem={(val, index) => deleteItem(val, index)}
                discountCode={discountCode}
                newDiscountCode={newDiscountCode}
                discountType={discountType}
                userName={userName}
                placeOrder={() => placeOrder()}
                placeOrderJuspay={() => placeOrderJuspay()}
                productData={productData}
                addToCart={(event, val) => addToCart(event, val)}
                _addItem={(val, index) => _addItem(val, index)}
                addItem={(val, index) => addItem(val, index)}
                buttonText={buttonText}
                upSellProduct={upSellProduct}
                removedProduct={removedProduct}
                courseCompletedProductDetails={courseCompletedProductDetails}
                setProductData={setProductData}
                setUpSellProduct={setUpSellProduct}
                setRemovedProduct={setRemovedProduct}
                cxName={cxName}
                isMonth={isMonth}
                setIsMonth={setIsMonth}
                getThreeMonthCart={getThreeMonthCart}
                getOneMonthCart={getOneMonthCart}
                setNewTotalPrice={setNewTotalPrice}
                isDiscountValid={isDiscountValid}
                headingDetails={headingDetails}
                discountValidityByPlan={discountValidityByPlan}
                isMale={isMale}
                reorderBannerImage={reorderBanner}
                id={id}
                orderCount={orderCount}
                coinsData={coinsData}
                disableProductId={disableProductId}
                validCaseId={validCaseId}
            />
            <AcneFooter />
        </>
    );
}

export default RecommendedCart;
