"use server";

import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function updateCancellationReason(
  reason: string,
  cancellationId: string
) {
  const { error } = await supabase
    .from("cancellations")
    .update({ reason: reason })
    .eq("id", cancellationId);

  if (error) throw error;
  return { ok: true };
}
