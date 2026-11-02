import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Cyber labs, sisterhood circles, mentorship, confidence and career pathways — what CyberSis members do together.",
};

const programmes = [
  { badge: "LAB", title: "Cyber labs & CTF nights", body: "Beginner-friendly hacking challenges, online safety, and digital forensics — playful, practical, and confidence-first." },
  { badge: "CIRCLE", title: "Sisterhood circles", body: "Small, safe peer groups for emotional intelligence, resilience and wellbeing. The work that happens off the screen." },
  { badge: "1:1", title: "Mentorship matching", body: "Each member paired with a woman in cyber or tech — someone who's walked it and will answer the message." },
  { badge: "STAGE", title: "Confidence & voice", body: "Public speaking, storytelling and showcase events, so members can stand up and own their journey." },
  { badge: "PATH", title: "Pathways to careers", body: "CVs, internships, certifications and university support — turning skills into qualifications and jobs." },
  { badge: "GIVE", title: "Each one, teach one", body: "Members become mentors. The village grows itself — exactly the way Excelsis was carried." },
];

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we'll do together"
        title={<>Programmes for the <span className="grad">long game.</span></>}
        lede="Confidence, cyber skills and care — built week by week, in small groups, with women who've walked the path."
      />

      <section>
        <div className="wrap">
          <div className="prog-list">
            {programmes.map((p) => (
              <div className="prog reveal" key={p.badge}>
                <span className="badge">{p.badge}</span>
                <div>
                  <h2 style={{ fontSize: 18 }}>{p.title}</h2>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TODO(content): add session format, times and locations once confirmed. */}
      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Why cyber</span>
            <h2>A career that&rsquo;s <span className="grad">hiring.</span></h2>
            <p>
              Cyber security needs people who notice things, ask questions and look out for others —
              skills many young women already have. We add the technical know-how,
              the qualifications and the network to turn that into a career.
            </p>
          </div>
          <CtaBand />
        </div>
      </section>
    </>
  );
}
