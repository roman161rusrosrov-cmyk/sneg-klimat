import type { Metadata } from "next";
import ChecklistTools from "./checklist-tools";
import { InnerLayout, PageIntro } from "../site-shell";

export const metadata: Metadata = { title: "Чек-листы климатического проекта — СНЕГ", description: "Интерактивные списки подготовки к обследованию, монтажу и запуску климатической системы." };

export default function ChecklistsPage() {
  return <InnerLayout><PageIntro eyebrow="Контроль проекта" title="Чек-листы без бумажной суеты" lead="Отмечайте пункты прямо на странице, скачайте текстовый список или распечатайте. Отметки никуда не отправляются." fallback="/tools" /><section className="inner-section checklist-section"><div className="shell"><ChecklistTools /></div></section></InnerLayout>;
}
