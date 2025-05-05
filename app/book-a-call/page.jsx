import LogMoengage from "@/components/generic/LogMoengage";
import AcneBookACallPage from "../../components/book-a-call/AcneBookACall";

export default function page({ params, searchParams }) {
  return (
    <>
      <AcneBookACallPage params={params} searchParams={searchParams}  />
      <LogMoengage event="acne_BookCallModalViewedNoOrder" attributes={{ page_name: "Result Page", timestamp: new Date().toISOString() }} />

    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Clear Ritual Book A Call",
  };
}
