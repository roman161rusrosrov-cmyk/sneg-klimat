"use client";

/* Product artwork is served as pre-optimized static WebP assets. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { business } from "../business-config";
import { series } from "../catalog-data";
import { publicAsset } from "../public-path";

export default function FavoritesClient() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { setIds(JSON.parse(localStorage.getItem("sneg-favorites") || "[]")); }
      catch { setIds([]); }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const items = useMemo(() => series.filter((item) => ids.includes(item.slug)), [ids]);

  function save(next: string[]) {
    setIds(next);
    localStorage.setItem("sneg-favorites", JSON.stringify(next));
  }

  if (!ready) return <div className="favorites-loading">Загружаем список на этом устройстве…</div>;
  if (!items.length) return <div className="favorites-empty"><span>♡</span><h2>Здесь пока пусто</h2><p>Нажмите на сердце в карточке серии — она появится на этой странице.</p><Link className="button button-primary" href="/catalog">Открыть каталог</Link></div>;

  return <><div className="favorites-head"><p>Сохранено серий: <strong>{items.length}</strong></p><button type="button" onClick={() => save([])}>Очистить список</button></div><div className="favorite-grid">{items.map((item) => <article className="favorite-card" key={item.slug}><Link className="favorite-image" href={`/catalog/${item.slug}`}><img src={publicAsset(`/catalog/${item.slug}.webp`)} width="1000" height="1000" alt={`${item.brand} ${item.name}`} /></Link><div><small>{item.brand}</small><h2><Link href={`/catalog/${item.slug}`}>{item.name}</Link></h2><p>{item.models.slice(0, 4).join(" · ")}{item.models.length > 4 ? ` · +${item.models.length - 4}` : ""}</p><div className="favorite-actions"><a href={business.phoneHref}><span>☎</span><span><small>Спросить цену</small><strong>{business.phoneDisplay}</strong></span></a><button type="button" onClick={() => save(ids.filter((id) => id !== item.slug))}>Убрать</button></div></div></article>)}</div></>;
}
