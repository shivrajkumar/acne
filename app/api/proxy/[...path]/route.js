import { NextResponse } from "next/server";

const BACKEND_URL = "https://consumer-api-gateway-tnutsdr7.dev.hav-g.in";

export async function GET(req, { params }) {
  return proxyRequest(req, params);
}

export async function POST(req, { params }) {
  return proxyRequest(req, params);
}

export async function PUT(req, { params }) {
  return proxyRequest(req, params);
}

export async function DELETE(req, { params }) {
  return proxyRequest(req, params);
}

async function proxyRequest(req, { path }) {
  const targetPath = path.join("/");
  const targetUrl = `${BACKEND_URL}/${targetPath}`;

  const headers = new Headers(req.headers);

  headers.delete("content-length");
  headers.delete("accept-encoding");

  const fetchOptions = {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    duplex: "half",
  };

  const backendResponse = await fetch(targetUrl, fetchOptions);

  const responseHeaders = new Headers(backendResponse.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  const responseBody = await backendResponse.arrayBuffer();

  return new NextResponse(responseBody, {
    status: backendResponse.status,
    headers: responseHeaders,
  });
}
