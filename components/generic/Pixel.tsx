"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const FacebookPixelEventsInit: React.FC<Record<string, string>> = ({
  eventName,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
         const page = pathname === "/" ? "home" : pathname.replace(/^\/+/, "");
    const finalEventName = eventName || `Pageview+${page}`;

      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init("1214067770360774");
          ReactPixel.track(finalEventName);
        });
    }
  }, [pathname, searchParams, eventName]);

  return null;
};

export default function PixelInit({eventName}:Record<string, string>) {
  return (
    <Suspense>
      <FacebookPixelEventsInit   eventName={eventName}/>
    </Suspense>
  );
}
export const pixelCustomeEvent = async (name: string, data = {}) => {
  if (typeof window !== "undefined") {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("1214067770360774");
        ReactPixel.track(name, data);
      });
  }
};
