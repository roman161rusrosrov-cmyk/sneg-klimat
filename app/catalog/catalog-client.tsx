"use client";

/* Catalog images are already normalized WebP assets and must keep their static public paths. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { series, type SeriesRecord } from "../catalog-data";
import { publicAsset } from "../public-path";
import { Icon } from "../site-shell";

const brands = ["Все", "Haier", "Chigo", "JAX", "Rovex", "Vickers"] as const;
type BrandFilter = (typeof brands)[number];

function normalize(value: string) {
  return value.toLocaleLowerCase("ru").replace(/[^a-zа-яё0-9]/g, "");
}

function modelWord(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return "модель";
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "модели";
  return "моделей";
}

export default function CatalogClient({ initialBrand = "Все" }: { initialBrand?: BrandFilter }) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<BrandFilter>(initialBrand);
  const [technology, setTechnology] = useState<"all" | "inverter" | "on-off">("all");
  const [newOnly, setNewOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visible, setVisible] = useState(18);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { setFavorites(JSON.parse(localStorage.getItem("sneg-favorites") || "[]")); }
      catch { setFavorites([]); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const clean = normalize(query);
    return series.filter((item) => {
      const haystack = normalize(`${item.brand} ${item.name} ${item.models.join(" ")} ${item.variants?.join(" ") || ""}`);
      return (!clean || haystack.includes(clean)) &&
        (brand === "Все" || item.brand === brand) &&
        (technology === "all" || item.technology === technology) &&
        (!newOnly || item.new2026) &&
        (!favoritesOnly || favorites.includes(item.slug));
    });
  }, [brand, favorites, favoritesOnly, newOnly, query, technology]);

  function toggleFavorite(slug: string) {
    const next = favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug];
    setFavorites(next);
    localStorage.setItem("sneg-favorites", JSON.stringify(next));
  }

  function reset() {
    setQuery(""); setBrand(initialBrand); setTechnology("all"); setNewOnly(false); setFavoritesOnly(false); setVisible(18);
  }

  return (
    <>
      <div className="catalog-tools catalog-page-tools">
        <label className="catalog-search"><Icon name="search" /><span className="sr-only">Поиск по каталогу</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(18); }} placeholder="Бренд, серия или обозначение модели" /></label>
        <div className="toggle-group" aria-label="Тип компрессора">
          <button className={technology === "all" ? "active" : ""} onClick={() => setTechnology("all")}>Все типы</button>
          <button className={technology === "inverter" ? "active" : ""} onClick={() => setTechnology("inverter")}>Инвертор</button>
          <button className={technology === "on-off" ? "active" : ""} onClick={() => setTechnology("on-off")}>On / Off</button>
        </div>
        <button className={`new-filter${newOnly ? " active" : ""}`} onClick={() => setNewOnly(!newOnly)}>Новинки 2026</button>
        <button className={`new-filter${favoritesOnly ? " active" : ""}`} onClick={() => setFavoritesOnly(!favoritesOnly)}>Избранное · {favorites.length}</button>
      </div>

      <div className="brand-tabs" role="group" aria-label="Фильтр по бренду">
        {brands.map((item) => <button key={item} className={brand === item ? "active" : ""} onClick={() => { setBrand(item); setFavoritesOnly(false); setVisible(18); }}>{item}<small>{item === "Все" ? series.length : series.filter((row) => row.brand === item).length}</small></button>)}
      </div>
      <div className="results-line"><span>Найдено серий: <strong>{filtered.length}</strong></span><span>44 серии связаны с реальными обложками из исходных материалов</span></div>

      {filtered.length > 0 ? <div className="series-grid">
        {filtered.slice(0, visible).map((item: SeriesRecord) => {
          const liked = favorites.includes(item.slug);
          return <article className="series-card" key={item.slug}>
            <Link className="series-art series-art-photo" href={`/catalog/${item.slug}`} aria-label={`Открыть ${item.brand} ${item.name}`}>
              <img src={publicAsset(`/catalog/${item.slug}.webp`)} alt={`${item.brand} ${item.name}`} width="1000" height="1000" loading="lazy" />
            </Link>
            <div className="series-card-body">
              <div className="card-labels"><span>{item.brand}</span>{item.new2026 && <b>Новинка 2026</b>}</div>
              <h3><Link href={`/catalog/${item.slug}`}>{item.name}</Link></h3>
              <div className="verified-meta">
                {item.technology !== "not-confirmed" && <span>{item.technology === "inverter" ? "Инвертор" : "On / Off"}</span>}
                {item.refrigerant && <span>{item.refrigerant}</span>}
                <span>{item.models.length} {modelWord(item.models.length)}</span>
              </div>
              <p className="model-line">{item.models.slice(0, 3).join(" · ")}{item.models.length > 3 ? ` · +${item.models.length - 3}` : ""}</p>
              {item.variants && <p className="variant-line">Варианты: {item.variants.join(", ")}</p>}
              <div className="series-actions"><Link className="text-link" href={`/catalog/${item.slug}`}>Открыть серию <Icon name="arrow" /></Link><button className={`round-action${liked ? " active" : ""}`} aria-label={liked ? "Удалить из избранного" : "Добавить в избранное"} aria-pressed={liked} onClick={() => toggleFavorite(item.slug)}>♡</button></div>
            </div>
          </article>;
        })}
      </div> : <div className="empty-state"><strong>Ничего не найдено</strong><p>Попробуйте убрать часть фильтров или ввести модель без дефисов.</p><button onClick={reset}>Сбросить фильтры</button></div>}
      {visible < filtered.length && <div className="center-action"><button className="button button-ghost" onClick={() => setVisible((count) => count + 18)}>Показать ещё</button></div>}
    </>
  );
}
