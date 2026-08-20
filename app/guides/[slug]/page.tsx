import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "../../site-content";
import { InnerLayout, ManagerBanner, PageIntro, Icon } from "../../site-shell";

export const dynamicParams = false;
export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const guide = guides.find((item) => item.slug === slug);
  return guide ? { title: `${guide.title} — СНЕГ`, description: guide.lead } : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const guide = guides.find((item) => item.slug === slug); if (!guide) notFound();
  return (
    <InnerLayout>
      <PageIntro eyebrow="База знаний" title={guide.title} lead={guide.lead} fallback="/guides" />
      <article className="inner-section"><div className="shell article-body">{guide.sections.map((section, index) => <section key={section.title}><span>0{index + 1}</span><div><h2>{section.title}</h2><p>{section.text}</p></div></section>)}<div className="article-cta"><strong>Нужен предварительный ориентир?</strong><Link className="button button-primary" href="/calculator">Открыть калькулятор <Icon name="arrow" /></Link></div></div></article>
      <ManagerBanner title="Применить материал к вашему объекту" text="Общие рекомендации важно проверить по планировке, режиму эксплуатации и документации конкретного оборудования." product={`консультацию: ${guide.title}`} secondaryHref="/brief" secondaryLabel="Подготовить исходные данные" />
    </InnerLayout>
  );
}
