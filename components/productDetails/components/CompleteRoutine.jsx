"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CartonBox from '@assets/images/clear-ritual-carton-box.webp';

const CompleteRoutine = ({ product }) => {
  const [syntheticId, setSyntheticId] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [caseId, setCaseId] = useState(null);

  useEffect(() => {
    const orderCountFromStorage = window.localStorage.getItem("order_count");
    const storedData = localStorage.getItem("acne_result_data");
    const idFromLocalStorage = JSON.parse(storedData)?.customerDetails?.caseId;
    setOrderCount(orderCountFromStorage);
    setCaseId(idFromLocalStorage);

    const synthetic_Id = localStorage.getItem("syntheticId");
    if (synthetic_Id) {
      setSyntheticId(synthetic_Id);
    }
  }, []);

  const resultUrl = syntheticId ? `/result?tid=${syntheticId}` : '/skin-test';

  return (
    <div className="pt-4 border-t border-[#E9EDED]">
      <div className="flex flex-col gap-4">
        <h3
          className="text-[18px] text-[#0F1B28] tracking-[0.5px] uppercase"
          style={{ fontFamily: 'Sofia Pro, sans-serif' }}
        >
          COMPLETE THE ROUTINE
        </h3>

        <div className="flex gap-3 items-center">
          {/* Product Image */}
          <div className="w-20 h-20 rounded overflow-hidden shrink-0">
            {product?.image && (
              <Image
                src={CartonBox}
                alt={product.name || "Product"}
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Product Name */}
          <div className="flex-1">
            <p className="text-[16px] text-[#505354] leading-[1.5] font-sophiaPro">
              The <span className="text-[#929798]">CLEAR RITUAL</span> kit
            </p>
          </div>

          {/* CTA Button wrapped with Link */}
          <Link href={resultUrl} className="shrink-0">
            <button className="px-4 h-10 border border-[#3B52F5] text-[#3B52F5] rounded-[40px] hover:bg-[#3B52F5] hover:text-white transition-colors whitespace-nowrap">
              <span className="text-[14px] font-medium font-sophiaPro">
                {syntheticId ? 'My Recommended Plan' : 'Take the Skin Diagnosis'}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompleteRoutine;
