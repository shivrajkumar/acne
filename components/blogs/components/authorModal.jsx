"use client";
import React from "react";
import { Modal } from "antd";
import Image from "next/image";

export default function AuthorModal({ open, onCancel, reviewer, reviewerTitle, DrDivya }) {
  const drBio =
    "Dr. Divya Poulose is a Senior Dermatology Expert with over 7 years of clinical experience. She holds an MD in Dermatology from Dr. DY Patil Medical College and an MBBS from Jubilee Mission Medical College.";

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      destroyOnClose
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs">
            i
          </div>
          <h2 className="text-lg font-semibold">Who is the author?</h2>
        </div>

        <div className="block md:hidden">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bg-gray-300 rounded-sm overflow-hidden">
              <Image src={DrDivya} alt={reviewer} width={64} height={64} className="object-cover" />
            </div>
            <div>
              <p className="font-semibold">{reviewer}</p>
              <p className="text-sm">{reviewerTitle}</p>
              <p className="text-sm font-normal">{"2022/08/7496"}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{drBio}</p>
        </div>

        <div className="hidden md:block">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bg-gray-300 rounded-sm overflow-hidden">
              <Image src={DrDivya} alt={reviewer} width={64} height={64} className="object-cover" />
            </div>
            <div>
              <p className="font-semibold">{reviewer}</p>
              <p className="text-sm">{reviewerTitle}</p>
              <p className="text-sm font-normal">{"2022/08/7496"}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{drBio}</p>
        </div>
      </div>
    </Modal>
  );
}
