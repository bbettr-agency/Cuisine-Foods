import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Robots policy.
 * We WANT AI-search citations, so every AI crawler (search, user, and training)
 * is explicitly allowed alongside classic search bots. No llms.txt (evidence: it
 * is ignored by Google/AI engines — GEO research 2026). If the client ever objects
 * to model *training*, disallow only GPTBot / ClaudeBot / Google-Extended here.
 */
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "Google-Extended", // Gemini/Vertex training + grounding
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT user-triggered fetch
  "GPTBot", // OpenAI training
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity user-triggered fetch
  "Claude-SearchBot", // Claude web search
  "Claude-User", // Claude user-triggered fetch
  "ClaudeBot", // Anthropic training
  "Applebot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/thank-you"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
