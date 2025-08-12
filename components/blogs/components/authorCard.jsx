"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import AuthorInfo from "./authorInfo";
import SocialLinks from "./socialLinks";
import FactBadge from "./factBadge";
import DrDivya from "@assets/images/dr-divya.webp";
import AuthorModal from "./authorModal";

export default function AuthorCard({
  reviewer = "Dr Divya Poulose",
  reviewerTitle = "MBBS, MD (Dermatology)",
  writer = "Sian Ferguson",
  publishedDate = "04/16/2022",
  designationDate = "03/14/2025",
  social = {},
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      {/* Desktop layout */}
      <section onClick={showModal} className="w-full hidden md:block">
        <div className="mx-auto max-w-6xl bg-[#D7DEFE] rounded-2xl p-6 md:p-8 flex items-center gap-6 cursor-pointer">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={DrDivya}
                alt={reviewer}
                width={96}
                height={96}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          <div className="flex-1 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <AuthorInfo
                reviewer={reviewer}
                reviewerTitle={reviewerTitle}
                writer={writer}
                publishedDate={publishedDate}
                designationDate={designationDate}
              />
            </div>

            <div className="flex flex-col items-end gap-4">
              <SocialLinks
                instagram={social.instagram}
                whatsapp={social.whatsapp}
                x={social.x}
              />
              <FactBadge label="Fact-Based" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile layout */}
      <div
        onClick={showModal}
        className="bg-[#F9F7F4] rounded-2xl p-4 flex shadow-sm md:hidden cursor-pointer"
      >
        {/* Profile image */}
        <Image
          src={DrDivya}
          alt={reviewer}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* Text details */}
        <div className="flex flex-col ml-4">
          <div className="mt-3 space-y-1 text-sm text-gray-800">
            <p>
              Reviewed by <span className="font-semibold">{reviewer}, {reviewerTitle}</span>
            </p>
            <p>
              Written by <span className="font-semibold">{writer}</span>
            </p>
            <p>
              Published <span className="font-medium">{publishedDate}</span>
            </p>
            <p>
              Updated <span className="font-medium">{designationDate}</span>
            </p>
          </div>

          {/* Learn More */}
          <div className="mt-4">
            <p className="text-sm font-medium border-b border-gray-300 pb-1">
              Learn more
            </p>
            <div className="flex gap-4 mt-2 justify-start">
              <a href={social.instagram || "#"} aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href={social.whatsapp || "#"} aria-label="WhatsApp">
                <FaWhatsapp size={20} />
              </a>
              <a href={social.x || "#"} aria-label="X">
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Fact-Based button */}
          <button
            type="button"
            className="mt-5 w-3/4 flex items-center justify-center gap-2 rounded-full bg-[#002B45] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#004266] focus:outline-none focus:ring-2 focus:ring-[#002B45] focus:ring-offset-2"
          >
            <span>Fact-Based</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Author Modal */}
      <AuthorModal
        open={isModalOpen}
        onCancel={handleCancel}
        reviewer={reviewer}
        reviewerTitle={reviewerTitle}
        DrDivya={DrDivya}
      />
    </>
  );
}
