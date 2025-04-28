import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(null);

  const screens = {
    xs: "300px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "3xl": "1920px",
  };

  useEffect(() => {
    const handleResize = () => {
      for (const [key, value] of Object.entries(screens)) {
        const mediaQuery = window.matchMedia(`(max-width: ${value})`);
        if (mediaQuery.matches) {
          setScreenSize(key);
          break;
        }
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
