// defaults.ts
import { JobFoundValue, VariantType } from "./shared/types";

export const DEFAULT_JOB_FOUND_VALUE: JobFoundValue = {
  step1: {
    foundThrough: "",
    rolesApplied: "",
    companiesEmailed: "",
    interviews: "",
  },
  step2: {
    feedback: "",
  },
  step3: {
    visaHelp: "",
    visaType: "",
  },
};

export const DEFAULT_STILL_LOOKING = {
  step1: { rolesApplied: "", companiesEmailed: "", interviews: "" },
  step2: { reason: "", additionalReason: "" },
};

export const JOB_FOUND_STEPS = {
  STEP1: 1,
  STEP2: 2,
  STEP3: 3,
  STEP4: 4,
} as const;

// labels / sources
export const FOUND_THROUGH = {
  YES: "Yes",
  NO: "No",
} as const;

export const VISA_HELP = {
  YES: "yes",
  NO: "no",
} as const;

export const REASON_FOR_CANCELLATION = {
  FOUND_JOB: "job_found",
  NOT_FOUND: "no_job_found",
};

export const COMMON_DISCOUNT_AMOUNT = 10;

export const VARIANT_VALUES: Record<"A" | "B", VariantType> = {
  A: "A",
  B: "B",
};

export const FLOW_STEPS = {
  foundJob: 3,
  notFoundA: 2,
  notFoundB: 3,
} as const;
