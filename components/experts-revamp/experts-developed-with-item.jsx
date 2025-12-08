import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


export default function DevelopedWithItem({ item }) {
  return (
    <Link href={`/${item.slug}`}>
      <div className="flex flex-col items-start cursor-pointer group">
        <div className="w-full h-[270px] md:h-[442px] relative">
          {item?.image && (
            <Image
              src={item.image.url}
              alt={item.label}
              fill
              className="rounded-lg object-cover"
            />
          )}
        </div>

        {/* Label + Arrow spaced */}
        <div className="mt-2 w-full flex items-center justify-between">
          <p className="text-sm font-medium group-hover:text-blue-600">
            {item.label}
          </p>

          <span className="w-5 h-5 rounded-full bg-Primary/500 flex items-center justify-center text-white text-xs">
            <FaArrowRight/>
          </span>
        </div>
      </div>
    </Link>
  );
}
