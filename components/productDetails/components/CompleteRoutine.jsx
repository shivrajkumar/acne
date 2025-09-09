import React from 'react';
import Image from 'next/image';

const CompleteRoutine = ({ product }) => {
  return (
    <div className="pt-4 border-t border-[#E9EDED]">
      <div className="flex flex-col gap-4">
        <h3 className="text-[18px] text-[#0F1B28] tracking-[0.5px] uppercase" style={{ fontFamily: 'Sofia Pro, sans-serif' }}>
          COMPLETE THE ROUTINE
        </h3>
        
        <div className="flex gap-3 items-center">
          {/* Product Image */}
          <div className="w-20 h-20 rounded overflow-hidden bg-gray-200 shrink-0">
            {product?.image && (
              <Image
                src={product.image}
                alt={product.name || "Product"}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {/* Product Name */}
          <div className="flex-1">
            <p className="text-[16px] text-[#505354] leading-[1.5] font-sophiaPro">
              The <span className="text-[#929798]">CLEAR RITUAL</span> kit
            </p>
          </div>
          
          {/* CTA Button */}
          <button className="px-8 h-12 border border-[#3B52F5] text-[#3B52F5] rounded-[40px] hover:bg-[#3B52F5] hover:text-white transition-colors whitespace-nowrap">
            <span className="text-[14px] font-medium font-sophiaPro">
              Take the Skin Test
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteRoutine;