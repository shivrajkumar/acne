import Hero from "./sections/Hero";
import TrialAndError from "./sections/TrialAndError";
import HowWeChangeTheGame from "./sections/HowWeChangeTheGame";
import Ayurveda from "./sections/ayurveda";
import Ingredients from "./sections/Ingredients";
import AdvisoryBoard from "./sections/AdvisoryBoard";
import NoteFromTeam from "./sections/NoteFromTeam";
import Efficacy from "./sections/efficacy";

export default function AboutUs() {

  return (
    <main className="w-full">
        <Hero />
        <TrialAndError />
        <HowWeChangeTheGame />
        <Ingredients />
        <Ayurveda />
        <Efficacy />
        <AdvisoryBoard />
        <NoteFromTeam />
    </main>
  );
}
