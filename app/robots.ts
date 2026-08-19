import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isGitHubPages = process.env.GITHUB_PAGES === "true";

  return {
    rules: isGitHubPages
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
  };
}
