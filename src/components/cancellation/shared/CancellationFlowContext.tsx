"use client";

import { createContext, useContext, PropsWithChildren } from "react";
import { useCancellationFlow } from "../useCancellationFlow";
import { FormSteps, SubSteps, VariantType } from "./types";

type ProviderProps = PropsWithChildren<{
  userId: string;
  subscriptionId: string;
  monthlyPrice: number;
  acceptedDownsell: boolean;
  subscriptionEndDate: string; // ISO date string you already pass today
  onCloseModal: () => void; // parent’s onClose from CancelSubscriptionModal
}>;

export type CancellationFlowContextValue = {
  // immutable inputs
  userId: string;
  subscriptionId: string;
  monthlyPrice: number;
  subscriptionEndDate: string;

  // state
  currentStep: FormSteps;
  subSteps: SubSteps;
  variant: VariantType;
  downsellAccepted: boolean;
  jobFoundValue: any; // keep your existing shape
  stillLookingForm: any; // keep your existing shape
  modalProps: { title: string; showSteps: boolean };
  totalSteps: number;
  displayStep: number;

  // actions
  setModalProps: (v: { title: string; showSteps: boolean }) => void;
  setSubSteps: (n: SubSteps) => void;
  start: (type: FormSteps) => Promise<void>;
  submit: () => Promise<void>;
  goBack: () => void;
  decideDownsell: (accepted: boolean) => Promise<void>;
  updateJobFound: (
    step: keyof typeof import("../constant").DEFAULT_JOB_FOUND_VALUE,
    field: string,
    value: any
  ) => void;
  updateStill: (
    step: keyof typeof import("../constant").DEFAULT_STILL_LOOKING,
    field: string,
    value: any
  ) => void;
  closeModal: () => void; // reset + parent close
};

const CancellationFlowContext =
  createContext<CancellationFlowContextValue | null>(null);

export function CancellationFlowProvider({
  userId,
  subscriptionId,
  monthlyPrice,
  acceptedDownsell,
  subscriptionEndDate,
  onCloseModal,
  children,
}: ProviderProps) {
  const flow = useCancellationFlow({
    userId,
    subscriptionId,
    monthlyPrice,
    acceptedDownsell,
  });

  const closeModal = () => {
    flow.resetAll();
    onCloseModal();
  };

  const value: CancellationFlowContextValue = {
    userId,
    subscriptionId,
    monthlyPrice,
    subscriptionEndDate,

    currentStep: flow.currentStep,
    subSteps: flow.subSteps,
    variant: flow.variant,
    downsellAccepted: flow.downsellAccepted,
    jobFoundValue: flow.jobFoundValue,
    stillLookingForm: flow.stillLookingForm,
    modalProps: flow.modalProps,
    totalSteps: flow.totalSteps,
    displayStep: flow.displayStep,

    setModalProps: flow.setModalProps,
    setSubSteps: flow.setSubSteps,
    start: flow.start,
    submit: flow.submit,
    goBack: flow.goBack,
    decideDownsell: flow.decideDownsell,
    updateJobFound: flow.updateJobFound,
    updateStill: flow.updateStill,
    closeModal,
  };

  return (
    <CancellationFlowContext.Provider value={value}>
      {children}
    </CancellationFlowContext.Provider>
  );
}

export function useCancellationFlowContext() {
  const ctx = useContext(CancellationFlowContext);
  if (!ctx)
    throw new Error(
      "useCancellationFlowContext must be used within CancellationFlowProvider"
    );
  return ctx;
}
