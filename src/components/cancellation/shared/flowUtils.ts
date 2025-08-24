// src/components/cancellation/shared/flowUtils.ts
import { FormSteps, VariantType } from "./types";
import { VARIANT_VALUES, FLOW_STEPS, VISA_HELP } from "../constant";

/**
 * Get the key for which flow plan is active
 */
export function getPlanKey(currentStep: FormSteps, variant: VariantType) {
  if (currentStep === FormSteps.FOUND_JOB) return "foundJob";
  if (variant === VARIANT_VALUES.B) return "notFoundB";
  return "notFoundA";
}

/**
 * Hard-coded plan lengths for clarity.
 * (FLOW_STEPS in your constants may already define these counts —
 * but here we explicitly map them.)
 */
export const STEP_PLANS = {
  foundJob: [1, 2, 3, 4], // 4 steps in Job Found flow
  notFoundA: [1, 2, 3, 4], // 4 steps if Still Looking, Variant A (no downsell)
  notFoundB: [1, 2, 3, 4, 5], // 5 steps if Still Looking, Variant B (with downsell)
};

/**
 * Calculates total steps and which "display step" should be shown in the UI.
 */
export function getStepCounts(
  currentStep: FormSteps,
  variant: VariantType,
  subSteps: number
) {
  if (currentStep === FormSteps.NO_SELECTION) {
    return { totalSteps: 0, displayStep: 0 };
  }

  const key = getPlanKey(currentStep, variant);
  const totalSteps =
    key === "foundJob"
      ? FLOW_STEPS.foundJob
      : key === "notFoundB"
      ? FLOW_STEPS.notFoundB
      : FLOW_STEPS.notFoundA;

  // Display logic: in some Variant A flows you wanted to "skip" an index.
  const displayStep =
    currentStep === FormSteps.NOT_FOUND &&
    variant === VARIANT_VALUES.A &&
    subSteps > 2
      ? subSteps - 1
      : subSteps;

  return { totalSteps, displayStep };
}

/**
 * Decides when to show the illustration image.
 */
export function shouldShowIllustration(opts: {
  currentStep: FormSteps;
  subSteps: number;
  variant: VariantType;
  visaHelp?: string;
  downsellAccepted?: boolean;
}) {
  const { currentStep, subSteps, visaHelp, downsellAccepted } = opts;

  if (currentStep === FormSteps.NO_SELECTION) return true;

  // In Job Found flow: show on final step if user doesn’t want visa help
  if (
    currentStep === FormSteps.FOUND_JOB &&
    subSteps === 4 &&
    visaHelp === VISA_HELP.NO
  ) {
    return true;
  }

  // In Still Looking flow: show on downsell accepted screen or final confirm
  if (
    currentStep === FormSteps.NOT_FOUND &&
    ((downsellAccepted && subSteps === 2) || subSteps === 4)
  ) {
    return true;
  }

  return false;
}
