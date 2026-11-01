export const site = {
  name: "CyberSis",
  tagline: "Coded with care",
  url: "https://cybersis.org",
  email: "hello@cybersis.org",
  description:
    "CyberSis is a cyber sisterhood for care-experienced young women. Building digital confidence, cyber literacy and emotional intelligence. Founded in Dundee, Scotland. Launching May 2027.",
};

export const mainNav = [
  { href: "/story", label: "Our story" },
  { href: "/programmes", label: "Programmes" },
  { href: "/village", label: "The village" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/contact", label: "Contact" },
];

export function mailto(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
