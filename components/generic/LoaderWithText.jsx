import { useState, useEffect } from "react";

const LoaderWithText = ({ image, onHautAiResponse }) => {

  const [capturedImage, setCapturedImage] = useState(null);
  const [direction, setDirection] = useState("down");

  useEffect(() => {
    // Use prop if provided, otherwise try localStorage
    if (image) {
      setCapturedImage(image);
    } else {
      // Try to get the captured image from localStorage
      const storedImage = localStorage.getItem("capturedImage");
      if (storedImage) {
        setCapturedImage(storedImage);
      } else {
        // No image available - should go back
        if (onHautAiResponse) {
          // Signal that we need to go back
          setTimeout(() => {
            onHautAiResponse('no-image');
          }, 100);
        }
      }
    }
  }, [image, onHautAiResponse]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => (prev === "down" ? "up" : "down"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Don't render if no image is available
  if (!capturedImage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen -mt-20">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen -mt-20"
    >
      <div className="relative md:w-[250px] w-[270px] md:h-[250px] h-[300px]">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <img 
              src={capturedImage} 
              alt="Skin analysis" 
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
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
                backgroundSize: "12px 15px, 100% 100%",
                backdropFilter: "blur(2px)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 shadow-lg" />
            </div>
          </div>
      </div>

      <div className="md:w-[381px] w-[361px] text-wrap pt-[18px]">
        <h2 className="font-[400] md:text-[28px] text-[24px] text-center">
          Creating Your Personalised <br/> Acne Plan
        </h2>
        <p className="text-[16px] text-custom-text-loader-subText text-center mt-4">
          We combine AI skin analysis, dermatologist-backed science, and your unique acne triggers to build a personalised treatment plan.
        </p>
      </div>
    </div>
  );
};

export default LoaderWithText;
