import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import DecodeText from "@/components/DecodeText";
import JoinCards from "@/components/JoinCards";
import Pillars from "@/components/Pillars";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Launching May 2027 · Dundee, Scotland</span>
            <h1>
              <span className="sr-only">Coded with care.</span>
              <DecodeText text="Coded" delay={200} />
              <br />
              <DecodeText text="with care." className="grad" delay={460} />
            </h1>
            <p className="lede">
              A cyber sisterhood for young women. We build digital confidence, cyber literacy and
              emotional intelligence, together.
            </p>
            <div className="hero-cta">
              <Link href="/get-involved#members" className="btn btn-primary">Join the village →</Link>
              <Link href="/story" className="btn btn-ghost">Read our story</Link>
            </div>
            <div className="hero-meta">
              <div className="item"><span className="num">3 pillars</span><span className="lab">Confidence · Cyber · Care</span></div>
              <div className="item"><span className="num">Ages 16–25</span><span className="lab">Open to all young women</span></div>
              <div className="item"><span className="num">Student-led</span><span className="lab">Abertay University</span></div>
            </div>
          </div>

          <div
            className="terminal"
            role="img"
            aria-label="A terminal window decoding a young person's identity from 'unseen' to 'secured'."
          >
            <div className="term-bar"><i /><i /><i /><span className="title">cybersis — secure_session</span></div>
            <div className="term-body">
              <div className="ln">$ <span className="ok">cybersis</span> init --member</div>
              <div className="ln">&gt; decrypting story<span className="key">...</span></div>
              <div className="ln">&gt; status: <span className="ok">SEEN</span></div>
              <div className="ln">&gt; confidence: <span className="key">building</span></div>
              <div className="ln">&gt; support: <span className="you">the village</span></div>
              <div className="ln">&gt; future: <span className="ok">SECURED</span><span className="cursor" /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="proverb reveal">
        <div className="wrap">
          <p className="q">It takes a village to raise a child.</p>
          <span className="src">African proverb · the heart of CyberSis</span>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">What we build</span>
            <h2>Three pillars, one <span className="grad">confident woman.</span></h2>
            <p>
              Cyber skills open doors. But confidence keeps them open, and emotional intelligence helps
              you bring others through. CyberSis builds all three, on purpose.
            </p>
          </div>
          <Pillars />
          <div className="sec-more reveal">
            <Link href="/programmes" className="btn btn-ghost">See our programmes →</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Get involved</span>
            <h2>Be part of the <span className="grad">village.</span></h2>
            <p>
              CyberSis launches in May 2027. Register your interest now and we&rsquo;ll be in touch as
              the first circles open.
            </p>
          </div>
          <JoinCards />
          <CtaBand />
        </div>
      </section>
    </>
  );
}
