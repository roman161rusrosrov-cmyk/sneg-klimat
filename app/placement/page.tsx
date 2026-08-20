import type { Metadata } from "next";
import Link from "next/link";
import { InnerLayout, PageIntro, Icon } from "../site-shell";
import PlacementGuide from "./placement-guide";

export const metadata: Metadata = { title: "Размещение блоков кондиционера — СНЕГ", description: "Интерактивные подсказки по размещению внутренних и наружных блоков без замены проекта и инструкции производителя." };

const rules = [
  ["Воздушная струя", "Не направляйте постоянный поток прямо на кровать, рабочее место или зону долгого пребывания."],
  ["Сервисный доступ", "Оставляйте возможность снять фильтры и панели так, как требует инструкция выбранной модели."],
  ["Дренаж", "Маршрут отвода конденсата согласуют до отделки; уклон, сифон и насос определяют по проекту."],
  ["Наружный блок", "Нужны безопасный доступ, допустимое основание, воздухообмен, контроль шума и соблюдение правил здания."],
  ["Электрика", "Питание, защита и кабели выбирают по паспорту оборудования и проекту квалифицированным специалистом."],
  ["Фасад и общее имущество", "До монтажа проверяют местные требования, правила здания и необходимые согласования."],
] as const;

export default function PlacementPage() {
  return <InnerLayout><PageIntro eyebrow="До монтажа" title="Где размещать климатические блоки" lead="Выберите помещение и получите список приоритетов. Точные расстояния, крепления и трассы всегда сверяют с паспортом модели и условиями объекта." fallback="/tools" /><section className="inner-section placement-section"><div className="shell"><PlacementGuide /><div className="placement-rules">{rules.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{text}</p></article>)}</div><div className="placement-cta"><div><p className="kicker">Следующий шаг</p><h2>Зафиксируйте требования в брифе</h2><p>Подготовьте параметры объекта перед обследованием — без адреса и контактных данных.</p></div><Link className="button button-primary" href="/brief">Открыть бриф <Icon name="arrow" /></Link></div></div></section></InnerLayout>;
}
