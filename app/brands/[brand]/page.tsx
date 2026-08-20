import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogClient from "../../catalog/catalog-client";
import { brandProfiles } from "../../site-content";
import { InnerLayout, PageIntro } from "../../site-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return brandProfiles.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = brandProfiles.find((item) => item.slug === slug);
  return brand ? { title: `${brand.name} — каталог СНЕГ`, description: brand.description } : {};
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const brand = brandProfiles.find((item) => item.slug === slug);
  if (!brand) notFound();
  return (
    <InnerLayout>
      <PageIntro eyebrow={`Бренд · ${brand.lead}`} title={brand.name} lead={brand.description} fallback="/brands" />
      <section className="inner-section catalog-section"><div className="shell"><CatalogClient initialBrand={brand.name} /></div></section>
    </InnerLayout>
  );
}
