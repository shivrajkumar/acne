import { Suspense } from "react";
import AcnePrescriptionPage from "@/components/prescription/AcnePrescriptionPage";
import { prescriptionData } from "@/constants/allVayuData";

export default function page() {
  return (
    <>
      <Suspense>
        <AcnePrescriptionPage data={prescriptionData} />
      </Suspense>
    </>
  );
}
