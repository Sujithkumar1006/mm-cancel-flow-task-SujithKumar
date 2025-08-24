import React from "react";
import { FormSteps } from "./shared/types";

interface IJobStatusStep {
  setCurrentStep: (s: FormSteps) => void;
}

const JobStatusStep = ({ setCurrentStep }: IJobStatusStep) => {
  return (
    <>
      <div className="flex-[1.25]">
        <h2 className="text-2xl leading-8 md:text-4xl mb-4 md:leading-[44px] text-gray-800 font-semibold">
          Hey mate, <br /> Quick one before you go.
        </h2>
        <h2 className="text-2xl md:text-4xl font-semibold italic mb-5 text-gray-800">
          Have you found a job yet?
        </h2>
        <p className="font-medium text-base text-gray-700">
          Whatever your answer, we just want to help you take the next step.
          <span className="hidden md:inline">
            <br />
          </span>
          With visa support, or by hearing how we can do better.
        </p>
        <div className="flex flex-col space-y-3 mt-5 gap-1 pt-5 border-t border-gray-300">
          <button
            className="w-full px-1 py-2 bg-white border-gray-300 border text-gray-700 rounded-lg font-semibold text-base"
            type="button"
            onClick={() => setCurrentStep(FormSteps.FOUND_JOB)}
          >
            Yes, I've found a job
          </button>
          <button
            className="w-full px-1 py-2 bg-white border-gray-300 border text-gray-700 rounded-lg font-semibold text-base"
            type="button"
            onClick={() => setCurrentStep(FormSteps.NOT_FOUND)}
          >
            Not yet - I'm still looking
          </button>
        </div>
      </div>
    </>
  );
};

export default JobStatusStep;
