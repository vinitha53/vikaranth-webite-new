# Website search and buyer-experience improvements

Implemented for Vikranth Chemical Corporation, Chennai, on 9 September 2026.

## Scope
- Shared changes cover product, industry, supplier and specialist range pages, plus company, contact, FAQ, brochure and policy-page metadata.
- Natural Chennai, South India and pan-India positioning; B2B remains the primary audience, with small businesses, home bakers and individual buyers welcomed.
- New responsive buyer cards, clearer homepage copy, visible mobile hero content and accessible video pause controls.
- Product entities, visible buyer FAQs, local business address and service areas, canonical URLs and consistent social previews.
- XML and HTML sitemaps include all 472 content pages, including 17 MEC3 ranges; image URLs are included in the XML sitemap.
- On-site search understands purchase and location qualifiers and includes catalogue product brands.
- Product company field is optional. Contact enquiry type can be preselected for small orders. Homepage quote popup directs buyers to the working contact page; email draft preparation no longer claims receipt.
- Ten industry hero images converted to WebP: 19,583,847 bytes to 1,250,126 bytes (93.6% reduction), retaining original source artwork.

## Evidence
See search-site-audit.json, media-audit.json, layout-verification.json, interaction-verification.json and media-optimization.json. Reports describe tested conditions, not estimated ranking scores. Layout checks cover representative templates at 1440px and 390px; automated HTML checks cover every exported content page. Image decoding checks file integrity, not independent verification of every product illustration against manufacturer packaging.

## Search and AI visibility
SEO foundations, clear useful content, crawlable links, structured data matching visible information and a good buying experience support both conventional and AI search. No ranking, rich result, AI citation or indexing guarantee is made. The existing llms.txt is maintained as a directory, not presented as a Google ranking factor. Product schema omits unverified prices, offers, reviews and availability. Background video is decorative, not represented as a dedicated watch page.

Official guidance consulted:
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/appearance/video

## Release and measurement
Changes are local until deployed. After deployment, verify the production domain, submit the sitemap in Google Search Console and Bing Webmaster Tools, check indexing and real-user Core Web Vitals, and maintain an accurate Google Business Profile. These external accounts have not been configured or submitted from this workspace. Search performance and AI citations need ongoing measurement after crawling.

## Commands
- npm run build (set VCC_LOW_MEMORY_BUILD=1 for a single-worker build)
- npm run audit:search
- npm run audit:media
- npm run test:search
- npm run verify:layouts

The homepage WhatsApp payload addition was rejected by automatic approval review; the implemented alternative uses an internal contact-page link and transfers no form payload from the popup.

## Final automated results
- Production build: passed using VCC_LOW_MEMORY_BUILD=1.
- Exported content pages: 472; sitemap URLs: 472.
- HTML, structured-data JSON, canonical, title, description, social preview, image dimensions and internal-link checks: zero reported issues.
- Referenced HTML/CSS media files: 481; no missing referenced assets.
- Public images: 1,320 validated; zero remaining decoding failures after memory-related failures were retried sequentially.
- Search intent unit checks: six passed.
- Browser verification: 15 representative routes at desktop and mobile widths (30 layout checks), with no detected horizontal overflow, broken images or uncaught JavaScript errors.
- Browser interactions: local purchase-intent search, small-order contact preselection, optional company field, video pause, both 17.25-second video variants, and reduced-motion fallback passed.
- Visual review additionally corrected mobile hero positioning and spacing around the floating contact controls.
