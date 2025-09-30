import { useState, useEffect, useContext } from "react";
import { fetchRequest } from "@/helpers/fetchRequest";
import { HAUT_AI_IMAGE_CAPTURE_CHECK } from "@/constants/urls";
import { QuestionsContext } from "@/context/questions-store";

const LoaderWithText = ({ image, onHautAiResponse }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [direction, setDirection] = useState("down");
  const { setHautAiResponse, setAllQuestionsFilled } = useContext(QuestionsContext);

  useEffect(() => {
    // Use prop if provided, otherwise try localStorage
    if (image) {
      setCapturedImage(image);
    } else {
      // Try to get the captured image from localStorage
      const storedImage = localStorage.getItem("capturedImage");
      if (storedImage) {
        setCapturedImage(storedImage);
      }
    }
  }, [image]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => (prev === "down" ? "up" : "down"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check hautAiResponse when component mounts
  useEffect(() => {
    if (onHautAiResponse) {
      const checkHautAiResponse = async () => {
        try {
          const transactionId = window.localStorage.getItem("user_tid");
          if (!transactionId) return;

          console.log('Checking hautAiResponse...');
          const completionRes = await fetchRequest(
            HAUT_AI_IMAGE_CAPTURE_CHECK(transactionId)
          );
          
          const hautAiResponseValue = completionRes.data.isSkinAnalysisResponseCapturedProperly;
          console.log('HautAiResponse:', hautAiResponseValue);
          
          setHautAiResponse(hautAiResponseValue);
          
          // If hautAiResponse is true, mark all questions as filled to show FormSubmission
          if (hautAiResponseValue === true) {
            setAllQuestionsFilled(true);
            window.localStorage.setItem("form_status", "filled");
          }
          
          onHautAiResponse(hautAiResponseValue);
          
        } catch (err) {
          console.error("Error calling HAUT_AI_IMAGE_CAPTURE_CHECK:", err);
          // If API fails, assume false and continue with addon questions
          setHautAiResponse(false);
          onHautAiResponse(false);
        }
      };

      // Start checking after 1 second
      const timer = setTimeout(checkHautAiResponse, 1000);
      return () => clearTimeout(timer);
    }
  }, [onHautAiResponse, setHautAiResponse]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen -mt-20"
    >
      <div className="relative md:w-[250px] w-[250px] md:h-[250px] h-[250px]">
        {capturedImage ? (
          // Show the captured image with scanner effect
          <div className="relative w-full h-full rounded-xl border border-gray-300 overflow-hidden shadow-sm bg-white">
            <img 
              src={capturedImage} 
              alt="Skin analysis" 
              className="w-full h-full object-cover"
            />
            {/* Scanner overlay effect */}
            <div
              className="absolute left-0 w-full h-32 pointer-events-none"
              style={{
                top: direction === "down" ? "80%" : "5%",
                transition: "top 1s ease-in-out",
                backgroundImage: `
                  radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0))
                `,
                backgroundSize: "12px 12px, 100% 100%",
                backdropFilter: "blur(2px)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 shadow-lg" />
            </div>
          </div>
        ) : (
          // Fallback to loader if no image
          <>
            {/* Static gray ring */}
            <div
              className="absolute inset-0 rounded-full border-[1.04px]"
              style={{ borderColor: "#8CC5FA" }}
            ></div>

            {/* Animated black ring */}
            <div
              className="absolute inset-0 rounded-full border-[1.04px] animate-spin"
              style={{
                borderColor: "#000000",
                borderTopColor: "#000000",
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
                borderLeftColor: "transparent",
              }}
            ></div>
          </>
        )}
      </div>

      <p className="mt-4 text-custom-text-loader-small text-[16px] font-[400] pt-[8px]">
        Analysing Skin...
      </p>

      <div className="md:w-[381px] w-[361px] text-wrap pt-[18px]">
        <h2 className="font-[500] md:text-[28px] text-[24px] text-custom-text-loader-header text-center">
          Creating Your Personalised Acne Plan
        </h2>
        <p className="text-[16px] text-custom-text-loader-subText text-center">
          We use AI skin analysis and dermatologist-backed science to create a
          custom acne plan—tailored to your needs.
        </p>
      </div>
    </div>
  );
};

export default LoaderWithText;
