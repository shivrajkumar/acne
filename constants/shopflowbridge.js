import Script from "next/script";
import React from "react";

const ShopfloScriptScript = () => {
  return (
    <Script
      strategy="lazyOnload"
      src="https://bridge.shopflo.com/v2/shopflo.js"
    />
  );
};

export default ShopfloScriptScript;
