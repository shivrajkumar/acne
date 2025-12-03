export function SubmitButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-4 bg-indigo-900 text-white font-semibold rounded-full hover:bg-indigo-800 transition-colors"
    >
      Submit
    </button>
  );
}
