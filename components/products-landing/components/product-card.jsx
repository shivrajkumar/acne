"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Rate } from "antd";

export default function ProductCard({ product, index }) {
  const router = useRouter();
  const pathname = usePathname();
  const isProductsPage = pathname.includes("/view-all-products");
  const isSkinFoodPage = pathname.includes("/skin-food");
  const formatRating = (rating) => Number(rating).toFixed(1);

  const handleLearnMoreClick = () => {
    if (!product) return;

    const queryParams = product.type ? `?type=${product.type}` : '';

    if (isSkinFoodPage && product.id) {
      router.push(`/skin-food/${product.id}${queryParams}`);
      return;
    }

    if (isProductsPage && product.id) {
      router.push(`/view-all-products/${product.id}${queryParams}`);
    }
  };

  // Alternate background colors when on view-all-products page
  const cardBgClass =
    isProductsPage || isSkinFoodPage
      ? index % 2 === 0
        ? "bg-[#F7F5EE]"
        : "bg-[#FBF3E3]"
      : "bg-white";

  return (
    <div
      onClick={handleLearnMoreClick}
      className={`flex flex-col ${
        isSkinFoodPage
          ? "min-w-[160px] md:min-w-[300px] max-w-[450px] md:max-w-[600px] xl:min-w-[420px]"
          : "max-w-[320px]"
      } h-auto rounded-[5px] flex-shrink-0 transition-all duration-300`}
    >
      {/* Product Image Section */}
      <div
        className={`relative w-full flex items-center justify-center overflow-hidden rounded-[5px] ${cardBgClass} `}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="object-cover w-full h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] transition-transform duration-300 hover:scale-105 my-16"
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
          <h3 className="text-xs sm:text-sm md:text-[11px] font-semibold text-gray-900 leading-tight flex-1 line-clamp-2">
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
        {(isProductsPage || isSkinFoodPage) && (
          <button
            onClick={handleLearnMoreClick}
            className="w-full border border-[#4F46E5] text-[#4F46E5] rounded-full py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium hover:bg-[#4F46E5] hover:text-white transition-colors mt-1 sm:mt-2"
          >
            {"Learn More"}
          </button>
        )}
      </div>
    </div>
  );
}
