import React from "react";

/**
 * LoginButton Component Props:
 * @param {string} type - Button type ("button" | "submit" | "reset"). Default: "button".
 * @param {boolean} disabled - Disables the button if true. Default: false.
 * @param {function} onClick - Click handler function.
 * @param {React.ReactNode} children - Content inside the button.
 * @param {string} variant - Style variant (e.g., "black"). Default: "black".
 * @param {string} size - Size variant (e.g., "defaultSize"). Default: "defaultSize".
 * @param {string} textSize - Text style variant. Default: "defaultText".
 * @param {string} className - Additional class names.
 */


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
    black: "bg-[#141515] hover:bg-Primary/500 hover:text-[#fff]",
  };

  const buttonSizes = {
    defaultSize:
      "md:w-[312px] w-[264px] h-[56px] px-[56px] py-[16px] md:my-[24px] my-[15px]",
  };

  const textStyles = {
    defaultText: "text-[#FFFFFF] text-[14px] font-[500]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex justify-center items-center rounded-full -tracking-[1%] transition-all duration-300 hover:shadow-lg ${buttonVariants[variant]} ${buttonSizes[size]} ${textStyles[textSize]} ${className}`}
    >
      {children}
    </button>
  );
};

export default LoginButton;
