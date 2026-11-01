import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SupportLines from "@/components/SupportLines";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Safeguarding",
  description: "How CyberSis keeps members safe, how we check the adults who work with them, and how to raise a concern.",
};

// TODO(policy): placeholder structure only — the real policy must be written and
// approved by the organisation (with a named Designated Safeguarding Lead) before launch.
export default function SafeguardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Safeguarding"
        title={<>Your safety <span className="grad">comes first.</span></>}
        lede="Trust comes before curriculum. Here's how we keep members safe and what to do if you're worried."
      />

      <section>
        <div className="wrap">
          <p className="notice">
            <b>Draft.</b> Our full safeguarding policy is being written and will be published here before
            CyberSis launches in May 2027.
          </p>

          <div className="prose">
            <h2>Need help now?</h2>
            <p>If you are not safe right now, please contact one of these services. They are free and confidential.</p>
          </div>
          <SupportLines />

          <div className="prose">
            <h2>Raise a concern</h2>
            <p>
              If you are worried about a member, a mentor, or anything that has happened at CyberSis,
              tell us. Email <a href={mailto("Safeguarding concern")}>{site.email}</a> with
              &ldquo;Safeguarding concern&rdquo; in the subject line.
            </p>

            <h2>What this policy will cover</h2>
            <ul>
              <li>Who our Designated Safeguarding Lead is, and how to reach them</li>
              <li>How mentors and volunteers are checked, including PVG (Protecting Vulnerable Groups) membership in Scotland, references, and a final decision by a person</li>
              <li>How sessions are run and supervised, online and in person</li>
              <li>How we handle concerns and disclosures, and when we involve other services</li>
              <li>Rules for online contact between members and mentors</li>
              <li>Photos and names — we never share them without consent</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
