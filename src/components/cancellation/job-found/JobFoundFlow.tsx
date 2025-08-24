"use client";

import SurveyEmployment from "./SurveyEmployment";
import Feedback from "./Feedback";
import VisaHelp from "./VisaHelp";
import VisaPartner from "./VisaPartner";
import { useCancellationFlowContext } from "../shared/CancellationFlowContext";

export default function JobFoundFlow() {
  const { subSteps } = useCancellationFlowContext();

  switch (subSteps) {
    case 1:
      return <SurveyEmployment />;

    case 2:
      return <Feedback />;

    case 3:
      return <VisaHelp />;

    case 4:
      return <VisaPartner />;

    default:
      return null;
  }
}
