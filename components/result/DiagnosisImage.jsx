"use client";

import { useEffect, useState } from "react";

export default function DiagnosisImage({ src, alt }) {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    if (!src) return;

    fetch(`/api/fetch-svg?url=${encodeURIComponent(src)}`)
      .then((res) => res.text())
      .then(setSvgContent)
      .catch(console.error);
  }, [src]);

  if (!svgContent) return null;

  return (
    <div
      className="h-[367px] w-full rounded-[12px] shrink-0"
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-label={alt || "Diagnosis"}
    />
  );
}
