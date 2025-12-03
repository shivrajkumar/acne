import Hero from "./sections/Hero";
import TrialAndError from "./sections/TrialAndError";
import HowWeChangeTheGame from "./sections/HowWeChangeTheGame";
import Ayurveda from "./sections/ayurveda";
import Ingredients from "./sections/Ingredients";
import AdvisoryBoard from "./sections/AdvisoryBoard";
import NoteFromTeam from "./sections/NoteFromTeam";
import Efficacy from "./sections/efficacy";
import { STRAPI_DEV_URL } from "@/constants/constants";

async function getAboutUsData() {
  try {
    const res = await fetch(`${STRAPI_DEV_URL}/api/cr-about-us?populate=deep`, {
      method: "GET",
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch about us data: ${res.status}`);
    }

    const data = await res.json();
    return data?.data?.attributes || null;
  } catch (err) {
    console.error("Error fetching about us data:", err);
    return null;
  }
}

export default async function AboutUs() {
  const aboutUsData = await getAboutUsData();
  console.log('riya', aboutUsData)
  if (!aboutUsData) {
    console.warn("Failed to load about us data, using fallback content");
  }

  return (
    <main className="w-full">
        <Hero data={aboutUsData?.hero_section} />
        <TrialAndError data={aboutUsData?.trial_and_error_section} />
        <HowWeChangeTheGame data={aboutUsData?.how_we_change_section} />
        <Ingredients data={aboutUsData?.ingredients_section} />
        <Ayurveda data={aboutUsData?.ayurveda_section} />
        <Efficacy data={aboutUsData?.efficacy_section} />
        <AdvisoryBoard data={aboutUsData?.advisory_board_section} />
        <NoteFromTeam data={aboutUsData?.note_from_team_section} />
    </main>
  );
}
