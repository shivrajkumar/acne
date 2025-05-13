"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendGtmEvents } from "./Gtm";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      sendGtmEvents("PageLanded");
    }
  }, [pathname]); // Fires on route change

  return null;
}
