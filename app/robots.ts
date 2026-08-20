import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isGitHubPages = process.env.GITHUB_PAGES === "true";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sneg-klimat.clydemarlon809751.chatgpt.site/";
  const base = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;

  return {
    rules: isGitHubPages
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${base}sitemap.xml`,
  };
}
