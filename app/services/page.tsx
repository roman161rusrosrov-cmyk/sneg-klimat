import type { Metadata } from "next";
import Link from "next/link";
import { serviceSteps } from "../catalog-data";
import { InnerLayout, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = { title: "Услуги — СНЕГ", description: "Обследование, расчёт, проектирование, монтаж, пусконаладка и сервис климатических систем." };

export default function ServicesPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Услуги" title="От обследования до сервиса" lead="Ведём проект по понятным этапам: обследование, расчёт, поставка, монтаж, пусконаладка и обслуживание." />
      <section className="inner-section process-section"><div className="shell process-grid">{serviceSteps.map((step) => <article key={step.n}><span>{step.n}</span><div className="process-icon"><i /><i /></div><h2>{step.title}</h2><p>{step.text}</p></article>)}</div></section>
      <section className="inner-section"><div className="shell service-handoff"><div><p className="kicker">Первый шаг</p><h2>Подготовьте исходные данные</h2><p>Соберите предварительный бриф с площадью, высотой, количеством зон, людьми и теплопритоками от техники.</p></div><Link className="button button-primary" href="/brief">Собрать бриф <Icon name="arrow" /></Link></div></section>
    </InnerLayout>
  );
}
