import { industries, products } from "./data/catalog";
import { partners } from "./data/partners";

export const dynamic = "force-static";

export default function sitemap() {
  const base = "https://www.vikranthchem.com";
  return [
    {
      url: "https://www.vikranthchem.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    { url: `${base}/products/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...products.map(({slug}) => ({ url: `${base}/products/${slug}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 })),
    { url: `${base}/industries/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...industries.map(({slug}) => ({ url: `${base}/industries/${slug}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 })),
    { url: `${base}/associates/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...partners.map(({slug}) => ({ url: `${base}/associates/${slug}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 })),
  ];
}
