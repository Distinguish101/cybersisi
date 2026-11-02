import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "The village",
  description: "Who CyberSis is for: young women aged 16–25 from every background, and the mentors and allies who support them.",
};

const audiences = [
  { colour: "var(--magenta)", title: "Young women, 16–25", body: "Whatever your background and whatever your story — if you're curious about tech, this network was built for you." },
  { colour: "var(--violet)", title: "Raised by the village", body: "For young women carried by community, extended family, mentors and neighbours. Your village is welcome here." },
  { colour: "var(--cyan)", title: "New to the UK & finding their feet", body: "Young women building a future in a new country, one skill and one friendship at a time." },
  { colour: "var(--gold)", title: "Mentors, carers & allies", body: "Women in tech, social workers, teachers and community champions who want to pour into the next generation. Come and be the village." },
];

export default function VillagePage() {
  return (
    <>
      <PageHero
        eyebrow="The village"
        title={<>Who CyberSis is <span className="grad">for.</span></>}
        lede="Every young woman is welcome here — because the village is bigger than any one of us."
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
