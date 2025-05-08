const LoaderWithText = () => {
  const commonRingClasses = "absolute inset-0 rounded-full border-[1.04px]";

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen -mt-20"
    >
      <div className="relative md:w-[112px] w-[108px] md:h-[112px] h-[108px]">
        {/* Static gray ring */}
        <div
          className={commonRingClasses}
          style={{ borderColor: "#8CC5FA" }}
        ></div>

        {/* Animated black ring */}
        <div
          className={`${commonRingClasses} animate-spin`}
          style={{
            borderColor: "#000000",
            borderTopColor: "#000000",
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
          }}
        ></div>
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
