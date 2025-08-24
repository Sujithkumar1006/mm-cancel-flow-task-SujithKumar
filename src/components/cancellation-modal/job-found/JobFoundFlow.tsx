import SurveyEmployment from "./SurveyEmployment";
import Feedback from "./Feedback";
import VisaHelp from "./VisaHelp";
import VisaPartner from "./VisaPartner";
import { JobFoundFlowProps, SubSteps } from "../shared/types";

export default function JobFoundFlow({
  stepNumber,
  values,
  handleChange,
  handleStepsChange,
  onFormSubmit,
  onBack,
  onClose,
  setModalProps,
}: JobFoundFlowProps) {
  switch (stepNumber) {
    case 1:
      return (
        <SurveyEmployment
          value={values.step1}
          onChange={(field, value) => handleChange("step1", field, value)}
          onNext={() => handleStepsChange(2)}
          onBack={onBack}
        />
      );
    case 2:
      return (
        <Feedback
          value={values.step2}
          onChange={(field, value) => handleChange("step2", field, value)}
          onNext={() => handleStepsChange(3)}
          onBack={onBack}
        />
      );
    case 3: {
      return (
        <VisaHelp
          source={values.step1.foundThrough}
          value={values.step3}
          onNext={() => {
            onFormSubmit();
            handleStepsChange(4);
          }}
          onChange={(field, value) => handleChange("step3", field, value)}
          onBack={onBack}
        />
      );
    }
    case 4:
      return (
        <VisaPartner
          variant={values.step3.visaHelp}
          onFinish={onClose}
          setModalProps={setModalProps}
        />
      );
    default:
      return null;
  }
}
