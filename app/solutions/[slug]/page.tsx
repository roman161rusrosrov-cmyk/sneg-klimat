import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { objectSolutions } from "../../site-content";
import { InnerLayout, PageIntro, Icon } from "../../site-shell";

export const dynamicParams = false;
export function generateStaticParams() { return objectSolutions.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = objectSolutions.find((record) => record.slug === slug);
  return item ? { title: `${item.title}: климатическое решение — СНЕГ`, description: item.summary } : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = objectSolutions.find((record) => record.slug === slug); if (!item) notFound();
  return (
    <InnerLayout>
      <PageIntro eyebrow="Решение по объекту" title={item.title} lead={item.summary} fallback="/solutions" />
      <section className="inner-section"><div className="shell solution-detail-grid"><article className="solution-symbol"><span>{item.icon}</span><strong>{item.hint}</strong></article><div><p className="kicker">Что проверить до подбора</p><h2>Исходные данные</h2><ul className="check-list">{item.checks.map((check) => <li key={check}><Icon name="check" />{check}</li>)}</ul><div className="product-actions"><Link className="button button-primary" href="/calculator">Открыть калькулятор <Icon name="arrow" /></Link><Link className="button button-ghost" href="/catalog">Перейти в каталог</Link></div></div></div></section>
    </InnerLayout>
  );
}
