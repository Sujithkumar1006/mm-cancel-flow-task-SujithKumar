"use client";

import { useCancellationFlowContext } from "../shared/CancellationFlowContext";

const MIN_CHARS = 25;

export default function Feedback() {
  const { jobFoundValue, updateJobFound, setSubSteps, goBack } =
    useCancellationFlowContext();

  const feedback = jobFoundValue.step2?.feedback ?? "";
  const isValid = feedback.trim().length >= MIN_CHARS;

  return (
    <div className="flex-[1.25]">
      <div className="flex mb-2 md:hidden flex-1 md:justify-start">
        <button
          onClick={goBack}
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
      </div>

      <h2 className="text-2xl leading-8 md:text-4xl md:leading-[44px] font-semibold text-gray-800">
        What’s one thing you wish we could’ve helped you with?
      </h2>

      <p className="mt-3 text-sm md:text-base text-gray-800">
        We’re always looking to improve, your thoughts can help us make Migrate
        Mate more useful for others.
        <span>*</span>
      </p>

      <div className="mt-4">
        <div className="bg-white overflow-hidden relative">
          <textarea
            name="feedback-text"
            value={feedback}
            onChange={(e) =>
              updateJobFound("step2", "feedback", e.target.value)
            }
            rows={6}
            placeholder="Type your feedback here…"
            className="w-full resize-none rounded-lg text-gray-500 border border-gray-300 bg-white px-4 py-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            aria-label="Feedback"
            aria-required="true"
          />
          <div className="pointer-events-none select-none absolute bottom-3 right-3 text-xs text-gray-500 bg-white/80 backdrop-blur rounded px-1">
            Min {MIN_CHARS} characters ({feedback.trim().length}/{MIN_CHARS})
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3 m-5 gap-4 pt-5 border-t border-gray-300">
        <button
          className="w-full px-2 py-3 rounded-lg text-base font-semibold transition-colors disabled:bg-gray-200 disabled:text-gray-500 bg-red-600 text-white"
          type="button"
          disabled={!isValid}
          onClick={() => setSubSteps(3)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
