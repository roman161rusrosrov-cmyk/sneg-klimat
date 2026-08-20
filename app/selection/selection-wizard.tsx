"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { business } from "../business-config";

type ObjectType = "apartment" | "house" | "business";
type ZoneCount = "one" | "few" | "many";
type Priority = "quiet" | "design" | "control" | "budget";

const objects: Array<[ObjectType, string, string]> = [
  ["apartment", "Квартира", "Комнаты и ограничения фасада"],
  ["house", "Частный дом", "Несколько помещений и этажей"],
  ["business", "Бизнес", "Офис, магазин, ресторан или другой объект"],
];
const zones: Array<[ZoneCount, string, string]> = [
  ["one", "1 зона", "Одна комната или локальное помещение"],
  ["few", "2–4 зоны", "Несколько помещений с разными режимами"],
  ["many", "5+ зон", "Много помещений или централизованное управление"],
];
const priorities: Array<[Priority, string]> = [["quiet", "Тишина"], ["design", "Внешний вид"], ["control", "Управление зонами"], ["budget", "Рациональный бюджет"]];

export default function SelectionWizard() {
  const [object, setObject] = useState<ObjectType>("apartment");
  const [zoneCount, setZoneCount] = useState<ZoneCount>("one");
  const [ventilation, setVentilation] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>(["quiet"]);

  const result = useMemo(() => {
    if (zoneCount === "many") return { title: "Рассмотреть VRV/VRF", text: "Многозональная система может упростить управление большим количеством помещений. Нужен проект трасс, перепадов, одновременности и автоматики.", href: "/vrf", label: "Открыть раздел VRV/VRF" };
    if (zoneCount === "few") return { title: "Сравнить мульти-сплит и отдельные сплиты", text: "Оба подхода могут быть уместны. Сравнивают количество наружных блоков, независимость зон, трассы, резервирование и сервисный доступ.", href: "/compare", label: "Сравнить типы систем" };
    return { title: "Начать со сплит-системы", text: "Для одной зоны обычно сначала рассматривают отдельную сплит-систему, затем уточняют мощность, место блоков, акустику, трассу и дренирование.", href: "/catalog", label: "Перейти в каталог" };
  }, [zoneCount]);

  function togglePriority(priority: Priority) {
    setSelectedPriorities((current) => current.includes(priority) ? current.filter((item) => item !== priority) : [...current, priority]);
  }

  const objectLabel = objects.find(([key]) => key === object)?.[1];
  const priorityLabels = priorities.filter(([key]) => selectedPriorities.includes(key)).map(([, label]) => label);

  return (
    <div className="selection-wizard">
      <div className="selection-questions">
        <fieldset><legend><span>01</span>Какой объект?</legend><div className="choice-grid">{objects.map(([key, label, hint]) => <button type="button" className={object === key ? "active" : ""} aria-pressed={object === key} onClick={() => setObject(key)} key={key}><strong>{label}</strong><small>{hint}</small></button>)}</div></fieldset>
        <fieldset><legend><span>02</span>Сколько независимых зон?</legend><div className="choice-grid">{zones.map(([key, label, hint]) => <button type="button" className={zoneCount === key ? "active" : ""} aria-pressed={zoneCount === key} onClick={() => setZoneCount(key)} key={key}><strong>{label}</strong><small>{hint}</small></button>)}</div></fieldset>
        <fieldset><legend><span>03</span>Нужен приток свежего воздуха?</legend><div className="binary-choice"><button type="button" className={ventilation ? "active" : ""} aria-pressed={ventilation} onClick={() => setVentilation(true)}>Да, нужно учесть вентиляцию</button><button type="button" className={!ventilation ? "active" : ""} aria-pressed={!ventilation} onClick={() => setVentilation(false)}>Нет или уже предусмотрена</button></div></fieldset>
        <fieldset><legend><span>04</span>Что важнее?</legend><div className="priority-choice">{priorities.map(([key, label]) => <button type="button" className={selectedPriorities.includes(key) ? "active" : ""} aria-pressed={selectedPriorities.includes(key)} onClick={() => togglePriority(key)} key={key}>{selectedPriorities.includes(key) ? "✓ " : "+ "}{label}</button>)}</div></fieldset>
      </div>
      <aside className="selection-result" aria-live="polite">
        <p className="kicker">Предварительное направление</p><h2>{result.title}</h2><p>{result.text}</p>
        <dl><div><dt>Объект</dt><dd>{objectLabel}</dd></div><div><dt>Приоритеты</dt><dd>{priorityLabels.length ? priorityLabels.join(", ") : "Не выбраны"}</dd></div><div><dt>Свежий воздух</dt><dd>{ventilation ? "Нужна отдельная проработка вентиляции" : "Уточнить на обследовании"}</dd></div></dl>
        {ventilation && <div className="selection-warning">Кондиционирование обычно не заменяет требуемый воздухообмен. Вентиляцию проверяют отдельным расчётом.</div>}
        <div className="selection-actions"><Link className="button button-primary" href={result.href}>{result.label}</Link><Link className="button button-ghost" href="/calculator">Оценить мощность</Link><a className="selection-call" href={business.phoneHref}>Позвонить менеджеру · {business.phoneDisplay}</a></div>
        <small className="local-note">Ответы используются только на этой странице и никуда не отправляются.</small>
      </aside>
    </div>
  );
}
