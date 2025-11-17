"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Rate } from "antd";

export default function ProductCard({ product, index }) {
  const pathname = usePathname();
  const router = useRouter();
  console.log("Current pathname:", pathname);
  const isProductsPage = pathname.includes('/view-all-products') || pathname === '/products';
  
  const formatRating = (rating) => Number(rating).toFixed(1);

  const handleLearnMoreClick = () => {
    if (product.id) {
      router.push(`/view-all-products/${product.id}`);
    }
  };

  console.log({isProductsPage})
  // Alternate background colors when on view-all-products page
  const cardBgClass = isProductsPage
    ? index % 2 === 0
      ? "bg-[#F7F5EE]"
      : "bg-[#FBF3E3]"
    : "bg-white";

  return (
    <div
      className={`flex flex-col w-full sm:w-[260px] md:w-[305px] lg:w-[320px] h-auto rounded-xl flex-shrink-0 transition-all duration-300`}
    >
      {/* Product Image Section */}
      <div className={`relative w-full flex items-center justify-center overflow-hidden rounded-xl ${cardBgClass} `}>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={300}
          className="object-cover w-full h-[220px] sm:h-[250px] md:h-[250px] lg:h-[280px] transition-transform duration-300 hover:scale-105 my-16"
        />

        {/* Desktop - Ratings top left */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 hidden md:flex items-center gap-1 px-2 py-[2px]">
          <Rate
            disabled
            defaultValue={product.rating}
            allowHalf
            style={{ fontSize: "12px", color: "#000000" }}
          />
          <span className="text-xs font-semibold text-gray-900 ml-1">
            {formatRating(product.rating)}
          </span>
        </div>

        {/* Desktop - Tag top right */}
        <div className="absolute top-0 right-0 sm:top-3 sm:right-3">
          <span className="bg-[#FCD34D] text-gray-900 text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-[2px] sm:py-1 shadow-sm">
            Acne Care
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="py-2 sm:py-3 flex flex-col gap-1.5 sm:gap-2 mt-2 sm:mt-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
          <h3 className="text-xs sm:text-sm md:text-[16px] font-semibold text-gray-900 leading-tight flex-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm md:text-[16px] font-medium text-gray-900 sm:whitespace-nowrap">
            Rs. {product.price}
          </p>
        </div>

        {/* Mobile - Rating */}
        <div className="flex items-center gap-1 md:hidden">
          <Rate
            disabled
            defaultValue={product.rating}
            allowHalf
            style={{ fontSize: "11px", color: "#000000" }}
            className="[&_.ant-rate-star]:!mr-0"
          />
          <span className="text-[10px] font-semibold text-gray-900 ml-1">
            {formatRating(product.rating)}
          </span>
        </div>

        {/* Button */}
        {isProductsPage && (
          <button
            onClick={handleLearnMoreClick}
            className="w-full border-2 border-[#4F46E5] text-[#4F46E5] rounded-full py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium hover:bg-[#4F46E5] hover:text-white transition-colors mt-1 sm:mt-2"
          >
            {pathname === "/skin-food" ? "Quick View" : "Learn More"}
          </button>
        )}
      </div>
    </div>
  );
}
