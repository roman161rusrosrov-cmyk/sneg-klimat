import type { Metadata } from "next";
import Link from "next/link";
import { serviceSteps } from "../catalog-data";
import { BrandGlyph, CategoryShowcase, InnerLayout, ManagerBanner, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = { title: "Услуги — СНЕГ", description: "Обследование, расчёт, проектирование, монтаж, пусконаладка и сервис климатических систем." };

export default function ServicesPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Услуги" title="От обследования до сервиса" lead="Ведём проект по понятным этапам: обследование, расчёт, поставка, монтаж, пусконаладка и обслуживание." />
      <CategoryShowcase eyebrow="Единый процесс" title="Одна логика от замера до запуска" text="Каждый этап заканчивается понятным результатом: исходными данными, расчётом, согласованной схемой, смонтированной системой или регламентом обслуживания." metrics={[["6", "этапов работы"], ["1", "последовательный процесс"], ["0", "скрытых форм на сайте"]]} tone="mint" />
      <section className="inner-section process-section"><div className="shell process-grid">{serviceSteps.map((step) => <article key={step.n}><span>{step.n}</span><BrandGlyph /><div className="process-icon"><i /><i /></div><h2>{step.title}</h2><p>{step.text}</p></article>)}</div></section>
      <section className="inner-section"><div className="shell service-handoff"><div><p className="kicker">Первый шаг</p><h2>Подготовьте исходные данные</h2><p>Соберите предварительный бриф с площадью, высотой, количеством зон, людьми и теплопритоками от техники.</p></div><Link className="button button-primary" href="/brief">Собрать бриф <Icon name="arrow" /></Link></div></section>
      <ManagerBanner title="Начните проект с короткого звонка" text="Опишите объект и задачу — менеджер подскажет, нужен ли выезд, какие планы подготовить и с какого раздела сайта начать." product="обследование и климатический проект" secondaryHref="/project-stages" secondaryLabel="Посмотреть этапы проекта" />
    </InnerLayout>
  );
}
