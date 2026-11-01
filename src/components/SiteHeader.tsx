"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/site";
import Brand from "./Brand";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu after navigating or on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = mainNav.map((item) => (
    <li key={item.href}>
      <Link href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
        {item.label}
      </Link>
    </li>
  ));

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Brand />
        <nav aria-label="Main">
          <ul className="nav-links">{links}</ul>
        </nav>
        <Link href="/get-involved#members" className="btn btn-primary">
          Join the village →
        </Link>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <nav id="mobile-menu" aria-label="Mobile" className={`mobile-menu${open ? " open" : ""}`}>
        <div className="wrap">
          <ul>{links}</ul>
          <Link href="/get-involved#members" className="btn btn-primary">
            Join the village →
          </Link>
        </div>
      </nav>
    </header>
  );
}
