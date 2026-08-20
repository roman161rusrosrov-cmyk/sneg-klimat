import type { Metadata } from "next";
import { InnerLayout, PageIntro } from "../site-shell";
import TroubleshootingNavigator from "./troubleshooting-navigator";

export const metadata: Metadata = { title: "Безопасная диагностика кондиционера — СНЕГ", description: "Навигатор безопасных действий при шуме, воде, запахе, слабом охлаждении и отсутствии питания." };

export default function TroubleshootingPage() {
  return <InnerLayout><PageIntro eyebrow="Безопасная помощь" title="Что делать, если система ведёт себя странно" lead="Выберите симптом и выполните только безопасные проверки без вскрытия корпуса. Инструмент не заменяет диагностику специалиста." fallback="/tools" /><section className="inner-section troubleshooting-section"><div className="shell"><TroubleshootingNavigator /><div className="danger-boundary"><strong>Не делайте самостоятельно</strong><div><span>Не вскрывайте электрические отсеки</span><span>Не выпускайте и не дозаправляйте хладагент</span><span>Не продувайте дренаж химией под давлением</span><span>Не лезьте к наружному блоку с высоты</span></div></div></div></section></InnerLayout>;
}
