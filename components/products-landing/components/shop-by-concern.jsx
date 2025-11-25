import Image from "next/image";
import React from "react";
import SectionTitle from "./section-title";
import { Skeleton } from "antd";

const ShopByConcern = ({ title = "Shop By Concern", items = [], loading = false }) => {
  const isLoading = loading || items.length === 0;
  const skeletonArray = Array(4).fill(null);

  return (
    <section className="w-full px-4 md:px-12 py-6">
      <SectionTitle title={title} />

      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 gap-y-4 md:gap-6">
        {/* Skeleton Loader */}
        {isLoading
          ? skeletonArray.map((_, index) => (
              <div key={index} className="flex flex-col items-start gap-2">

                {/* Image Skeleton (square, visible, block-level) */}
                <div className="w-full relative">
                  <Skeleton.Image
                    active
                    style={{
                      width: "100%",
                      height: "0px",
                      paddingBottom: "100%", // makes it perfect square
                      display: "block",
                      borderRadius: 8,
                    }}
                  />
                </div>

                {/* Text Skeleton */}
                <Skeleton
                  active
                  title={false}
                  paragraph={{ rows: 1, width: "60%" }}
                  className="w-full"
                />
              </div>
            ))
          : 
          /* Actual Items */
          items.map((item, index) => (
            <div key={index} className="flex flex-col items-start">

              <div className="w-full relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.label}
                  width={500}
                  height={500}
                  className="object-contain w-full h-auto"
                />
              </div>

              <p className="mt-2 text-sm md:text-[24px] font-normal uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default ShopByConcern;
