"use client";
import { useContext, useEffect, useRef, useState } from "react";
// import your helpers
import { IMAGE_UPLOAD_API, TRANSACTION_API } from "@/constants/urls";
import { fetchRequest } from "@/helpers/fetchRequest";
import { formFillStatus } from "@/enums/QuestionEnums";
import useFormSubmit from "@/hooks/useFormSubmit";
import { QuestionsContext } from "@/context/questions-store";

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
    const script = document.createElement("script");
    script.src = "https://liqa.haut.ai/liqa.js";
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const liqa = liqaRef.current;
      if (!liqa) return;

      liqa.addEventListener("ready", () => {
        console.log("Haut.AI LIQA is ready ✅");
        
        // Try to intercept the Continue on Web button
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
    };
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
      console.log("Permission API not supported, will request on use");
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

  async function handleImageCaptures(event) {
    try {
      const captures = event.detail;
      if (!Array.isArray(captures) || captures.length === 0) {
        setErr("No image captured");
        return;
      }

      // Take first capture (you can handle multiple if needed)
      const blob = await captures[0].blob();

      // Convert blob to base64 and store in localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("capturedImage", reader.result);
      };
      reader.readAsDataURL(blob);

      // Construct File object
      const fileName = blob.name || "upload.png";
      const fileType = blob.type || "image/png";

      const fileObject = new File([blob], fileName, {
        type: fileType,
        lastModified: Date.now(),
      });

      const formData = new FormData();
      formData.append("file", fileObject, fileName);

      // Upload image
      const uploadRes = await fetchRequest(IMAGE_UPLOAD_API(caseId), {
        method: "POST",
        body: formData,
      });

      if (uploadRes?.success || uploadRes?.status === 200) {
        // Build form data payload
        const _formData = {
          question_id: block.id,
          field_key: block.id,
          question_text: block.text,
          response: blob,
          status: formFillStatus.SEMI_FILLED,
          location_path: window.location.pathname + window.location.search,
          source: "website",
          response_type: block.type,
        };

        // Save progress
        const txRes = await fetchRequest(TRANSACTION_API(transactionId), {
          method: "POST",
          body: JSON.stringify(_formData),
        });

        if (txRes.status === 200) {
          handleSubmit(blob);
          window.localStorage.setItem("form_status", "semi-filled");
        } else {
          setErr("Transaction API failed");
        }
      } else {
        setErr(uploadRes?.message || "Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
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
              <button 
                onClick={requestCameraPermission}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Request Camera Access
              </button>
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
