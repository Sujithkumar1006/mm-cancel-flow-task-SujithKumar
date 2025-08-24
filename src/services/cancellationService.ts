import { startCancellationFlow } from "@/app/actions/startCancellationFlow";
import { saveCancellationSurvey } from "@/app/actions/saveCancellationSurvey";
import { recordDownsellChoice } from "@/app/actions/recordDownsellChoice";
import { updateCancellationReason } from "@/app/actions/updateCancellationReason";

type StartParams = {
  userId: string;
  subscriptionId: string;
  reason: string;
};

type RecordDownsellParams = {
  cancellationId: string | null;
  accepted: boolean;
};

export async function svcStartCancellation(params: StartParams) {
  // Expected to return { variant, cancellationId }
  return startCancellationFlow(params);
}

export async function svcSaveSurvey(payload: any) {
  // Payload typically includes cancellationId and subscriptionId
  return saveCancellationSurvey(payload);
}

export async function svcRecordDownsell(params: RecordDownsellParams) {
  if (!params.cancellationId) return;
  return recordDownsellChoice({
    cancellationId: params.cancellationId,
    accepted: params.accepted,
  });
}

export async function svcUpdateReason(
  reason: string,
  cancellationId: string | null
) {
  if (!cancellationId) return;
  return updateCancellationReason(reason, cancellationId);
}
