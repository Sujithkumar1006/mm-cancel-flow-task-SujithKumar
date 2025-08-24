import DownSellOffer from "./DownSellOffer";
import SurveyFeedback from "./SurveyFeedback";
import CancellationReason from "./CancellationReason";
import FinalConfirm from "./FinalConfirm";
import { COMMON_DISCOUNT_AMOUNT, VARIANT_VALUES } from "../constant";
import { IStillLookingFlowProps } from "../shared/types";
import DownSellAccept from "./DownSellAccept";

export default function StillLookingFlow({
  stepNumber,
  handleStepsChange,
  currentPrice,
  subscriptionEndDate,
  acceptedDownsell,
  onDownsellDecision,
  values,
  handleChange,
  onCompletion,
  onBack,
  variant,
  setModalProps,
  onClose,
}: IStillLookingFlowProps) {
  const discounted =
    variant === VARIANT_VALUES.B
      ? Math.max(0, currentPrice - 10)
      : currentPrice;

  const discountPercent = Math.round(
    (COMMON_DISCOUNT_AMOUNT / currentPrice) * 100
  );
  switch (stepNumber) {
    case 1:
      if (variant === VARIANT_VALUES.B) {
        return (
          <DownSellOffer
            currentPrice={currentPrice}
            onNext={() => {
              onDownsellDecision(false);
            }}
            onBack={onBack}
            onAccept={() => {
              onDownsellDecision(true);
            }}
          />
        );
      } else
        return (
          <SurveyFeedback
            value={values.step1}
            onChange={(field, value) => handleChange("step1", field, value)}
            onNext={() => handleStepsChange(3)}
            onBack={onBack}
            extraAction={{
              discountPercent,
              discounted,
              currentPrice,
              action: () => onDownsellDecision(true),
            }}
            variant={variant}
          />
        );
    case 2: {
      if (variant === VARIANT_VALUES.B && acceptedDownsell) {
        return (
          <DownSellAccept
            subscriptionEndDate={
              subscriptionEndDate ?? new Date().toISOString()
            }
            newPrice={discounted}
            onCompletion={onClose}
            onMount={() =>
              setModalProps((p: any) => ({
                ...p,
                title: "Subscription Continued",
                showSteps: false,
              }))
            }
          />
        );
      }
      return (
        <SurveyFeedback
          value={values.step1}
          onChange={(field, value) => handleChange("step1", field, value)}
          onNext={() => handleStepsChange(3)}
          onBack={onBack}
          extraAction={{
            discountPercent,
            discounted,
            currentPrice,
            action: () => onDownsellDecision(true),
          }}
          variant={variant}
        />
      );
    }
    case 3:
      return (
        <CancellationReason
          value={values.step2}
          onChange={(field, value) => handleChange("step2", field, value)}
          extraAction={{
            discountPercent,
            discounted,
            currentPrice,
            action: () => onDownsellDecision(true),
          }}
          onNext={() => {
            onCompletion();
            handleStepsChange(4);
          }}
          onBack={onBack}
          variant={variant}
        />
      );
    case 4:
      return <FinalConfirm onFinish={onClose} setModalProps={setModalProps} />;
    default:
      return null;
  }
}
