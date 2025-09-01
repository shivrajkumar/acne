// app/components/FactBadge.jsx
import React from "react";

export default function FactBadge({ label = "Fact-Based" }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#4458FF] text-white px-5 py-3 rounded-full shadow-md whitespace-nowrap">
      <span className="text-sm font-medium">{label}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}
