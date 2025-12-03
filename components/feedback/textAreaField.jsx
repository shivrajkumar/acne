export function TextAreaField({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <p className="text-gray-800 font-medium mb-3 text-sm">{label}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder="Type here..."
        rows={3}
        className="w-full p-3 border border-gray-200 rounded-xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
}
