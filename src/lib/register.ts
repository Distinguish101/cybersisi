import "server-only";
import { db } from "./db";
import { notifyNewSubmission } from "./email";
import { registrationSchema, type FormState } from "./forms";

const MIN_FILL_MS = 3000; // faster than this is almost certainly a bot

// Core of the register-interest action, kept free of Next.js APIs so it can be
// tested directly. Never log form values — only error names/codes.
export async function handleRegistration(formData: FormData): Promise<FormState> {
  // Spam checks: a hidden honeypot field humans never fill, and a minimum fill time.
  // Bots get a fake success so they don't learn what tripped them. startedAt is set
  // by JS, so it's empty without JS — don't treat that as a bot, or no-JS sign-ups vanish.
  if (formData.get("website")) return { status: "success" };
  const startedAt = Number(formData.get("startedAt"));
  if (startedAt && Date.now() - startedAt < MIN_FILL_MS) return { status: "success" };

  const raw = Object.fromEntries(
    [...formData.entries()].filter(([k, v]) => typeof v === "string" && !["website", "startedAt"].includes(k)),
  ) as Record<string, string>;

  const parsed = registrationSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: raw };
  }

  const { consent: _consent, ...data } = parsed.data;
  try {
    await db.submission.create({ data: { ...data, consentAt: new Date() } });
  } catch (err) {
    console.error("registration: save failed", err instanceof Error ? err.name : "unknown");
    return { status: "error", message: "Sorry, something went wrong saving your details. Please try again.", values: raw };
  }

  // The submission is saved; a failed alert email mustn't fail the form.
  try {
    await notifyNewSubmission(data.type, data.firstName);
  } catch (err) {
    console.error("registration: notify failed", err instanceof Error ? err.message : "unknown");
  }

  return { status: "success" };
}
