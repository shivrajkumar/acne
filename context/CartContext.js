"use client";
import { createContext, useContext } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children, value }) => {
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  return context;
};
