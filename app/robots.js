import { siteUrl } from "./data/site-urls";

export const dynamic = "force-static";

const searchableCrawlers = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-User",
  "Applebot",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...searchableCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "GPTBot", allow: "/" },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/sitemap.txt`],
    host: siteUrl,
  };
}