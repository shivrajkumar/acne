import React, { useContext, useEffect, useState } from 'react'
import Header from '../productsComponents/headerBlackBG';
import useCustomRouter from '@/constants/useCustomRouter';
import { CartContext } from '@/context/cart-store';
import { fetchRequest } from '@/helpers/fetchRequest';
import { NEW_RESULT_API } from '@/constants/urls';
import { gtmEcommerce } from '@/helpers/gtmHelpers';

const CommonHeader = ({ productsData }) => {

    const [showSidebar, setShowSidebar] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [discountHandle, setDiscountHandle] = useState("");
    const [syntheticId, setSyntheticId] = useState("");
    const [showMyRecc, setShowMyRecc] = useState(false);
    const [, setGlobalCart] = useState([]);
    const router = useCustomRouter();

    useEffect(() => {
        const synthId = window.localStorage.getItem("resultSynthetic");
        setSyntheticId(synthId);
        if (synthId && synthId !== "null" && synthId !== "undefined") {
            setShowMyRecc(true);
        }
    }, []);

    const { cartItems } = useContext(CartContext);
    useEffect(() => {
        setGlobalCart(cartItems);
    }, [cartItems]);

    const decItem = (item, index) => {
        if (item.itemCount > 1) {
            const counters = [...cartData];
            counters[index] = {
                ...cartData[index],
                itemCount: cartData[index].itemCount - 1,
                totalPrice:
                    Number(cartData[index].totalPrice) - Number(cartData[index].price),
            };
            setTotalPrice(Number(totalPrice) - Number(item.price));
            setCartItemCount(Number(cartItemCount) - 1);
            setCartData(counters);
            let gtmObj = {
                totalPrice: totalPrice,
                cartData: cartData,
            };
            gtmEcommerce(gtmObj, "remove_from_cart");
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
        setTotalPrice(Number(totalPrice) + Number(item.price));
        setCartData(counters);

        let gtmObj = {
            totalPrice: totalPrice,
            cartData: cartData,
        };
        gtmEcommerce(gtmObj, "add_to_cart");
    };

    const deleteItem = (item, index) => {
        const counters = [...cartData];
        counters.splice(index, 1);
        setTotalPrice(totalPrice - item.itemCount * item.price);
        setCartData(counters);
        setCartItemCount(Number(cartItemCount) - Number(item.itemCount));

        let gtmObj = {
            totalPrice: totalPrice,
            cartData: cartData,
        };
        gtmEcommerce(gtmObj, "remove_from_cart");
    };

    const formatter = (val) => {
        let formatValue = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        });
        return formatValue.format(val);
    };

    const addToCart = async (event, val) => {
        event.preventDefault();
        let cartArry = [...cartData];
        let totalTemp = 0;
        let count = 0;
        let findIndex = cartData.findIndex((item) => item.id == val.id);
        if (findIndex < 0) {
            let cartObj = {};
            cartObj.itemCount = 1;
            cartObj.price = val.price;
            cartObj.name = val.title;
            cartObj.totalPrice = val.price;
            cartObj.image = val.img;
            cartObj.id = val.id;
            totalTemp =
                Number(val.totalPrice) + Number(totalPrice ? totalPrice : totalTemp);
            count =
                Number(val.itemCount) + Number(cartItemCount ? cartItemCount : count);
            cartArry.push(cartObj);
            setCartData(cartArry);
            setCartItemCount(count);
            setTotalPrice(totalTemp);
        } else {
            let ind = cartData.indexOf(cartData[findIndex]);
            incItem(cartData[ind], ind);
        }
    };

    useEffect(() => {
        if (showMyRecc) {
            getCartItemList();
        }
    }, [showMyRecc]);

    const getCartItemList = async () => {
        setCartItemCount(0);
        setTotalPrice(null);
        setCartData([]);
        if (showMyRecc) {
            const _res = await fetchRequest(NEW_RESULT_API(syntheticId));
            if (_res.status === 200) {
                window.localStorage.setItem(
                    "caseId",
                    _res?.data?.User_Analysis?.case_id
                );
                let tempData = [];
                let totalTemp = 0;
                let count = 0;
                if (_res.data.stage_transition.currentStage.stage !== "Stage-6") {
                    _res.data?.product_Ids?.length > 0 &&
                        _res.data?.product_Ids?.forEach((val) => {
                            let cartObj = {};
                            cartObj.itemCount = 1;
                            cartObj.price = val.price;
                            cartObj.name = val.cartDisplayName;
                            cartObj.totalPrice = val.price;
                            cartObj.image = val.image_url.cartImgUrl;
                            cartObj.id = `${val.product_id}`;
                            totalTemp =
                                Number(cartObj.totalPrice) +
                                Number(totalPrice ? totalPrice : totalTemp);
                            count =
                                Number(val.itemCount) +
                                Number(cartItemCount ? cartItemCount : count);
                            tempData.push(cartObj);
                        });
                    setCartItemCount(count);
                    setTotalPrice(totalTemp);
                    setCartData(tempData);
                } else {
                    setCartItemCount(0);
                    setCartData([]);
                }
            }
        }
    };
    const loaderProp = ({ src }) => {
        return src;
    };

    return (
        <Header
            showSidebar={showSidebar}
            setShowSidebar={(val) => setShowSidebar(val)}
            loader={loaderProp}
            cartData={cartData}
            setCartData={(val) => setCartData(val)}
            incItem={(val, index) => incItem(val, index)}
            decItem={(val, index) => decItem(val, index)}
            deleteItem={(val, index) => deleteItem(val, index)}
            cartItemCount={cartItemCount}
            totalPrice={totalPrice}
            setDiscountHandle={(val) => setDiscountHandle(val)}
            discountHandle={discountHandle}
            formatter={(val) => formatter(val)}
            productData={productsData}
            addToCart={(event, val) => addToCart(event, val)}
            syntheticId={syntheticId}
            showMyRecc={showMyRecc}
            router={router}
        />
    )
}

export default CommonHeader;