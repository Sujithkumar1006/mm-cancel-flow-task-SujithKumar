"use client";

import { useState } from "react";
import Modal from "../ui/Modal";

import JobStatusStep from "./JobStatusStep";
import { CancelSubscriptionModalProps, FormSteps, SubSteps } from "./types";
import JobFound from "./job-found";
import { DEFAULT_JOB_FOUND_VALUE, VISA_HELP } from "./constant";
import Image from "next/image";

//HandleOutsideModal click should be disabled for this flow

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  onConfirm,
  subscriptionEndDate,
}: CancelSubscriptionModalProps) {
  const [currentStep, setCurrentStep] = useState<FormSteps>(
    FormSteps.NO_SELECTION
  );
  const [subSteps, setSubSteps] = useState<SubSteps>(1);
  const [jobFoundValue, setJobFoundValues] = useState(DEFAULT_JOB_FOUND_VALUE);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleJobFoundChange = (
    step: keyof typeof DEFAULT_JOB_FOUND_VALUE,
    field: string,
    value: string
  ) => {
    setJobFoundValues((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

  const handleJobFoundSubmit = () => {
    onClose();
  };

  const handleGoBack = () => {
    setSubSteps((p) => {
      const prevStep = p - 1;
      if (prevStep === 0) {
        setCurrentStep(FormSteps.NO_SELECTION);
      }
      return prevStep as SubSteps;
    });
  };

  const proceedToSubSteps = (v: FormSteps) => {
    setCurrentStep(v);
    setSubSteps(1);
  };

  console.log("teeetttt", currentStep, jobFoundValue);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Subscription Cancellation"
      size="xxl"
      showBackButton={currentStep !== FormSteps.NO_SELECTION && subSteps !== 4}
      onBack={handleGoBack}
      currentStep={currentStep !== FormSteps.NO_SELECTION ? subSteps : 0}
      totalSteps={currentStep !== FormSteps.NO_SELECTION ? 3 : 0}
      closeAlertText={
        subSteps > 0 && subSteps !== 4
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
            <JobFound
              stepNumber={subSteps}
              values={jobFoundValue}
              handleChange={handleJobFoundChange}
              handleStepsChange={(p) => setSubSteps(p)}
              onCompletion={handleJobFoundSubmit}
              onBack={handleGoBack}
            />
          )}
          <div
            className={
              "relative w-full aspect-[4/3] md:aspect-auto md:flex md:flex-1" +
              (subSteps === 4 && jobFoundValue.step3.visaHelp === VISA_HELP.NO
                ? " block"
                : " hidden")
            }
          >
            <Image
              src="/images/empire-state.jpg"
              alt="Empire State"
              fill
              priority
              className="object-cover rounded-lg md:rounded-xl"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
