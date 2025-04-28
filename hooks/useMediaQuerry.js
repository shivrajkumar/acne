import { useEffect, useState } from "react";

function useMediaQuery(
  query,
  defaultMatches = typeof window !== "undefined" &&
    window.matchMedia(query).matches
) {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      if (media.matches !== matches) setMatches(media.matches);

      const listener = () => setMatches(media.matches);

      media.addEventListener("change", listener);
      return () => media.removeListener(listener);
    }
  }, [query, matches]);

  return matches;
}

export default useMediaQuery;
