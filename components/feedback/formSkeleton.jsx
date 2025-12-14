// components/FormSkeleton.jsx (or add inline in ProductForm)

export function FormSkeleton() {
  const SkeletonPulse = ({ className }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
  );

  const RadioOptionSkeleton = () => (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-gray-50">
      <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
      <SkeletonPulse className="h-4 w-24" />
    </div>
  );

  const EmojiRatingSkeleton = () => (
    <div className="flex gap-3 mt-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-14 h-16 rounded-lg bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );

  const QuestionBlockSkeleton = ({ type = "radio", optionCount = 4 }) => (
    <div className="mb-6">
      <SkeletonPulse className="h-5 w-3/4 mb-4" />
      {type === "radio" && (
        <div className="space-y-2">
          {Array.from({ length: optionCount }).map((_, i) => (
            <RadioOptionSkeleton key={i} />
          ))}
        </div>
      )}
      {type === "emoji" && <EmojiRatingSkeleton />}
      {type === "textarea" && <SkeletonPulse className="h-24 w-full" />}
    </div>
  );

  return (
    <>
      <QuestionBlockSkeleton type="radio" optionCount={4} />
      <QuestionBlockSkeleton type="radio" optionCount={2} />
      <QuestionBlockSkeleton type="emoji" />
      <QuestionBlockSkeleton type="radio" optionCount={4} />
      <QuestionBlockSkeleton type="textarea" />
    </>
  );
}
