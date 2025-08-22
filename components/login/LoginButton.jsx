import React from "react";


const LoginButton = ({
  type = "button",
  disabled = false,
  onClick,
  children,
  variant = "black",
  size = "defaultSize",
  textSize = "defaultText",
  className = "",
}) => {
  const buttonVariants = {
    black: "hover:bg-[#141515] bg-Primary/500 hover:text-[#fff]",
    disabled: "bg-[#141515] text-[#fff] cursor-not-allowed",
  };

  const buttonSizes = {
    defaultSize:
      "w-full h-[56px] px-[56px] py-[16px] md:my-[24px] my-[15px]",
  };

  const textStyles = {
    defaultText: "text-[#FFFFFF] text-[14px] md:text-[16px] font-[500]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={() => { onClick(); }}
      className={`font-sophiaPro flex justify-center items-center rounded-full -tracking-[1%] transition-all duration-300 hover:shadow-lg ${buttonVariants[variant]} ${buttonSizes[size]} ${textStyles[textSize]} ${className}`}
    >
      {children}
    </button>
  );
};

export default LoginButton;
