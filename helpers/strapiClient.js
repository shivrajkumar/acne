import { STRAPI_DEV_URL } from "@/constants/constants";

/**
 * Client-side Strapi CMS data fetcher
 * Used for fetching CMS content from the browser
 */
export const fetchStrapiData = async (endpoint, options = {}) => {
  try {
    const url = `${STRAPI_DEV_URL}${endpoint}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${endpoint}: ${response.status}`);
    }

    const data = await response.json();
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
