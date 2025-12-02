import Hero from "./sections/Hero";
import InsideOutside from "./sections/InsideOutside";
import Diagnose from "./sections/Diagnose";
import Simplicity from "./sections/Simplicity";
import RealPeople from "./sections/RealPeople";
import FivePillars from "./sections/FivePillars";
import Efficacy from "./sections/efficacy";

export default function Philosophy() {

  return (
    <main className="w-full">
        <Hero />
        <InsideOutside />
        <FivePillars />
        <Diagnose />
        <Simplicity />
        <RealPeople />
        <Efficacy />
    </main>
  );
}
