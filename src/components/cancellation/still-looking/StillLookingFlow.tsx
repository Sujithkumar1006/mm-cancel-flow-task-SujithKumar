"use client";

import DownSellOffer from "./DownSellOffer";
import SurveyFeedback from "./SurveyFeedback";
import CancellationReason from "./CancellationReason";
import FinalConfirm from "./FinalConfirm";
import DownSellAccept from "./DownSellAccept";

import { VARIANT_VALUES } from "../constant";
import { useCancellationFlowContext } from "../shared/CancellationFlowContext";

export default function StillLookingFlow() {
  const { subSteps, variant, downsellAccepted } = useCancellationFlowContext();
  switch (subSteps) {
    case 1: {
      if (variant === VARIANT_VALUES.B) {
        return <DownSellOffer />;
      }

      return <SurveyFeedback />;
    }

    case 2: {
      if (variant === VARIANT_VALUES.B && downsellAccepted) {
        return <DownSellAccept />;
      }

      return <SurveyFeedback />;
    }

    case 3:
      return <CancellationReason />;

    case 4:
      return <FinalConfirm />;

    default:
      return null;
  }
}
