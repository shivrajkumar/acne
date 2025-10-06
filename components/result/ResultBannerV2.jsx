import React, { useMemo } from "react";
import { Progress } from "antd";
import { startCase } from "lodash";
import RootCausesV2 from "./RootCausesV2";
import { useCartContext } from "../../context/CartContext";
import ResultInfoPopover from "./ResultInfoModal";
import Image from "next/image";

const progressMapping = {
  // Acne Levels
  mild: 25,
  moderate: 50,
  severe: 90,

  // Skin Types
  dry: 22,
  normal: 50,
  oily: 90,
  combination: 80,
};

const ResultBannerV2 = () => {
  const { customerDetails, skinType, acneGrading, doctorDetails } =
    useCartContext();

  const acneProgress = useMemo(() => {
    const condition = acneGrading?.split(" ")[2]?.toLowerCase().trim();
    return progressMapping[condition] || 0;
  }, [acneGrading]);

  const skinTypeProgress = useMemo(() => {
    const condition = skinType?.split("+")[0]?.toLowerCase().trim();
    return progressMapping[condition] || 0;
  }, [skinType]);

  const customerName = useMemo(
    () =>
      customerDetails?.firstName ? startCase(customerDetails.firstName) : "",
    [customerDetails]
  );
  const formattedSkinType = skinType?.split("+");
  const formattedAcneGrading = acneGrading?.split(" ");

  return (
    <div className="w-full overflow-hidden bg-Secondary/50  rounded-[1px] md:rounded-[12px] mt-[16px] sm:mt-[16px] md:mt-[32px] flex flex-col md:flex-row justify-between gap-[40px] md:gap-[120px]">
      <div className="w-full flex flex-col gap-[16px] md:gap-[40px]">
        <div>
          <h1 className="text-[24px] md:text-[40px] font-sophiaPro font-light text-Grey/900 leading-[1.3] md:w-[600px] w-[260px] break-words">
            Hi, {customerName}
          </h1>
          <h1 className="text-[24px] md:text-[40px] font-sophiaPro font-light text-Grey/900 leading-[1.3] md:w-[600px] w-[260px] break-words">
            You have <span className="font-semibold">{acneGrading}</span>
          </h1>
        </div>

        {/* <div className="flex flex-col gap-[40px] md:gap-[57px] mt-[24px] md:mt-[60px]">
                    <div className="flex flex-col">
                        <p className="text-Text/Body-Text text-[14px] md:text-[16px] sm:text-[14px] font-[400] leading-[1.5]">
                            Acne Level
                        </p>
                        <div className="relative w-full">
                            <Progress
                                percent={acneProgress}
                                strokeColor={{
                                    '0%': '#098215',
                                    '50%': '#F7F753',
                                    '100%': '#F01800'
                                }}
                                trailColor="#E9EDED"
                                showInfo={false}
                                className="absolute top-0 left-0 w-full"
                            />
                            <div
                                className="absolute h-[20px] border-l-[1px] border-[#505354]"
                                style={{
                                    left: `${acneProgress}%`,
                                    transform: 'translateX(-50%) translateY(-50%)',
                                    top: '50%'
                                }}
                            ></div>
                            <div className={`relative ${acneProgress > 70 && window?.screen?.width < 700 ? "max-w-[85%]" : "max-w-[100%]"}`}>
                                <p
                                    className="absolute text-Text/Body-Text text-[12px] font-[400] bg-Warning/300 py-[2px] px-[4px] leading-[1.5]"
                                    style={{
                                        left: `${acneProgress + 1}%`,
                                        transform: 'translateX(0%) translateY(-100%)'
                                    }}
                                >
                                    {acneGrading ? startCase(formattedAcneGrading[2]) : ""}
                                </p>
                            </div>
                            <div className='relative flex items-center justify-end w-full h-[20px] translate-y-[-100%] cursor-pointer'>
                                <ResultInfoPopover content={formattedAcneGrading[2]} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-[12px]">
                        <p className="text-Text/Body-Text text-[14px] md:text-[16px] sm:text-[14px] font-[400]">
                            Skin Type
                        </p>
                        <div className="relative w-full">
                            <Progress
                                percent={skinTypeProgress}
                                strokeColor={{
                                    '0%': '#476EEF',
                                    '50%': '#F7F753',
                                    '100%': '#F01800'
                                }}
                                trailColor="#E9EDED"
                                showInfo={false}
                                className="absolute top-0 left-0 w-full"
                            />
                            <div
                                className="absolute h-[20px] border-l-[1px] border-[#505354]"
                                style={{
                                    left: `${skinTypeProgress}%`,
                                    transform: 'translateX(-50%)',
                                }}
                            ></div>
                            <div className={`relative ${skinTypeProgress > 70 && window?.screen?.width < 700 ? "max-w-[80%]" : "max-w-[100%]"} flex flex-col items-start`}>
                                {formattedSkinType?.length > 1 && <p
                                    className={`absolute text-Text/Body-Text text-[12px] font-[400] bg-Warning/300 py-[2px] px-[4px] leading-[1.5] w-fit flex flex-nowrap whitespace-nowrap`}
                                    style={{
                                        left: `${skinTypeProgress + 1}%`,
                                        transform: `translateX(0%) translateY(-190%)`
                                    }}
                                >
                                    {formattedSkinType ? `+ ${startCase(formattedSkinType[1])}` : ""}
                                </p>}
                                <p
                                    className="absolute text-Text/Body-Text text-[12px] font-[400] bg-Warning/300 py-[2px] px-[4px] leading-[1.5] w-fit"
                                    style={{
                                        left: `${skinTypeProgress + 1}%`,
                                        transform: `translateX(0%) translateY(-70%)`,
                                    }}
                                >
                                    {formattedSkinType ? startCase(formattedSkinType[0]) : ""}
                                </p>
                            </div>
                            <div className='relative flex items-center justify-end w-full h-[20px] translate-y-[-100%] cursor-pointer'>
                                <ResultInfoPopover content={"Skin Type"} />
                            </div>
                        </div>
                    </div>
                </div> */}
        <div className="flex-1">
          <div className="w-full rounded-xl bg-[#F7FBF2] shadow-sm">
            {/* Header */}
            <div className="inline-block rounded-r-lg bg-[#608C59] px-4 py-2 text-[14px] font-semibold uppercase tracking-wide text-white md:text-sm">
              Your Assigned Doctor
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 flex-row md:items-center p-4 md:p-6">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <Image
                  src={doctorDetails?.image}
                  alt={doctorDetails?.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-lg object-cover"
                />
              </div>

              {/* Doctor Details */}
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {doctorDetails?.name}
                </p>
                <p className="text-sm text-gray-700">
                  {doctorDetails?.education} | {doctorDetails?.experience}
                </p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ResultBannerV2;
