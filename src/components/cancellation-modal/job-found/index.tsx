import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { DEFAULT_JOB_FOUND_VALUE, FOUND_THROUGH } from "../constant";
import { SubSteps } from "../types";

type Values = typeof DEFAULT_JOB_FOUND_VALUE;

export default function JobFound({
  stepNumber,
  values,
  handleChange,
  handleStepsChange,
  onCompletion,
  onBack,
}: {
  stepNumber: number;
  values: Values;
  handleChange: (step: keyof Values, field: string, value: string) => void;
  handleStepsChange: (n: SubSteps) => void;
  onCompletion: () => void;
  onBack: () => void;
}) {
  switch (stepNumber) {
    case 1:
      return (
        <Step1
          value={values.step1}
          onChange={(field, value) => handleChange("step1", field, value)}
          onNext={() => handleStepsChange(2)}
          onBack={onBack}
        />
      );
    case 2:
      return (
        <Step2
          value={values.step2}
          onChange={(field, value) => handleChange("step2", field, value)}
          onNext={() => handleStepsChange(3)}
          onBack={onBack}
        />
      );
    case 3: {
      return (
        <Step3
          source={values.step1.foundThrough}
          value={values.step3}
          onNext={() => handleStepsChange(4)}
          onChange={(field, value) => handleChange("step3", field, value)}
          onBack={onBack}
        />
      );
    }
    case 4:
      return <Step4 variant={values.step3.visaHelp} onFinish={onCompletion} />;
    default:
      return null;
  }
}
