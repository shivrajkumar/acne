export function RadioGroup({ label, name, options, value, onChange, required }) {
  return (
    <div className="mb-6">
      <p className="text-gray-800 font-medium mb-3 text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              checked={value === opt.value}
              onChange={() => onChange(name, opt.value)}
              className="w-4 h-4 text-teal-600"
            />
            <span className="text-gray-700 text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
