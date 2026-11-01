import Link from "next/link";
import { site } from "@/lib/site";

export default function Brand() {
  return (
    <Link href="/" className="brand">
      <span className="mark" aria-hidden="true">
        <span>&lt;/&gt;</span>
      </span>
      {site.name}
    </Link>
  );
}
