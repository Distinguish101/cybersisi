"use server";

import { headers } from "next/headers";
import type { FormState } from "@/lib/forms";
import { rateLimit } from "@/lib/rate-limit";
import { handleRegistration } from "@/lib/register";

export async function register(_prev: FormState, formData: FormData): Promise<FormState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(ip)) {
    return { status: "error", message: "Too many attempts. Please wait a few minutes and try again." };
  }
  return handleRegistration(formData);
}
