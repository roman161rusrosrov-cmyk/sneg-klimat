import type { Metadata } from "next";
import Link from "next/link";
import { BrandGlyph, CategoryShowcase, InnerLayout, ManagerBanner, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = {
  title: "Инструменты для подбора климата — СНЕГ",
  description: "Поиск, технический бриф, умный подбор, обслуживание, безопасная диагностика, размещение, избранное и справочники.",
};

const tools = [
  { href: "/selection", icon: "✦", title: "Умный подбор", text: "Ответьте на четыре вопроса и получите направление для дальнейшего расчёта.", tag: "2 минуты" },
  { href: "/brief", icon: "▤", title: "Технический бриф", text: "Соберите исходные параметры объекта и скачайте готовый текст без имени и контактов.", tag: "TXT" },
  { href: "/favorites", icon: "♡", title: "Избранные серии", text: "Все отмеченные в каталоге линейки на одной странице. Список хранится только на устройстве.", tag: "Локально" },
  { href: "/favorites-compare", icon: "≍", title: "Сравнить избранное", text: "Сопоставьте до четырёх сохранённых серий по подтверждённым данным каталога.", tag: "До 4 серий" },
  { href: "/compare", icon: "⇄", title: "Сравнение систем", text: "Сплит, мульти-сплит, VRV/VRF и вентиляция — различия без рекламных упрощений.", tag: "Таблица" },
  { href: "/placement", icon: "⌖", title: "Размещение блоков", text: "Подсказки для спальни, гостиной, офиса, кухни и технической зоны.", tag: "5 сценариев" },
  { href: "/maintenance", icon: "↻", title: "План обслуживания", text: "Безопасный план проверок с поправкой на тип системы и режим эксплуатации.", tag: "Без вскрытия" },
  { href: "/troubleshooting", icon: "!", title: "Если что-то не так", text: "Навигатор действий при воде, шуме, слабом охлаждении, запахе или отсутствии питания.", tag: "Безопасность" },
  { href: "/project-stages", icon: "8", title: "Этапы проекта", text: "Восемь шагов от исходных данных до пуска и передачи документов.", tag: "8 этапов" },
  { href: "/checklists", icon: "✓", title: "Чек-листы проекта", text: "Что подготовить до обследования, монтажа и пусконаладки.", tag: "Можно скачать" },
  { href: "/myths", icon: "≠", title: "Мифы и факты", text: "Двенадцать коротких разборов о мощности, вентиляции, инверторах и сервисе.", tag: "12 разборов" },
  { href: "/glossary", icon: "A", title: "Климатический словарь", text: "Короткие объяснения терминов, которые встречаются в проекте и паспортах оборудования.", tag: "18 терминов" },
  { href: "/faq", icon: "?", title: "Большой FAQ", text: "Ответы о цене, мощности, трассах, дренировании, вентиляции и сервисе.", tag: "14 ответов" },
] as const;

export default function ToolsPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Полезные сервисы" title="Инструменты без регистрации" lead="Работают прямо в браузере и не требуют отправлять имя, почту или номер телефона." />
      <CategoryShowcase eyebrow="Локальные инструменты" title="Подготовьтесь к проекту на своём устройстве" text="Подбор, бриф, избранное, сравнение и чек-листы работают без отправки контактов. Вы сохраняете контроль над введёнными параметрами." metrics={[["13", "самостоятельных инструментов"], ["0", "обязательных регистраций"], ["100%", "локальная работа"]]} />
      <section className="inner-section tools-section"><div className="shell tools-grid">{tools.map((item, index) => <Link className="tool-card" href={item.href} key={item.href}><div className="tool-card-top"><span>{item.icon}</span><small>{item.tag}</small></div><BrandGlyph /><p>{String(index + 1).padStart(2, "0")}</p><h2>{item.title}</h2><div>{item.text}</div><i><Icon name="arrow" /></i></Link>)}</div></section>
      <ManagerBanner title="Инструмент дал направление — уточним решение" text="После локального расчёта или брифа позвоните менеджеру и продиктуйте ключевые параметры, не отправляя контакты через сайт." product="подбор климатической системы" secondaryHref="/brief" secondaryLabel="Собрать технический бриф" />
    </InnerLayout>
  );
}
