import Image from "next/image";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";

const AssignedDoctor = ({
  showAssignedDoctorLabel = false,
  isSmall = false,
  enableFees = false,
  enableOptIn = false,
  isDrawer = false,
  doctorData
}) => {
  const cartContext = useCartContext();
  const doctorDetails = cartContext?.doctorDetails;
  // Use doctorData if provided, otherwise fall back to doctorDetails from context
  const doctor = doctorData || doctorDetails;

  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      {enableFees && (doctor?.fees || doctor?.h1Ttext) && !isDrawer && (
        <p className="flex md:hidden bg-Accent h-[28px] font-sophiaPro py-[4px] px-[16px] w-full text-center mb-[16px] uppercase text-[14px] text-Semantic/Success rounded-[8px] justify-center">
          {doctor?.fees ?? doctor?.h1Ttext}
        </p>
      )}
      <div className={`${isSmall ? "max-w-[400px]" : "max-w-full"} ${isSmall ? "md:w-[400px]" : "md:w-full"} sm:w-full bg-Background/Beige border border-[#AFA792] p-[16px] flex flex-col gap-[8px] rounded-[16px]`}>
        {showAssignedDoctorLabel && (
          <p className="font-sophiaPro font-[500] text-[14px] text-Text/Heading-Text leading-[1.4] ">
            Assigned doctor
          </p>
        )}
        <div className="flex flex-col md:flex-row gap-[8px] md:gap-[16px]">
          <div className="flex gap-[8px] md:gap-[16px]">
            <Image
              src={doctor?.image ?? doctor?.profileImage}
              alt={doctor?.name ?? doctor?.doctorName}
              width={isSmall ? 80 : 104}
              height={isSmall ? 80 : 105}
              className={`rounded-[12px] object-contain ${isSmall ? "w-[80px] h-[80px]" : "w-[105px] h-[105px]"}`}
            />
            <div className="flex flex-col gap-[4px] flex-grow">
              <p className="font-sophiaPro font-[600] text-[16px] -tracking-[1%]">{doctor?.name ?? doctor?.doctorName}</p>
              <p className="font-sophiaPro text-[12px] md:text-[14px] font-[400]">{doctor?.education ?? doctor?.specialization}</p>
              <p className="font-sophiaPro text-[12px] md:text-[14px] font-[400]">{doctor?.experience}</p>
              {enableFees && (doctor?.fees || doctor?.h1Ttext) && (
                <p className="hidden md:flex bg-Accent font-sophiaPro py-[4px] px-[16px] w-fit uppercase text-[14px] text-Semantic/Success rounded-[8px] mt-[16px]">
                  {doctor?.fees ?? doctor?.h1Ttext}
                </p>
              )}
              {/* {enableOptIn && (
                <div className={`flex md:hidden  md:ms-0 md:justify-start md:flex-col`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] md:text-[14px]font-sophiaPro font-[400] text-gray-700">Opt-In</span>
                    <button
                      onClick={toggleSwitch}
                      className="relative items-center cursor-pointer focus:outline-none"
                      aria-pressed={isOn}
                      role="switch"
                    >
                      <div
                        className={`w-[52px] h-[32px] rounded-full transition-colors duration-300 ease-in-out ${isOn ? "bg-[#19785D]" : "bg-gray-300"
                          }`}
                      >
                        <div
                          className={`absolute w-[24px] h-[24px] top-[4px] bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${isOn ? "translate-x-[24px]" : "translate-x-[4px]"
                            }`}
                        />
                      </div>
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
          {/* {enableOptIn && (
            <div className={`hidden md:flex ${isSmall ? "ms-[90px]" : "ms-[138px]"} md:ms-0 md:justify-start md:flex-col`}>
              <div className="flex items-center gap-2">
                <span className="text-[14px] md:text-[14px]font-sophiaPro font-[400] text-gray-700">Opt-In</span>
                <button
                  onClick={toggleSwitch}
                  className="relative items-center cursor-pointer focus:outline-none"
                  aria-pressed={isOn}
                  role="switch"
                >
                  <div
                    className={`w-[52px] h-[32px] rounded-full transition-colors duration-300 ease-in-out ${isOn ? "bg-[#19785D]" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`absolute w-[24px] h-[24px] top-[4px] bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${isOn ? "translate-x-[24px]" : "translate-x-[4px]"
                        }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
      {isDrawer && (doctor?.fees || doctor?.h1Ttext) && (
        <p className="flex md:hidden bg-Accent h-[28px] mt-3 font-sophiaPro py-[4px] px-[16px] w-full text-center mb-[16px] uppercase text-[14px] text-Semantic/Success rounded-[8px] justify-center">
          {doctor?.fees ?? doctor?.h1Ttext}
        </p>
      )}
    </>
  );
};

export default AssignedDoctor;
