"use client";
import { createContext, useState, useEffect, useRef } from "react";
export const CartContext = createContext();

const AnalyticsContextProvider = ({ children }) => {
  const initialRender = useRef(true);
  const [showMyRecc, setShowMyRecc] = useState(false);

  useEffect(() => {
    const synthId = window.localStorage.getItem("resultSynthetic");
    if (synthId && synthId !== "null" && synthId !== "undefined") {
      setShowMyRecc(true);
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        showMyRecc,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default AnalyticsContextProvider;
