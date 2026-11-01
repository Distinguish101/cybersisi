import type { Metadata } from "next";
import JoinCards from "@/components/JoinCards";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Join CyberSis as a member, mentor a young woman into cyber, or partner and fund the launch.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title={<>Be part of the <span className="grad">village.</span></>}
        lede="CyberSis launches in May 2027. Register your interest now and we'll be in touch as the first circles open."
      />
      <section>
        <div className="wrap">
          <JoinCards />
        </div>
      </section>
    </>
  );
}
