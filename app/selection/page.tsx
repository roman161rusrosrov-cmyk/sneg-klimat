import type { Metadata } from "next";
import SelectionWizard from "./selection-wizard";
import { InnerLayout, ManagerBanner, PageIntro } from "../site-shell";

export const metadata: Metadata = {
  title: "Умный подбор климатической системы — СНЕГ",
  description: "Предварительное направление для выбора сплит-, мульти-сплит- или VRV/VRF-системы без отправки персональных данных.",
};

export default function SelectionPage() {
  return <InnerLayout><PageIntro eyebrow="Интерактивный инструмент" title="С чего начать подбор" lead="Выберите тип объекта, количество зон и приоритеты. Результат даст направление, но не заменит инженерный расчёт." fallback="/tools" /><section className="inner-section selection-section"><div className="shell"><SelectionWizard /></div></section><ManagerBanner title="Уточнить результат умного подбора" text="Сообщите менеджеру полученное направление и параметры объекта — так проще перейти от общего типа системы к рабочему списку исходных данных." product="подбор климатической системы" secondaryHref="/compare" secondaryLabel="Сравнить типы систем" /></InnerLayout>;
}
