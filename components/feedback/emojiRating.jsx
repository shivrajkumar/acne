import { emojis } from "./formConfigs";

export function EmojiRating({ label, name, value, onChange, required }) {
  return (
    <div className="mb-6">
      <p className="text-gray-800 font-medium mb-3 text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex gap-2">
        {emojis.map((emoji, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(name, i + 1)}
            className={`w-11 h-14 text-xl rounded-xl border-2 transition-all flex flex-col items-center justify-center
              ${
                value === i + 1
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
          >
            {emoji}
            <span className="text-xs text-gray-500">{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
