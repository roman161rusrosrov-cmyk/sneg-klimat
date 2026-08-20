import type { Metadata } from "next";
import FavoritesClient from "./favorites-client";
import { InnerLayout, PageIntro } from "../site-shell";

export const metadata: Metadata = { title: "Избранные серии — СНЕГ", description: "Сохранённые на этом устройстве серии кондиционеров из каталога СНЕГ." };

export default function FavoritesPage() {
  return <InnerLayout><PageIntro eyebrow="Личный список" title="Избранные серии" lead="Отмеченные сердцем позиции хранятся только в браузере этого устройства и не отправляются на сервер." fallback="/tools" /><section className="inner-section catalog-section"><div className="shell"><FavoritesClient /></div></section></InnerLayout>;
}
