"use server";

import { z } from "zod";
import { supabaseAdmin as supabase } from "@/lib/supabase";


const schema = z.object({
  cancellationId: z.string().uuid(),
  accepted: z.boolean(),
});

export async function recordDownsellChoice(input: unknown) {
  const { cancellationId, accepted } = schema.parse(input);

  const { error } = await supabase
    .from("cancellations")
    .update({ accepted_downsell: accepted })
    .eq("id", cancellationId);

  if (error) throw error;
  return { ok: true };
}
