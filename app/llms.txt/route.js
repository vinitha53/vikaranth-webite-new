import { absoluteUrl, industryPages, partnerPages, productPages, siteUrl } from "../data/site-urls";

export const dynamic = "force-static";

export function GET() {
  const productLinks = productPages.map(({ path, label }) => `- [${label}](${absoluteUrl(path)})`).join("\n");
  const industryLinks = industryPages.map(({ path, label }) => `- [${label}](${absoluteUrl(path)})`).join("\n");
  const partnerLinks = partnerPages.map(({ path, label }) => `- [${label}](${absoluteUrl(path)})`).join("\n");
  const body = `# Vikranth Chemical Corporation\n\n> B2B food ingredient supplier based in Chennai, serving manufacturers, bakeries, processors and professional buyers across India.\n\n## Primary pages\n- [Homepage](${siteUrl}/)\n- [Products](${siteUrl}/products/)\n- [Industries](${siteUrl}/industries/)\n- [Suppliers](${siteUrl}/associates/)\n- [Contact and quotation](${siteUrl}/contact/)\n- [Food ingredient supply FAQs](${siteUrl}/faq/)\n- [Brochure](${siteUrl}/brochure/)\n\n## Service area\nChennai, Tamil Nadu, South India and Pan India business enquiries. Product availability, grades, pack sizes, documentation, samples and delivery are confirmed per enquiry.\n\n## Industry pages\n${industryLinks}\n\n## Supplier pages\n${partnerLinks}\n\n## Product pages\n${productLinks}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}