import AcneBookACallPage from "../../components/book-a-call/AcneBookACall";

export default function page({ params, searchParams }) {
  return (
    <>
      <AcneBookACallPage params={params} searchParams={searchParams} />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Clear Ritual Book A Call",
  };
}
