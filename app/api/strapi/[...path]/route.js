import { STRAPI_DEV_URL } from "@/constants/constants";

// CORS headers that mobile carriers won't strip
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Allow-Credentials": "true",
};

// Handle preflight OPTIONS requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}

export async function GET(request, { params }) {
  return proxyRequest(request, params.path);
}

export async function POST(request, { params }) {
  return proxyRequest(request, params.path);
}

export async function PUT(request, { params }) {
  return proxyRequest(request, params.path);
}

export async function DELETE(request, { params }) {
  return proxyRequest(request, params.path);
}

export async function PATCH(request, { params }) {
  return proxyRequest(request, params.path);
}

async function proxyRequest(request, pathSegments) {
  try {
    // Build the target URL
    const path = pathSegments.join('/');
    const targetUrl = `${STRAPI_DEV_URL}/${path}`;

    // Get request body
    let body = null;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      body = await request.text();
    }

    // Build headers for the target request
    const targetHeaders = {};

    // Forward all headers except host and connection
    request.headers.forEach((value, key) => {
      if (!['host', 'connection'].includes(key.toLowerCase())) {
        targetHeaders[key] = value;
      }
    });

    // Create controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 30000); // 30 second timeout

    // Make the request to the Strapi backend
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: targetHeaders,
      body: body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Create new response with CORS headers
    const responseHeaders = {
      ...corsHeaders,
    };

    // Copy important response headers
    response.headers.forEach((value, key) => {
      if (['content-type', 'cache-control', 'etag'].includes(key.toLowerCase())) {
        responseHeaders[key] = value;
      }
    });

    // Get response body
    const responseBody = await response.arrayBuffer();

    return new Response(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Proxy error:', error);

    // Return appropriate error response
    if (error.name === 'AbortError') {
      return new Response(
        JSON.stringify({ error: 'Request timeout' }),
        {
          status: 408,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Proxy request failed' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}