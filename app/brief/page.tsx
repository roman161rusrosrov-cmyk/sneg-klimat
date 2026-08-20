import type { Metadata } from "next";
import { InnerLayout, PageIntro } from "../site-shell";
import BriefBuilder from "./brief-builder";

export const metadata: Metadata = {
  title: "Технический бриф по климату — СНЕГ",
  description: "Соберите исходные параметры климатического проекта и скачайте текстовый бриф без отправки персональных данных.",
};

export default function BriefPage() {
  return <InnerLayout><PageIntro eyebrow="Исходные данные" title="Конструктор технического брифа" lead="Укажите только параметры объекта — без имени, телефона и адреса. Готовый текст можно скачать или скопировать прямо на устройстве." fallback="/tools" /><section className="inner-section brief-section"><div className="shell"><BriefBuilder /></div></section></InnerLayout>;
}
