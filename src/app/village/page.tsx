import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "The village",
  description: "Who CyberSis is for: care-experienced young women, young people raised by the village, those new to the UK, and the mentors and allies who support them.",
};

const audiences = [
  { colour: "var(--magenta)", title: "Care-experienced young women", body: "If you've been looked-after, fostered, kinship-cared, or have grown up navigating the care system — this network was built first for you." },
  { colour: "var(--violet)", title: "Raised by the village", body: "For young people carried by community, extended family, mentors and neighbours when a parent could not be there. Your village is welcome here." },
  { colour: "var(--cyan)", title: "New to the UK & finding their feet", body: "Migrant and refugee-background young people building a future in a new country, one skill and one friendship at a time." },
  { colour: "var(--gold)", title: "Mentors, carers & allies", body: "Women in tech, social workers, teachers and community champions who want to pour into the next generation. Come and be the village." },
];

export default function VillagePage() {
  return (
    <>
      <PageHero
        eyebrow="The village"
        title={<>Who CyberSis is <span className="grad">for.</span></>}
        lede="We lead with care-experienced young women — and we keep the door wide, because the village is bigger than any one of us."
      />

      <section>
        <div className="wrap">
          <div className="for-grid">
            {audiences.map((a) => (
              <div className="for-card reveal" key={a.title}>
                <h2 style={{ fontSize: 20, marginBottom: 10 }}>
                  <span className="dot" style={{ background: a.colour }} />
                  {a.title}
                </h2>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
          <CtaBand />
        </div>
      </section>
    </>
  );
}
