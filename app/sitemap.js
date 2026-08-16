import { absoluteUrl, allSitePages, lastSignificantUpdate } from "./data/site-urls";

export const dynamic = "force-static";

export default function sitemap() {
  return allSitePages.map(({ path }) => ({
    url: absoluteUrl(path),
    lastModified: lastSignificantUpdate,
  }));
}