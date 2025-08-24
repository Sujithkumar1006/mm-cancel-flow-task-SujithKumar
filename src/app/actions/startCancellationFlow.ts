"use server";
import crypto from "node:crypto";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function startCancellationFlow({ userId, subscriptionId, reason }: { userId: string; subscriptionId: string, reason:string }) {
  const { data: existing, error: selErr } = await supabase
    .from("cancellations")
    .select("id, downsell_variant")
    .eq("subscription_id", subscriptionId)
    .maybeSingle();
  if (selErr) {throw selErr};


  let variant: "A" | "B";
  let cancellationId: string;

  if (existing) {
    //Check whether in update also variant should be selected randomly or by default take last value
    variant = existing.downsell_variant as "A" | "B";
    cancellationId = existing.id;
  } else {
    variant = crypto.randomInt(0, 2) === 0 ? "A" : "B";
    const { data: ins, error: insErr } = await supabase
      .from("cancellations")
      .insert({ user_id: userId, subscription_id: subscriptionId, downsell_variant: variant, accepted_downsell: false, reason: reason })
      .select("id")
      .single();
    if (insErr) throw insErr;
    cancellationId = ins.id;
  }

  const { error: upErr } = await supabase
    .from("subscriptions")
    .update({ status: "pending_cancellation" })
    .eq("id", subscriptionId);
  if (upErr) throw upErr;

  return { variant, cancellationId };
}
