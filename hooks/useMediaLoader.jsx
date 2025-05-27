import { useState, useEffect } from 'react';

/**
 * Custom hook for handling media (images and videos) loading state
 * @param {Object} options - Configuration options
 * @param {number} options.minLoadingTime - Minimum time to show loader (default: 1000ms)
 * @param {number} options.maxLoadingTime - Maximum time to show loader (default: 12000ms)
 * @param {number} options.imageTimeout - Timeout for individual images (default: 10000ms)
 * @param {number} options.videoTimeout - Timeout for individual videos (default: 15000ms)
 * @param {number} options.transitionDelay - Delay after media loads before hiding loader (default: 500ms)
 * @param {number} options.checkDelay - Delay before starting media check (default: 100ms)
 * @returns {boolean} isLoading - Whether media is still loading
 */
const useMediaLoader = (options = {}) => {
  const {
    minLoadingTime = 1000,
    maxLoadingTime = 12000,
    imageTimeout = 10000,
    videoTimeout = 15000,
    transitionDelay = 500,
    checkDelay = 100
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const checkMediaLoaded = () => {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkMediaLoaded);
        return;
      }

      // Get all images and videos in the document
      const images = document.querySelectorAll('img');
      const videos = document.querySelectorAll('video');
      const mediaPromises = [];

      // Handle images
      images.forEach((img) => {
        if (img.complete) {
          // Image already loaded
          return;
        }
        
        // Create promise for each image
        const imagePromise = new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error('Image load timeout'));
          }, imageTimeout);

          img.onload = () => {
            clearTimeout(timeoutId);
            resolve();
          };
          
          img.onerror = () => {
            clearTimeout(timeoutId);
            resolve(); // Resolve even on error to not block the loader
          };
        });
        
        mediaPromises.push(imagePromise);
      });

      // Handle videos
      videos.forEach((video) => {
        if (video.readyState >= 3) {
          // Video already loaded enough data
          return;
        }
        
        // Create promise for each video
        const videoPromise = new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error('Video load timeout'));
          }, videoTimeout);

          const handleVideoLoad = () => {
            clearTimeout(timeoutId);
            resolve();
          };

          const handleVideoError = () => {
            clearTimeout(timeoutId);
            resolve(); // Resolve even on error to not block the loader
          };

          // Listen for multiple video events to ensure proper loading
          video.addEventListener('loadeddata', handleVideoLoad, { once: true });
          video.addEventListener('canplaythrough', handleVideoLoad, { once: true });
          video.addEventListener('error', handleVideoError, { once: true });
          video.addEventListener('abort', handleVideoError, { once: true });
          
          // If video is already in a loaded state
          if (video.readyState >= 3) {
            handleVideoLoad();
          }
        });
        
        mediaPromises.push(videoPromise);
      });

      // Wait for all media to load or timeout
      Promise.allSettled(mediaPromises).then(() => {
        if (isMounted) {
          setMediaLoaded(true);
        }
      });
    };

    // Minimum loading time
    const minLoadingTimer = setTimeout(() => {
      if (isMounted && mediaLoaded) {
        setIsLoading(false);
      }
    }, minLoadingTime);

    // Maximum loading time
    const maxLoadingTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, maxLoadingTime);

    // Start checking media after component mounts
    const checkDelayTimer = setTimeout(checkMediaLoaded, checkDelay);

    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(minLoadingTimer);
      clearTimeout(maxLoadingTimer);
      clearTimeout(checkDelayTimer);
    };
  }, [minLoadingTime, maxLoadingTime, imageTimeout, videoTimeout, checkDelay]);

  // Hide loader when media is loaded and minimum time has passed
  useEffect(() => {
    if (mediaLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, transitionDelay);

      return () => clearTimeout(timer);
    }
  }, [mediaLoaded, transitionDelay]);

  return isLoading;
};

export default useMediaLoader;