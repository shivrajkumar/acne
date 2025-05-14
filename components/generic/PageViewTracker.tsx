"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendGtmEvents } from "./Gtm";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const page = pathname === "/" ? "home" : pathname.replace("/", "");
      const eventName = `Pageview+${page}`;
      sendGtmEvents(eventName);
    }
  }, [pathname]); // Fires on route change

  return null;
}
