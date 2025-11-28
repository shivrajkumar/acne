import ExpertCard from "./experts-card";

export default function ExpertsSection({ data }) {
  return (
    <section className="py-1">
      {data.experts.map((exp, index) => (
        <ExpertCard key={index} expert={exp} />
      ))}
    </section>
  );
}
