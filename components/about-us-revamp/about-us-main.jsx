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
    const res = await fetch(`${STRAPI_DEV_URL}/api/cr-about-us`, {
      method: "GET",
      next: { revalidate: 300 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch about us data: ${res.status}`);
    }

    const data = await res.json();
    return data || null;
  } catch (err) {
    console.error("Error fetching about us data:", err);
    return null;
  }
}

export default async function AboutUs() {
  const aboutUsData = await getAboutUsData();
  if (!aboutUsData) {
    console.warn("Failed to load about us data, using fallback content");
  }

  return (
    <main className="w-full">
        <Hero data={aboutUsData?.data?.hero_section} />
        <TrialAndError data={aboutUsData?.data?.trial_and_error_section} />
        <HowWeChangeTheGame data={aboutUsData?.data?.how_we_change_section} />
        <Ingredients data={aboutUsData?.data?.ingredients_section} />
        <Ayurveda data={aboutUsData?.data?.ayurveda_dermatology_section} />
        <Efficacy data={aboutUsData?.data?.bannerWithText} />
        <AdvisoryBoard data={aboutUsData?.data?.advisory_board_section} />
        <NoteFromTeam data={aboutUsData?.data?.team_note_section} />
    </main>
  );
}
