"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormSteps, SubSteps, VariantType } from "./shared/types";
import {
  DEFAULT_JOB_FOUND_VALUE,
  DEFAULT_STILL_LOOKING,
  DEFAULT_MODAL_VALUES,
  REASON_FOR_CANCELLATION,
} from "./constant";
import { useFormState } from "./shared/useFormState";
import { getStepCounts } from "./shared/flowUtils";
import {
  svcStartCancellation,
  svcSaveSurvey,
  svcRecordDownsell,
  svcUpdateReason,
} from "@/services/cancellationService";

type Params = {
  userId: string;
  subscriptionId: string;
  monthlyPrice: number; // ok to keep or remove if unused elsewhere
  acceptedDownsell: boolean;
};

export function useCancellationFlow(params: Params) {
  const { userId, subscriptionId, acceptedDownsell } = params;

  const [currentStep, setCurrentStep] = useState<FormSteps>(
    FormSteps.NO_SELECTION
  );

  const [subSteps, setSubSteps] = useState<SubSteps>(1);

  const {
    values: jobFoundValue,
    update: updateJobFound,
    reset: resetJobFound,
  } = useFormState(DEFAULT_JOB_FOUND_VALUE);

  const {
    values: stillLookingForm,
    update: updateStill,
    reset: resetStill,
  } = useFormState(DEFAULT_STILL_LOOKING);

  const [variant, setVariant] = useState<VariantType>(null);
  const [cancellationId, setCancellationId] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState(DEFAULT_MODAL_VALUES);
  const [downsellAccepted, setDownSellAccepted] = useState(acceptedDownsell);

  useEffect(() => setDownSellAccepted(acceptedDownsell), [acceptedDownsell]);

  const start = useCallback(
    async (type: FormSteps) => {
      const reason =
        type === FormSteps.FOUND_JOB
          ? REASON_FOR_CANCELLATION.FOUND_JOB
          : REASON_FOR_CANCELLATION.NOT_FOUND;

      const res = await svcStartCancellation({
        userId,
        subscriptionId,
        reason,
      });

      setCancellationId(res.cancellationId);
      setVariant(res.variant);
      setCurrentStep(type);
      setSubSteps(1);
    },
    [userId, subscriptionId]
  );

  const submit = useCallback(async () => {
    const payload =
      currentStep === FormSteps.FOUND_JOB
        ? {
            ...jobFoundValue.step1,
            ...jobFoundValue.step3,
            cancellationId,
            feedback: jobFoundValue?.step2?.feedback,
            subscriptionId,
          }
        : {
            ...stillLookingForm.step1,
            foundThrough: "yes",
            cancellationId,
            feedback: stillLookingForm.step2.additionalReason,
            subscriptionId,
          };

    await svcSaveSurvey(payload);

    if (currentStep === FormSteps.NOT_FOUND && cancellationId) {
      await svcUpdateReason(stillLookingForm.step2.reason, cancellationId);
    }
  }, [
    currentStep,
    jobFoundValue,
    stillLookingForm,
    cancellationId,
    subscriptionId,
  ]);

  const goBack = useCallback(() => {
    setSubSteps((prev) => {
      const next = (prev as number) - 1;
      if (next === 0) setCurrentStep(FormSteps.NO_SELECTION);
      return Math.max(1, next) as SubSteps;
    });
  }, []);

  const decideDownsell = useCallback(
    async (accepted: boolean) => {
      await svcRecordDownsell({ cancellationId, accepted });
      setDownSellAccepted(accepted);
      // For Variant B flow this typically advances to step 2 (post-decision)
      setSubSteps(2);
    },
    [cancellationId]
  );

  const resetAll = useCallback(() => {
    setCurrentStep(FormSteps.NO_SELECTION);
    resetJobFound();
    resetStill();
    setSubSteps(1);
    setVariant(null);
    setCancellationId(null);
    setModalProps(DEFAULT_MODAL_VALUES);
  }, [resetJobFound, resetStill]);

  const { totalSteps, displayStep } = useMemo(
    () => getStepCounts(currentStep, variant, subSteps),
    [currentStep, variant, subSteps]
  );

  return {
    // state
    currentStep,
    subSteps,
    jobFoundValue,
    stillLookingForm,
    variant,
    cancellationId,
    modalProps,
    setModalProps,
    downsellAccepted,
    totalSteps,
    displayStep,
    // actions
    start,
    submit,
    goBack,
    decideDownsell,
    updateJobFound,
    updateStill,
    resetAll,
    setSubSteps,
  };
}
