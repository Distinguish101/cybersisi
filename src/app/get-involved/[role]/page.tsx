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
    lede: "For young women aged 16–25, or a parent, guardian, teacher or youth worker on her behalf. Membership is free. Takes about a minute, and we'll be in touch within 5 working days.",
    meta: "Register your interest in becoming a CyberSis member — free for young women aged 16–25.",
  },
  mentor: {
    type: "MENTOR",
    eyebrow: "Mentor a member",
    title: <>Be the woman in cyber <span className="grad">you once needed.</span></>,
    lede: "Share your cyber or tech experience with young women starting out. Takes about a minute. Everyone who works with members completes safeguarding checks first.",
    meta: "Register your interest in mentoring a CyberSis member.",
  },
  partner: {
    type: "PARTNER",
    eyebrow: "Partner & fund",
    title: <>Open doors <span className="grad">at scale.</span></>,
    lede: "Schools, organisations, employers, funders and venues: tell us who you are and how you would like to help. We'll reply within 5 working days.",
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
