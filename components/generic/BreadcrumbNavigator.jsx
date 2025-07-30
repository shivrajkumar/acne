"use client";

import React from "react";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import RightChevron from "@assets/svg/rightArrow.svg";

const BreadcrumbNavigator = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center justify-between mb-4">
      <Breadcrumb
        separator={
          <Image
            src={RightChevron}
            alt="arrow"
            width={12}
            
            height={12}
            className="inline-block"
          />
        }
        items={[
          {
            title: (
              <Link href="/" className="text-black font-sophiaPro font-normal text-[12px] md:text-[16px]">
                Home
              </Link>
            ),
          },
          ...pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");

            const label =
              {
                faq: "Help and FAQs",
                contact: "Contact Us",
                blog: "Blogs",
              }[segment.toLowerCase()] || segment.replace(/-/g, " ");

            return {
              title:
                index === pathSegments.length - 1 ? (
                  <span className="font-sophiaPro font-normal text-[12px] md:text-[16px]">{label}</span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize text-black hover:underline font-sophiaPro font-normal text-[12px] md:text-[16px]"
                  >
                    {label}
                  </Link>
                ),
            };
          }),
        ]}
      />
    </div>
  );
};

export default BreadcrumbNavigator;