import type { Metadata } from "next";
import ClimateCalculator from "./climate-calculator";
import { InnerLayout, ManagerBanner, PageIntro } from "../site-shell";

export const metadata: Metadata = { title: "Калькулятор мощности — СНЕГ", description: "Предварительная оценка холодопроизводительности и скачиваемый климатический бриф." };

export default function CalculatorPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Предварительный расчёт" title="Оцените требуемую мощность" lead="Калькулятор помогает собрать исходные данные. Результат не заменяет обследование, теплотехнический расчёт и проект." />
      <section className="inner-section calculator-section"><div className="shell"><ClimateCalculator /></div></section>
      <ManagerBanner title="Проверить предварительный результат" text="Продиктуйте менеджеру площадь, высоту, остекление, количество людей и полученный ориентир. Итоговую мощность нужно подтвердить по объекту и конкретной модели." product="подбор мощности кондиционера" secondaryHref="/brief" secondaryLabel="Собрать полный бриф" />
    </InnerLayout>
  );
}
