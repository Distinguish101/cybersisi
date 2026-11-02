import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our story",
  description: "CyberSis was built from lived experience — how one young woman, carried by the village, is opening the door for others.",
};

// NOTE: open decision — how much of the founder's (and her brother's) personal
// story stays public. Content below is the founder's original copy, unchanged.
export default function StoryPage() {
  return (
    <>
      <section>
        <div className="wrap story-grid">
          <div className="story reveal">
            <span className="eyebrow">Our story</span>
            <h1>Built from lived <span className="grad">experience.</span></h1>
            <p>
              CyberSis began with one young woman who knows what it means to start again.{" "}
              <strong>Excelsis arrived in the UK in 2020</strong>, found her footing in a new country,
              and in 2022 lost her mother to cancer. Her father was absent. She and her brother were
              raised, from there, by the village — the carers, mentors and communities who step in when
              family cannot.
            </p>
            <p>
              Today she studies <strong>Ethical Hacking at Abertay University</strong>, and she has
              made a decision: her experience will not be a closing chapter, it will be a doorway for
              others.
            </p>
            <p>
              CyberSis is that doorway. A network where young women become{" "}
              <strong>digitally confident, cyber literate and emotionally intelligent</strong> — and
              where no one walks the path alone.
            </p>
          </div>

          <div className="story-card reveal">
            <span className="tag">// the journey so far</span>
            <ul className="timeline">
              <li><span className="yr">2020</span><span className="ev">A new beginning — Excelsis and her brother arrive in the UK.</span></li>
              <li><span className="yr">2022</span><span className="ev">Loss, and the village steps in. Never without community.</span></li>
              <li><span className="yr">2025</span><span className="ev">Cyber Security studies began at West Lothian College.</span></li>
              <li><span className="yr">2026</span><span className="ev">Ethical Hacking studies began at Abertay University.</span></li>
              <li><span className="yr">May 2027</span><span className="ev">CyberSis launches — turning lived experience into shared opportunity.</span></li>
            </ul>
            <p className="memoriam" style={{ marginTop: 24 }}>
              In loving memory of her mother — resting in Falkirk. Every door we open is opened in her honour.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="founder reveal">
            <span className="eyebrow">A word from our founder</span>
            <p className="quote">
              &ldquo;I know what it is to lose almost everything and be carried by people who didn&rsquo;t
              have to. CyberSis is how I carry the next girl — with skills, with sisterhood, and with the
              belief that her story is worth decoding.&rdquo;
            </p>
            <div className="sig">
              <div className="avatar" aria-hidden="true">E</div>
              <div className="who"><b>Excelsis Ikem</b><span>Founder · BSc Ethical Hacking, Abertay University</span></div>
            </div>
            <p className="memoriam" style={{ marginTop: 28, maxWidth: "34ch" }}>
              &ldquo;However long the night, the dawn will break.&rdquo; — African proverb
            </p>
          </div>
          <CtaBand />
        </div>
      </section>
    </>
  );
}
