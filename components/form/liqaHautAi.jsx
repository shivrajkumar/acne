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

// ------------------------------
// Detect In-App Browsers
// ------------------------------
function isInAppBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  return (
    /FBAN|FBAV|Facebook/.test(ua) ||
    /Instagram/.test(ua) ||
    /Messenger/.test(ua) ||
    /LinkedInApp/.test(ua) ||
    /TikTok/.test(ua) ||
    /Snapchat/.test(ua) ||
    /Twitter/.test(ua)
  );
}

export default function ImageUploadWithHaut({ block }) {
  const observerRef = useRef(null);
  const [err, setErr] = useState(null);
  const [cameraPermission, setCameraPermission] = useState("prompt");
  const [showPermissionModal, setShowPermissionModal] = useState(false); // ← CHANGED
  const liqaRef = useRef(null);
  const containerRef = useRef(null);
  const [isLiqaReady, setIsLiqaReady] = useState(false);
  const handleSubmit = useFormSubmit(QuestionsContext);
  const {
    saveReply,
    setAllQuestionsFilled,
    apiResponse: { caseId, transactionId },
  } = useContext(QuestionsContext);

  // ------------------------------
  // Show modal ONLY for in-app browsers
  // ------------------------------
  useEffect(() => {
    if (isInAppBrowser()) {
      setShowPermissionModal(true);
    } else {
      setShowPermissionModal(false);
    }
  }, []);

  // Move preloaded element into view
  useEffect(() => {
    console.log(
      "[ImageUploadWithHaut] Component mounted, looking for preloaded element..."
    );

    const preloadedElement =
      window.__preloadedLiqaElement ||
      document.getElementById("preloaded-liqa");

    if (preloadedElement && containerRef.current) {
      console.log(
        "[ImageUploadWithHaut] Found preloaded element, moving it into view..."
      );

      containerRef.current.appendChild(preloadedElement);
      liqaRef.current = preloadedElement;

      setIsLiqaReady(true);
      console.log(
        "[ImageUploadWithHaut] Preloaded element moved successfully and is ready!"
      );
    } else {
      console.log(
        "[ImageUploadWithHaut] No preloaded element found, will create new one"
      );
    }

    return () => {
      if (liqaRef.current && window.__preloadedLiqaElement) {
        const offscreenContainer = document.getElementById(
          "hautai-preload-container"
        );
        if (
          offscreenContainer &&
          liqaRef.current.parentNode !== offscreenContainer
        ) {
          console.log(
            "[ImageUploadWithHaut] Moving element back offscreen for reuse"
          );
          offscreenContainer.appendChild(liqaRef.current);
        }
      }
    };
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
    const liqa = liqaRef.current;
    if (!liqa) return;

    const safeAddClick = (el, handler) => {
      if (!el || !handler) return;
      if (!el.__hasClickListener) {
        el.addEventListener("click", handler);
        el.__hasClickListener = true;
      }
    };

    const handleUploadCTA = () => logGtmEvent("cta_upload_photo");
    const handleSubmitCTA = () => logGtmEvent("cta_submit_skin_test");

    const bindStaticButtons = (shadowRoot) => {
      if (!shadowRoot) return;

      const uploadButtons = shadowRoot.querySelectorAll(`
      button[data-source="upload"],
      button[data-source="front_camera"],
      button[data-source="companion"],
      [data-action="upload"],
      [data-action="camera"],
      [data-action="companion"]
      `);
      uploadButtons.forEach((btn) => safeAddClick(btn, handleUploadCTA));

      const submitButtons = shadowRoot.querySelectorAll(
        `
      button[data-action="submit"],
      button[type="submit"]
      `
      );
      submitButtons.forEach((btn) => safeAddClick(btn, handleSubmitCTA));
    };

    const isUploadButton = (node) => {
      if (
        node.matches?.(
          'button[data-source="upload"], button[data-source="front_camera"], button[data-source="companion"]'
        )
      )
        return true;
      if (
        node.matches?.(
          '[data-action="upload"], [data-action="camera"], [data-action="companion"]'
        )
      )
        return true;

      return /upload|camera|take photo/i.test(node.textContent || "");
    };

    const isSubmitButton = (node) => {
      if (node.matches?.('button[data-action="submit"], button[type="submit"]'))
        return true;

      return /submit|done|confirm/i.test(node.textContent || "");
    };

    const setupMutationObserver = (shadowRoot) => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (!node || node.nodeType !== 1) return;
            if (node.tagName !== "BUTTON") return;

            if (isUploadButton(node)) {
              safeAddClick(node, handleUploadCTA);
            }

            if (isSubmitButton(node)) {
              safeAddClick(node, handleSubmitCTA);
            }
          });
        });
      });

      observer.observe(shadowRoot, { childList: true, subtree: true });
      return observer;
    };

    const bindContinueButton = (shadowRoot) => {
      const btn = Array.from(shadowRoot.querySelectorAll("button")).find((b) =>
        /continue/i.test(b.textContent)
      );

      if (!btn) return;

      safeAddClick(btn, async (e) => {
        if (cameraPermission !== "granted") {
          e.preventDefault();
          e.stopPropagation();
          await handleContinueOnWeb();
        }
      });
    };

    const handleReady = () => {
      setTimeout(() => {
        const shadowRoot = liqa.shadowRoot;
        if (!shadowRoot) return;

        bindContinueButton(shadowRoot);
        bindStaticButtons(shadowRoot);

        observerRef.current = setupMutationObserver(shadowRoot);
      }, 500);
    };

    const handleError = (event) => {
      if (event.detail?.type === "camera-permission") {
        setCameraPermission("denied");
      }
    };

    liqa.addEventListener("ready", handleReady);
    liqa.addEventListener("error", handleError);
    liqa.addEventListener("captures", handleImageCaptures);

    return () => {
      liqa.removeEventListener("ready", handleReady);
      liqa.removeEventListener("error", handleError);
      liqa.removeEventListener("captures", handleImageCaptures);

      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [cameraPermission]);

  useEffect(() => {
    if (liqaRef.current) {
      const handleElementReady = () => {
        liqaRef?.current?.configure({
          lighting: { required: false, showPrompt: false },
          instructions: { enabled: false },
        });

        if (!window.__preloadedLiqaElement) {
          setIsLiqaReady(true);
          console.log("[ImageUploadWithHaut] Fallback element is ready");
        }
      };

      liqaRef.current.addEventListener("ready", handleElementReady);

      return () => {
        liqaRef.current?.removeEventListener("ready", handleElementReady);
      };
    }
  }, [liqaRef.current]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      stream.getTracks().forEach((track) => track.stop());

      setCameraPermission("granted");
      setShowPermissionModal(false);
      setErr(null);

      if (liqaRef.current) {
        const liqa = liqaRef.current;
        liqa.dispatchEvent(new CustomEvent("refresh"));
      }

      return true;
    } catch (error) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        setCameraPermission("denied");
        setShowPermissionModal(true);
        setErr("");
      } else if (error.name === "NotFoundError") {
        setErr("No camera found on this device.");
      } else {
        setErr("Unable to access camera. Please check your browser settings.");
      }
      return false;
    }
  };

  const openInExternalBrowser = () => {
    const url = window.location.href;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      window.location.href = `x-safari-${url}`;
      return;
    }

    if (isAndroid) {
      window.location.href = `googlechrome://navigate?url=${encodeURIComponent(
        url
      )}`;
      return;
    }

    window.location.href = url;

    setTimeout(() => {
      alert(
        "Unable to open external browser automatically.\n\nPlease copy this URL and open it in your default browser:\n\n" +
          url
      );
    }, 1000);
  };

  const handleContinueOnWeb = async () => {
    if (cameraPermission !== "granted") {
      const granted = await requestCameraPermission();
      if (!granted) {
        alert(
          "Please enable camera access to continue:\n\n1. Click the camera icon in your browser's address bar\n2. Select 'Allow' for camera access\n3. Refresh the page if needed"
        );
      }
    }
  };

  async function compressImage(blob, maxSizeMB = 2) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (blob.size <= maxSizeBytes) {
      return blob;
    }

    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        let quality = 0.9;
        let width = img.width;
        let height = img.height;

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

        const tryCompress = (q) => {
          canvas.toBlob(
            (compressedBlob) => {
              if (compressedBlob.size > maxSizeBytes && q > 0.1) {
                tryCompress(q - 0.1);
              } else {
                resolve(compressedBlob);
              }
            },
            "image/jpeg",
            q
          );
        };

        tryCompress(quality);
      };

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

      let blob = await captures[0].blob();
      trackMoEngageEvent("image_uploaded");

      blob = await compressImage(blob, 2);

      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("capturedImage", reader.result);
      };
      reader.readAsDataURL(blob);

      const fileName = blob.name || "upload.jpeg";
      const fileType = blob.type || "image/jpeg";

      const fileObject = new File([blob], fileName, {
        type: fileType,
        lastModified: Date.now(),
      });

      if (fileObject.size > 2 * 1024 * 1024) {
        console.error(
          "File still too large after compression:",
          (fileObject.size / 1024 / 1024).toFixed(2),
          "MB"
        );
        setErr("Image is too large. Please try again with a smaller image.");
        return;
      }

      const formData = new FormData();
      formData.append("file", fileObject, fileName);

      const uploadRes = await fetchRequest(IMAGE_UPLOAD_API(caseId), {
        method: "POST",
        body: formData,
      });

      const isImageUploaded = uploadRes?.success || uploadRes?.status === 200;

      if (isImageUploaded) {
        trackMoEngageEvent("image_analysis_success");

        const status = formFillStatus.FILLED;

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

        const txRes = await fetchRequest(TRANSACTION_API(transactionId), {
          method: "POST",
          body: JSON.stringify(_formData),
        });

        if (txRes.status === 200) {
          handleSubmit(blob);
          setAllQuestionsFilled(true);
          window.localStorage.setItem("form_status", "filled");
        } else {
          trackMoEngageEvent("image_analysis_failed");
          setErr("Transaction API failed");
        }
      } else {
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
      {/* Loader removed intentionally */}

      <div ref={containerRef} className="w-full h-full relative">
        {!window.__preloadedLiqaElement && (
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
            required-lighting="none"
            showLightSourcePrompt="false"
          ></hautai-liqa>
        )}

        {/* CAMERA PERMISSION MODAL (only shows in IAB now) */}
        {showPermissionModal && (
          <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-Primary/500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Camera Permission Needed
              </h3>

              <p className="text-center text-gray-600 text-sm mb-4">
                To continue your skin test, please enable camera access from
                your device’s <strong>Settings app</strong>.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-5">
                <p className="text-xs text-gray-700 font-medium mb-2">
                  How to enable:
                </p>

                <ol className="text-xs text-gray-600 list-decimal list-inside space-y-1">
                  <li>Open your phone’s <strong>Settings</strong></li>
                  <li>
                    Go to <strong>Apps / App Permissions</strong>
                  </li>
                  <li>Select the app or browser you’re using</li>
                  <li>Enable <strong>Camera</strong> permission</li>
                </ol>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowPermissionModal(false);
                    requestCameraPermission();
                  }}
                  className="w-full py-3 bg-Primary/500 text-white text-sm font-medium rounded-lg hover:bg-Primary/600 transition"
                >
                  I Have Enabled It
                </button>

                <button
                  onClick={openInExternalBrowser}
                  className="w-full py-3 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 transition"
                >
                  Open in External Browser
                </button>
              </div>
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
