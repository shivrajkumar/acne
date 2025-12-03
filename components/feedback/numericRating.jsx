export function NumericRating({
  label,
  name,
  value,
  onChange,
  required,
  labels = ["Bad", "Average", "Good", "Excellent"],
}) {
  return (
    <div className="mb-6">
      <p className="text-gray-800 font-medium mb-3 text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(name, num)}
            className={`flex-1 py-2 px-2 rounded-lg border-2 transition-all
              ${
                value === num
                  ? "border-teal-500 bg-teal-500 text-white"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
          >
            <span className="block font-medium text-sm">{num}</span>
            <span className="block text-xs opacity-80">{labels[num - 1]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
