import type { Metadata } from "next";
import Link from "next/link";
import { InnerLayout, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = {
  title: "Инструменты для подбора климата — СНЕГ",
  description: "Умный подбор системы, избранное, сравнение решений, чек-листы, словарь и ответы на вопросы.",
};

const tools = [
  { href: "/selection", icon: "✦", title: "Умный подбор", text: "Ответьте на четыре вопроса и получите направление для дальнейшего расчёта.", tag: "2 минуты" },
  { href: "/favorites", icon: "♡", title: "Избранные серии", text: "Все отмеченные в каталоге линейки на одной странице. Список хранится только на устройстве.", tag: "Локально" },
  { href: "/compare", icon: "⇄", title: "Сравнение систем", text: "Сплит, мульти-сплит, VRV/VRF и вентиляция — различия без рекламных упрощений.", tag: "Таблица" },
  { href: "/checklists", icon: "✓", title: "Чек-листы проекта", text: "Что подготовить до обследования, монтажа и пусконаладки.", tag: "Можно скачать" },
  { href: "/glossary", icon: "A", title: "Климатический словарь", text: "Короткие объяснения терминов, которые встречаются в проекте и паспортах оборудования.", tag: "18 терминов" },
  { href: "/faq", icon: "?", title: "Большой FAQ", text: "Ответы о цене, мощности, трассах, дренировании, вентиляции и сервисе.", tag: "14 ответов" },
] as const;

export default function ToolsPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Полезные сервисы" title="Инструменты без регистрации" lead="Работают прямо в браузере и не требуют отправлять имя, почту или номер телефона." />
      <section className="inner-section tools-section"><div className="shell tools-grid">{tools.map((item, index) => <Link className="tool-card" href={item.href} key={item.href}><div className="tool-card-top"><span>{item.icon}</span><small>{item.tag}</small></div><p>0{index + 1}</p><h2>{item.title}</h2><div>{item.text}</div><i><Icon name="arrow" /></i></Link>)}</div></section>
    </InnerLayout>
  );
}
