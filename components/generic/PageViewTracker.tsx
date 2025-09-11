"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logGtmEvent } from "./Gtm";
import { generateEventId } from "@/helpers/metaCapiHelper";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const page = pathname === "/" ? "home" : pathname.replace("/", "");
      const eventName = `Pageview+${page}`;
      logGtmEvent(eventName, { event_id: generateEventId({ eventName: eventName } as any)});
    }
  }, [pathname]); // Fires on route change

  return null;
}
