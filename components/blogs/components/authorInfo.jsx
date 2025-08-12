// app/components/AuthorInfo.jsx
import React from "react";

export default function AuthorInfo({
  reviewer = "Sara Harcharik Perkins, MD",
  reviewerTitle = "",
  writer = "Sian Ferguson",
  publishedDate = "04/16/2022",
  designationDate = "04/16/2022",
  showModal
}) {
  return (
    <div className="text-left">
      <div className="text-sm md:text-sm text-gray-800 space-y-1">
        <p className="leading-tight">
          Reviewed by{" "}
          <span className="font-semibold">{reviewer}</span>
          {reviewerTitle ? <>, {reviewerTitle}</> : null}
        </p>
        <p className="leading-tight mt-1 text-Grey/500">Written by <span className="font-medium text-Grey/900">{writer}</span></p>
        <p className="leading-tight mt-1 text-Grey/500">Published <span className="font-medium text-Grey/900">{publishedDate}</span></p>
        <p className="leading-tight mt-1 text-Grey/500">Designation <span className="font-medium text-Grey/900">{designationDate}</span></p>
      </div>

      <button
        type="button"
        className="mt-4 inline-block text-sm font-normal underline underline-offset-2"
        onClick={showModal}
      >
        LEARN MORE
      </button>
    </div>
  );
}
