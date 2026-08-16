import { absoluteUrl, allSitePages } from "../data/site-urls";

export const dynamic = "force-static";

export function GET() {
  const body = `${allSitePages.map(({ path }) => absoluteUrl(path)).join("\n")}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}