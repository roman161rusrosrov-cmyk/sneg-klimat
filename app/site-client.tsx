"use client";

/* Catalog images are already normalized WebP assets and must keep their static public paths. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { faqs, objects, series, serviceSteps, type SeriesRecord } from "./catalog-data";
import { publicAsset } from "./public-path";
import { objectSolutions } from "./site-content";

const brandNames = ["Все", "Haier", "Chigo", "JAX", "Rovex", "Vickers"] as const;
const brandAliases: Record<string, string> = {
  Haier: "хайер хаиер",
  Chigo: "чиго",
  JAX: "джакс джэкс",
  Rovex: "ровекс",
  Vickers: "викерс виккерс",
};

function normalize(value: string) {
  return value.toLocaleLowerCase("ru").replace(/[^a-zа-яё0-9]/g, "");
}

function BrandMark({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <span className={`brand${inverse ? " brand-inverse" : ""}`} aria-label="СНЕГ — кондиционирование и вентиляция">
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5v38M7.5 14.5l33 19M7.5 33.5l33-19" />
        <path d="m24 5-4 5m4-5 4 5M24 43l-4-5m4 5 4-5M7.5 14.5l6 .5m-6-.5 2.5 5.5M40.5 33.5l-6-.5m6 .5-2.5-5.5M7.5 33.5l6-.5m-6 .5 2.5-5.5M40.5 14.5l-6 .5m6-.5-2.5 5.5" />
      </svg>
      <span className="brand-copy">
        <strong>СНЕГ</strong>
        {!compact && <small>кондиционирование и вентиляция</small>}
      </span>
    </span>
  );
}

function Icon({ name }: { name: "search" | "menu" | "close" | "arrow" | "heart" | "compare" | "home" | "catalog" | "calc" | "download" | "check" }) {
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
    menu: <><path d="M4 8h16M4 16h16"/></>,
    close: <><path d="M6 6l12 12M18 6 6 18"/></>,
    arrow: <path d="M4 12h15m-5-5 5 5-5 5"/>,
    heart: <path d="M12 20.5S4.5 16 4.5 9.5A4 4 0 0 1 12 7.4a4 4 0 0 1 7.5 2.1C19.5 16 12 20.5 12 20.5Z"/>,
    compare: <><path d="M8 5h12M16 2l4 3-4 3M16 19H4m4-3-4 3 4 3"/></>,
    home: <><path d="m4 11 8-7 8 7"/><path d="M6.5 10v10h11V10M10 20v-6h4v6"/></>,
    catalog: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    calc: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2m4 0h2m-8 4h2m4 0h2"/></>,
    download: <><path d="M12 3v12m-4-4 4 4 4-4"/><path d="M5 20h14"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg className={`icon icon-${name}`} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SeriesArtwork({ record }: { record: SeriesRecord }) {
  return (
    <div className="series-art series-art-photo" aria-hidden="true">
      <img src={publicAsset(`/catalog/${record.slug}.webp`)} alt="" width="1000" height="1000" loading="lazy" />
    </div>
  );
}

export default function SiteClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<(typeof brandNames)[number]>("Все");
  const [technology, setTechnology] = useState<"all" | "inverter" | "on-off">("all");
  const [newOnly, setNewOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [visible, setVisible] = useState(12);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [objectType, setObjectType] = useState("Квартира");
  const [area, setArea] = useState(35);
  const [height, setHeight] = useState(2.7);
  const [sun, setSun] = useState<"low" | "medium" | "high">("medium");
  const [people, setPeople] = useState(2);
  const [equipment, setEquipment] = useState(0.4);
  const [zones, setZones] = useState(1);
  const [ventilation, setVentilation] = useState("Нужно определить");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setFavorites(JSON.parse(localStorage.getItem("sneg-favorites") || "[]"));
        setCompare(JSON.parse(localStorage.getItem("sneg-compare") || "[]"));
      } catch {
        setFavorites([]);
        setCompare([]);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const locked = menuOpen || searchOpen || compareOpen;
    document.body.classList.toggle("overlay-open", locked);
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setCompareOpen(false);
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("overlay-open");
      document.removeEventListener("keydown", close);
    };
  }, [menuOpen, searchOpen, compareOpen]);

  const filtered = useMemo(() => {
    const clean = normalize(query);
    return series.filter((item) => {
      const haystack = normalize(`${item.brand} ${brandAliases[item.brand]} ${item.name} ${item.models.join(" ")} ${item.variants?.join(" ") || ""}`);
      return (!clean || haystack.includes(clean)) &&
        (brand === "Все" || item.brand === brand) &&
        (technology === "all" || item.technology === technology) &&
        (!newOnly || item.new2026) &&
        (!favoritesOnly || favorites.includes(item.slug));
    });
  }, [brand, favorites, favoritesOnly, newOnly, query, technology]);

  const globalResults = useMemo(() => {
    const clean = normalize(query);
    if (!clean) return [];
    return series.filter((item) => normalize(`${item.brand} ${brandAliases[item.brand]} ${item.name} ${item.models.join(" ")}`).includes(clean)).slice(0, 8);
  }, [query]);

  const selectedCompare = compare.map((slug) => series.find((item) => item.slug === slug)).filter(Boolean) as SeriesRecord[];
  const sunFactor = sun === "low" ? 0.9 : sun === "high" ? 1.15 : 1;
  const calculated = Math.max(0.5, area * 0.1 * (height / 2.7) * sunFactor + Math.max(0, people - 1) * 0.13 + equipment);
  const capacityLow = (calculated * 0.9).toFixed(1);
  const capacityHigh = (calculated * 1.1).toFixed(1);

  function toggleFavorite(slug: string) {
    const next = favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug];
    setFavorites(next);
    localStorage.setItem("sneg-favorites", JSON.stringify(next));
  }

  function toggleCompare(slug: string) {
    const next = compare.includes(slug) ? compare.filter((item) => item !== slug) : [...compare, slug].slice(-4);
    setCompare(next);
    localStorage.setItem("sneg-compare", JSON.stringify(next));
  }

  function downloadBrief() {
    const content = [
      "СНЕГ — предварительный климатический бриф",
      "",
      `Тип объекта: ${objectType}`,
      `Площадь: ${area} м²`,
      `Высота потолка: ${height.toFixed(1)} м`,
      `Инсоляция: ${sun === "low" ? "низкая" : sun === "high" ? "высокая" : "средняя"}`,
      `Людей: ${people}`,
      `Теплоприток от техники: ${equipment.toFixed(1)} кВт`,
      `Зон: ${zones}`,
      `Вентиляция: ${ventilation}`,
      `Ориентир холодопроизводительности: ${capacityLow}–${capacityHigh} кВт`,
      "",
      "Важно: результат предварительный. Он не является проектом или коммерческим предложением и требует проверки инженером с учётом планировки, ограждающих конструкций, трасс, электрики, дренажа и документации выбранной системы.",
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sneg-climate-brief.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const closeAll = () => { setMenuOpen(false); setSearchOpen(false); };

  return (
    <main>
      <a className="skip-link" href="#content">К содержанию</a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="logo-link" href="/" onClick={closeAll}><BrandMark /></Link>
          <nav className="desktop-nav" aria-label="Основная навигация">
            <Link href="/catalog">Каталог</Link><Link href="/brands">Бренды</Link><Link href="/solutions">Решения</Link><Link href="/vrf">VRV / VRF</Link><Link href="/services">Услуги</Link><Link href="/guides">База знаний</Link>
          </nav>
          <div className="header-actions">
            <button className="icon-button" aria-label="Открыть поиск" onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
            <Link className="header-cta" href="/calculator">Получить расчёт</Link>
            <button className="menu-button" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}><Icon name="menu" /></button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="shell hero-grid" id="content">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Инженерный подбор климатических систем</p>
            <h1>Комфортный климат.<br/><em>Точно по расчёту.</em></h1>
            <p className="hero-lead">Кондиционеры, вентиляция и VRV/VRF‑системы для квартиры, дома и бизнеса. От предварительного подбора до проекта, монтажа и сервиса.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/calculator">Подобрать систему <Icon name="arrow" /></Link>
              <Link className="button button-ghost" href="/catalog">Смотреть каталог</Link>
            </div>
            <p className="data-note"><span><Icon name="check" /></span> Без вымышленных цен и характеристик — данные публикуются только после проверки источника</p>
          </div>

          <div className="hero-visual" aria-label="Схематичное изображение климатической системы">
            <div className="air-ring ring-one" /><div className="air-ring ring-two" />
            <div className="climate-unit"><div className="unit-label"><BrandMark compact /></div><div className="unit-slot"/><div className="unit-led"/></div>
            <div className="airflow flow-one"><i/><i/><i/></div><div className="airflow flow-two"><i/><i/><i/></div>
            <div className="metric-card metric-temp"><span>Комфорт</span><strong>22°</strong><small>точная настройка</small></div>
            <div className="metric-card metric-noise"><span className="pulse"/><strong>Тихий режим</strong><small>параметр зависит от модели</small></div>
            <div className="snow-dot dot-a"/><div className="snow-dot dot-b"/><div className="snow-dot dot-c"/>
          </div>
        </div>
        <div className="shell brand-strip"><span>Подтверждённые бренды в каталоге</span><div>{brandNames.slice(1).map((item) => <Link key={item} href={`/brands/${item.toLowerCase()}`}>{item}</Link>)}</div></div>
      </section>

      <section className="section section-objects" id="solutions">
        <div className="shell">
          <div className="section-head split-head"><div><p className="kicker">Быстрый старт</p><h2>Какой объект нужно охладить?</h2></div><p>Сценарий объекта влияет на тип системы, акустику, вентиляцию, трассы и сервисный доступ.</p></div>
          <div className="object-grid">
            {objectSolutions.map((item) => <Link className="object-card" href={`/solutions/${item.slug}`} key={item.slug}><span>{item.icon}</span><strong>{item.title}</strong><small>{item.hint}</small><i><Icon name="arrow" /></i></Link>)}
          </div>
        </div>
      </section>

      <section className="section catalog-section" id="catalog">
        <div className="shell">
          <div className="section-head split-head catalog-heading"><div><p className="kicker">Каталог из проверяемых источников</p><h2>44 серии пяти брендов</h2></div><p>Показываем только те названия моделей, варианты и типы, которые есть в исходной карте. Параметры без источника скрыты.</p></div>

          <div className="catalog-tools">
            <label className="catalog-search"><Icon name="search"/><span className="sr-only">Поиск по каталогу</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(12); }} placeholder="Бренд, серия или модель" /></label>
            <div className="toggle-group" aria-label="Тип компрессора">
              <button className={technology === "all" ? "active" : ""} onClick={() => setTechnology("all")}>Все типы</button>
              <button className={technology === "inverter" ? "active" : ""} onClick={() => setTechnology("inverter")}>Инвертор</button>
              <button className={technology === "on-off" ? "active" : ""} onClick={() => setTechnology("on-off")}>On / Off</button>
            </div>
            <button className={`new-filter${newOnly ? " active" : ""}`} onClick={() => setNewOnly(!newOnly)}>Новинки 2026</button>
            <button className={`new-filter${favoritesOnly ? " active" : ""}`} onClick={() => setFavoritesOnly(!favoritesOnly)}>Избранное · {favorites.length}</button>
          </div>
          <div className="brand-tabs" role="group" aria-label="Фильтр по бренду">
            {brandNames.map((item) => <button key={item} className={brand === item ? "active" : ""} onClick={() => { setBrand(item); setFavoritesOnly(false); setVisible(12); }}>{item}<small>{item === "Все" ? series.length : series.filter((row) => row.brand === item).length}</small></button>)}
          </div>

          <div className="results-line"><span>Найдено серий: <strong>{filtered.length}</strong></span><span>Цены и наличие — после подключения подтверждённого источника</span></div>
          {filtered.length ? <div className="series-grid">
            {filtered.slice(0, visible).map((item) => {
              const liked = favorites.includes(item.slug);
              const compared = compare.includes(item.slug);
              return <article className="series-card" key={item.slug}>
                <Link href={`/catalog/${item.slug}`} aria-label={`Открыть ${item.brand} ${item.name}`}><SeriesArtwork record={item} /></Link>
                <div className="series-card-body">
                  <div className="card-labels"><span>{item.brand}</span>{item.new2026 && <b>Новинка 2026</b>}</div>
                  <h3><Link href={`/catalog/${item.slug}`}>{item.name}</Link></h3>
                  <div className="verified-meta">
                    {item.technology !== "not-confirmed" && <span>{item.technology === "inverter" ? "Инвертор" : "On / Off"}</span>}
                    {item.refrigerant && <span>{item.refrigerant}</span>}
                    <span>{item.models.length} {item.models.length === 1 ? "модель" : item.models.length < 5 ? "модели" : "моделей"}</span>
                  </div>
                  <p className="model-line">{item.models.slice(0, 3).join(" · ")}{item.models.length > 3 ? ` · +${item.models.length - 3}` : ""}</p>
                  {item.variants && <p className="variant-line">Варианты: {item.variants.join(", ")}</p>}
                  <div className="series-actions">
                    <Link className="text-link" href={`/catalog/${item.slug}`}>Открыть серию <Icon name="arrow"/></Link>
                    <button className={`round-action${liked ? " active" : ""}`} aria-label={liked ? "Удалить из избранного" : "Добавить в избранное"} aria-pressed={liked} onClick={() => toggleFavorite(item.slug)}><Icon name="heart"/></button>
                    <button className={`round-action${compared ? " active" : ""}`} aria-label={compared ? "Убрать из сравнения" : "Добавить к сравнению"} aria-pressed={compared} onClick={() => toggleCompare(item.slug)}><Icon name="compare"/></button>
                  </div>
                </div>
              </article>;
            })}
          </div> : <div className="empty-state"><strong>{favoritesOnly && favorites.length === 0 ? "В избранном пока пусто" : "Ничего не найдено"}</strong><p>{favoritesOnly && favorites.length === 0 ? "Нажмите на сердце в карточке серии — выбор сохранится на этом устройстве." : "Попробуйте убрать часть фильтров или ввести модель без дефисов."}</p><button onClick={() => { setQuery(""); setBrand("Все"); setTechnology("all"); setNewOnly(false); setFavoritesOnly(false); }}>Сбросить фильтры</button></div>}
          {visible < filtered.length && <div className="center-action"><button className="button button-ghost" onClick={() => setVisible((count) => count + 12)}>Показать ещё 12 серий</button></div>}
        </div>
      </section>

      <section className="section vrf-section" id="vrf">
        <div className="shell vrf-shell">
          <div className="vrf-copy">
            <p className="kicker kicker-light">Инженерный хаб</p>
            <h2>VRV/VRF для объектов со сложной логикой климата</h2>
            <p>Одна система может обслуживать множество зон, но её нельзя подбирать по одной площади. Нужны планы, режимы, теплопритоки, трассы, перепады, одновременность и требования к управлению.</p>
            <div className="vrf-pills"><span>Тепловой насос</span><span>Рекуперация тепла</span><span>BMS</span><span>Центральное управление</span></div>
            <Link className="button button-light" href="/vrf">Открыть раздел VRV/VRF <Icon name="arrow"/></Link>
          </div>
          <div className="vrf-diagram" aria-label="Схема VRV/VRF-системы">
            <div className="vrf-outdoor"><i/><i/><i/><span>Наружный блок</span></div>
            <div className="vrf-line main-line"/><div className="vrf-line branch-one"/><div className="vrf-line branch-two"/><div className="vrf-line branch-three"/>
            <div className="vrf-indoor indoor-a"><b/>Кассетный</div><div className="vrf-indoor indoor-b"><b/>Канальный</div><div className="vrf-indoor indoor-c"><b/>Настенный</div>
            <span className="diagram-note">Условная схема — не проект</span>
          </div>
        </div>
        <div className="shell vrf-components"><article><span>01</span><strong>Исходные данные</strong><p>Планы, зоны, режимы, теплопритоки, ограничения фасада и электроснабжения.</p></article><article><span>02</span><strong>Системный расчёт</strong><p>Длины, перепады, коэффициент одновременности и заправка — по документации системы.</p></article><article><span>03</span><strong>Пусконаладка</strong><p>Опрессовка, вакуумирование, адресация, проверка автоматики и режимов.</p></article></div>
      </section>

      <section className="section calculator-section" id="calculator">
        <div className="shell">
          <div className="section-head split-head"><div><p className="kicker">Предварительный расчёт</p><h2>Оцените требуемую мощность</h2></div><p>Калькулятор помогает подготовиться к разговору с инженером. Он не заменяет обследование и проект.</p></div>
          <div className="calculator-grid">
            <div className="calculator-form">
              <div className="form-row two-cols">
                <label><span>Тип объекта</span><select value={objectType} onChange={(e) => setObjectType(e.target.value)}>{objects.map((item) => <option key={item.title}>{item.title}</option>)}<option>Коммерческий объект</option></select></label>
                <label><span>Площадь, м²</span><input type="number" min="5" max="1000" value={area} onChange={(e) => setArea(Math.max(5, Number(e.target.value) || 5))}/></label>
              </div>
              <label className="range-field"><span><b>Высота потолка</b><output>{height.toFixed(1)} м</output></span><input type="range" min="2.3" max="6" step="0.1" value={height} onChange={(e) => setHeight(Number(e.target.value))}/><small>От 2,3 до 6 метров</small></label>
              <fieldset><legend>Инсоляция и остекление</legend><div className="segmented"><button type="button" className={sun === "low" ? "active" : ""} onClick={() => setSun("low")}>Низкая</button><button type="button" className={sun === "medium" ? "active" : ""} onClick={() => setSun("medium")}>Средняя</button><button type="button" className={sun === "high" ? "active" : ""} onClick={() => setSun("high")}>Высокая</button></div></fieldset>
              <div className="form-row three-cols">
                <label><span>Постоянно людей</span><input type="number" min="1" max="100" value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))}/></label>
                <label><span>Техника, кВт тепла</span><input type="number" min="0" max="50" step="0.1" value={equipment} onChange={(e) => setEquipment(Math.max(0, Number(e.target.value) || 0))}/></label>
                <label><span>Количество зон</span><input type="number" min="1" max="100" value={zones} onChange={(e) => setZones(Math.max(1, Number(e.target.value) || 1))}/></label>
              </div>
              <label><span>Потребность в вентиляции</span><select value={ventilation} onChange={(e) => setVentilation(e.target.value)}><option>Нужно определить</option><option>Нужен приток свежего воздуха</option><option>Есть отдельная вентиляция</option></select></label>
            </div>
            <aside className="calculator-result" aria-live="polite">
              <p>Ориентир холодопроизводительности</p>
              <div className="result-number"><strong>{capacityLow}</strong><span>—</span><strong>{capacityHigh}</strong><small>кВт</small></div>
              <div className="capacity-bar"><i style={{ width: `${Math.min(100, calculated * 7)}%` }}/></div>
              <ul><li><Icon name="check"/>База: 0,1 кВт/м² при 2,7 м</li><li><Icon name="check"/>Поправка на высоту и инсоляцию</li><li><Icon name="check"/>Учтены люди и заданный теплоприток техники</li></ul>
              <div className="result-warning"><strong>Это не готовый проект</strong><p>Инженер должен проверить планировку, окна, стены, регион, трассы, дренаж, электрику и паспортные ограничения оборудования.</p></div>
              <button className="button button-primary" onClick={downloadBrief}><Icon name="download"/> Скачать бриф</button>
              <small className="privacy-note">Файл создаётся на вашем устройстве. Данные никуда не отправляются.</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="section process-section" id="services">
        <div className="shell">
          <div className="section-head split-head"><div><p className="kicker">Полный цикл</p><h2>От задачи до стабильной работы</h2></div><p>Сайт не обещает сроки и стоимость до подтверждения исходных данных — каждый этап должен быть проверяемым.</p></div>
          <div className="process-grid">{serviceSteps.map((step) => <article key={step.n}><span>{step.n}</span><div className="process-icon"><i/><i/></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </div>
      </section>

      <section className="section integrity-section" id="guides">
        <div className="shell integrity-grid">
          <div className="integrity-copy"><p className="kicker">Честные данные</p><h2>Красивый интерфейс — только верхушка инженерной работы</h2><p>Перед публикацией каждая характеристика должна быть связана с паспортом, официальной карточкой или предоставленным владельцем источником. Конфликтующие значения не показываются посетителю.</p><div className="integrity-list"><span><Icon name="check"/>Нет тестовых брендов старого сайта</span><span><Icon name="check"/>Нет фиктивного телефона, отзывов и цен</span><span><Icon name="check"/>Неизвестные параметры скрыты</span><span><Icon name="check"/>1000 маршрутов управляются статусами index/noindex/draft</span></div></div>
          <div className="audit-panel"><div className="audit-top"><span>DATA / QUALITY</span><i>Прототип</i></div><div className="audit-metrics"><article><strong>5</strong><span>брендов</span></article><article><strong>44</strong><span>серии</span></article><article><strong>1000</strong><span>маршрутов в карте</span></article><article><strong>0</strong><span>вымышленных цен</span></article></div><p>Технические поля, изображения, контакты и реквизиты переходят в публикацию после полной выгрузки исходников и проверки владельцем.</p></div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid"><div><p className="kicker">Коротко о важном</p><h2>Частые вопросы</h2><p>Без рекламных обещаний и опасных советов по самостоятельному ремонту.</p></div><div className="faq-list">{faqs.map((item, index) => <details key={item.q} open={index === 0}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div></div>
      </section>

      <section className="final-cta"><div className="shell final-cta-inner"><div><p className="kicker kicker-light">Начните с исходных данных</p><h2>Подготовьте климатический бриф за пару минут</h2><p>Получите понятный файл с параметрами объекта и предварительным диапазоном мощности — без передачи персональных данных.</p></div><Link className="button button-light" href="/calculator">Перейти к расчёту <Icon name="arrow"/></Link></div></section>

      <footer><div className="shell footer-grid"><div><BrandMark inverse/><p>Кондиционирование, вентиляция и VRV/VRF‑системы. Инженерный каталог на проверяемых данных.</p></div><nav aria-label="Навигация в подвале"><strong>Разделы</strong><Link href="/catalog">Каталог</Link><Link href="/brands">Бренды</Link><Link href="/solutions">Решения</Link><Link href="/vrf">VRV / VRF</Link><Link href="/services">Услуги</Link><Link href="/guides">База знаний</Link><Link href="/calculator">Калькулятор</Link></nav><div><strong>Принципы</strong><p>Цена, наличие, гарантия, контакты и реквизиты не публикуются до подтверждения владельцем.</p></div></div><div className="shell footer-bottom"><span>© 2026 СНЕГ</span><span>Расчёты на сайте имеют предварительный характер</span></div></footer>

      <nav className="mobile-bottom" aria-label="Мобильная навигация"><Link href="/"><Icon name="home"/><span>Главная</span></Link><Link href="/catalog"><Icon name="catalog"/><span>Каталог</span></Link><button onClick={() => setSearchOpen(true)}><Icon name="search"/><span>Поиск</span></button><button onClick={() => { setBrand("Все"); setQuery(""); setNewOnly(false); setFavoritesOnly(true); scrollToId("catalog"); }}><Icon name="heart"/><span>Избранное</span>{favorites.length > 0 && <b>{favorites.length}</b>}</button><Link href="/calculator"><Icon name="calc"/><span>Расчёт</span></Link></nav>

      {compare.length > 0 && <div className="compare-bar"><div><Icon name="compare"/><span><strong>{compare.length}</strong> из 4 серий</span><div className="compare-dots">{selectedCompare.map((item) => <i key={item.slug}>{item.brand.slice(0,1)}</i>)}</div></div><button onClick={() => setCompareOpen(true)}>Сравнить</button><button className="compare-clear" aria-label="Очистить сравнение" onClick={() => { setCompare([]); localStorage.setItem("sneg-compare", "[]"); }}><Icon name="close"/></button></div>}

      {menuOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Меню"><button className="overlay-backdrop" aria-label="Закрыть меню" onClick={() => setMenuOpen(false)}/><aside className="menu-panel"><div className="panel-head"><BrandMark/><button aria-label="Закрыть меню" onClick={() => setMenuOpen(false)}><Icon name="close"/></button></div><nav>{[["/catalog","Каталог"],["/brands","Бренды"],["/solutions","Решения по объекту"],["/vrf","VRV / VRF"],["/services","Услуги"],["/guides","База знаний"],["/calculator","Предварительный расчёт"]].map(([href,label]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<Icon name="arrow"/></Link>)}</nav><p>Контактные данные будут доступны после подтверждения владельцем — без публичных заглушек.</p></aside></div>}

      {searchOpen && <div className="overlay search-overlay" role="dialog" aria-modal="true" aria-label="Поиск по сайту"><button className="overlay-backdrop" aria-label="Закрыть поиск" onClick={() => setSearchOpen(false)}/><section className="search-panel"><div className="panel-head"><strong>Поиск</strong><button aria-label="Закрыть поиск" onClick={() => setSearchOpen(false)}><Icon name="close"/></button></div><label className="big-search"><Icon name="search"/><span className="sr-only">Введите запрос</span><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Например: Coral, AS25HPL2HRA или Хайер"/></label>{query ? <div className="search-results"><p>Результаты: {globalResults.length}</p>{globalResults.map((item) => <Link key={item.slug} href={`/catalog/${item.slug}`} onClick={() => setSearchOpen(false)}><span><small>{item.brand}</small><strong>{item.name}</strong><em>{item.models.slice(0,3).join(" · ")}</em></span><Icon name="arrow"/></Link>)}{globalResults.length === 0 && <div className="empty-search">Проверьте написание или введите модель без дефисов.</div>}</div> : <div className="search-hints"><span>Популярные направления</span>{["Haier Coral", "Chigo Sunrise", "Новинки 2026", "VRV / VRF"].map((hint) => <button key={hint} onClick={() => setQuery(hint)}>{hint}</button>)}</div>}</section></div>}

      {compareOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Сравнение серий"><button className="overlay-backdrop" aria-label="Закрыть сравнение" onClick={() => setCompareOpen(false)}/><section className="compare-panel"><div className="panel-head"><div><small>До четырёх позиций</small><strong>Сравнение серий</strong></div><button aria-label="Закрыть сравнение" onClick={() => setCompareOpen(false)}><Icon name="close"/></button></div><div className="compare-scroll"><table><thead><tr><th>Параметр</th>{selectedCompare.map((item) => <th key={item.slug}>{item.brand}<strong>{item.name}</strong></th>)}</tr></thead><tbody><tr><th>Моделей в карте</th>{selectedCompare.map((item) => <td key={item.slug}>{item.models.length}</td>)}</tr>{selectedCompare.some((item) => item.technology !== "not-confirmed") && <tr><th>Тип</th>{selectedCompare.map((item) => <td key={item.slug}>{item.technology === "inverter" ? "Инвертор" : item.technology === "on-off" ? "On / Off" : "—"}</td>)}</tr>}<tr><th>Новинка 2026</th>{selectedCompare.map((item) => <td key={item.slug}>{item.new2026 ? "Да" : "—"}</td>)}</tr><tr><th>Проверенные обозначения</th>{selectedCompare.map((item) => <td key={item.slug}>{item.models.slice(0,4).join(", ")}</td>)}</tr></tbody></table></div><p className="compare-note">Технические параметры не сравниваются, пока не связаны с паспортом конкретной модели. Отсутствие значения не считается недостатком.</p></section></div>}
    </main>
  );
}
