"use client";
import React from "react";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

const BlogCard = ({ image, date, readTime, title, description, onClick, slug }) => {
  return (
    <Link href={`/blog/${slug}`}>
    <div className="w-full h-[488px] md:w-[335px] md:h-[500px] relative mb-4">
      <div className="w-full h-72 relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex justify-between items-center mt-4 text-xs text-gray-500 font-medium">
        <span>{date}</span>
        <span>{readTime}</span>
      </div>

      <h3 className="mt-2 font-semibold text-base text-black leading-snug line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {description}
      </p>

      <Button
        onClick={onClick}
        className="mt-4 absolute bottom-0 left-0 inline-flex items-center gap-2 border border-black px-4 py-2 rounded-full text-sm font-extralight hover:bg-black hover:text-white transition-colors"
      >
        Read more <ArrowRightOutlined className="font-extralight" />
      </Button>
    </div>
    </Link>
  );
};

export default BlogCard;