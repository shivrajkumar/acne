"use client";

import { isArray } from "lodash";
import { createContext, useState, useEffect, useRef } from "react";
// import TagManager from "react-gtm-module";
export const CartContext = createContext();
import { MD5 } from "crypto-js";

const CartContextProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(cartReducer, initialState);

  const [cartItems, setCartItems] = useState([]);
  // const [showCartSideBar, setShowCartSideBar] = useState(false);
  const initialRender = useRef(true);
  const [showMyRecc, setShowMyRecc] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const synthId = window.localStorage.getItem("resultSynthetic");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    if (synthId && synthId !== "null" && synthId !== "undefined") {
      setShowMyRecc(true);
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item) => {
    setCartItems((prevCart) => {
      const updatedCart = JSON.parse(JSON.stringify(prevCart));
      item.forEach((_item) => {
        const itemIndex = prevCart.findIndex(
          (cartItem) => cartItem.id === _item.id
        );
        if (itemIndex !== -1) {
          updatedCart[itemIndex].quantity += _item.quantity || 1;
          updatedCart[itemIndex].totalPrice +=
            Number(_item.price) * (_item.quantity || 1);
        } else {
          updatedCart.push({
            ..._item,
            totalPrice: Number(_item.price) * (_item.quantity || 1),
            quantity: _item.quantity || 1,
          });
        }
      });

      //START --->
      //add_to_cart GTM data layer
      let tempItem = [];
      item.forEach((val) => {
        let tempObj = {};
        tempObj.item_name = val.name;
        tempObj.item_id = val.id;
        tempObj.price = val.price;
        tempObj.quantity = 1;
        tempObj.item_brand = "Traya Health";
        tempObj.item_category = "Hair Care";

        tempItem.push(tempObj);
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      let user_email = window.localStorage.getItem("user_email");
      let user_phone = window.localStorage.getItem("user_phone");
      let user_synthetic_id = window.localStorage.getItem("user_syn");

      const encryptedEmail = user_email
        ? MD5(user_email.trim()).toString()
        : "";
      const encryptedPhone = user_phone
        ? MD5(user_phone.trim()).toString()
        : "";
      window.dataLayer.push({
        ecommerce: {
          currencyCode: "INR",
          items: tempItem,
        },
        EID: encryptedEmail,
        MID: encryptedPhone,
        NAEID: user_email ? user_email.trim() : "",
        NAMID: user_phone ? user_phone.trim() : "",
        user_id: user_synthetic_id ? user_synthetic_id : "",
        event: "nt_add_to_cart",
      });

      //END --->

      return updatedCart;
    });
  };

  const decrementItemCount = (itemId) => {
    setCartItems((prevCart) => {
      // Check if the item already exists in the cart
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === itemId
      );
      let deleteItemObj = prevCart[itemIndex];
      //START --->
      // remove_from_cart data layer gtm
      let tempItem = [];
      let tempObj = {};
      tempObj.item_name = deleteItemObj.name;
      tempObj.item_id = deleteItemObj.id;
      tempObj.price = deleteItemObj.price;
      tempObj.quantity = deleteItemObj.quantity;
      tempObj.item_brand = "Traya Health";
      tempObj.item_category = "Hair Care";

      tempItem.push(tempObj);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      let user_email = window.localStorage.getItem("user_email");
      let user_phone = window.localStorage.getItem("user_phone");
      let user_synthetic_id = window.localStorage.getItem("user_syn");

      const encryptedEmail = user_email
        ? MD5(user_email.trim()).toString()
        : "";
      const encryptedPhone = user_phone
        ? MD5(user_phone.trim()).toString()
        : "";
      window.dataLayer.push({
        ecommerce: {
          currencyCode: "INR",
          items: tempItem,
        },
        EID: encryptedEmail,
        MID: encryptedPhone,
        NAEID: user_email ? user_email.trim() : "",
        NAMID: user_phone ? user_phone.trim() : "",
        user_id: user_synthetic_id ? user_synthetic_id : "",
        event: "nt_remove_from_cart",
      });
      if (itemIndex !== -1) {
        // If the item already exists, increase its quantity by one
        const updatedCart = JSON.parse(JSON.stringify(prevCart));
        const itemQuantity = updatedCart[itemIndex].quantity;
        if (itemQuantity > 1) {
          updatedCart[itemIndex].quantity -= 1;
          updatedCart[itemIndex].totalPrice -= Number(
            updatedCart[itemIndex].price
          );
        } else {
          updatedCart.splice(itemIndex, 1);
        }

        // END---->
        return updatedCart;
      } else {
        // If the item doesn't exist, add it to the cart with a quantity of one
        return [...prevCart];
      }
    });
  };

  const getItemCount = () => {
    const itemCount = cartItems.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0);
    return itemCount;
  };

  const deleteItemFromCart = (itemId) => {
    setCartItems((prevCart) => {
      // Check if the item already exists in the cart
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === itemId
      );

      //START --->
      // remove_from_cart data layer gtm

      let deleteItemObj = prevCart[itemIndex];

      let tempItem = [];
      let tempObj = {};
      tempObj.item_name = deleteItemObj.name;
      tempObj.item_id = deleteItemObj.id;
      tempObj.price = deleteItemObj.price;
      tempObj.quantity = deleteItemObj.quantity;
      tempObj.item_brand = "Traya Health";
      tempObj.item_category = "Hair Care";

      tempItem.push(tempObj);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      let user_email = window.localStorage.getItem("user_email");
      let user_phone = window.localStorage.getItem("user_phone");
      let user_synthetic_id = window.localStorage.getItem("user_syn");

      const encryptedEmail = user_email
        ? MD5(user_email.trim()).toString()
        : "";
      const encryptedPhone = user_phone
        ? MD5(user_phone.trim()).toString()
        : "";
      window.dataLayer.push({
        ecommerce: {
          currencyCode: "INR",
          items: tempItem,
        },
        EID: encryptedEmail,
        MID: encryptedPhone,
        NAEID: user_email ? user_email.trim() : "",
        NAMID: user_phone ? user_phone.trim() : "",
        user_id: user_synthetic_id ? user_synthetic_id : "",
        event: "nt_remove_from_cart",
      });

      // END---->

      if (itemIndex !== -1) {
        // If the item already exists, increase its quantity by one
        const updatedCart = JSON.parse(JSON.stringify(prevCart));
        updatedCart.splice(itemIndex, 1);

        return updatedCart;
      } else {
        // If the item doesn't exist, add it to the cart with a quantity of one
        return [...prevCart];
      }
    });
  };

  const incrementItemCount = (itemId) => {
    setCartItems((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === itemId
      );
      let addItemObj = prevCart[itemIndex];

      //START --->
      // remove_from_cart data layer gtm
      let tempItem = [];
      let tempObj = {};
      tempObj.item_name = addItemObj.name;
      tempObj.item_id = addItemObj.id;
      tempObj.price = addItemObj.price;
      tempObj.quantity = addItemObj.quantity;
      tempObj.item_brand = "Traya Health";
      tempObj.item_category = "Hair Care";
      tempItem.push(tempObj);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      let user_email = window.localStorage.getItem("user_email");
      let user_phone = window.localStorage.getItem("user_phone");
      let user_synthetic_id = window.localStorage.getItem("user_syn");

      const encryptedEmail = user_email
        ? MD5(user_email.trim()).toString()
        : "";
      const encryptedPhone = user_phone
        ? MD5(user_phone.trim()).toString()
        : "";
      window.dataLayer.push({
        ecommerce: {
          currencyCode: "INR",
          items: tempItem,
        },
        EID: encryptedEmail,
        MID: encryptedPhone,
        NAEID: user_email ? user_email.trim() : "",
        NAMID: user_phone ? user_phone.trim() : "",
        user_id: user_synthetic_id ? user_synthetic_id : "",
        event: "nt_add_to_cart",
      });
      // END---->
      if (itemIndex !== -1) {
        const updatedCart = JSON.parse(JSON.stringify(prevCart));
        updatedCart[itemIndex].quantity += 1;
        updatedCart[itemIndex].totalPrice += Number(
          updatedCart[itemIndex].price
        );

        return updatedCart;
      } else {
        return [...prevCart];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const setItemsToCart = (items) => {
    setCartItems((prevCart) => {
      const updatedCart = JSON.parse(JSON.stringify(prevCart));
      isArray(items) &&
        items.forEach((_item) => {
          const itemIndex = prevCart.findIndex(
            (cartItem) => cartItem.id === _item.id
          );
          if (itemIndex >= 0) {
            return;
          }
          updatedCart.push({
            ..._item,
            totalPrice: Number(_item.price),
            quantity: 1,
          });
        });
      return [...updatedCart];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        decrementItemCount,
        getItemCount,
        deleteItemFromCart,
        incrementItemCount,
        clearCart,
        setItemsToCart,
        showMyRecc,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
