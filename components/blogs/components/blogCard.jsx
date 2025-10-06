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
      <div className="cursor-pointer flex flex-col gap-3">
        {/* Image */}
        <div className="relative w-full h-[280px] rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            className="object-center"
            sizes="320px"
          />
        </div>

        {/* Title */}
        <h3 className="ml-2 text-[23px] leading-8 font-medium text-[#0E0E0E]">
          {title}
        </h3>

        {/* Description */}
        <p className="ml-2 text-base font-normal text-gray-700 leading-6 !line-clamp-4">
          {description}
        </p>

        {/* Meta info */}
        <p className="ml-2 text-[13px] font-normal font-manrope text-gray-500 mt-auto">
          {date} &nbsp;&ndash;&nbsp; {readTime} min read
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;