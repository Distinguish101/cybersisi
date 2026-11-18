import { z } from "zod";

// Server-side validation for the three register-interest forms. Field set from
// the founder's form copy (docs/LOG.md, Stage 5.2), keeping the four earlier
// fields the owner chose to keep (phone, how-heard, member message, LinkedIn).
// The fields shown on the page live in RegisterForm's FIELDS: change both together.

// Checkbox groups: the field names whose values arrive as lists.
export const MULTI_FIELDS = ["interests", "mentorSkills", "partnerHelp"] as const;

const text = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const optional = (max: number) =>
  text(max)
    .optional()
    .transform((v) => (v ? v : undefined));
const required = (max: number, message: string) => text(max).min(1, message);
const choice = <const T extends readonly [string, ...string[]]>(values: T, message: string) =>
  z.enum(values, { error: message });
const ticks = <const T extends readonly [string, ...string[]]>(values: T) => z.array(z.enum(values)).default([]);

const base = {
  name: required(80, "Please tell us a name."),
  email: z.string().trim().toLowerCase().pipe(z.email("Please enter a valid email address.")),
  phone: optional(20).refine((v) => !v || /^\+?[\d\s()-]{7,20}$/.test(v), "Please enter a valid phone number."),
  consent: z.literal("on", { error: "Please tick the box so we can store your details." }),
};

export const memberSchema = z.object({
  type: z.literal("MEMBER"),
  ...base,
  submitterRole: choice(["SELF", "PARENT", "PROFESSIONAL"], "Please tell us who is filling this in."),
  contactName: optional(80),
  ageRange: choice(["16-17", "18-25"], "Please choose the age of the person joining."),
  area: required(60, "Please tell us a town or postcode area."),
  interests: ticks(["ONLINE_SAFETY", "CYBER_BASICS", "ETHICAL_HACKING", "CAREERS"]),
  howHeard: optional(120),
  message: optional(1000),
});

export const mentorSchema = z.object({
  type: z.literal("MENTOR"),
  ...base,
  role: required(120, "Please tell us your job title and employer."),
  mentorSkills: ticks(["SECURITY", "SOFTWARE_CLOUD", "CAREERS", "TALKS"]),
  mentorTime: choice(["HOUR_A_MONTH", "TWO_HOURS_A_MONTH", "HOUR_A_WEEK", "ONE_OFF"], "Please choose how much time you can give."),
  mentorFormat: choice(["ONLINE", "IN_PERSON", "EITHER"], "Please choose online, in person or either."),
  linkedin: optional(200).refine(
    (v) => !v || /^https?:\/\/([a-z]+\.)?linkedin\.com\//i.test(v),
    "Please enter a LinkedIn link (https://linkedin.com/…), or leave it blank.",
  ),
  message: optional(1000),
});

export const partnerSchema = z
  .object({
    type: z.literal("PARTNER"),
    ...base,
    organisation: required(120, "Please tell us your organisation."),
    organisationType: choice(
      ["SCHOOL", "WOMEN_YOUTH", "COMPANY", "FUNDER", "PUBLIC_BODY", "OTHER"],
      "Please tell us what kind of organisation you are.",
    ),
    partnerHelp: ticks(["FUNDING", "SPACE", "REFERRALS", "MENTORS_JOBS"]).refine(
      (v) => v.length > 0,
      "Please tick at least one way you'd like to help.",
    ),
    fundingRange: z.enum(["UNDER_5K", "FROM_5K_TO_25K", "FROM_25K_TO_100K", "OVER_100K", "DISCUSS"]).optional().catch(undefined),
    spaceDetails: optional(500),
    message: optional(1000),
  })
  // The funding and space questions are only asked when their box is ticked.
  .superRefine((v, ctx) => {
    if (v.partnerHelp.includes("FUNDING") && !v.fundingRange)
      ctx.addIssue({ code: "custom", path: ["fundingRange"], message: "Please choose an approximate amount, or 'Prefer to discuss'." });
    if (v.partnerHelp.includes("SPACE") && !v.spaceDetails)
      ctx.addIssue({ code: "custom", path: ["spaceDetails"], message: "Please tell us where the space is and how many people it holds." });
  });

export const registrationSchema = z.discriminatedUnion("type", [memberSchema, mentorSchema, partnerSchema]);
export type Registration = z.infer<typeof registrationSchema>;
export type RegistrationType = Registration["type"];

// Drop answers to questions that weren't asked: without JS every question is
// shown, so someone could pick a funding amount and then untick "Funding".
export function onlyAskedAnswers(r: Registration): Registration {
  if (r.type !== "PARTNER") return r;
  return {
    ...r,
    fundingRange: r.partnerHelp.includes("FUNDING") ? r.fundingRange : undefined,
    spaceDetails: r.partnerHelp.includes("SPACE") ? r.spaceDetails : undefined,
  };
}

export type FormValues = Record<string, string | string[]>;
export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string>; values?: FormValues };
