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

  useEffect(() => {
    if (onHautAiResponse) {
      let hasCalledBack = false;

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
          
          // If hautAiResponse is true, navigate to result screen
          if (hautAiResponseValue === true && !hasCalledBack) {
            hasCalledBack = true;
            setAllQuestionsFilled(true);
            window.localStorage.setItem("form_status", "filled");
            onHautAiResponse(true);
          }
          
          return hautAiResponseValue;
          
        } catch (err) {
          console.error("Error calling HAUT_AI_IMAGE_CAPTURE_CHECK:", err);
          setHautAiResponse(false);
          return false;
        }
      };

      // First check after 1 second
      const initialCheck = setTimeout(async () => {
        const firstResult = await checkHautAiResponse();
        
        if (firstResult !== true) {
          // If first check is false, wait 15 seconds and check again
          console.log('First check false, will retry in 15 seconds...');
          
          const retryTimeout = setTimeout(async () => {
            const secondResult = await checkHautAiResponse();
            
            if (secondResult !== true && !hasCalledBack) {
              // After second check, if still false, show PhotoAnalysisFailed
              console.log('Second check also false, showing PhotoAnalysisFailed');
              hasCalledBack = true;
              onHautAiResponse(false);
            }
          }, 15000);

          return () => clearTimeout(retryTimeout);
        }
      }, 1000);

      return () => {
        clearTimeout(initialCheck);
      };
    }
  }, [onHautAiResponse, setHautAiResponse, setAllQuestionsFilled]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen -mt-20"
    >
      <div className="relative md:w-[250px] w-[270px] md:h-[250px] h-[350px]">
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

      <div className="md:w-[381px] w-[361px] text-wrap pt-[18px]">
        <h2 className="font-[400] md:text-[28px] text-[28px] text-center">
          Creating Your Personalised Acne Plan
        </h2>
        <p className="text-[16px] text-custom-text-loader-subText text-center">
          We combine AI skin analysis, dermatologist-backed science, and your unique acne triggers to build a personalised treatment plan.
        </p>
      </div>
    </div>
  );
};

export default LoaderWithText;
