import { STRAPI_DEV_URL } from "@/constants/constants";
import React from "react";

/**
 * Client-side Strapi CMS data fetcher
 * Used for fetching CMS content from the browser
 */
export const fetchStrapiData = async (endpoint, options = {}) => {
  try {
    // Use proxy route on client-side to avoid CORS issues
    const isClient = typeof window !== 'undefined';
    const url = isClient ? `/api/strapi${endpoint}` : `${STRAPI_DEV_URL}${endpoint}`;

    console.log(`Fetching from endpoint: ${endpoint}`);
    console.log(`Using URL: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      // Add cache busting for Android compatibility
      cache: isClient ? 'no-store' : 'default',
      ...options,
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${endpoint}: ${response.status} ${response.statusText}`);
    }

    // Get response as text first to debug
    const responseText = await response.text();
    console.log(`Response text length: ${responseText.length}`);
    console.log(`Response text preview:`, responseText.substring(0, 200));

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error(`Failed to parse response as JSON: ${parseError.message}`);
    }

    console.log(`Successfully parsed data:`, data);
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching Strapi data from ${endpoint}:`, error);
    return { data: null, error: error.message };
  }
};

/**
 * Hook-style wrapper for fetching Strapi data with loading states
 * Can be used directly in components
 */
export const useStrapiData = (endpoint, options = {}) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true }));

      const { data, error } = await fetchStrapiData(endpoint, options);

      if (isMounted) {
        setState({
          data,
          loading: false,
          error,
        });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return state;
};
