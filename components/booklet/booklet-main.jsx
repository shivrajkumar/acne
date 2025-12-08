"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchStrapiData } from "@/helpers/strapiClient";
import Loader from "@/components/generic/Loader";
import BreadcrumbNavigator from "../generic/BreadcrumbNavigator";

export default function ClearRitualBook() {
  const [bookletData, setBookletData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchStrapiData("/api/cr-brand-booklet");

      if (error) {
        console.warn("Failed to load booklet data:", error);
      }

      setBookletData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  const heading = bookletData?.data?.accordionSection?.heading;
  const items = bookletData?.data?.accordionSection?.items;

  return (
    <section className="mx-auto px-4 py-12 max-w-6xl">
      {/* Page Title */}
      <h1 className="text-center text-[32px] md:text-[87px] font-semibold text-[#0F1A2A] mb-6">
        {heading}
      </h1>

      <BreadcrumbNavigator />

      {/* Accordion List */}
      <div className="space-y-4">
        {items?.map((item, index) => (
          <div
            key={item.id || index}
            className="border border-gray-200 rounded-sm bg-white overflow-hidden"
          >
            <Link
              href={`/booklet/${item.title || item.id}`}
              className="w-full flex justify-between items-center px-4 py-6 bg-white border border-Grey/300 transition-all"
            >
              <span className="text-base md:text-[32px] text-[#0F1A2A] font-normal">
                {item.title}
              </span>

              <span className="text-gray-500 text-xl md:text-2xl">→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
