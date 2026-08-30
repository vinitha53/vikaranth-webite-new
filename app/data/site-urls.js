import { industries, products } from "./catalog";
import { partners } from "./partners";

export const siteUrl = "https://www.vikranthchemicalcorporation.com";
export const lastSignificantUpdate = "2026-08-16";

export const corePages = [
  { path: "/", label: "Food Ingredients Supplier in Chennai and Pan India" },
  { path: "/about/", label: "About Vikranth Chemical Corporation" },
  { path: "/products/", label: "Food Ingredient Products" },
  { path: "/industries/", label: "Food Industries and Applications" },
  { path: "/associates/", label: "Ingredient Manufacturers and Suppliers" },
  { path: "/contact/", label: "Contact and Request a Quote" },
  { path: "/faq/", label: "Food Ingredient Supply Questions" },
  { path: "/brochure/", label: "Food Ingredient Brochure" },
  { path: "/site-map/", label: "HTML Sitemap" },
  { path: "/privacy/", label: "Privacy Policy" },
  { path: "/terms/", label: "Terms of Use" },
];

export const productPages = products.map(({ slug, name }) => ({ path: `/products/${slug}/`, label: `${name} Supplier in Chennai and India` }));
export const industryPages = industries.map(({ slug, name }) => ({ path: `/industries/${slug}/`, label: `${name} Supplier in Chennai and Pan India` }));
export const partnerPages = partners.map(({ slug, name }) => ({ path: `/associates/${slug}/`, label: `${name} Ingredient Portfolio` }));
export const allSitePages = [...corePages, ...industryPages, ...partnerPages, ...productPages];
export const absoluteUrl = (path) => new URL(path, siteUrl).href;
