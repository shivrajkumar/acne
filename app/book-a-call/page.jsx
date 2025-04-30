import ThankYouLandingPage from "@/components/thankyou/ThankYouLandingPage";

export default function page({ params, searchParams }) {
  return (
    <>
      <ThankYouLandingPage params={params} searchParams={searchParams} bookACallOnly={true}/>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Clear Ritual Book A Call",
  };
}