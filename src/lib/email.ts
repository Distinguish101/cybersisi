import "server-only";
import { Resend } from "resend";
import type { RegistrationType } from "./forms";

const LABEL: Record<RegistrationType, string> = {
  MEMBER: "member",
  MENTOR: "mentor",
  PARTNER: "partner",
};

// Alerts the owner to a new submission. Deliberately contains only the type and
// first name — contact details stay in the database, not in an inbox.
// Skipped (returns false) when RESEND_API_KEY or NOTIFY_EMAIL isn't set.
export async function notifyNewSubmission(type: RegistrationType, firstName: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) return false;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // Until cybersis.org is verified in Resend, only onboarding@resend.dev works.
    from: process.env.RESEND_FROM || "CyberSis <onboarding@resend.dev>",
    to,
    subject: `New ${LABEL[type]} registration — CyberSis`,
    text: `${firstName} registered interest as a ${LABEL[type]}.\n\nOpen the CyberSis admin (or Prisma Studio) to see their details.`,
  });
  if (error) throw new Error(`Resend: ${error.name}`);
  return true;
}
