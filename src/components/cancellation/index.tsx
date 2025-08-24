"use client";

import Image from "next/image";
import Modal from "../ui/Modal";
import JobStatusStep from "./JobStatusStep";
import JobFoundFlow from "./job-found/JobFoundFlow";
import StillLookingFlow from "./still-looking/StillLookingFlow";
import { CancelSubscriptionModalProps, FormSteps } from "./shared/types";
import { shouldShowIllustration } from "./shared/flowUtils";
import {
  CancellationFlowProvider,
  useCancellationFlowContext,
} from "./shared/CancellationFlowContext";
import { VARIANT_VALUES } from "./constant";

function ModalBody() {
  const {
    currentStep,
    subSteps,
    variant,
    jobFoundValue,
    downsellAccepted,
    modalProps,
    totalSteps,
    displayStep,
    goBack,
    closeModal,
  } = useCancellationFlowContext();

  const showImageOnMobile = shouldShowIllustration({
    currentStep,
    subSteps,
    variant,
    visaHelp: jobFoundValue.step3?.visaHelp,
    downsellAccepted,
  });

  const hideBackButton =
    currentStep === FormSteps.NO_SELECTION ||
    subSteps === 4 ||
    (currentStep === FormSteps.NOT_FOUND &&
      variant === VARIANT_VALUES.B &&
      downsellAccepted);
  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      title={modalProps.title}
      size="xxl"
      showBackButton={!hideBackButton}
      onBack={goBack}
      currentStep={modalProps?.showSteps ? displayStep : 0}
      totalSteps={modalProps?.showSteps ? totalSteps : 0}
      closeAlertText={
        subSteps > 1 && subSteps !== 4 && modalProps?.showSteps
          ? "You’re in the middle of filling out this form. If you leave now, your progress will be lost. Do you still want to exit?"
          : ""
      }
      disableOutsideClose
    >
      <div className="space-y-6">
        <div className="flex flex-col-reverse md:flex-row items-stretch gap-5">
          {currentStep === FormSteps.NO_SELECTION && <JobStatusStep />}
          {currentStep === FormSteps.FOUND_JOB && <JobFoundFlow />}

          {currentStep === FormSteps.NOT_FOUND && <StillLookingFlow />}

          <div
            className={`relative w-full aspect-[7/3] md:aspect-auto ${
              showImageOnMobile ? "block" : "hidden"
            } md:flex md:flex-1`}
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

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  subscriptionEndDate,
  userId,
  subscriptionId,
  monthlyPrice,
  acceptedDownsell,
}: CancelSubscriptionModalProps) {
  if (!isOpen) return null;

  return (
    <CancellationFlowProvider
      userId={userId}
      subscriptionId={subscriptionId}
      monthlyPrice={monthlyPrice}
      acceptedDownsell={acceptedDownsell}
      subscriptionEndDate={subscriptionEndDate}
      onCloseModal={onClose}
    >
      <ModalBody />
    </CancellationFlowProvider>
  );
}
