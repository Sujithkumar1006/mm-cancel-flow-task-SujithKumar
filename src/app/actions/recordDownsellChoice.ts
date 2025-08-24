"use server";

import { z } from "zod";
import { supabaseAdmin as supabase } from "@/lib/supabase";

const schema = z.object({
  cancellationId: z.string().uuid(),
  accepted: z.boolean(),
  subscriptionId: z.string().uuid(),
});

export async function recordDownsellChoice(input: unknown) {
  const { cancellationId, accepted, subscriptionId } = schema.parse(input);

  const { error } = await supabase
    .from("cancellations")
    .update({ accepted_downsell: accepted })
    .eq("id", cancellationId);
  // if (accepted) {
  //   const { error: err } = await supabase
  //     .from("subscriptions")
  //     .update({ status: "active" })
  //     .eq("id", subscriptionId);
  //   if (err) throw error;
  // }

  if (error) throw error;
  return { ok: true };
}
