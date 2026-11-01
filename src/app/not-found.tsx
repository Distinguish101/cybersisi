import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title={<>Page <span className="grad">not found.</span></>}
        lede="That link didn't decode. Let's get you somewhere useful."
      />
      <section>
        <div className="wrap">
          <Link href="/" className="btn btn-primary">Back to home →</Link>
        </div>
      </section>
    </>
  );
}
