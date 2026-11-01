import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & FAQs",
  description: "Get in touch with CyberSis, and answers to common questions about joining, mentoring and partnering.",
};

// Answers only restate what the site already commits to. TODO(content): review with the founder.
const faqs = [
  { q: "Who can join?", a: "Care-experienced young women aged 16–25, and young people raised by the village — by extended family, community or mentors when a parent could not be there. Migrant and refugee-background young people are welcome too." },
  { q: "Does it cost anything?", a: "No. Membership is free." },
  { q: "Do I need to know anything about tech?", a: "Not at all. Everything starts beginner-friendly — from \"I'm not techie\" to \"watch me.\"" },
  { q: "When does it start?", a: "CyberSis launches in May 2027 in Dundee, Scotland. Register your interest and we'll be in touch as the first circles open." },
  { q: "Can I help if I'm not in tech?", a: "Yes. Social workers, carers, teachers and community champions are all part of the village. Get in touch and tell us how you'd like to help." },
  { q: "How are mentors checked?", a: "Everyone working with members will go through safeguarding checks before they meet anyone. Full details will be on our safeguarding page before launch." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Say <span className="grad">hello.</span></>}
        lede={<>Questions, ideas, or want to be part of it? Email <a href={`mailto:${site.email}`}>{site.email}</a> and a real person will reply.</>}
      />

      <section>
        <div className="wrap">
          <div className="hero-cta" style={{ marginTop: 0 }}>
            <a href={mailto("Hello from the website")} className="btn btn-primary">Email the team →</a>
            <Link href="/get-involved" className="btn btn-ghost">Register your interest</Link>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">FAQs</span>
            <h2>Questions people <span className="grad">ask.</span></h2>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
