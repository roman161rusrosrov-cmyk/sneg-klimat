"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { business } from "../business-config";
import { series } from "../catalog-data";

function technology(value: string) {
  if (value === "inverter") return "Инвертор";
  if (value === "on-off") return "On / Off";
  return "Уточнить";
}

export default function FavoritesCompare() {
  const [ids, setIds] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let saved: string[] = [];
      try { saved = JSON.parse(localStorage.getItem("sneg-favorites") || "[]"); } catch { saved = []; }
      setIds(saved);
      setSelected(saved.slice(0, 4));
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const items = useMemo(() => series.filter((item) => ids.includes(item.slug)), [ids]);
  const compared = useMemo(() => series.filter((item) => selected.includes(item.slug)), [selected]);

  function toggle(slug: string) {
    if (selected.includes(slug)) { setSelected(selected.filter((item) => item !== slug)); setStatus(""); return; }
    if (selected.length >= 4) { setStatus("Можно сравнить не больше четырёх серий."); return; }
    setSelected([...selected, slug]); setStatus("");
  }

  async function copy() {
    const text = compared.map((item) => `${item.brand} ${item.name}: ${item.models.join(", ")}`).join("\n");
    try { await navigator.clipboard.writeText(text); setStatus("Выбранные серии и модели скопированы."); }
    catch { setStatus("Не удалось скопировать список."); }
  }

  if (!ready) return <div className="favorites-loading">Загружаем избранное с этого устройства…</div>;
  if (!items.length) return <div className="favorites-empty"><span>⇄</span><h2>Сначала сохраните серии</h2><p>Добавьте позиции сердцем в каталоге, затем вернитесь к сравнению.</p><Link className="button button-primary" href="/catalog">Открыть каталог</Link></div>;

  const rows = [
    ["Бренд", (slug: string) => series.find((item) => item.slug === slug)?.brand || "—"],
    ["Технология", (slug: string) => technology(series.find((item) => item.slug === slug)?.technology || "")],
    ["Хладагент", (slug: string) => series.find((item) => item.slug === slug)?.refrigerant || "Уточнить"],
    ["Обозначений", (slug: string) => String(series.find((item) => item.slug === slug)?.models.length || 0)],
    ["Варианты", (slug: string) => series.find((item) => item.slug === slug)?.variants?.join(", ") || "Уточнить"],
  ] as const;

  return <><div className="compare-picker"><div><strong>Выберите до четырёх</strong><small>{status || `Сейчас выбрано: ${selected.length}`}</small></div><div>{items.map((item) => <button type="button" className={selected.includes(item.slug) ? "active" : ""} onClick={() => toggle(item.slug)} aria-pressed={selected.includes(item.slug)} key={item.slug}><span>{selected.includes(item.slug) ? "✓" : "+"}</span>{item.brand} {item.name}</button>)}</div></div>{compared.length ? <><div className="favorites-compare-table"><table><thead><tr><th>Параметр</th>{compared.map((item) => <th key={item.slug}><small>{item.brand}</small><Link href={`/catalog/${item.slug}`}>{item.name}</Link></th>)}</tr></thead><tbody>{rows.map(([title, getValue]) => <tr key={title}><th scope="row">{title}</th>{compared.map((item) => <td key={item.slug}>{getValue(item.slug)}</td>)}</tr>)}<tr><th scope="row">Модели</th>{compared.map((item) => <td key={item.slug}>{item.models.join(" · ")}</td>)}</tr></tbody></table></div><div className="favorites-compare-actions"><button type="button" className="button button-ghost" onClick={copy}>Копировать модели</button><a className="button button-primary" href={business.phoneHref}>Спросить цену · {business.phoneDisplay}</a></div><p className="compare-source-note">Таблица использует только сведения, уже указанные в каталоге. Отсутствующие характеристики не угадываются — их нужно уточнить по точной модификации.</p></> : <div className="compare-placeholder">Выберите хотя бы одну серию.</div>}</>;
}
