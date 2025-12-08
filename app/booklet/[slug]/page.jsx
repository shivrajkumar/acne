import BookletDetail from "@/components/booklet/booklet-detail";
import React from "react";

export default function BookletSlugPage({ params }) {
  return (
    <div>
      <BookletDetail slug={params.slug} />
    </div>
  );
}
