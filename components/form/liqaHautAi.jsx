"use client";
import { useContext, useEffect, useRef, useState } from "react";
// import your helpers
import { IMAGE_UPLOAD_API, TRANSACTION_API } from "@/constants/urls";
import { fetchRequest } from "@/helpers/fetchRequest";
import { formFillStatus } from "@/enums/QuestionEnums";
import useFormSubmit from "@/hooks/useFormSubmit";
import { QuestionsContext } from "@/context/questions-store";
import { trackMoEngageEvent } from "@/utils/moegage";
import { logGtmEvent } from "@/helpers/gtmHelpers";

// REMOVED: import { preload, FEATURE } from "SOURCE_URL_PROVIDED_BY_HAUT_AI/liqa.js"


export default function ImageUploadWithHaut({ block }) {
  const [err, setErr] = useState(null);
  const [cameraPermission, setCameraPermission] = useState('prompt'); // 'granted', 'denied', 'prompt'
  const liqaRef = useRef(null);
  const handleSubmit = useFormSubmit(QuestionsContext);
  const {
    saveReply,
    setAllQuestionsFilled,
    apiResponse: { caseId, transactionId },
  } = useContext(QuestionsContext);

  // Check camera permission on mount
  useEffect(() => {
    checkCameraPermission();
  }, []);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    // Add preload script first
    const preloadScript = document.createElement("script");
    preloadScript.type = "module";
    preloadScript.textContent = `
      import { preload, FEATURE } from 'https://liqa.haut.ai/liqa.js';
      preload({ preset: "face", feature: FEATURE.TUTORIAL });
    `;
    document.head.appendChild(preloadScript);

    const script = document.createElement("script");
    script.src = "https://liqa.haut.ai/liqa.js";
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const liqa = liqaRef.current;
      if (!liqa) return;

      liqa.addEventListener("ready", () => {
        // Try to intercept the Continue on Web button and track upload photo CTAs
        setTimeout(() => {
          const shadowRoot = liqa.shadowRoot;
          if (shadowRoot) {
            // Look for the continue on web button in the shadow DOM
            const continueButton = shadowRoot.querySelector('[data-action="continue-web"], button:contains("Continue on web"), button:contains("continue")');
            if (continueButton) {
              continueButton.addEventListener('click', async (e) => {
                if (cameraPermission !== 'granted') {
                  e.preventDefault();
                  e.stopPropagation();
                  await handleContinueOnWeb();
                }
              });
            }

            // Track clicks on upload/camera/companion buttons
            const uploadButtons = shadowRoot.querySelectorAll(
              'button[data-source="upload"], button[data-source="front_camera"], button[data-source="companion"], ' +
              '[data-action="upload"], [data-action="camera"], [data-action="companion"], ' +
              'button:contains("Upload"), button:contains("Camera"), button:contains("Take Photo")'
            );
            
            uploadButtons.forEach(button => {
              button.addEventListener('click', () => {
                logGtmEvent("cta_upload_photo");
              });
            });

            // Track clicks on submit button
            const submitButtons = shadowRoot.querySelectorAll(
              'button[data-action="submit"], button[type="submit"], ' +
              'button:contains("Submit"), button:contains("Done"), button:contains("Confirm")'
            );
            
            submitButtons.forEach(button => {
              button.addEventListener('click', () => {
                logGtmEvent("cta_submit_skin_test");
              });
            });

            // Also observe for dynamically added buttons
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                  if (node.nodeType === 1) { // Element node
                    // Check if it's an upload-related button
                    if (node.matches && (
                      node.matches('button[data-source="upload"], button[data-source="front_camera"], button[data-source="companion"]') ||
                      node.matches('[data-action="upload"], [data-action="camera"], [data-action="companion"]')
                    )) {
                      node.addEventListener('click', () => {
                        logGtmEvent("cta_upload_photo");
                      });
                    }
                    
                    // Check if it's a submit button
                    if (node.matches && (
                      node.matches('button[data-action="submit"], button[type="submit"]') ||
                      (node.tagName === 'BUTTON' && (
                        node.textContent.includes('Submit') || 
                        node.textContent.includes('Done') || 
                        node.textContent.includes('Confirm')
                      ))
                    )) {
                      node.addEventListener('click', () => {
                        logGtmEvent("cta_submit_skin_test");
                      });
                    }
                  }
                });
              });
            });

            observer.observe(shadowRoot, { 
              childList: true, 
              subtree: true 
            });
          }
        }, 500);
      });

      // Listen for camera permission errors
      liqa.addEventListener("error", (event) => {
        if (event.detail && event.detail.type === 'camera-permission') {
          handleContinueOnWeb();
        }
      });

      // Fires when user presses Submit
      liqa.addEventListener("captures", handleImageCaptures);
    };

    return () => {
      const liqa = liqaRef.current;
      if (liqa) {
        liqa.removeEventListener("captures", handleImageCaptures);
      }
      // Clean up scripts
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (preloadScript && preloadScript.parentNode) {
        preloadScript.parentNode.removeChild(preloadScript);
      }
    };
  }, []);

  useEffect(() => {
    if (liqaRef.current) {
      // Wait for element to upgrade
      liqaRef.current.addEventListener("liqaReady", () => {
        liqaRef.current.configure({
          lighting: {
            required: false, // ✅ disables lighting validation
            showPrompt: false, // ✅ hides light source prompt
          },
          instructions: {
            enabled: false, // ✅ hides on-screen user guidance
          },
        });
      });
    }
  }, []);

  // Check current camera permission status
  const checkCameraPermission = async () => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({ name: 'camera' });
        setCameraPermission(result.state);
        
        // Listen for permission changes
        result.addEventListener('change', () => {
          setCameraPermission(result.state);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Request camera permission explicitly
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: false 
      });
      
      // Permission granted, stop the stream immediately as we just needed permission
      stream.getTracks().forEach(track => track.stop());
      
      setCameraPermission('granted');
      setErr(null);
      
      // Reload the LIQA component to reflect the new permission
      if (liqaRef.current) {
        // Trigger a re-initialization of the LIQA component
        const liqa = liqaRef.current;
        liqa.dispatchEvent(new CustomEvent('refresh'));
      }
      
      return true;
    } catch (error) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCameraPermission('denied');
        setErr("");
      } else if (error.name === 'NotFoundError') {
        setErr("No camera found on this device.");
      } else {
        setErr("Unable to access camera. Please check your browser settings.");
      }
      return false;
    }
  };

  // Handle Continue on Web button click
  const handleContinueOnWeb = async () => {
    if (cameraPermission !== 'granted') {
      const granted = await requestCameraPermission();
      if (!granted) {
        // Show instructions to enable camera
        alert("Please enable camera access to continue:\n\n1. Click the camera icon in your browser's address bar\n2. Select 'Allow' for camera access\n3. Refresh the page if needed");
      }
    }
  };

  // Helper function to compress image
  async function compressImage(blob, maxSizeMB = 2) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
    
    // If already under size limit, return original
    if (blob.size <= maxSizeBytes) {
      return blob;
    }
    
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      img.onload = () => {
        let quality = 0.9;
        let width = img.width;
        let height = img.height;
        
        // Calculate initial scale if image is very large
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1920;
        
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Function to convert canvas to blob with specific quality
        const tryCompress = (q) => {
          canvas.toBlob(
            (compressedBlob) => {
              
              if (compressedBlob.size > maxSizeBytes && q > 0.1) {
                // Still too large, reduce quality
                tryCompress(q - 0.1);
              } else {
                resolve(compressedBlob);
              }
            },
            'image/jpeg',
            q
          );
        };
        
        tryCompress(quality);
      };
      
      // Convert blob to data URL and load into image
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(blob);
    });
  }

  async function handleImageCaptures(event) {
    try {
      const captures = event.detail;
      if (!Array.isArray(captures) || captures.length === 0) {
        setErr("No image captured");
        return;
      }

      // Take first capture
      let blob = await captures[0].blob();
      trackMoEngageEvent("image_uploaded");
      
      // Compress image if needed (max 2MB)
      blob = await compressImage(blob, 2);

      // Convert blob to base64 and store in localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("capturedImage", reader.result);
      };
      reader.readAsDataURL(blob);

      // Construct File object
      const fileName = blob.name || "upload.jpeg";
      const fileType = blob.type || "image/jpeg";

      const fileObject = new File([blob], fileName, {
        type: fileType,
        lastModified: Date.now(),
      });

      // Final check to ensure file is under 2MB
      if (fileObject.size > 2 * 1024 * 1024) {
        console.error("File still too large after compression:", (fileObject.size / 1024 / 1024).toFixed(2), "MB");
        setErr("Image is too large. Please try again with a smaller image.");
        return;
      }
      
      const formData = new FormData();
      formData.append("file", fileObject, fileName);

      // Upload image
      const uploadRes = await fetchRequest(IMAGE_UPLOAD_API(caseId), {
        method: "POST",
        body: formData,
      });

      // Check if image upload was successful
      const isImageUploaded = uploadRes?.success || uploadRes?.status === 200;
      
      if (isImageUploaded) {
        trackMoEngageEvent("image_analysis_success");
        
        // Determine status based on upload success
        const status = formFillStatus.FILLED;
        
        // Build form data payload
        const _formData = {
          question_id: block.id,
          field_key: block.id,
          question_text: block.text,
          response: blob,
          status: status,
          location_path: window.location.pathname + window.location.search,
          source: "website",
          response_type: block.type,
        };

        // Save progress - single API call
        const txRes = await fetchRequest(TRANSACTION_API(transactionId), {
          method: "POST",
          body: JSON.stringify(_formData),
        });
        
        if (txRes.status === 200) {
          // Image uploaded AND submitted successfully
          handleSubmit(blob);
          setAllQuestionsFilled(true);
          window.localStorage.setItem("form_status", "filled");
        } else {
          // Transaction API failed
          trackMoEngageEvent("image_analysis_failed");
          setErr("Transaction API failed");
        }
      } else {
        // Image upload failed
        trackMoEngageEvent("image_analysis_failed");
        setErr(uploadRes?.message || "Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      trackMoEngageEvent("image_analysis_failed");
      setErr("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white overflow-hidden">
      <div className="w-full h-full relative">
        <hautai-liqa
          class="preview w-full h-full"
          ref={liqaRef}
          license="ll_cfa291c08ce340a6"
          preset="face"
          show-preview="true"
          enable-preview="true"
          preview-duration="5000"
          sources="front_camera,upload,companion"
          onContinueWeb={handleContinueOnWeb}
          required-lighting='none'
          showLightSourcePrompt='false'
        ></hautai-liqa>

        {/* Camera Permission Prompt */}
        {cameraPermission === 'denied' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-3">Camera Access Required</h3>
              <p className="mb-4 text-gray-600">
                To capture your photo, we need access to your camera. Please follow these steps:
              </p>
              <ol className="list-decimal list-inside mb-4 text-sm text-gray-600">
                <li>Click the camera icon in your browser's address bar</li>
                <li>Select "Allow" for camera access</li>
                <li>Refresh the page if needed</li>
              </ol>
            </div>
          </div>
        )}

        {err && (
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-red-500 text-sm text-center z-10">
            {err}
          </p>
        )}
      </div>
    </div>
  );
}