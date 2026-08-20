import type { Metadata } from "next";
import SelectionWizard from "./selection-wizard";
import { InnerLayout, PageIntro } from "../site-shell";

export const metadata: Metadata = {
  title: "Умный подбор климатической системы — СНЕГ",
  description: "Предварительное направление для выбора сплит-, мульти-сплит- или VRV/VRF-системы без отправки персональных данных.",
};

export default function SelectionPage() {
  return <InnerLayout><PageIntro eyebrow="Интерактивный инструмент" title="С чего начать подбор" lead="Выберите тип объекта, количество зон и приоритеты. Результат даст направление, но не заменит инженерный расчёт." fallback="/tools" /><section className="inner-section selection-section"><div className="shell"><SelectionWizard /></div></section></InnerLayout>;
}
