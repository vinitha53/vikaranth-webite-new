import { withSocialMetadata } from "../data/metadata";
import ContactBrochureFlipbook from "../contact/ContactBrochureFlipbook";
import styles from "./brochure.module.css";

export const metadata = withSocialMetadata({
  title: "Food Ingredient Product Brochure | Vikranth Chennai",
  description: "View or download Vikranth's food ingredient brochure, then request current availability, product documents and a B2B quotation.",
  alternates: { canonical: "/brochure/" },
  robots: { index: true, follow: true },
});

export default function BrochurePage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://www.vikranthchemicalcorporation.com/brochure/#webpage", url: "https://www.vikranthchemicalcorporation.com/brochure/", name: "Vikranth Food Ingredient Product Brochure", description: metadata.description, about: { "@id": "https://www.vikranthchemicalcorporation.com/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.vikranthchemicalcorporation.com/" }, { "@type": "ListItem", position: 2, name: "Brochure", item: "https://www.vikranthchemicalcorporation.com/brochure/" }] },
  ];

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <h1 className={styles.srOnly}>Vikranth Food Ingredient Product Brochure</h1>
    <section className={styles.viewerWrap} aria-label="Interactive food ingredient brochure">
      <ContactBrochureFlipbook standalone />
    </section>
  </main>;
}
