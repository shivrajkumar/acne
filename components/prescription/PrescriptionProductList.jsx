import { Divider } from "antd";
import PrescriptionDoctorSignature from "./PrescriptionDoctorSignature";

const PrescriptionProductList = ({
    prescriptionInfo,
    doctorInfo,
    isLocked,
    parseDosageToTimes = () => { }
}) => {
    // Only render if there are products in the list
    if (!Array.isArray(prescriptionInfo) || prescriptionInfo.length === 0) {
        return null;
    }

    return (
        <div className="p-[16px]">
            <div className="flex items-center">
                <h2 className="text-[18px] text-text-icon/body font-[400] leading-[135%]">
                    MEDICINE
                </h2>
            </div>

            <div className="overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-2 font-medium text-sm">
                    <div className="p-2 text-text-icon/subtitle leading-[20px] font-[400]">
                        Name
                    </div>
                    <div className="p-2 ps-4 text-text-icon/subtitle leading-[20px] font-[400]">
                        Instructions
                    </div>
                </div>

                {/* Medicines */}
                {prescriptionInfo?.map((medicine, index) => (
                    <div
                        key={medicine?.id}
                        className="grid grid-cols-2 bg-surface/disabled-state mb-2 rounded-[8px]"
                    >
                        <div className="p-4 flex gap-[8px] text-text-icon/title text-[14px] font-[400] leading-[140%]">
                            <p className="font-[400]">{index + 1}</p>
                            <div className="flex flex-col">
                                <p className="font-[500]">{medicine?.productName}</p>
                                <p className="text-text-icon/body text-[12px] font-[400] leading-[140%]">
                                    {medicine?.size}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 text-text-icon/body text-[12px] leading-[150%] font-[400] flex flex-col gap-[8px]">
                            <p>{medicine?.description}</p>
                            <p>
                                {medicine?.category?.toLowerCase() === "ayurveda"
                                    ? <span>Dosage: {medicine?.comment || medicine?.info}</span>
                                    : parseDosageToTimes(medicine?.dosage)
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Doctor Signatures */}
            <PrescriptionDoctorSignature
                doctorInfo={doctorInfo}
                isLocked={isLocked}
            />

            <Divider className="p-0 m-0" />
        </div>
    );
}

export default PrescriptionProductList;