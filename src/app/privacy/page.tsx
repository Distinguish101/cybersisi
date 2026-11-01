import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & cookies",
  description: "What information CyberSis collects, why, and your rights under UK GDPR.",
};

// TODO(policy): placeholder structure only — must be completed (controller details,
// lawful bases, processors, retention periods) before any form collects data.
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title={<>Your data, <span className="grad">your say.</span></>}
        lede="We collect as little as we can, keep it safe, and never sell it."
      />

      <section>
        <div className="wrap">
          <p className="notice">
            <b>Draft.</b> Our full privacy notice will be published here before we start collecting any
            registrations.
          </p>

          <div className="prose">
            <h2>Right now</h2>
            <p>
              This website does not use advertising or tracking cookies, and it does not collect personal
              information unless you choose to email us. Our fonts are served from our own website, not
              from third parties.
            </p>

            <h2>What this notice will cover</h2>
            <ul>
              <li>Who we are and how to contact us about your data</li>
              <li>What we collect when you register, and why we need it</li>
              <li>Who we share it with (for example, our email provider) and where it is stored</li>
              <li>How long we keep it, and how to ask us to delete it</li>
              <li>Your rights under UK GDPR, including how to complain to the ICO</li>
              <li>Cookies and privacy-friendly analytics</li>
            </ul>

            <h2>Questions</h2>
            <p>
              Email <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
