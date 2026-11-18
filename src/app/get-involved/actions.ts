"use server";

import { headers } from "next/headers";
import type { FormState } from "@/lib/forms";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { handleRegistration } from "@/lib/register";

export async function register(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!rateLimit(clientIp(await headers()))) {
    return { status: "error", message: "Too many attempts. Please wait a few minutes and try again." };
  }
  return handleRegistration(formData);
}
