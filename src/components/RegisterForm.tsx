"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { register } from "@/app/get-involved/actions";
import type { FormState, RegistrationType } from "@/lib/forms";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "textarea" | "select";
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  options?: { value: string; label: string }[];
};

const common: Field[] = [
  { name: "firstName", label: "First name", required: true, autoComplete: "given-name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", hint: "Optional" },
];

const FIELDS: Record<RegistrationType, Field[]> = {
  MEMBER: [
    ...common,
    {
      name: "ageRange", label: "Age", type: "select", required: true,
      options: [{ value: "16-17", label: "16–17" }, { value: "18-25", label: "18–25" }],
      hint: "CyberSis is for young women aged 16–25.",
    },
    { name: "howHeard", label: "How did you hear about us?", hint: "Optional" },
    { name: "message", label: "Anything you'd like us to know?", type: "textarea", hint: "Optional" },
  ],
  MENTOR: [
    ...common,
    { name: "role", label: "Job or role", required: true, autoComplete: "organization-title" },
    { name: "linkedin", label: "LinkedIn profile", type: "url", hint: "Optional" },
    { name: "message", label: "Why would you like to mentor?", type: "textarea", required: true },
  ],
  PARTNER: [
    ...common,
    { name: "organisation", label: "Organisation", required: true, autoComplete: "organization" },
    {
      name: "interest", label: "How would you like to help?", type: "select", required: true,
      options: [
        { value: "SPONSOR", label: "Sponsor a circle" },
        { value: "HOST", label: "Host a lab or event" },
        { value: "FUND", label: "Fund the launch" },
        { value: "OTHER", label: "Something else" },
      ],
    },
    { name: "message", label: "What do you have in mind?", type: "textarea", required: true },
  ],
};

const initial: FormState = { status: "idle" };

export default function RegisterForm({ type }: { type: RegistrationType }) {
  const [state, action, pending] = useActionState(register, initial);
  // Set on mount, not at build time (these pages are static), for the bot timing check.
  const [startedAt, setStartedAt] = useState("");
  useEffect(() => setStartedAt(String(Date.now())), []);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <h2>Thank you — you&rsquo;re on the list.</h2>
        <p>We&rsquo;ll be in touch as CyberSis gets ready to launch in May 2027.</p>
        <Link href="/" className="btn btn-primary">Back to home →</Link>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};
  const values = state.status === "error" ? state.values ?? {} : {};

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
        const id = `f-${f.name}`;
        const err = errors[f.name];
        const describedBy = [f.hint && `${id}-hint`, err && `${id}-err`].filter(Boolean).join(" ") || undefined;
        const props = {
          id,
          name: f.name,
          required: f.required,
          autoComplete: f.autoComplete,
          defaultValue: values[f.name] ?? "",
          "aria-invalid": err ? true : undefined,
          "aria-describedby": describedBy,
        };
        return (
          <div className="field" key={f.name}>
            <label htmlFor={id}>
              {f.label}
              {f.required && <span className="req" aria-hidden="true"> *</span>}
            </label>
            {f.hint && <span className="hint" id={`${id}-hint`}>{f.hint}</span>}
            {f.type === "textarea" ? (
              <textarea rows={4} {...props} />
            ) : f.type === "select" ? (
              <select {...props}>
                <option value="" disabled>Choose…</option>
                {f.options!.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <input type={f.type ?? "text"} {...props} />
            )}
            {err && <span className="error" id={`${id}-err`}>{err}</span>}
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
          I&rsquo;m happy for CyberSis to keep these details so they can contact me about getting involved.
          We keep them for up to 12 months after we last contact you — see our{" "}
          <Link href="/privacy">privacy notice</Link>.
        </label>
        {errors.consent && <span className="error" id="f-consent-err">{errors.consent}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Sending…" : "Register your interest →"}
      </button>
      <p className="hint"><span aria-hidden="true">*</span> Required</p>
    </form>
  );
}
