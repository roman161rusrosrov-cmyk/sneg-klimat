import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "../site-content";
import { BrandGlyph, CategoryShowcase, InnerLayout, ManagerBanner, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = { title: "База знаний — СНЕГ", description: "Практические материалы по подбору, VRV/VRF и приёмке монтажа климатических систем." };

export default function GuidesPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="База знаний" title="Разобраться до покупки" lead="Короткие инженерные материалы о подборе оборудования, технологиях и контроле качества монтажа." />
      <CategoryShowcase eyebrow="Инженерная база" title="Материалы, которые помогают задавать правильные вопросы" text="Статьи не заменяют проект, зато помогают подготовить исходные данные, сравнить подходы и проверить ключевые этапы монтажа." metrics={[["4", "практических материала"], ["3", "смысловых блока в каждом"], ["0", "рекламных обещаний"]]} tone="ice" />
      <section className="inner-section guides-directory-section"><div className="shell guide-grid">{guides.map((guide, index) => <Link href={`/guides/${guide.slug}`} className="guide-card" key={guide.slug}><span>{String(index + 1).padStart(2, "0")}</span><BrandGlyph /><div><h2>{guide.title}</h2><p>{guide.lead}</p></div><Icon name="arrow" /></Link>)}</div></section>
      <ManagerBanner title="Остался вопрос по вашему объекту?" text="Назовите задачу и ограничения — менеджер поможет выбрать подходящий материал, калькулятор или следующий этап проекта." product="консультацию по климатической системе" secondaryHref="/faq" secondaryLabel="Открыть частые вопросы" />
    </InnerLayout>
  );
}
