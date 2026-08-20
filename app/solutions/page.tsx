import type { Metadata } from "next";
import Link from "next/link";
import { objectSolutions } from "../site-content";
import { InnerLayout, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = { title: "Решения по типу объекта — СНЕГ", description: "Климатические решения для квартиры, дома, офиса, магазина, ресторана, гостиницы, склада и производства." };

export default function SolutionsPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Решения" title="Начните с типа объекта" lead="Разные объекты требуют разных исходных данных, схем размещения, вентиляции и подхода к сервису." />
      <section className="inner-section"><div className="shell object-grid">{objectSolutions.map((item) => <Link className="object-card" href={`/solutions/${item.slug}`} key={item.slug}><span>{item.icon}</span><strong>{item.title}</strong><small>{item.hint}</small><i><Icon name="arrow" /></i></Link>)}</div></section>
    </InnerLayout>
  );
}
