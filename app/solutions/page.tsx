import type { Metadata } from "next";
import Link from "next/link";
import { objectSolutions } from "../site-content";
import { BrandGlyph, CategoryShowcase, InnerLayout, ManagerBanner, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = { title: "Решения по типу объекта — СНЕГ", description: "Климатические решения для квартиры, дома, офиса, магазина, ресторана, гостиницы, склада и производства." };

export default function SolutionsPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Решения" title="Начните с типа объекта" lead="Разные объекты требуют разных исходных данных, схем размещения, вентиляции и подхода к сервису." />
      <CategoryShowcase eyebrow="От объекта к системе" title="Сначала сценарий, потом оборудование" text="Квартира, ресторан и производство отличаются не площадью, а режимами, теплопритоками, воздухообменом и требованиями к доступу. Поэтому у каждого объекта — свой список исходных данных." metrics={[["8", "типов объектов"], ["4", "ключевые проверки"], ["1", "цельный климат"]]} tone="navy" />
      <section className="inner-section solutions-directory-section"><div className="shell object-grid">{objectSolutions.map((item, index) => <Link className="object-card" href={`/solutions/${item.slug}`} key={item.slug}><div className="object-card-head"><span>{String(index + 1).padStart(2, "0")}</span><BrandGlyph /></div><span className="object-icon">{item.icon}</span><strong>{item.title}</strong><small>{item.hint}</small><i><Icon name="arrow" /></i></Link>)}</div></section>
      <ManagerBanner title="Разберём ваш объект по зонам" text="Позвоните и коротко опишите назначение помещений, количество зон и график работы. Менеджер подскажет, какие исходные данные подготовить." product="климатическое решение для объекта" secondaryHref="/brief" secondaryLabel="Собрать технический бриф" />
    </InnerLayout>
  );
}
