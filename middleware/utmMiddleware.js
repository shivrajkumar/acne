import { NextResponse } from "next/server";
import { parse } from "cookie"; // Use the cookie parser to extract cookie values
import { getValidJSONFromString } from "@constants/urls";

const UTM_KEYS = [
  "utm_campaign",
  "utm_source",
  "utm_medium",
  "utm_content",
  "utm_term",
  "adset",
  "adname",
];

export function utmMiddleware(middleware) {
  return async (request, event) => {
    const cookies = parse(request.headers.get("cookie") || "");
    const url = request.nextUrl.clone();

    let utmAlreadyPresent = UTM_KEYS.every((key) => url.searchParams.has(key));
    if (utmAlreadyPresent) {
      return middleware(request, event, NextResponse.next());
    }

    try {
      if (pathNames.some((p) => p === request.nextUrl.pathname)) {
        const moolCookies = getValidJSONFromString(
          cookies?.["__CLEAR_RITUAL_UTM__"]
        );

        let hasNewParams = false;

        UTM_KEYS.forEach((key) => {
          if (!url.searchParams.has(key) && moolCookies[key]) {
            const cookieValue = moolCookies[key];
            if (cookieValue) {
              url.searchParams.set(key, cookieValue);
              hasNewParams = true;
            }
          }
        });
        if (hasNewParams) {
          return NextResponse.redirect(url);
        }
      }
    } catch {
      return middleware(request, event, NextResponse.next());
    }
    return middleware(request, event, NextResponse.next());
  };
}

const pathNames = ["/skin-test"];
