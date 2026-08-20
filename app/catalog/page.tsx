import type { Metadata } from "next";
import CatalogClient from "./catalog-client";
import { InnerLayout, PageIntro } from "../site-shell";

export const metadata: Metadata = {
  title: "Каталог кондиционеров — СНЕГ",
  description: "44 серии кондиционеров Chigo, Haier, JAX, Rovex и Vickers с реальными обложками из материалов владельца.",
};

export default function CatalogPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Каталог" title="44 серии пяти брендов" lead="Ищите по бренду, серии или обозначению модели. Каждая карточка открывает отдельную страницу с доступными вариантами и исходными обозначениями." />
      <section className="inner-section catalog-section"><div className="shell"><CatalogClient /></div></section>
    </InnerLayout>
  );
}
