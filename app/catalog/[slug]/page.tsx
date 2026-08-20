import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { series } from "../../catalog-data";
import { InnerLayout, PageIntro, SeriesCover, Icon } from "../../site-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return series.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const record = series.find((item) => item.slug === slug);
  if (!record) return {};
  const title = `${record.brand} ${record.name} — каталог СНЕГ`;
  const description = `${record.brand} ${record.name}: ${record.models.length} обозначений моделей в предоставленных материалах.`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sneg-klimat.clydemarlon809751.chatgpt.site/";
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
      <PageIntro eyebrow={`${record.brand} · серия`} title={record.name} lead="Страница построена по структуре и изображениям из предоставленных материалов. Неподтверждённые характеристики и цены не добавлены." fallback="/catalog" />
      <section className="inner-section product-section">
        <div className="shell product-layout">
          <SeriesCover record={record} eager />
          <div className="product-copy">
            <div className="card-labels"><span>{record.brand}</span>{record.new2026 && <b>Новинка 2026</b>}</div>
            <h2>Что есть в исходных материалах</h2>
            <div className="verified-meta">
              {record.technology !== "not-confirmed" && <span>{record.technology === "inverter" ? "Инвертор" : "On / Off"}</span>}
              {record.refrigerant && <span>Хладагент {record.refrigerant}</span>}
              <span>{record.models.length} обозначений</span>
            </div>
            <ul className="model-list">{record.models.map((model) => <li key={model}>{model}</li>)}</ul>
            {record.variants && <div className="product-variants"><strong>Варианты исполнения</strong><div>{record.variants.map((variant) => <span key={variant}>{variant}</span>)}</div></div>}
            {record.note && <p className="source-note"><strong>Требует сверки:</strong> {record.note}</p>}
            <div className="product-actions"><Link className="button button-primary" href="/calculator">Рассчитать мощность <Icon name="arrow" /></Link><Link className="button button-ghost" href={`/brands/${record.brand.toLowerCase()}`}>Все серии {record.brand}</Link></div>
          </div>
        </div>
      </section>
      <section className="inner-section related-section"><div className="shell"><div className="section-head"><p className="kicker">Ещё у бренда</p><h2>Другие серии {record.brand}</h2></div><div className="related-grid">{related.map((item) => <Link href={`/catalog/${item.slug}`} key={item.slug}><SeriesCover record={item} /><span>{item.brand}</span><strong>{item.name}</strong></Link>)}</div></div></section>
    </InnerLayout>
  );
}
