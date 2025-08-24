"use client";

import SurveyStep from "@/components/cancellation-modal/shared/SurveyStep";
import { VARIANT_VALUES } from "../constant";
import {
  SurveyQuestion,
  SurveyFeedbackProps,
  SurveyFeedbackValues,
} from "../shared/types";

const QUESTIONS: SurveyQuestion[] = [
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

export default function SurveyFeedback({
  value,
  onChange,
  onNext,
  onBack,
  extraAction,
  variant,
}: SurveyFeedbackProps) {
  return (
    <SurveyStep<SurveyFeedbackValues>
      title="Help us understand how you were using Migrate Mate."
      questions={QUESTIONS}
      value={value}
      onChange={onChange}
      onNext={onNext}
      onBack={onBack}
      continueLabel="Continue"
      extraAction={
        variant === VARIANT_VALUES.B ? (
          <button
            type="button"
            onClick={extraAction.action}
            className="mt-4 w-full rounded-lg bg-green-600 px-4 py-3 text-base font-semibold text-white hover:bg-green-700 transition-colors"
          >
            Get {extraAction.discountPercent} % offer | ${" "}
            {extraAction.discounted}{" "}
            <span className="line-through text-xs">
              {extraAction.currentPrice}
            </span>
          </button>
        ) : null
      }
    />
  );
}
