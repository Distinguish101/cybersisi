import { z } from "zod";

// Server-side validation for the three register-interest forms. Field set
// agreed with the owner — see docs/LOG.md "Decisions for the forms stage".

const text = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const optional = (max: number) =>
  text(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const base = {
  firstName: text(60).min(1, "Please tell us your first name."),
  email: z.string().trim().toLowerCase().pipe(z.email("Please enter a valid email address.")),
  phone: optional(20).refine((v) => !v || /^\+?[\d\s()-]{7,20}$/.test(v), "Please enter a valid phone number."),
  consent: z.literal("on", { error: "Please tick the box so we can store your details." }),
};

export const memberSchema = z.object({
  type: z.literal("MEMBER"),
  ...base,
  ageRange: z.enum(["16-17", "18-25"], { error: "Please choose your age range." }),
  howHeard: optional(120),
  message: optional(1000),
});

export const mentorSchema = z.object({
  type: z.literal("MENTOR"),
  ...base,
  role: text(120).min(1, "Please tell us your job or role."),
  linkedin: optional(200).refine(
    (v) => !v || /^https?:\/\/([a-z]+\.)?linkedin\.com\//i.test(v),
    "Please enter a LinkedIn link (https://linkedin.com/…), or leave it blank.",
  ),
  message: text(1000).min(1, "Please tell us a little about why you'd like to mentor."),
});

export const partnerSchema = z.object({
  type: z.literal("PARTNER"),
  ...base,
  organisation: text(120).min(1, "Please tell us your organisation."),
  interest: z.enum(["SPONSOR", "HOST", "FUND", "OTHER"], { error: "Please choose how you'd like to help." }),
  message: text(1000).min(1, "Please tell us a little about what you have in mind."),
});

export const registrationSchema = z.discriminatedUnion("type", [memberSchema, mentorSchema, partnerSchema]);
export type Registration = z.infer<typeof registrationSchema>;
export type RegistrationType = Registration["type"];

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string>; values?: Record<string, string> };
