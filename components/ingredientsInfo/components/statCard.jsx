export default function StatCard({ value, label }) {
  return (
    <div className="bg-yellow-100 text-yellow-900 text-center py-6 px-2 rounded-md">
      <h4 className="text-3xl font-bold">{value}</h4>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
}
