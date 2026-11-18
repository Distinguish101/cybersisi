"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { register } from "@/app/get-involved/actions";
import type { FormState, RegistrationType } from "@/lib/forms";

type Option = { value: string; label: string };
type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "textarea" | "radio" | "checkboxes";
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  options?: Option[];
  // Only asked when this checkbox value is ticked (shown always without JS).
  showIf?: { name: string; value: string; label: string };
};

const email: Field = { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" };
const phone: Field = { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", hint: "Optional" };

// Copy from the founder's form document (docs/LOG.md, Stage 5.2). Validation
// lives in src/lib/forms.ts: change both together.
const FIELDS: Record<RegistrationType, Field[]> = {
  MEMBER: [
    {
      name: "submitterRole", label: "I am", type: "radio", required: true,
      options: [
        { value: "SELF", label: "The young woman joining" },
        { value: "PARENT", label: "A parent or guardian" },
        { value: "PROFESSIONAL", label: "A teacher or youth worker" },
      ],
    },
    {
      name: "ageRange", label: "Age of the person joining", type: "radio", required: true,
      hint: "CyberSis is for young women aged 16–25.",
      options: [{ value: "16-17", label: "16 to 17" }, { value: "18-25", label: "18 to 25" }],
    },
    { name: "name", label: "Name of person joining", required: true },
    { name: "contactName", label: "Your name", hint: "If different", autoComplete: "name" },
    email,
    phone,
    { name: "area", label: "Town or postcode area", required: true, hint: "For example: Dundee, or DD1" },
    {
      name: "interests", label: "Interested in", type: "checkboxes", hint: "Tick any",
      options: [
        { value: "ONLINE_SAFETY", label: "Staying safe online" },
        { value: "CYBER_BASICS", label: "Cybersecurity basics" },
        { value: "ETHICAL_HACKING", label: "Ethical hacking" },
        { value: "CAREERS", label: "Careers in cyber" },
      ],
    },
    { name: "howHeard", label: "How did you hear about us?", hint: "Optional" },
    { name: "message", label: "Anything you'd like us to know?", type: "textarea", hint: "Optional" },
  ],
  MENTOR: [
    { name: "name", label: "Full name", required: true, autoComplete: "name" },
    email,
    phone,
    { name: "role", label: "Job title and employer", required: true, autoComplete: "organization-title" },
    {
      name: "mentorSkills", label: "What can you help with?", type: "checkboxes", hint: "Tick any",
      options: [
        { value: "SECURITY", label: "Security and ethical hacking" },
        { value: "SOFTWARE_CLOUD", label: "Software and cloud" },
        { value: "CAREERS", label: "Careers and interviews" },
        { value: "TALKS", label: "Talks and workshops" },
      ],
    },
    {
      name: "mentorTime", label: "Time you can give", type: "radio", required: true,
      options: [
        { value: "HOUR_A_MONTH", label: "1 hour a month" },
        { value: "TWO_HOURS_A_MONTH", label: "2 hours a month" },
        { value: "HOUR_A_WEEK", label: "1 hour a week" },
        { value: "ONE_OFF", label: "One-off sessions" },
      ],
    },
    {
      name: "mentorFormat", label: "Format", type: "radio", required: true,
      options: [
        { value: "ONLINE", label: "Online" },
        { value: "IN_PERSON", label: "In person" },
        { value: "EITHER", label: "Either" },
      ],
    },
    { name: "linkedin", label: "LinkedIn profile", type: "url", hint: "Optional" },
    { name: "message", label: "Anything you'd like us to know?", type: "textarea", hint: "Optional" },
  ],
  PARTNER: [
    { name: "organisation", label: "Organisation", required: true, autoComplete: "organization" },
    {
      name: "organisationType", label: "We are a", type: "radio", required: true,
      options: [
        { value: "SCHOOL", label: "School or college" },
        { value: "WOMEN_YOUTH", label: "Women's or youth organisation" },
        { value: "COMPANY", label: "Company or employer" },
        { value: "FUNDER", label: "Funder or foundation" },
        { value: "PUBLIC_BODY", label: "Local authority or public body" },
        { value: "OTHER", label: "Other" },
      ],
    },
    { name: "name", label: "Your name", required: true, autoComplete: "name" },
    email,
    phone,
    {
      name: "partnerHelp", label: "How would you like to help?", type: "checkboxes", required: true, hint: "Tick any",
      options: [
        { value: "FUNDING", label: "Funding" },
        { value: "SPACE", label: "A space for sessions" },
        { value: "REFERRALS", label: "Refer young women" },
        { value: "MENTORS_JOBS", label: "Mentors, work experience or jobs" },
      ],
    },
    {
      name: "fundingRange", label: "Approximate funding", type: "radio", required: true,
      showIf: { name: "partnerHelp", value: "FUNDING", label: "Funding" },
      options: [
        { value: "UNDER_5K", label: "Under £5,000" },
        { value: "FROM_5K_TO_25K", label: "£5,000 to £25,000" },
        { value: "FROM_25K_TO_100K", label: "£25,000 to £100,000" },
        { value: "OVER_100K", label: "Over £100,000" },
        { value: "DISCUSS", label: "Prefer to discuss" },
      ],
    },
    {
      name: "spaceDetails", label: "Space details", type: "textarea", required: true,
      hint: "Where is it, and how many people does it hold?",
      showIf: { name: "partnerHelp", value: "SPACE", label: "A space for sessions" },
    },
    { name: "message", label: "Anything to add", type: "textarea", hint: "Optional" },
  ],
};

const CONSENT: Record<RegistrationType, string> = {
  MEMBER: "I'm the person joining, or I have their permission to share these details. CyberSis can contact us about joining.",
  MENTOR: "I'm happy to complete safeguarding checks, and CyberSis can contact me about mentoring.",
  PARTNER: "CyberSis can contact me about this enquiry.",
};

const SUBMIT: Record<RegistrationType, string> = {
  MEMBER: "Join CyberSis",
  MENTOR: "Join as a mentor",
  PARTNER: "Send enquiry",
};

const THANKS: Record<RegistrationType, string> = {
  MEMBER: "We'll be in touch within 5 working days.",
  MENTOR: "We'll be in touch soon about next steps, including safeguarding checks.",
  PARTNER: "We'll reply within 5 working days.",
};

const initial: FormState = { status: "idle" };
const asList = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

export default function RegisterForm({ type }: { type: RegistrationType }) {
  const [state, action, pending] = useActionState(register, initial);
  // Set on mount, not at build time (these pages are static), for the bot timing
  // check. Also tells us JS is running, so conditional questions can be hidden.
  const [startedAt, setStartedAt] = useState("");
  useEffect(() => setStartedAt(String(Date.now())), []);
  const js = startedAt !== "";

  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};
  const values = state.status === "error" ? state.values ?? {} : {};

  // Ticked boxes that control conditional questions (partner: Funding, Space).
  const [ticked, setTicked] = useState<Record<string, string[]>>({});
  useEffect(() => {
    if (state.status === "error") setTicked({ partnerHelp: asList(state.values?.partnerHelp) });
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <h2>Thank you, we&rsquo;ve got your details.</h2>
        <p>{THANKS[type]}</p>
        <Link href="/" className="btn btn-primary">Back to home →</Link>
      </div>
    );
  }

  return (
    <form action={action} className="form" noValidate>
      {state.status === "error" && (
        <p className="form-alert" role="alert">{state.message}</p>
      )}

      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot: hidden from people and screen readers; bots tend to fill it. */}
      <div className="hp" aria-hidden="true">
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {FIELDS[type].map((f) => {
        if (f.showIf && js && !(ticked[f.showIf.name] ?? []).includes(f.showIf.value)) return null;

        const id = `f-${f.name}`;
        const err = errors[f.name];
        const hint = f.showIf && !js ? `Only if you ticked “${f.showIf.label}”. ${f.hint ?? ""}`.trim() : f.hint;
        const describedBy = [hint && `${id}-hint`, err && `${id}-err`].filter(Boolean).join(" ") || undefined;
        const mark = f.required && <span className="req" aria-hidden="true"> *</span>;
        const hintEl = hint && <span className="hint" id={`${id}-hint`}>{hint}</span>;
        const errEl = err && <span className="error" id={`${id}-err`}>{err}</span>;

        if (f.type === "radio" || f.type === "checkboxes") {
          const chosen = asList(values[f.name]);
          const controls = FIELDS[type].some((g) => g.showIf?.name === f.name);
          return (
            <fieldset className="field choices" key={f.name} aria-describedby={describedBy}>
              <legend>{f.label}{mark}</legend>
              {hintEl}
              {f.options!.map((o) => (
                <label className="choice" key={o.value}>
                  <input
                    type={f.type === "radio" ? "radio" : "checkbox"}
                    name={f.name}
                    value={o.value}
                    required={f.type === "radio" && f.required}
                    aria-invalid={err ? true : undefined}
                    defaultChecked={chosen.includes(o.value)}
                    onChange={
                      controls
                        ? (e) => {
                            const form = e.currentTarget.form!;
                            const on = [...form.querySelectorAll<HTMLInputElement>(`input[name="${f.name}"]:checked`)].map((i) => i.value);
                            setTicked((t) => ({ ...t, [f.name]: on }));
                          }
                        : undefined
                    }
                  />
                  <span>{o.label}</span>
                </label>
              ))}
              {errEl}
            </fieldset>
          );
        }

        const props = {
          id,
          name: f.name,
          required: f.required,
          autoComplete: f.autoComplete,
          defaultValue: (values[f.name] as string | undefined) ?? "",
          "aria-invalid": err ? true : undefined,
          "aria-describedby": describedBy,
        };
        return (
          <div className="field" key={f.name}>
            <label htmlFor={id}>{f.label}{mark}</label>
            {hintEl}
            {f.type === "textarea" ? <textarea rows={4} {...props} /> : <input type={f.type ?? "text"} {...props} />}
            {errEl}
          </div>
        );
      })}

      <div className="field field-check">
        <input
          type="checkbox"
          id="f-consent"
          name="consent"
          required
          defaultChecked={values.consent === "on"}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? "f-consent-err" : undefined}
        />
        <label htmlFor="f-consent">
          {CONSENT[type]} We keep these details for up to 12 months after we last contact you. See our{" "}
          <Link href="/privacy">privacy notice</Link>.
        </label>
        {errors.consent && <span className="error" id="f-consent-err">{errors.consent}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Sending…" : `${SUBMIT[type]} →`}
      </button>
      <p className="hint"><span aria-hidden="true">*</span> Required</p>
    </form>
  );
}
