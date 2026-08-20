import type { Metadata } from "next";
import "./globals.css";

const title = "СНЕГ — кондиционирование и вентиляция";
const description = "Подбор кондиционеров, вентиляции и VRV/VRF‑систем для дома и бизнеса. Расчёт, поставка, монтаж и сервис.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roman161rusrosrov-cmyk.github.io/sneg-klimat/";
const siteBase = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
const faviconUrl = new URL("favicon.svg", siteBase);
const socialImageUrl = new URL("og.png", siteBase);
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "СНЕГ — кондиционирование и вентиляция",
  url: siteBase.toString(),
  inLanguage: "ru-RU",
  description,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: faviconUrl, shortcut: faviconUrl },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    images: [{ url: socialImageUrl.toString(), width: 1672, height: 941, alt: "СНЕГ — комфортный климат, точно по расчёту" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImageUrl.toString()],
  },
  robots: process.env.GITHUB_PAGES === "true"
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></body></html>;
}
