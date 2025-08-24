import { DEFAULT_JOB_FOUND_VALUE, DEFAULT_STILL_LOOKING } from "../constant";

export interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subscriptionEndDate: string;
  userId: string;
  subscriptionId: string;
  monthlyPrice: number;
  acceptedDownsell: boolean;
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

export type VariantType = "A" | "B" | null;

export interface JobFoundFeedbackProps {
  value: {
    feedback: string;
  };
  onChange: (field: keyof JobFoundFeedbackProps["value"], val: string) => void;
  onNext?: () => void;
  onBack?: () => void;
}

type ValuesofJobFound = typeof DEFAULT_JOB_FOUND_VALUE;

export interface JobFoundFlowProps {
  stepNumber: number;
  values: ValuesofJobFound;
  handleChange: (
    step: keyof ValuesofJobFound,
    field: string,
    value: string
  ) => void;
  handleStepsChange: (n: SubSteps) => void;
  onBack: () => void;
  onFormSubmit: () => void;
  onClose: () => void;
  setModalProps: (s: any) => void;
}

export interface SurveyEmploymentProps {
  value: JobFoundStep1;
  onChange: <K extends keyof JobFoundStep1>(
    field: K,
    val: JobFoundStep1[K]
  ) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export interface VisaHelpProps {
  source: FoundThrough;
  value: JobFoundStep3;
  onChange: (field: keyof JobFoundStep3, val: string) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export type Contact = {
  name: string;
  email: string;
  avatarSrc?: string;
  blurb?: string;
};

export interface VisaPartnerProps {
  variant: FoundThrough;
  onFinish?: () => void;
  contact?: Contact;
  setModalProps: (s: any) => void;
}

export type SurveyQuestion = {
  id: string;
  question: string;
  mandatory?: boolean;
  options: string[];
};

export type SurveyStepProps<TValues extends Record<string, string>> = {
  title: string;
  subtitle?: string;
  questions: SurveyQuestion[];
  value: TValues;
  onChange: <K extends keyof TValues>(field: K, val: TValues[K]) => void;
  onNext?: () => void;
  onBack?: () => void;
  continueLabel?: string;
  extraAction?: React.ReactNode;
  normalizeOption?: (label: string) => string;
};

type CancellationReasonValue = {
  reason: string;
  additionalReason: string;
};

export interface CancellationReasonProps {
  value: CancellationReasonValue;
  onChange: (field: keyof CancellationReasonValue, v: string) => void;
  onNext: () => void;
  onBack?: () => void;
  extraAction: {
    discountPercent: number;
    currentPrice: number;
    discounted: number;
    action: () => void;
  };
  variant: VariantType;
}

export interface DownSellAcceptProps {
  subscriptionEndDate: string;
  newPrice: number;
  onMount: () => void;
  onCompletion: () => void;
}
export interface DownSellOfferProps {
  onNext: () => void;
  onBack: () => void;
  currentPrice: number;
  onAccept: () => void;
}

export interface FinalConfirmProps {
  onFinish: () => void;
  setModalProps: (b: any) => void;
}

type StillLookingValues = typeof DEFAULT_STILL_LOOKING;

export interface IStillLookingFlowProps {
  stepNumber: number;
  values: StillLookingValues;
  handleChange: (
    step: keyof StillLookingValues,
    field: string,
    value: string
  ) => void;
  handleStepsChange: (n: SubSteps) => void;
  onCompletion: () => void;
  onBack: () => void;
  currentPrice: number;
  variant: VariantType;
  subscriptionEndDate: string;
  acceptedDownsell: boolean;
  onDownsellDecision: (b: boolean) => void;
  setModalProps: (v: any) => any;
  onClose: () => void;
}

export type SurveyFeedbackValues = {
  rolesApplied: string;
  companiesEmailed: string;
  interviews: string;
};

export interface SurveyFeedbackProps {
  value: SurveyFeedbackValues;
  onChange: <K extends keyof SurveyFeedbackValues>(
    field: K,
    val: SurveyFeedbackValues[K]
  ) => void;
  onNext?: () => void;
  onBack?: () => void;
  extraAction: {
    discountPercent: number;
    currentPrice: number;
    discounted: number;
    action: () => void;
  };
  variant: VariantType;
}
