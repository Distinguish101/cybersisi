import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import RegisterForm from "@/components/RegisterForm";
import type { RegistrationType } from "@/lib/forms";

const ROLES: Record<string, { type: RegistrationType; eyebrow: string; title: React.ReactNode; lede: string; meta: string }> = {
  member: {
    type: "MEMBER",
    eyebrow: "Become a member",
    title: <>Join the <span className="grad">village.</span></>,
    lede: "Aged 16–25? Membership is free. Register your interest and we'll be in touch as the first circles open in May 2027.",
    meta: "Register your interest in becoming a CyberSis member — free for young women aged 16–25.",
  },
  mentor: {
    type: "MENTOR",
    eyebrow: "Mentor a member",
    title: <>Be the woman in cyber <span className="grad">you once needed.</span></>,
    lede: "Give an hour a month. Tell us a little about you and we'll be in touch. Everyone who works with members goes through safeguarding checks first.",
    meta: "Register your interest in mentoring a CyberSis member.",
  },
  partner: {
    type: "PARTNER",
    eyebrow: "Partner & fund",
    title: <>Open doors <span className="grad">at scale.</span></>,
    lede: "Universities, employers and funders: sponsor a circle, host a lab, or back the launch. Tell us what you have in mind.",
    meta: "Partner with or fund CyberSis.",
  },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(ROLES).map((role) => ({ role }));
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const r = ROLES[(await params).role];
  return r ? { title: r.eyebrow, description: r.meta } : {};
}

export default async function RegisterPage({ params }: { params: Promise<{ role: string }> }) {
  const r = ROLES[(await params).role];
  if (!r) notFound();
  return (
    <>
      <PageHero eyebrow={r.eyebrow} title={r.title} lede={r.lede} />
      <section>
        <div className="wrap">
          <RegisterForm type={r.type} />
        </div>
      </section>
    </>
  );
}
