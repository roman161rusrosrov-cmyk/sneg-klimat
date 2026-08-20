import type { Metadata } from "next";
import Link from "next/link";
import { InnerLayout, PageIntro, Icon } from "../site-shell";
import MaintenancePlanner from "./maintenance-planner";

export const metadata: Metadata = { title: "План обслуживания климатической системы — СНЕГ", description: "Локальный план безопасных проверок и профессионального обслуживания кондиционирования и вентиляции." };

export default function MaintenancePage() {
  return <InnerLayout><PageIntro eyebrow="Эксплуатация" title="План обслуживания без опасного самоделия" lead="Выберите тип системы и режим работы. План подскажет, что можно проверить визуально, а что оставить квалифицированному специалисту." fallback="/tools" /><section className="inner-section maintenance-section"><div className="shell"><MaintenancePlanner /><div className="maintenance-warning"><div><p className="kicker">Главное правило</p><h2>Паспорт оборудования важнее общего совета</h2><p>Фактический регламент зависит от модели, загрязнённости, режима работы и требований производителя. Не разбирайте блоки, не работайте с хладагентом и электрическими соединениями самостоятельно.</p></div><Link className="button button-primary" href="/troubleshooting">Если уже есть проблема <Icon name="arrow" /></Link></div></div></section></InnerLayout>;
}
