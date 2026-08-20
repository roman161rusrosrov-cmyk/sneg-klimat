import type { Metadata } from "next";
import ClimateCalculator from "./climate-calculator";
import { InnerLayout, PageIntro } from "../site-shell";

export const metadata: Metadata = { title: "Калькулятор мощности — СНЕГ", description: "Предварительная оценка холодопроизводительности и скачиваемый климатический бриф." };

export default function CalculatorPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Предварительный расчёт" title="Оцените требуемую мощность" lead="Калькулятор помогает собрать исходные данные. Результат не заменяет обследование, теплотехнический расчёт и проект." />
      <section className="inner-section calculator-section"><div className="shell"><ClimateCalculator /></div></section>
    </InnerLayout>
  );
}
