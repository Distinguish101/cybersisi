"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*<>/01";

// Visual-only "decryption" effect. It is aria-hidden: the parent must carry
// the real text (e.g. in an .sr-only span) so screen readers never hear noise.
export default function DecodeText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (i < frame || text[i] === " ") out += text[i];
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setShown(out);
        frame += 0.5;
        if (frame >= text.length) {
          clearInterval(interval);
          setShown(text);
        }
      }, 38);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <span className={className} aria-hidden="true">
      {shown}
    </span>
  );
}
