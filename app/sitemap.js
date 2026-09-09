import { absoluteUrl, allSitePages, lastSignificantUpdate } from "./data/site-urls";

import { products, industries } from "./data/catalog";
import { partners } from "./data/partners";

const pageImages = new Map([
  ["/", "/hero-home-poster.webp"],
  ...products.map(item => [`/products/${item.slug}/`, item.image]),
  ...industries.map(item => [`/industries/${item.slug}/`, item.image]),
  ...partners.map(item => [`/associates/${item.slug}/`, item.image]),
]);

export const dynamic = "force-static";

export default function sitemap() {
  return allSitePages.map(({ path }) => ({
    url: absoluteUrl(path),
    lastModified: lastSignificantUpdate,
    images: pageImages.has(path) ? [absoluteUrl(pageImages.get(path))] : path.includes("/mec3/") ? [absoluteUrl("/mec3/mec3-catalog-hero.webp")] : undefined,
  }));
}