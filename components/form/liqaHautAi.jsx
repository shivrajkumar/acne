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
  const liqaRef = useRef(null);
  const handleSubmit = useFormSubmit(QuestionsContext);
  const {
    saveReply,
    setAllQuestionsFilled,
    apiResponse: { caseId, transactionId },
  } = useContext(QuestionsContext);

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
          status: formFillStatus.DRAFT,
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
    <div className="w-full min-h-full flex flex-col justify-center items-center py-5">
      <div className="w-full">
        <hautai-liqa
          className="preview"
          ref={liqaRef}
          license="ll_cfa291c08ce340a6"
          preset="face"
          show-preview="true"
          enable-preview="true"
          preview-duration="5000"
          sources="front_camera,companion"
        ></hautai-liqa>
      </div>
    </div>
  );
}
