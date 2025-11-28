import Image from "next/image";
import Link from "next/link";

export default function DevelopedWithItem({ item }) {
  return (
    <Link href={`/experts/${item.slug}`}>
      <div className="flex flex-col items-center cursor-pointer group">
        <div className="w-full h-[270px] md:h-[442px] relative">
          <Image
            src={item.image}
            alt={item.label}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <p className="mt-2 text-sm font-medium group-hover:text-blue-600">
          {item.label}
        </p>
      </div>
    </Link>
  );
}
