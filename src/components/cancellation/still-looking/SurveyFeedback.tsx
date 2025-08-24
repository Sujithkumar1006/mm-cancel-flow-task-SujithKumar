"use client";

import SurveyStep from "@/components/cancellation-modal/shared/SurveyStep";
import { useCancellationFlowContext } from "../shared/CancellationFlowContext";
import { VARIANT_VALUES, COMMON_DISCOUNT_AMOUNT } from "../constant";
import type { SurveyQuestion, SurveyFeedbackValues } from "../shared/types";

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

export default function SurveyFeedback() {
  const {
    stillLookingForm,
    updateStill,
    setSubSteps,
    goBack,
    variant,
    monthlyPrice,
    decideDownsell,
  } = useCancellationFlowContext();

  const currentPrice = Number(monthlyPrice) || 0;
  const discounted = Math.max(0, currentPrice - COMMON_DISCOUNT_AMOUNT);
  const discountPercent = currentPrice
    ? Math.round((COMMON_DISCOUNT_AMOUNT / currentPrice) * 100)
    : 0;

  return (
    <SurveyStep<SurveyFeedbackValues>
      title="Help us understand how you were using Migrate Mate."
      questions={QUESTIONS}
      value={stillLookingForm.step1}
      onChange={(field, value) => updateStill("step1", field, value)}
      onNext={() => setSubSteps(3 as any)}
      onBack={goBack}
      continueLabel="Continue"
      extraAction={
        variant === VARIANT_VALUES.B ? (
          <button
            type="button"
            onClick={() => decideDownsell(true)}
            className="mt-4 w-full rounded-lg bg-green-600 px-4 py-3 text-base font-semibold text-white hover:bg-green-700 transition-colors"
          >
            Get {discountPercent}% offer | ${discounted.toFixed(2)}{" "}
            <span className="line-through text-xs ml-1">
              ${currentPrice.toFixed(2)}
            </span>
          </button>
        ) : null
      }
    />
  );
}
