"use server";

import { z } from "zod";
import { supabaseAdmin as supabase } from "@/lib/supabase";

const allowedBuckets = ["0", "1-5", "6-20", "20+"] as const;

const schema = z.object({
  cancellationId: z.string().uuid(),
  foundThrough: z.enum(["yes", "no"]).optional(),
  rolesApplied: z.enum(allowedBuckets),
  companiesEmailed: z.enum(allowedBuckets),
  interviews: z.enum(["0", "1-2", "3-5", "5+"]),
  visaHelp: z.enum(["yes", "no"]).optional(),
  visaType: z.string().trim().max(20).optional(),
  feedback: z.string().max(200).optional(),
});

export async function saveCancellationSurvey(
  input: unknown,
  subscriptionId: string
) {
  console.log("input", input);
  const payload = schema.parse(input);

  const { error } = await supabase.from("cancellation_surveys").upsert(
    {
      cancellation_id: payload.cancellationId,
      found_through: payload.foundThrough,
      roles_applied: payload.rolesApplied,
      companies_emailed: payload.companiesEmailed,
      interviews: payload.interviews,
      visa_help: payload.visaHelp ?? null,
      visa_type: payload.visaType ?? null,
      feedback: payload.feedback ?? "",
    },
    { onConflict: "cancellation_id" }
  );

  const { error: upErr } = await supabase
    .from("subscriptions")
    .update({ status: "cancelled" })
    .eq("id", subscriptionId);
  if (upErr) throw upErr;

  if (error) throw error;
  return { ok: true };
}
