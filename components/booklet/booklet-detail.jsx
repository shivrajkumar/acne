"use client";

import React, { useState, useEffect } from "react";
import { fetchStrapiData } from "@/helpers/strapiClient";
import Loader from "@/components/generic/Loader";
import BreadcrumbNavigator from "../generic/BreadcrumbNavigator";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function BookletDetail({ slug }) {
  const [bookletData, setBookletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setNotFound(false);

      // First, fetch all booklet items to find the one matching the slug
      const { data, error } = await fetchStrapiData("/api/cr-brand-booklet");

      if (error) {
        console.warn("Failed to load booklet data:", error);
        setNotFound(true);
        setLoading(false);
        return;
      }

      // Find the specific item by slug
      const items = data?.data?.accordionSection?.items || [];
      const currentItem = items.find(
        (item) => item.title === slug || String(item.id) === slug
      );

      if (!currentItem) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setBookletData(currentItem);
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  if (notFound || !bookletData) {
    return (
      <section className="mx-auto px-4 py-12 max-w-6xl">
        <BreadcrumbNavigator />
        <div className="text-center py-20">
          <h1 className="text-3xl md:text-5xl font-semibold text-[#0F1A2A] mb-4">
            Booklet Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The booklet you're looking for doesn't exist.
          </p>
          <Link
            href="/booklet"
            className="inline-block px-6 py-3 bg-[#0F1A2A] text-white rounded-md hover:bg-opacity-90 transition-all"
          >
            Back to Booklet List
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-4 py-12 max-w-6xl">
      {/* Page Title */}
      <h1 className="text-[32px] md:text-[64px] font-semibold text-[#0F1A2A] mb-8 leading-tight text-center">
        {bookletData.title}
      </h1>
      <BreadcrumbNavigator />

      {/* Content Section */}
      <div className="prose prose-lg max-w-none prose-headings:text-[#0F1A2A] prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:underline prose-strong:text-[#0F1A2A] prose-ul:list-disc prose-ol:list-decimal text-[16px] md:text-[24px]">
        {/* Check if there's content in the booklet item */}
        {bookletData.content && (
          <ReactMarkdown>
            {bookletData.content}
          </ReactMarkdown>
        )}

        {/* If there's a description field */}
        {bookletData.description && !bookletData.content && (
          <ReactMarkdown>
            {bookletData.description}
          </ReactMarkdown>
        )}

        {/* If there are sections */}
        {bookletData.sections && bookletData.sections.length > 0 && (
          <div className="space-y-8 mt-8">
            {bookletData.sections.map((section, index) => (
              <div key={section.id || index} className="border-l-4 border-[#0F1A2A] pl-6">
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#0F1A2A] mb-4">
                    {section.heading}
                  </h2>
                )}
                {section.content && (
                  <ReactMarkdown>
                    {section.content}
                  </ReactMarkdown>
                )}
                {section.description && !section.content && (
                  <ReactMarkdown>
                    {section.description}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>
        )}

        {/* If no content is available */}
        {!bookletData.content &&
          !bookletData.description &&
          (!bookletData.sections || bookletData.sections.length === 0) && (
            <div className="text-gray-500 text-center py-12">
              <p>Content is coming soon...</p>
            </div>
          )}
      </div>
    </section>
  );
}
