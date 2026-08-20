import type { MetadataRoute } from "next";
import { series } from "./catalog-data";
import { brandProfiles, guides, objectSolutions } from "./site-content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roman161rusrosrov-cmyk.github.io/sneg-klimat/";
  const base = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
  const url = (path = "") => new URL(path.replace(/^\//, ""), base).toString();
  const core = ["", "catalog", "brands", "solutions", "vrf", "services", "guides", "calculator"];

  return [
    ...core.map((path) => ({ url: url(path), changeFrequency: "weekly" as const, priority: path ? 0.8 : 1 })),
    ...series.map((item) => ({ url: url(`catalog/${item.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...brandProfiles.map((item) => ({ url: url(`brands/${item.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...objectSolutions.map((item) => ({ url: url(`solutions/${item.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...guides.map((item) => ({ url: url(`guides/${item.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
