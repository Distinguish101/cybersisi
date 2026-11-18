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
            <b>Draft.</b> This is a plain-language summary. Our full privacy notice will be published here
            before CyberSis launches.
          </p>

          {/* TODO(policy): add controller details, hosting location and processor list once confirmed. */}
          <div className="prose">
            <h2>When you register your interest</h2>
            <p>We only ask for what we need to get back to you:</p>
            <ul>
              <li><strong>Everyone:</strong> a name and email, and a phone number if you choose to give one.</li>
              <li>
                <strong>Members:</strong> who is filling in the form (the young woman joining, a parent or guardian,
                or a teacher or youth worker), the name of the person joining and your name if different, her age
                range (16–17 or 18–25), a town or postcode area, what she&rsquo;s interested in, and optionally how
                you heard about us and anything you&rsquo;d like us to know.
              </li>
              <li>
                <strong>Mentors:</strong> your job title and employer, what you can help with, the time you can give,
                online or in person, and optionally your LinkedIn and anything you&rsquo;d like us to know.
              </li>
              <li>
                <strong>Partners:</strong> your organisation and what kind it is, how you&rsquo;d like to help, an
                approximate funding amount or details of a space if you offer them, and optionally anything to add.
              </li>
            </ul>
            <p>
              We use these details only to contact you about getting involved with CyberSis. We never sell
              them or use them for advertising. You tick a box to agree before anything is saved.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We delete your details 12 months after we last contacted you, unless you become a member,
              mentor or partner. You can ask us to delete them sooner at any time by emailing{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>Who else sees it</h2>
            <p>
              When you register, we get an email alert with your first name only. That alert is sent by
              our email provider. Your other details stay in our database.
            </p>

            <h2>Cookies</h2>
            <p>
              This website does not use advertising or tracking cookies. Our fonts are served from our own
              website, not from third parties.
            </p>

            <h2>Still to come in the full notice</h2>
            <ul>
              <li>Who we are as an organisation, and where your data is stored</li>
              <li>Your rights under UK GDPR, including how to complain to the ICO</li>
              <li>Privacy-friendly analytics, if we add it</li>
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
