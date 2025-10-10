import React, { useMemo } from "react";
import { Progress } from "antd";
import { startCase } from "lodash";
import { useCartContext } from "../../context/CartContext";
import ResultInfoPopover from "./ResultInfoModal";

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
  const { customerDetails, skinType, acneGrading } =
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
          <h1 className="text-[24px] md:text-[40px] font-sophiaPro font-light text-Grey/900 leading-[1.3] md:w-[600px] w-full">
            You have <span className="font-semibold">{acneGrading} acne</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ResultBannerV2;
