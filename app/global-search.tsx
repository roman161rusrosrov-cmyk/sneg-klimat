"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { series } from "./catalog-data";

const pages = [
  { href: "/catalog", title: "Каталог оборудования", group: "Раздел", text: "Все серии, бренды и обозначения моделей" },
  { href: "/brands", title: "Бренды", group: "Раздел", text: "Chigo, Haier, JAX, Rovex и Vickers" },
  { href: "/solutions", title: "Решения по объекту", group: "Раздел", text: "Квартира, дом, офис, магазин, ресторан, гостиница, склад и производство" },
  { href: "/vrf", title: "VRV / VRF", group: "Раздел", text: "Многозональные климатические системы" },
  { href: "/services", title: "Услуги", group: "Раздел", text: "Обследование, проект, монтаж, пуск и сервис" },
  { href: "/guides", title: "База знаний", group: "Справка", text: "Статьи о подборе и приёмке работ" },
  { href: "/calculator", title: "Калькулятор мощности", group: "Инструмент", text: "Предварительный ориентир по теплопритокам" },
  { href: "/selection", title: "Умный подбор", group: "Инструмент", text: "Выбор направления по объекту и приоритетам" },
  { href: "/brief", title: "Технический бриф", group: "Инструмент", text: "Собрать и скачать исходные данные без контактов" },
  { href: "/favorites", title: "Избранные серии", group: "Инструмент", text: "Сохранённые на этом устройстве позиции" },
  { href: "/favorites-compare", title: "Сравнить избранное", group: "Инструмент", text: "До четырёх сохранённых серий в одной таблице" },
  { href: "/compare", title: "Сравнение типов систем", group: "Справка", text: "Сплит, мульти-сплит, VRV/VRF и вентиляция" },
  { href: "/placement", title: "Размещение блоков", group: "Инструмент", text: "Подсказки для спальни, гостиной, офиса и кухни" },
  { href: "/maintenance", title: "План обслуживания", group: "Инструмент", text: "Безопасный план осмотров и сервисных работ" },
  { href: "/troubleshooting", title: "Навигатор по неисправностям", group: "Инструмент", text: "Безопасные действия до звонка специалисту" },
  { href: "/project-stages", title: "Этапы проекта", group: "Справка", text: "От исходных данных до передачи в эксплуатацию" },
  { href: "/checklists", title: "Чек-листы проекта", group: "Инструмент", text: "Подготовка, монтаж и пусконаладка" },
  { href: "/myths", title: "Мифы и факты", group: "Справка", text: "Короткие разборы популярных заблуждений" },
  { href: "/glossary", title: "Климатический словарь", group: "Справка", text: "Термины из проекта и паспортов оборудования" },
  { href: "/faq", title: "Частые вопросы", group: "Справка", text: "Цена, подбор, монтаж, вентиляция и сервис" },
] as const;

function normalize(value: string) {
  return value.toLocaleLowerCase("ru").replace(/ё/g, "е").replace(/[^a-zа-я0-9]/g, "");
}

function SearchIcon() {
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>;
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT";
      if (event.key === "/" && !typing) { event.preventDefault(); setOpen(true); }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const results = useMemo(() => {
    const clean = normalize(query);
    const pageRows = pages
      .filter((item) => !clean || normalize(`${item.title} ${item.text}`).includes(clean))
      .map((item) => ({ ...item, key: item.href }));
    const seriesRows = series
      .filter((item) => clean && normalize(`${item.brand} ${item.name} ${item.models.join(" ")} ${item.variants?.join(" ") || ""}`).includes(clean))
      .map((item) => ({ href: `/catalog/${item.slug}`, title: `${item.brand} ${item.name}`, group: "Серия", text: item.models.join(" · "), key: item.slug }));
    return [...seriesRows, ...pageRows].slice(0, 14);
  }, [query]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button className="global-search-trigger" type="button" onClick={() => setOpen(true)} aria-label="Поиск по сайту"><SearchIcon /><span>Поиск</span><kbd>/</kbd></button>
      {open && <div className="overlay search-overlay" role="dialog" aria-modal="true" aria-label="Поиск по сайту">
        <button className="overlay-backdrop" type="button" onClick={close} aria-label="Закрыть поиск" />
        <section className="search-panel">
          <div className="panel-head"><div><small>44 серии и полезные разделы</small><strong>Поиск по сайту</strong></div><button type="button" onClick={close} aria-label="Закрыть">×</button></div>
          <label className="big-search"><SearchIcon /><span className="sr-only">Введите запрос</span><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Серия, модель, VRF, обслуживание…" /></label>
          <div className="search-results">
            <p>{query ? `Результаты: ${results.length}` : "Популярные разделы"}</p>
            {results.length ? results.map((item) => <Link href={item.href} key={item.key} onClick={close}><span><small>{item.group}</small><strong>{item.title}</strong><em>{item.text}</em></span><b aria-hidden="true">→</b></Link>) : <div className="empty-search">Ничего не найдено. Попробуйте название бренда, серии или обозначение модели.</div>}
          </div>
          {!query && <div className="search-hints"><span>Быстрый запрос</span>{["Haier", "R32", "VRF", "сервис"].map((hint) => <button type="button" key={hint} onClick={() => setQuery(hint)}>{hint}</button>)}</div>}
        </section>
      </div>}
    </>
  );
}
