export interface CancelSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    subscriptionEndDate?: string;
  }
  
  export enum FormSteps {
    FOUND_JOB = 0,
    NOT_FOUND = 1,
    NO_SELECTION = -1,
  }

  export type SubSteps = 1 | 2 | 3 | 4;

export type FoundThrough = "" | "yes" | "no";
export type Range4 = "" | "0" | "1-5" | "6-20" | "20+";
export type RangeInterview = "" | "0" | "1-2" | "3-5" | "5+";

export type JobFoundStep1 = {
  foundThrough: FoundThrough;
  rolesApplied: Range4;
  companiesEmailed: Range4;
  interviews: RangeInterview;
};

export type JobFoundStep2 = {
  feedback: string;
};

export type JobFoundStep3 = {
  visaHelp: "" | "yes" | "no";
  visaType: string;
};

export type JobFoundValue = {
  step1: JobFoundStep1;
  step2: JobFoundStep2;
  step3: JobFoundStep3;
};