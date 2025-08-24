"use client";

import SurveyStep from "@/components/cancellation-modal/shared/SurveyStep";
import {
  JobFoundStep1,
  SurveyEmploymentProps,
  SurveyQuestion,
} from "../shared/types";

const QUESTIONS: SurveyQuestion[] = [
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

export default function SurveyEmployment({
  value,
  onChange,
  onNext,
  onBack,
}: SurveyEmploymentProps) {
  return (
    <SurveyStep<JobFoundStep1>
      title="Congrats on the new role! 🎉"
      questions={QUESTIONS}
      value={value}
      onChange={onChange}
      onNext={onNext}
      onBack={onBack}
      continueLabel="Continue"
      normalizeOption={(label) =>
        label === "Yes" || label === "No" ? label.toLowerCase() : label
      }
    />
  );
}
