import { NextResponse } from "next/server";
import { STRAPI_DEV_URL } from "@/constants/constants";

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
  const url = new URL(req.url);
  const query = url.searchParams.toString();

  // Construct the target URL for Strapi
  const targetUrl = `${STRAPI_DEV_URL}/${targetPath}${query ? `?${query}` : ""}`;

  // Remove problematic headers
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");
  headers.delete("accept-encoding");
  headers.delete("connection");

  // Add CORS headers
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const fetchOptions = {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    duplex: "half",
  };

  try {
    const backendResponse = await fetch(targetUrl, fetchOptions);

    // Get the response as text first to check if it's valid
    const responseText = await backendResponse.text();
    console.log('Proxy response from Strapi:', {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      contentType: backendResponse.headers.get('content-type'),
      responseLength: responseText.length,
      responsePreview: responseText.substring(0, 100)
    });

    // Process response headers
    const responseHeaders = new Headers();

    // Copy necessary headers from backend response
    const allowedHeaders = ['content-type', 'cache-control', 'etag', 'last-modified'];
    allowedHeaders.forEach(header => {
      if (backendResponse.headers.has(header)) {
        responseHeaders.set(header, backendResponse.headers.get(header));
      }
    });

    // Add CORS headers to response
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    responseHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Ensure content-type is set correctly
    if (!responseHeaders.has('content-type')) {
      responseHeaders.set('content-type', 'application/json');
    }

    return new NextResponse(responseText, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy request failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Strapi" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}