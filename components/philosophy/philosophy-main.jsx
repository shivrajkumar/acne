import Hero from "./sections/Hero";
import InsideOutside from "./sections/InsideOutside";
import Diagnose from "./sections/Diagnose";
import Simplicity from "./sections/Simplicity";
import RealPeople from "./sections/RealPeople";
import FivePillars from "./sections/FivePillars";
import Efficacy from "./sections/efficacy";
import { STRAPI_DEV_URL } from "@/constants/constants";

async function getPhilosophyData() {
  try {
    const res = await fetch(`${STRAPI_DEV_URL}/api/cr-our-plan?populate=deep`, {
      method: "GET",
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch philosophy data: ${res.status}`);
    }

    const data = await res.json();
    return data?.data?.attributes || null;
  } catch (err) {
    console.error("Error fetching philosophy data:", err);
    return null;
  }
}

export default async function Philosophy() {
  const philosophyData = await getPhilosophyData();

  if (!philosophyData) {
    console.warn("Failed to load philosophy data, using fallback content");
  }

  return (
    <main className="w-full">
        <Hero data={philosophyData?.hero_section} />
        <InsideOutside data={philosophyData?.inside_outside_section} />
        <FivePillars data={philosophyData?.five_pillars_section} />
        <Diagnose data={philosophyData?.diagnose_section} />
        <Simplicity data={philosophyData?.simplicity_section} />
        <RealPeople data={philosophyData?.real_people_section} />
        <Efficacy data={philosophyData?.efficacy_section} />
    </main>
  );
}
