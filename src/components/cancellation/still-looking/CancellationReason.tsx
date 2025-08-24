"use client";

import { useState } from "react";
import { useCancellationFlowContext } from "../shared/CancellationFlowContext";
import { VARIANT_VALUES, COMMON_DISCOUNT_AMOUNT } from "../constant";

const MIN_CHARS = 25;

const REASONS = [
  {
    id: "TOO_EXPENSIVE",
    label: "Too expensive",
    subQuestion: "What would be the maximum you would be willing to pay?",
    kind: "price" as const,
  },
  {
    id: "PLATFORM_NOT_HELPFUL",
    label: "Platform not helpful",
    subQuestion: "What can we change to make the platform more helpful?",
    kind: "text" as const,
  },
  {
    id: "NOT_ENOUGH_RELEVANT_JOB",
    label: "Not enough relevant jobs",
    subQuestion: "In which way can we make the jobs more relevant?",
    kind: "text" as const,
  },
  {
    id: "DECIDED_NOT_TO_MOVE",
    label: "Decided not to move",
    subQuestion: "What changed for you to decide to not move?",
    kind: "text" as const,
  },
  {
    id: "OTHER",
    label: "Other",
    subQuestion: "What would have helped you the most?",
    kind: "text" as const,
  },
] as const;

export default function CancellationReason() {
  const {
    stillLookingForm,
    updateStill,
    variant,
    monthlyPrice,
    goBack,
    submit,
    setSubSteps,
    decideDownsell,
  } = useCancellationFlowContext();

  const [touched, setTouched] = useState(false);

  const value = stillLookingForm.step2;

  const selected = REASONS.find((r) => r.id === value.reason);

  const priceValid =
    selected?.kind === "price"
      ? (() => {
          const n = Number(value.additionalReason);
          return Number.isFinite(n) && n > 0;
        })()
      : false;

  const textValid =
    selected?.kind === "text"
      ? value.additionalReason.trim().length >= MIN_CHARS
      : false;

  const reasonValid =
    !!selected && (selected.kind === "price" ? priceValid : textValid);

  // Discount details for Variant B CTA
  const currentPrice = monthlyPrice;
  const discounted =
    variant === VARIANT_VALUES.B
      ? Math.max(0, currentPrice - COMMON_DISCOUNT_AMOUNT)
      : currentPrice;

  const discountPercent = Math.round(
    (COMMON_DISCOUNT_AMOUNT / currentPrice) * 100
  );

  const handleComplete = async () => {
    setTouched(true);
    if (!reasonValid) return;
    await submit();
    setSubSteps(4 as any);
  };

  return (
    <div className="flex-[1.25]">
      <button
        onClick={goBack}
        className="mb-2 md:hidden inline-flex items-center text-gray-600 hover:text-gray-900"
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

      <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
        What’s the main reason for cancelling?
      </h2>

      <p className="font-medium text-gray-700 mb-4">
        Please take a minute to let us know why:
      </p>

      {!selected && (
        <ul className="space-y-3">
          {REASONS.map((r) => (
            <li key={r.id}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="cancel-reason"
                  value={r.id}
                  checked={value.reason === r.id}
                  onChange={() => {
                    updateStill("step2", "reason", r.id);
                    updateStill("step2", "additionalReason", "");
                  }}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-gray-500"
                />
                <span className="text-gray-800">{r.label}</span>
              </label>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-800 relative bg-gray-800">
                <span className="absolute inset-1 rounded-full bg-white" />
              </span>
              <span className="text-base text-gray-900 font-medium capitalize ml-1">
                {selected.label}
              </span>
            </div>

            <button
              type="button"
              onClick={() => updateStill("step2", "reason", "")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Change
            </button>
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {selected.subQuestion} <span className="text-gray-500">*</span>
            </label>

            {selected.kind === "price" ? (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  name="expectedPrice"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={value.additionalReason}
                  onChange={(e) =>
                    updateStill("step2", "additionalReason", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 text-sm md:text-base text-gray-500 outline-none focus:ring-2 focus:ring-[#8952fc]"
                />
              </div>
            ) : (
              <div className="relative">
                <div className="text-red-600 mt-2 mb-2">
                  <span className=" whitespace-nowrap">
                    Please enter at least 25 characters so we can understand
                    your feedback <span>*</span>
                  </span>
                </div>

                <textarea
                  rows={6}
                  placeholder="Type your feedback here…"
                  value={value.additionalReason}
                  onChange={(e) =>
                    updateStill("step2", "additionalReason", e.target.value)
                  }
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm md:text-base text-gray-700 outline-none transition duration-200 ease-in-out focus:border-gray-900"
                />
                <div className="pointer-events-none select-none absolute bottom-3 right-3 text-xs text-gray-500 bg-white/80 backdrop-blur rounded px-1">
                  Min {MIN_CHARS} characters (
                  {value.additionalReason?.trim().length}/{MIN_CHARS})
                </div>
              </div>
            )}

            {/* show inline hint if touched and invalid */}
            {touched && !reasonValid && (
              <p className="mt-2 text-xs text-red-600">
                {selected.kind === "price"
                  ? "Please enter a valid amount greater than 0."
                  : `Please enter at least ${MIN_CHARS} characters.`}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-3 m-5 gap-4 pt-5 border-t border-gray-300">
        {variant === VARIANT_VALUES.B && (
          <button
            type="button"
            onClick={() => decideDownsell(true)}
            className="mt-1 w-full rounded-lg bg-green-600 px-4 py-3 text-base font-semibold text-white hover:bg-green-700 transition-colors"
          >
            Get {discountPercent}% off | ${discounted.toFixed(2)}
            <span className="ml-2 line-through text-xs text-white/80">
              ${currentPrice.toFixed(2)}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={handleComplete}
          className={`w-full px-4 py-3 rounded-lg text-base font-semibold ${
            reasonValid
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Complete cancellation
        </button>
      </div>
    </div>
  );
}
