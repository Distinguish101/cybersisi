import Link from "next/link";
import { site } from "@/lib/site";
import Brand from "./Brand";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Brand />
            <p>
              A cyber sisterhood for care-experienced young women and everyone raised by the village.
              Coded with care, in Dundee, Scotland.
            </p>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li><Link href="/story">Our story</Link></li>
              <li><Link href="/programmes">Programmes</Link></li>
              <li><Link href="/village">The village</Link></li>
              <li><Link href="/get-involved">Get involved</Link></li>
            </ul>
          </div>
          <div>
            <h2>Connect</h2>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Link href="/contact">Contact &amp; FAQs</Link></li>
              <li><Link href="/get-involved#mentors">Mentor with us</Link></li>
              <li><Link href="/get-involved#partners">Partner &amp; fund</Link></li>
            </ul>
          </div>
          <div>
            <h2>Trust</h2>
            <ul>
              <li><Link href="/safeguarding">Safeguarding</Link></li>
              <li><Link href="/privacy">Privacy &amp; cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <small>© {new Date().getFullYear()} {site.name} · Founded by Excelsis · Launching May 2027</small>
          <span className="memoriam">In memory of a mother. Carried by the village.</span>
        </div>
      </div>
    </footer>
  );
}
