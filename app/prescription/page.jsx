import AcnePrescriptionPage from "@/components/prescription/AcnePrescriptionPage";
import { Suspense } from "react";

export default function page({ searchParams }) {
  return (
    <>
      <Suspense>
        <AcnePrescriptionPage searchParams={searchParams} />
      </Suspense>
    </>
  );
}