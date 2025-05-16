import React from "react";

const LoginFooter = ({ textLink1, textLink2 }) => {
  return (
    <>
      <p
        className={`md:text-[14px] text-[12px] text-[#505354] font-[400] leading-[140%] text-center mt-2 transition-all duration-700 delay-700`}
      >
        I accept that I have read & understand{" "}
        <a
          href={textLink1}
          className="underline hover:text-black transition-colors duration-300"
        >
          Privacy & Policy
        </a>{" "}
        &{" "}
        <a
          href={textLink2}
          className="underline hover:text-black transition-colors duration-300"
        >
          T&Cs
        </a>
      </p>
    </>
  );
};

export default LoginFooter;
