import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVentilationSystem, ventilationSystems } from "../../ventilation-data";
import { BrandGlyph, Icon, InnerLayout, PageIntro, PriceCall } from "../../site-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return ventilationSystems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getVentilationSystem(slug);
  if (!item) return {};
  return {
    title: `${item.title} — СНЕГ`,
    description: item.short,
    openGraph: { title: `${item.title} — СНЕГ`, description: item.short, images: [] },
    twitter: { title: `${item.title} — СНЕГ`, description: item.short, images: [] },
  };
}

export default async function VentilationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getVentilationSystem(slug);
  if (!item) notFound();
  const related = ventilationSystems.filter((entry) => entry.slug !== item.slug).slice(0, 3);

  return (
    <InnerLayout>
      <PageIntro eyebrow={`Вентиляция · ${item.label}`} title={item.title} lead={item.summary} fallback="/ventilation" />

      <section className={`inner-section ventilation-detail ventilation-detail-${item.tone}`}>
        <div className="shell ventilation-detail-grid">
          <div className="ventilation-detail-visual" aria-label={`Условная схема: ${item.title}`}>
            <div className="detail-brand"><BrandGlyph /></div>
            <div className="duct duct-a" /><div className="duct duct-b" /><div className="duct duct-c" />
            <div className="duct-node node-a"><BrandGlyph /><span>Воздух</span></div>
            <div className="duct-node node-b"><i /><i /><i /></div>
            <div className="duct-node node-c"><BrandGlyph /><span>Зона</span></div>
            <small>Принципиальная иллюстрация — не рабочий проект</small>
          </div>
          <div className="ventilation-detail-copy">
            <p className="kicker">Подходит для</p>
            <h2>Где применяют</h2>
            <div className="use-pills">{item.bestFor.map((entry) => <span key={entry}>{entry}</span>)}</div>
            <p>Состав и производительность системы нельзя определить только по площади. Для подбора нужны назначение помещений, количество людей, режим эксплуатации и ограничения объекта.</p>
            <PriceCall product={item.title} />
          </div>
        </div>
      </section>

      <section className="inner-section ventilation-spec-section">
        <div className="shell ventilation-spec-grid">
          <article><span>01</span><p className="kicker">Состав решения</p><h2>Что может входить</h2><ul>{item.includes.map((entry) => <li key={entry}><Icon name="check" />{entry}</li>)}</ul></article>
          <article><span>02</span><p className="kicker">До подбора</p><h2>Что проверить</h2><ul>{item.projectChecks.map((entry) => <li key={entry}><Icon name="check" />{entry}</li>)}</ul></article>
        </div>
      </section>

      <section className="inner-section ventilation-related-section">
        <div className="shell">
          <div className="section-head split-head"><div><p className="kicker">Другие направления</p><h2>Сравните архитектуру систем</h2></div><Link className="button button-ghost" href="/ventilation">Вся вентиляция <Icon name="arrow" /></Link></div>
          <div className="ventilation-related-grid">{related.map((entry) => <Link href={`/ventilation/${entry.slug}`} key={entry.slug}><BrandGlyph /><small>{entry.label}</small><h3>{entry.title}</h3><p>{entry.short}</p><span>Открыть <Icon name="arrow" /></span></Link>)}</div>
        </div>
      </section>
    </InnerLayout>
  );
}
