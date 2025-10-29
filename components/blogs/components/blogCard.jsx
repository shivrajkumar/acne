import Image from "next/image";
import Link from "next/link";
import React from "react";

export const BlogCard = ({
  imageSrc,
  title,
  description,
  date, 
  readTime,
  slug,
}) => {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="cursor-pointer flex flex-col gap-3 w-full">
        {/* Image */}
        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Title */}
        <h3 className="px-2 text-lg sm:text-xl lg:text-[23px] leading-6 sm:leading-7 lg:leading-8 font-medium text-[#0E0E0E] line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="px-2 text-sm sm:text-base font-normal text-gray-700 leading-5 sm:leading-6 line-clamp-3 sm:line-clamp-4">
          {description}
        </p>

        {/* Meta info */}
        <p className="px-2 text-xs sm:text-[13px] font-normal font-manrope text-gray-500 mt-auto">
          {date} &nbsp;&ndash;&nbsp; {readTime} min read
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;