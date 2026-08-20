import type { Metadata } from "next";
import Link from "next/link";
import { brandProfiles } from "../site-content";
import { series } from "../catalog-data";
import { BrandGlyph, CategoryShowcase, InnerLayout, ManagerBanner, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = { title: "Бренды кондиционеров — СНЕГ", description: "Chigo, Haier, JAX, Rovex и Vickers в каталоге СНЕГ." };

export default function BrandsPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Бренды" title="Пять каталогов в одной системе" lead="Серии Chigo, Haier, JAX, Rovex и Vickers собраны в отдельных каталогах с быстрым переходом к каждой линейке." />
      <CategoryShowcase eyebrow="Структура каталога" title="Каждый бренд — отдельный маршрут" text="Открывайте каталог производителя, применяйте фильтры и переходите на самостоятельные страницы серий. Мы не смешиваем разные линейки в одну длинную витрину." metrics={[["5", "брендов"], ["44", "серии"], ["100%", "отдельные страницы"]]} tone="ice" />
      <section className="inner-section brand-directory-section"><div className="shell brand-page-grid">{brandProfiles.map((brand) => <Link href={`/brands/${brand.slug}`} key={brand.slug} className={`brand-page-card brand-tone-${brand.slug}`}><span>{brand.name.slice(0, 1)}</span><BrandGlyph /><div><small>{series.filter((item) => item.brand === brand.name).length} серий</small><h2>{brand.name}</h2><p>{brand.description}</p></div><Icon name="arrow" /></Link>)}</div></section>
      <ManagerBanner title="Сравним серии разных брендов" text="Если важны тишина, работа в межсезонье, конкретное исполнение или ограничение по наружному блоку — озвучьте задачу менеджеру." product="кондиционер выбранного бренда" secondaryHref="/compare" secondaryLabel="Сравнить типы систем" />
    </InnerLayout>
  );
}
