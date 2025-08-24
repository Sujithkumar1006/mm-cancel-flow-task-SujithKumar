"use client";
import { useState } from "react";
import { CancellationReasonProps } from "../shared/types";
import { VARIANT_VALUES } from "../constant";

const MIN_CHARS = 25;

const REASONS = [
  {
    id: "too_expensive",
    label: "Too expensive",
    subQuestion: "What would be the maximum you would be willing to pay?",
    kind: "price" as const,
  },
  {
    id: "not_helpful",
    label: "Platform not helpful",
    subQuestion: "What can we change to make the platform more helpful?",
    kind: "text" as const,
  },
  {
    id: "not_relevant",
    label: "Not enough relevant jobs",
    subQuestion: "In which way can we make the jobs more relevant?",
    kind: "text" as const,
  },
  {
    id: "not_to_move",
    label: "Decided not to move",
    subQuestion: "What changed for you to decide to not move?",
    kind: "text" as const,
  },
  {
    id: "other",
    label: "Other",
    subQuestion: "What would have helped you the most?",
    kind: "text" as const,
  },
] as const;

export default function CancellationReason({
  value,
  onChange,
  onNext,
  onBack,
  extraAction,
  variant,
}: CancellationReasonProps) {
  const [touched, setTouched] = useState(false);

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

  return (
    <div className="flex-[1.25]">
      {onBack && (
        <button
          onClick={onBack}
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
      )}

      <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
        What’s the main reason for cancelling?
      </h2>

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
                    onChange("reason", r.id);
                    onChange("additionalReason", "");
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
              <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-600 relative">
                <span className="absolute inset-1 rounded-full bg-gray-600" />
              </span>
              <span className="text-base text-gray-900 font-medium capitalize ml-1">
                {selected.label}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onChange("reason", "")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Change
            </button>
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {selected.subQuestion} <span className="text-red-500">*</span>
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
                  onChange={(e) => onChange("additionalReason", e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 text-sm md:text-base text-gray-500 outline-none focus:ring-2 focus:ring-[#8952fc]"
                />
              </div>
            ) : (
              <div className="relative">
                <textarea
                  rows={6}
                  placeholder="Type your feedback here…"
                  value={value.additionalReason}
                  onChange={(e) => onChange("additionalReason", e.target.value)}
                  className="w-full text-gray-500 resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-gray-500"
                />
                <div className="pointer-events-none absolute bottom-2 right-3 text-xs text-gray-500 bg-white/80 rounded px-1">
                  {value.additionalReason.trim().length}/{MIN_CHARS}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-3 m-5 gap-4 pt-5 border-t border-gray-300">
        {variant === VARIANT_VALUES.B && (
          <button
            type="button"
            onClick={extraAction.action}
            className="mt-1 w-full rounded-lg bg-green-600 px-4 py-3 text-base font-semibold text-white hover:bg-green-700 transition-colors"
          >
            Get {extraAction.discountPercent}% off | $
            {extraAction.discounted.toFixed(2)}
            <span className="ml-2 line-through text-xs text-white/80">
              ${extraAction.currentPrice.toFixed(2)}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setTouched(true);
            if (reasonValid) onNext();
          }}
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
