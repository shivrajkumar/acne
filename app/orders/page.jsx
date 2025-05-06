import ThankYouLandingPage from "@/components/thankyou/ThankYouLandingPage";
import LogMoengage from "@/components/generic/LogMoengage";
import { getUtmCookiesInObjectForm } from "@/constants/urls";

export default function page({ params, searchParams }) {



  return (
    <>
      <ThankYouLandingPage params={params} searchParams={searchParams} />
      <LogMoengage event="acne_OrderPlaced" attributes={{ event_source: 'web', ...getUtmCookiesInObjectForm() }} />

      <LogMoengage event="acne_BookCallViewedPostOrder" attributes={{ page_name: "Thank You Page", timestamp: new Date().toISOString() }} />

    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Clear Ritual Book A Call",
  };
}
