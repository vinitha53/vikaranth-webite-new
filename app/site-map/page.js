import Link from "next/link";

export const metadata = {
  title: "HTML Sitemap | Vikranth Chemical Corporation",
  description: "Browse the main sections of the Vikranth Chemical Corporation website.",
  alternates: { canonical: "/site-map/" },
};

export default function SiteMapPage() {
  const links = [
    ["Home", "/"],
    ["About Vikranth", "/#about"],
    ["Food ingredient products", "/#products"],
    ["Find by application", "/#applications"],
    ["Industries served", "/#industries"],
    ["Brand partners", "/#suppliers"],
    ["Quality and compliance", "/#quality"],
    ["Technical resources", "/#insights"],
    ["Frequently asked questions", "/#faq"],
    ["Contact and request a quote", "/contact"],
    ["View or download brochure", "/brochure"],
  ];

  return (
    <main className="sitemap-page">
      <div className="container">
        <Link href="/" className="sitemap-back">← Back to homepage</Link>
        <span className="eyebrow">Website navigation</span>
        <h1>HTML Sitemap</h1>
        <p>Use these links to browse Vikranth Chemical Corporation’s primary homepage resources.</p>
        <nav aria-label="Sitemap">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
      </div>
    </main>
  );
}
