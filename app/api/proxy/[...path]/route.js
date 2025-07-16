import { NextResponse } from "next/server";

const BACKEND_URL = "https://consumer-api-gateway-tnutsdr7.dev.hav-g.in";

export async function GET(req, { params }) {
  return proxyRequest(req, params);
}

export async function POST(req, { params }) {
  return proxyRequest(req, params);
}

async function proxyRequest(req, params) {
  const targetPath = params.path.join("/");
  const targetUrl = `${BACKEND_URL}/${targetPath}`;

  const headers = new Headers(req.headers);
  headers.set("host", new URL(BACKEND_URL).host);
  headers.set("origin", BACKEND_URL);

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.text()
      : undefined;

  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
    credentials: "include",
  });

  const responseBody = await response.arrayBuffer();

  const setCookie = response.headers.get("set-cookie");

  const responseHeaders = new Headers(response.headers);

  if (setCookie) {
    const adjustedCookie = setCookie.replace(/Domain=[^;]+;?/gi, "");
    responseHeaders.set("set-cookie", adjustedCookie);
  }

  return new NextResponse(responseBody, {
    status: response.status,
    headers: responseHeaders,
  });
}
