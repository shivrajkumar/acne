import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="flex-none w-[430px] h-auto bg-white overflow-hidden">
      <div className="relative w-full h-[442px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />

        <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
          <div className="flex items-center gap-1 text-xs px-2 py-1 rounded">
            {"★★★★★"} <span>{product.rating}</span>
          </div>
          <span className="bg-yellow-300 text-xs px-2 py-1 rounded">
            {product.tag}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="font-semibold text-sm">{product.name}</div>
        <div className="text-sm">{product.price}</div>
      </div>

      <button className="mt-4 w-full border border-Primary/500 text-Primary/500 rounded-full py-1 text-sm hover:bg-Primary/500 hover:text-white transition">
        Quick View
      </button>
    </div>
  );
}
