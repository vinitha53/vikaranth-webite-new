import { absoluteUrl, industryPages, partnerPages, productPages, rangePages, siteUrl } from "../data/site-urls";

export const dynamic = "force-static";

export function GET() {
  const productLinks = productPages.map(({ path, label }) => `- [${label}](${absoluteUrl(path)})`).join("\n");
  const industryLinks = industryPages.map(({ path, label }) => `- [${label}](${absoluteUrl(path)})`).join("\n");
  const partnerLinks = partnerPages.map(({ path, label }) => `- [${label}](${absoluteUrl(path)})`).join("\n");
  const body = `# Vikranth Chemical Corporation\n\n> Food ingredient supplier, distributor and wholesaler based in Chennai, serving South India and pan-India. Primarily B2B, with small businesses, home bakers and personal purchase enquiries welcome.\n\n## Primary pages\n- [Homepage](${siteUrl}/)\n- [Products](${siteUrl}/products/)\n- [Industries](${siteUrl}/industries/)\n- [Suppliers](${siteUrl}/associates/)\n- [Contact and quotation](${siteUrl}/contact/)\n- [Food ingredient supply FAQs](${siteUrl}/faq/)\n- [Brochure](${siteUrl}/brochure/)\n\n## Service area\nChennai, Tamil Nadu, South India and pan-India enquiries. Available packs and minimum quantities apply to all buyers. Product availability, grades, pack sizes, documentation, samples and delivery are confirmed per enquiry.\n\n## Industry pages\n${industryLinks}\n\n## Supplier pages\n${partnerLinks}\n\n## Specialist ranges\n${rangePages.map(({ path, label }) => `- [${label}](${absoluteUrl(path)})`).join("\n")}\n\n## Product pages\n${productLinks}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}