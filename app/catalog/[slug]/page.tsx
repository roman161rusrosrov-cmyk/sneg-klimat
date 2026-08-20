import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { series } from "../../catalog-data";
import { InnerLayout, PageIntro, SeriesCover, Icon, PriceCall } from "../../site-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return series.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const record = series.find((item) => item.slug === slug);
  if (!record) return {};
  const title = `${record.brand} ${record.name} — каталог СНЕГ`;
  const description = `${record.brand} ${record.name}: ${record.models.length} моделей и вариантов исполнения. Подбор и актуальная цена по телефону.`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roman161rusrosrov-cmyk.github.io/sneg-klimat/";
  const base = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
  const image = new URL(`catalog/${record.slug}.webp`, base).toString();
  return {
    title,
    description,
    alternates: { canonical: new URL(`catalog/${record.slug}/`, base).toString() },
    openGraph: { title, description, type: "website", images: [{ url: image, width: 1000, height: 1000, alt: `${record.brand} ${record.name}` }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = series.find((item) => item.slug === slug);
  if (!record) notFound();
  const related = series.filter((item) => item.brand === record.brand && item.slug !== record.slug).slice(0, 3);

  return (
    <InnerLayout>
      <PageIntro eyebrow={`${record.brand} · серия`} title={record.name} lead="Доступные модели, варианты исполнения и помощь с подбором оборудования под параметры вашего объекта." fallback="/catalog" />
      <section className="inner-section product-section">
        <div className="shell product-layout">
          <SeriesCover record={record} eager />
          <div className="product-copy">
            <div className="card-labels"><span>{record.brand}</span>{record.new2026 && <b>Новинка 2026</b>}</div>
            <h2>Модели и варианты серии</h2>
            <div className="verified-meta">
              {record.technology !== "not-confirmed" && <span>{record.technology === "inverter" ? "Инвертор" : "On / Off"}</span>}
              {record.refrigerant && <span>Хладагент {record.refrigerant}</span>}
              <span>{record.models.length} обозначений</span>
            </div>
            <ul className="model-list">{record.models.map((model) => <li key={model}>{model}</li>)}</ul>
            {record.variants && <div className="product-variants"><strong>Варианты исполнения</strong><div>{record.variants.map((variant) => <span key={variant}>{variant}</span>)}</div></div>}
            {record.note && <p className="source-note"><strong>Уточнение по серии:</strong> {record.note}</p>}
            <PriceCall product={`${record.brand} ${record.name}`} />
            <div className="product-actions"><Link className="button button-primary" href="/calculator">Рассчитать мощность <Icon name="arrow" /></Link><Link className="button button-ghost" href={`/brands/${record.brand.toLowerCase()}`}>Все серии {record.brand}</Link></div>
          </div>
        </div>
      </section>
      <section className="inner-section related-section"><div className="shell"><div className="section-head"><p className="kicker">Ещё у бренда</p><h2>Другие серии {record.brand}</h2></div><div className="related-grid">{related.map((item) => <article className="related-card" key={item.slug}><Link className="related-card-cover" href={`/catalog/${item.slug}`} aria-label={`Открыть ${item.brand} ${item.name}`}><SeriesCover record={item} /></Link><span>{item.brand}</span><Link className="related-card-title" href={`/catalog/${item.slug}`}>{item.name}</Link><PriceCall product={`${item.brand} ${item.name}`} compact /></article>)}</div></div></section>
    </InnerLayout>
  );
}
