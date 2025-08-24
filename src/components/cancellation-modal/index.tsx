"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

import JobStatusStep from "./JobStatusStep";
import {
  CancelSubscriptionModalProps,
  FormSteps,
  SubSteps,
  VariantType,
} from "./shared/types";
import JobFoundFlow from "./job-found/JobFoundFlow";
import StillLookingFlow from "./still-looking/StillLookingFlow";
import { startCancellationFlow } from "@/app/actions/startCancellationFlow";
import { saveCancellationSurvey } from "@/app/actions/saveCancellationSurvey";
import { recordDownsellChoice } from "@/app/actions/recordDownsellChoice";

import {
  DEFAULT_JOB_FOUND_VALUE,
  DEFAULT_STILL_LOOKING,
  FLOW_STEPS,
  REASON_FOR_CANCELLATION,
  VARIANT_VALUES,
  VISA_HELP,
} from "./constant";
import Image from "next/image";
import { updateCancellationReason } from "@/app/actions/updateCancellationReason";

export const DEFAULT_MODAL_VALUES = {
  title: "Subscription Cancellation",
  showSteps: true,
};

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  subscriptionEndDate,
  userId,
  subscriptionId,
  monthlyPrice,
  acceptedDownsell,
}: CancelSubscriptionModalProps) {
  const [currentStep, setCurrentStep] = useState<FormSteps>(
    FormSteps.NO_SELECTION
  );
  const [subSteps, setSubSteps] = useState<SubSteps>(1);
  const [jobFoundValue, setJobFoundValues] = useState(DEFAULT_JOB_FOUND_VALUE);
  const [stillLookingForm, setStillLookingForm] = useState(
    DEFAULT_STILL_LOOKING
  );

  const [variant, setVariant] = useState<VariantType>(null);
  const [cancellationId, setCancellationId] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState(DEFAULT_MODAL_VALUES);
  const [downsellAccepted, setDownSellAccepted] = useState(acceptedDownsell);

  useEffect(() => {
    setDownSellAccepted(acceptedDownsell);
  }, [acceptedDownsell]);

  async function handleStartCancellation(type: FormSteps) {
    try {
      const { variant, cancellationId } = await startCancellationFlow({
        userId,
        subscriptionId,
        reason:
          type === FormSteps.FOUND_JOB
            ? REASON_FOR_CANCELLATION.FOUND_JOB
            : REASON_FOR_CANCELLATION.NOT_FOUND,
      });
      setCancellationId(cancellationId);
      setVariant(variant);

      if (type === FormSteps.FOUND_JOB) {
        setCurrentStep(FormSteps.FOUND_JOB);
        setSubSteps(1);
      } else {
        setCurrentStep(FormSteps.NOT_FOUND);
        setSubSteps(1);
      }
    } catch (e) {
      console.error("Error starting cancellation flow", e);
    }
  }

  async function handleSubmitCancellation(formValues: any) {
    try {
      await saveCancellationSurvey(formValues, subscriptionId);
      if (currentStep === FormSteps.NOT_FOUND && cancellationId)
        await updateCancellationReason(
          stillLookingForm.step2.reason,
          cancellationId
        );
    } catch (e) {
      console.error("Error starting cancellation flow", e);
    }
  }

  const handleJobFoundChange = (
    step: keyof typeof DEFAULT_JOB_FOUND_VALUE,
    field: string,
    value: string
  ) => {
    setJobFoundValues((prev: any) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

  const handleJobFoundSubmit = () => {
    let values;
    if (FormSteps.FOUND_JOB === currentStep) {
      values = {
        ...jobFoundValue.step1,
        ...jobFoundValue.step3,
        cancellationId,
        feedback: jobFoundValue?.step2?.feedback,
      };
    } else {
      values = {
        ...stillLookingForm.step1,
        foundThrough: "yes",
        cancellationId,
        feedback: stillLookingForm.step2.additionalReason,
      };
    }
    handleSubmitCancellation(values);
  };

  const handleGoBack = () => {
    setSubSteps((p) => {
      let prevStep = p - 1;
      if (prevStep === 0) {
        setCurrentStep(FormSteps.NO_SELECTION);
      }
      if (
        currentStep === FormSteps.NOT_FOUND &&
        variant === VARIANT_VALUES.A &&
        subSteps > 1
      ) {
        prevStep = 1;
      }
      return prevStep as SubSteps;
    });
  };

  const proceedToSubSteps = (v: FormSteps) => {
    handleStartCancellation(v);
  };

  const onDownSellDecision = async (flag: boolean) => {
    try {
      await recordDownsellChoice({ cancellationId, accepted: flag });
      setDownSellAccepted(flag);
      setSubSteps(2);
    } catch (err) {
      console.error("Error recording downsell decision", err);
    }
  };

  const handleStillLookingChange = (
    step: keyof typeof DEFAULT_STILL_LOOKING,
    field: string,
    value: string
  ) => {
    setStillLookingForm((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

  const handleResetState = () => {
    setCurrentStep(FormSteps.NO_SELECTION);
    setJobFoundValues(DEFAULT_JOB_FOUND_VALUE);
    setStillLookingForm(DEFAULT_STILL_LOOKING);
    setSubSteps(1);
    setVariant(null);
    setCancellationId(null);
    setModalProps(DEFAULT_MODAL_VALUES);
    onClose();
  };

  const showImageOnMobile =
    currentStep === FormSteps.NO_SELECTION ||
    (currentStep === FormSteps.FOUND_JOB &&
      subSteps === 4 &&
      jobFoundValue.step3.visaHelp === VISA_HELP.NO) ||
    (currentStep === FormSteps.NOT_FOUND &&
      ((downsellAccepted && subSteps === 2) || subSteps === 4));

  const totalSteps =
    currentStep !== FormSteps.NO_SELECTION
      ? currentStep === FormSteps.FOUND_JOB
        ? FLOW_STEPS.foundJob
        : variant === VARIANT_VALUES.B
        ? FLOW_STEPS.notFoundB
        : FLOW_STEPS.notFoundA
      : 0;

  const displayStep =
    currentStep !== FormSteps.NO_SELECTION
      ? currentStep === FormSteps.NOT_FOUND &&
        variant === VARIANT_VALUES.A &&
        subSteps > 2
        ? subSteps - 1
        : subSteps
      : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetState}
      title={modalProps.title}
      size="xxl"
      showBackButton={currentStep !== FormSteps.NO_SELECTION && subSteps !== 4}
      onBack={handleGoBack}
      currentStep={modalProps?.showSteps ? displayStep : 0}
      totalSteps={modalProps?.showSteps ? totalSteps : 0}
      closeAlertText={
        subSteps > 1 && subSteps !== 4
          ? "You’re in the middle of filling out this form. If you leave now, your progress will be lost. Do you still want to exit?"
          : ""
      }
      disableOutsideClose
    >
      <div className="space-y-6">
        <div className="flex flex-col-reverse md:flex-row items-stretch gap-5">
          {currentStep === FormSteps.NO_SELECTION && (
            <JobStatusStep setCurrentStep={proceedToSubSteps} />
          )}
          {currentStep === FormSteps.FOUND_JOB && (
            <JobFoundFlow
              stepNumber={subSteps}
              values={jobFoundValue}
              handleChange={handleJobFoundChange}
              handleStepsChange={(p) => setSubSteps(p)}
              onClose={handleResetState}
              onBack={handleGoBack}
              onFormSubmit={handleJobFoundSubmit}
              setModalProps={setModalProps}
            />
          )}
          {currentStep === FormSteps.NOT_FOUND && (
            <StillLookingFlow
              stepNumber={subSteps}
              values={stillLookingForm}
              variant={variant}
              handleChange={handleStillLookingChange}
              handleStepsChange={(p) => setSubSteps(p)}
              onCompletion={handleJobFoundSubmit}
              onBack={handleGoBack}
              onClose={handleResetState}
              subscriptionEndDate={subscriptionEndDate}
              currentPrice={monthlyPrice}
              acceptedDownsell={downsellAccepted}
              onDownsellDecision={onDownSellDecision}
              setModalProps={setModalProps}
            />
          )}

          <div
            className={`relative w-full aspect-[7/3] md:aspect-auto
              ${showImageOnMobile ? "block" : "hidden"}   /* mobile */
              md:flex md:flex-1`} /* desktop always */
          >
            <Image
              src="/images/empire-state.jpg"
              alt="Empire State"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg md:rounded-xl"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
