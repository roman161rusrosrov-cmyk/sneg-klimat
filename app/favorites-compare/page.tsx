import type { Metadata } from "next";
import { InnerLayout, PageIntro } from "../site-shell";
import FavoritesCompare from "./favorites-compare";

export const metadata: Metadata = { title: "Сравнение избранных серий — СНЕГ", description: "Сравните до четырёх сохранённых серий по подтверждённым данным каталога на этом устройстве." };

export default function FavoritesComparePage() {
  return <InnerLayout><PageIntro eyebrow="Локальное сравнение" title="Сравнить избранные серии" lead="Выберите до четырёх сохранённых позиций. Если параметр не подтверждён в исходных материалах, таблица честно покажет «уточнить»." fallback="/favorites" /><section className="inner-section favorites-compare-section"><div className="shell"><FavoritesCompare /></div></section></InnerLayout>;
}
