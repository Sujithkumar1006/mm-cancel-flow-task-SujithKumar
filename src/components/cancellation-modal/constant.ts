// defaults.ts
import { JobFoundValue } from "./types";

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