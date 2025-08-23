"use client";

const QUESTIONS = [
  {
    id: "foundThrough",
    question: "Did you find this job with MigrateMate?",
    mandatory: true,
    options: ["Yes", "No"],
  },
  {
    id: "rolesApplied",
    question: "How many roles did you apply for through Migrate Mate?",
    mandatory: true,
    options: ["0", "1-5", "6-20", "20+"],
  },
  {
    id: "companiesEmailed",
    question: "How many companies did you email directly?",
    mandatory: true,
    options: ["0", "1-5", "6-20", "20+"],
  },
  {
    id: "interviews",
    question: "How many different companies did you interview with?",
    mandatory: true,
    options: ["0", "1-2", "3-5", "5+"],
  },
];

type Step1Props = {
  value: {
    foundThrough: string;
    rolesApplied: string;
    companiesEmailed: string;
    interviews: string;
  };
  onChange: (field: keyof Step1Props["value"], val: string) => void;
  onNext?: () => void;
  onBack?: () => void;
};

export default function Step1({ value, onChange, onNext, onBack }: Step1Props) {
  return (
    <div className="flex-[1.25]">
      <div className="flex mb-2 md:hidden flex-1 md:justify-start">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Go back"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        )}
      </div>
      <>
        <h2 className="text-2xl leading-8 md:text-4xl mb-4 md:leading-[44px] text-gray-800 font-semibold">
          Congrats on the new role! 🎉
        </h2>
        <ul className="mt-4 space-y-6 md:space-y-8">
          {QUESTIONS.map((q) => (
            <li key={q.id} className="pb-6 md:pb-2">
              <p className="md:text-base text-gray-700">
                {q.question}
                {q.mandatory && <span className="ml-1">*</span>}
              </p>
              <div
                className="mt-3 grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${q.options.length}, minmax(0, 1fr))`,
                }}
                role="radiogroup"
                aria-labelledby={`q-${q.id}`}
              >
                {q.options.map((opt) => {
                  const inputId = `q-${q.id}-${opt}`;
                  return (
                    <label
                      key={inputId}
                      htmlFor={inputId}
                      className="group relative inline-flex items-center justify-center cursor-pointer"
                    >
                      <input
                        id={inputId}
                        name={q.id}
                        type="radio"
                        value={opt}
                        checked={
                          value[q.id as keyof Step1Props["value"]] === opt
                        }
                        onChange={() =>
                          onChange(q.id as keyof Step1Props["value"], opt)
                        }
                        className="peer sr-only"
                        required={q.mandatory}
                      />
                      <span className=" w-full text-center rounded-md px-3 py-2 text-sm md:text-base font-medium border border-gray-300 bg-gray-100 text-gray-700 transition-colors group-hover:bg-gray-200 peer-checked:bg-[#8952fc] peer-checked:text-white peer-checked:border-[#8952fc]">
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-col space-y-3 md:m-5 gap-4 pt-5 border-t border-gray-300">
          <button
            onClick={onNext}
            className="w-full px-2 py-3 bg-red-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500"
            type="button"
            disabled={
              !value.foundThrough ||
              !value.rolesApplied ||
              !value.companiesEmailed ||
              !value.interviews
            }
          >
            Continue
          </button>
        </div>
      </>
    </div>
  );
}
