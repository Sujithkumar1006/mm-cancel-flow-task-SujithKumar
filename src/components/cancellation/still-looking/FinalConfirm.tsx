"use client";

import { useEffect } from "react";
import { useCancellationFlowContext } from "../shared/CancellationFlowContext";

export default function FinalConfirm() {
  const { setModalProps, closeModal } = useCancellationFlowContext();

  useEffect(() => {
    setModalProps({ title: "Subscription Cancelled", showSteps: false });
  }, [setModalProps]);

  return (
    <div className="flex-[1.25]">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
        Sorry to see you go, mate.
      </h2>

      <p className="mt-3 text-lg md:text-xl font-semibold text-gray-800">
        Thanks for being with us, and you’re always welcome back.
      </p>

      <p className="mt-3 text-sm md:text-base text-gray-700">
        Your cancellation’s all sorted. You’ll still have access until your
        current billing period ends. Changes take effect after that date.
      </p>

      <p className="mt-2 text-xs md:text-sm text-gray-500">
        Changed your mind? You can reactivate anytime before your end date.
      </p>

      <div className="flex flex-col space-y-3 m-5 gap-4 pt-5 border-t border-gray-300">
        <button
          type="button"
          onClick={closeModal}
          className="w-full px-4 py-3 rounded-lg text-base font-semibold bg-[#8952fc] text-white hover:bg-[#6e3cd6]"
        >
          Back to Jobs
        </button>
      </div>
    </div>
  );
}
