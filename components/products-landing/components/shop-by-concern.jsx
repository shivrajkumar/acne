import Image from "next/image";
import React from "react";

const ShopByConcern = ({ title = "Shop By Concern", items = [] }) => {
  return (
    <section className="w-full px-4 md:px-12 py-8">
      <h2 className="text-xl md:text-[40px] font-medium mb-6 text-Grey/900">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="w-full aspect-square relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm md:text-[24px] font-normal uppercase tracking-wide">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByConcern;
