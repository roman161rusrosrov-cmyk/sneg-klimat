import type { Metadata } from "next";
import CatalogClient from "./catalog-client";
import { CategoryShowcase, InnerLayout, ManagerBanner, PageIntro } from "../site-shell";

export const metadata: Metadata = {
  title: "Каталог кондиционеров — СНЕГ",
  description: "44 серии кондиционеров Chigo, Haier, JAX, Rovex и Vickers. Отдельные страницы моделей, подбор и консультация.",
};

export default function CatalogPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Каталог" title="44 серии пяти брендов" lead="Ищите по бренду, серии или обозначению модели. Каждая карточка открывает отдельную страницу с вариантами исполнения и прямым звонком менеджеру." />
      <CategoryShowcase eyebrow="Каталог в цифрах" title="Выбор без слепых карточек" text="Фильтруйте серии по бренду и технологии, сохраняйте понравившиеся позиции и открывайте подтверждённые обозначения моделей. Цена и наличие уточняются прямым звонком." metrics={[["44", "серии оборудования"], ["5", "каталогов брендов"], ["1", "номер менеджера"]]} />
      <section className="inner-section catalog-section"><div className="shell"><CatalogClient /></div></section>
      <ManagerBanner title="Не уверены, с какой серии начать?" text="Назовите тип объекта, площадь, количество комнат и приоритеты. Менеджер поможет собрать короткий список для дальнейшего инженерного подбора." product="кондиционер из каталога" secondaryHref="/calculator" secondaryLabel="Сначала оценить мощность" />
    </InnerLayout>
  );
}
