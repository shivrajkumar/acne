import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ProductCard({ product }) {
  const pathname = usePathname();

  const isProductDetails = pathname.includes(`/view-all-products/`);

  return (
    <div className={`flex-none h-auto bg-white overflow-hidden ${
        pathname === "/skin-food" ? "w-auto" : "w-[430px]"
      }`}>
      {/* Product Image */}
      <div className="relative w-full h-[442px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />

        {/* Rating (Desktop only) */}
        <div className="absolute top-2 left-2 md:flex hidden">
          <div className="flex items-center gap-1 text-xs px-2 py-1 rounded">
            {"★★★★★"} <span>{product.rating}</span>
          </div>
        </div>

        {/* Tag (Always visible, top-right) */}
        <div className="absolute top-2 right-2">
          <span className="bg-yellow-300 text-xs px-2 py-1 rounded">
            {product.tag}
          </span>
        </div>
      </div>

      {/* Title + Price */}
      <div className="flex justify-between items-center mt-3">
        <div className="font-semibold text-sm">{product.name}</div>
        <div className="text-sm">{product.price}</div>
      </div>

      {/* Rating (Mobile only, below title/price) */}
      <div className="flex items-start gap-1 text-xs mt-2 md:hidden">
        {"★★★★★"} <span>{product.rating}</span>
      </div>

      {/* Quick View Button */}
      {!isProductDetails && 
      <button className="mt-4 w-full border border-Primary/500 text-Primary/500 rounded-full py-1 text-sm hover:bg-Primary/500 hover:text-white transition">
        Quick View
      </button>
      }
    </div>
  );
}
