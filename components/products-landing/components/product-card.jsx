import Image from "next/image";
import { usePathname } from "next/navigation";
import { Rate } from "antd";

export default function ProductCard({ product }) {
  const pathname = usePathname();

  const isProductDetails = pathname.includes(`/view-all-products/`);

  const formatRating = (rating) => {
    return Number(rating).toFixed(1);
  };

  return (
    <div className="flex flex-col w-full md:w-[305px] h-[320px] md:h-auto">
      {/* Product Image Section */}
      <div className="relative w-[320px] h-[320px] md:h-[320px] flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={600}
          className="object-cover"
        />

        {/* Desktop - Ratings on top left */}
        <div className="absolute top-3 left-3 hidden md:flex items-center gap-1">
          <Rate
            disabled
            defaultValue={product.rating}
            allowHalf
            style={{ fontSize: "12px", color: "#000000" }}
            className="[&_.ant-rate-star]:!mr-0"
          />
          <span className="text-xs font-semibold text-gray-900 ml-1">
            {formatRating(product.rating)}
          </span>
        </div>

        {/* Desktop - Tag on top right */}
        <div className="absolute top-3 right-3">
          <span className="bg-[#FCD34D] text-gray-900 text-xs font-medium px-3 py-1 rounded">
            {"Acne Care"}
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="py-3 flex flex-col gap-2 mt-3">
        {/* Product Name and Price */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-2">
          {/* Product Name */}
          <h3 className="text-sm md:text-[16px] font-semibold text-gray-900 leading-tight flex-1">
            {product.name}
          </h3>

          {/* Price */}
          <p className="text-sm md:text-[16px] font-medium text-gray-900 md:whitespace-nowrap">
            Rs. {product.price}
          </p>
        </div>

        {/* Mobile - Rating */}
        <div className="flex items-center gap-1 md:hidden">
          <Rate
            disabled
            defaultValue={product.rating}
            allowHalf
            style={{ fontSize: "12px", color: "#000000" }}
            className="[&_.ant-rate-star]:!mr-0"
          />
          <span className="text-xs font-semibold text-gray-900 ml-1">
            {formatRating(product.rating)}
          </span>
        </div>

        {/* Button */}
        {!isProductDetails && (
          <button className="w-full border-2 border-[#4F46E5] text-[#4F46E5] rounded-full py-2 text-sm font-medium hover:bg-[#4F46E5] hover:text-white transition-colors mt-1">
            {pathname === "/skin-food" ? "Quick View" : "Learn More"}
          </button>
        )}
      </div>
    </div>
  );
}
