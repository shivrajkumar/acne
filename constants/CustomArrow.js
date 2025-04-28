import leftArrow from "@assets/images/arrow-left.png";
import rightArrow from "@assets/images/arrow-right.png";
import leftArrowReview from "@assets/icons/review-arrow-left.png";
import rightArrowReview from "@assets/icons/review-arrow-right.png";
import Image from "next/image";

export const CustomRightArrow = ({
  onClick,
  reviewPage = false,
  className = "",
}) => {
  return (
    <div
      className={`absolute  -translate-y-1/2 z-10 bg-white md:w-[50px] rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition-all duration-300 ${className}`}
      onClick={onClick}
      style={{
        height: "50px",
        width: "50px",
        top: reviewPage ? "235px" : "50%",
        right: reviewPage ? "10px" : "0px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image
        src={reviewPage ? rightArrowReview : rightArrow}
        alt="Next"
        className="w-6 h-6 object-contain"
      />
    </div>
  );
};

export const CustomLeftArrow = ({
  onClick,
  reviewPage = false,
  className = "",
}) => {
  return (
    <div
      className={`absolute -translate-y-1/2 z-10 h-12 bg-white md:w-[50px] rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition-all duration-300 ${className}`}
      onClick={onClick}
      style={{
        height: "50px",
        width: "50px",
        top: reviewPage ? "235px" : "50%",
        left: reviewPage ? "10px" : "48px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image
        src={reviewPage ? leftArrowReview : leftArrow}
        alt="Previous"
        className="w-6 h-6 object-contain"
      />
    </div>
  );
};
