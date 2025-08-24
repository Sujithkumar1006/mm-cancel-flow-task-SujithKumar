"use client";

import React from "react";
import { SurveyStepProps } from "./types";

export default function SurveyStep<TValues extends Record<string, string>>({
  title,
  subtitle,
  questions,
  value,
  onChange,
  onNext,
  onBack,
  continueLabel = "Continue",
  extraAction,
  normalizeOption = (s) => s.toLowerCase(),
}: SurveyStepProps<TValues>) {
  const continueDisabled = questions.some((q) => {
    if (!q.mandatory) return false;
    const v = value[q.id as keyof TValues];
    return !v || String(v).length === 0;
  });

  return (
    <div className="flex-[1.25]">
      {/* Mobile back */}
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

      <h2 className="text-2xl leading-8 md:text-4xl mb-2 md:leading-[44px] text-gray-800 font-semibold">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-gray-700">{subtitle}</p>
      )}

      <ul className="mt-4 space-y-6 md:space-y-8">
        {questions.map((q) => (
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
                const normalized = normalizeOption(opt);
                const checked =
                  (value[q.id as keyof TValues] as string | undefined) ===
                  normalized;

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
                      value={normalized}
                      checked={checked}
                      onChange={() =>
                        onChange(
                          q.id as keyof TValues,
                          normalized as TValues[keyof TValues]
                        )
                      }
                      className="peer sr-only"
                      required={q.mandatory}
                    />
                    <span
                      className={[
                        "w-full text-center rounded-md px-3 py-2 text-sm md:text-base font-medium",
                        "border transition-colors",
                        checked
                          ? "bg-[#8952fc] text-white border-[#8952fc]"
                          : "border-gray-300 bg-gray-200 text-gray-700 hover:bg-gray-300",
                      ].join(" ")}
                    >
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
        {extraAction}
        <button
          onClick={onNext}
          type="button"
          disabled={continueDisabled}
          className="w-full px-2 py-3 bg-red-600 text-white rounded-lg font-semibold text-base disabled:bg-gray-300 disabled:text-gray-500"
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
}
