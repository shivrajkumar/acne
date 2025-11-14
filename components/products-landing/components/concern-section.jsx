"use client";
import { useRef } from "react";
import ProductCard from "./product-card";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import SectionTitle from "./section-title";
import { usePathname } from "next/navigation";

export default function ConcernSection({ concern }) {
  const scrollRef = useRef(null);
  const pathName = usePathname();

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 600;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const isSkinFood = pathName === "/skin-food";

  return (
    <section className="w-full px-4 md:px-12 mt-10 relative">
      {/* Title + Arrows */}
      <div className="flex items-center justify-between mb-4">
        <SectionTitle title={concern.title} />
        {!isSkinFood && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            >
              <FaArrowLeftLong size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-800 transition"
            >
              <FaArrowRightLong size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Products layout */}
      <div
        ref={scrollRef}
        className={
          isSkinFood
            ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-2"
            : "flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-3"
        }
      >
        {concern?.products?.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[47%] sm:w-[260px] md:w-[305px] lg:w-[320px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
