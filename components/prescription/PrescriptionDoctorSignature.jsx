import { CDN_BASE_URL } from "@/constants/constants";

const PrescriptionDoctorSignature = ({ doctorInfo, isLocked = false }) => {
    return (
        <div className={` flex justify-between py-[16px] px-[16px] ${isLocked ? "blur-sm" : ""}`}>
            <div className="col-span-1">
                <div className=" w-full mb-1 ">
                    <img
                        src={`${CDN_BASE_URL}${doctorInfo?.doctorSignature}`}
                        alt="Doctor Signature "
                        height={140}
                        width={258}
                        className="w-[158px] h-[40px] object-contain mb-[8px]"
                    />
                    <div>
                        <p className="text-text-icon/title text-[14px] leading-[140%] font-[400]">
                            {doctorInfo?.firstName}{" "}
                            {doctorInfo?.lastName}
                        </p>
                        <p className="text-[12px] text-text-icon/label-tertiary leading-[150%] font-[400] mt-[2px]">
                            {doctorInfo?.qualifications?.join(", ")}
                        </p>
                        <p className="text-[12px] text-text-icon/label-tertiary leading-[150%] font-[400] mt-[2px]">
                            {doctorInfo?.registrationText ? doctorInfo?.registrationText : "Reg No.-"}
                        </p>
                        <p className="text-[12px] text-text-icon/label-tertiary leading-[150%] font-[400] mt-[2px]p">

                            {doctorInfo?.registrationNumber}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrescriptionDoctorSignature;