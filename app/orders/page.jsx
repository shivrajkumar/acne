import ThankYouLandingPage from "@/components/thankyou/ThankYouLandingPage";

export default function page({ params, searchParams }) {
  return (
    <>
      <ThankYouLandingPage params={params} searchParams={searchParams} />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Vayu Book A Call",
  };
}
