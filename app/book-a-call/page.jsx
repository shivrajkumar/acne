import LogMoengage from "@/components/generic/LogMoengage";
import ThankYouLandingPage from "@/components/thankyou/ThankYouLandingPage";

export default function page({ params, searchParams }) {
  return (
    <>
      <ThankYouLandingPage params={params} searchParams={searchParams} bookACallOnly={true} />
      <LogMoengage event="acne_BookCallModalViewedNoOrder" attributes={{ page_name: "Result Page", timestamp: new Date().toISOString() }} />

    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Clear Ritual Book A Call",
  };
}