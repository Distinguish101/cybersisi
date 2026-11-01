import Link from "next/link";
import { mailto } from "@/lib/site";

export default function CtaBand() {
  return (
    <div className="cta-band reveal">
      <h2>
        Her future is <span className="grad">encrypted.</span> Help us reveal it.
      </h2>
      <p>Register your interest — as a member, a mentor, or a partner — and join CyberSis from day one.</p>
      <div className="row">
        <Link href="/get-involved" className="btn btn-primary">
          Register your interest →
        </Link>
        <a href={mailto("Partnership enquiry")} className="btn btn-ghost">
          Email the team
        </a>
      </div>
    </div>
  );
}
