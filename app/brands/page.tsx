import type { Metadata } from "next";
import Link from "next/link";
import { brandProfiles } from "../site-content";
import { series } from "../catalog-data";
import { InnerLayout, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = { title: "Бренды кондиционеров — СНЕГ", description: "Chigo, Haier, JAX, Rovex и Vickers в каталоге СНЕГ." };

export default function BrandsPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Бренды" title="Пять каталогов в одной системе" lead="Все бренды из предоставленного Яндекс.Диска разобраны по сериям и связаны с отдельными страницами." />
      <section className="inner-section"><div className="shell brand-page-grid">{brandProfiles.map((brand) => <Link href={`/brands/${brand.slug}`} key={brand.slug} className={`brand-page-card brand-tone-${brand.slug}`}><span>{brand.name.slice(0, 1)}</span><div><small>{series.filter((item) => item.brand === brand.name).length} серий</small><h2>{brand.name}</h2><p>{brand.description}</p></div><Icon name="arrow" /></Link>)}</div></section>
    </InnerLayout>
  );
}
