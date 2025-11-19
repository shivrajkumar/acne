"use client";
import { useRef, useState, useEffect } from "react";
import ProductCard from "./product-card";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import SectionTitle from "./section-title";
import { usePathname } from "next/navigation";

export default function ConcernSection({ concern }) {
  const scrollRef = useRef(null);
  const pathName = usePathname();

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const isSkinFood = pathName === "/skin-food";

  // Detect scroll position
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const tolerance = 5; // avoid micro pixel issues
    setAtStart(el.scrollLeft <= tolerance);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    handleScroll(); // initialize state

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll function
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full px-4 md:px-12 mt-[24px] relative">
      {/* Title + Arrows */}
      <div className="flex items-center justify-between mb-4">
        <SectionTitle title={`${concern.title}.`} />

        {!isSkinFood && concern.products.length > 2 && (
          <div className="flex items-center gap-2">

            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              disabled={atStart}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition
                ${atStart
                  ? "bg-gray-200 text-gray-400 cursor-default"
                  : "bg-Grey/500 text-white hover:bg-gray-200"
                }`}
            >
              <FaArrowLeftLong size={18} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              disabled={atEnd}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition
                ${atEnd
                  ? "bg-gray-200 text-gray-400 cursor-default"
                  : "bg-Grey/500 text-white hover:bg-gray-800"
                }`}
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
            ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-2 px-2"
            : "flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth hide-scrollbar px-3"
        }
      >
        {concern?.products?.map((product, index) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[47%] sm:w-[260px] md:w-[305px] lg:w-[320px]"
          >
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
