export function SubmitButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-4 bg-Primary/500 text-white font-semibold rounded-full"
    >
      Submit
    </button>
  );
}
