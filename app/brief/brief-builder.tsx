"use client";

import { useMemo, useState } from "react";

const objectTypes = [
  ["apartment", "Квартира"], ["house", "Частный дом"], ["office", "Офис"],
  ["retail", "Магазин"], ["restaurant", "Ресторан / кафе"], ["hotel", "Гостиница"],
  ["warehouse", "Склад"], ["production", "Производство"],
] as const;
const goals = [["cool", "Охлаждение"], ["heat", "Охлаждение и обогрев"], ["air", "Свежий воздух"], ["complex", "Комплексный климат"]] as const;
const glazingTypes = [["small", "Небольшое"], ["regular", "Обычное"], ["large", "Панорамное / витрины"]] as const;
const sunTypes = [["low", "Мало прямого солнца"], ["mixed", "Смешанная ориентация"], ["high", "Много прямого солнца"]] as const;
const priorityOptions = ["Тишина", "Энергоэффективность", "Незаметный интерьер", "Раздельные зоны", "Свежий воздух", "Работа в межсезонье"];

function labelOf(rows: readonly (readonly [string, string])[], value: string) {
  return rows.find(([key]) => key === value)?.[1] || value;
}

export default function BriefBuilder() {
  const [objectType, setObjectType] = useState("apartment");
  const [goal, setGoal] = useState("cool");
  const [area, setArea] = useState(45);
  const [height, setHeight] = useState(2.7);
  const [zones, setZones] = useState(2);
  const [people, setPeople] = useState(3);
  const [glazing, setGlazing] = useState("regular");
  const [sun, setSun] = useState("mixed");
  const [equipment, setEquipment] = useState("обычная бытовая нагрузка");
  const [priorities, setPriorities] = useState<string[]>(["Тишина"]);
  const [status, setStatus] = useState("");

  const brief = useMemo(() => [
    "ПРЕДВАРИТЕЛЬНЫЙ ТЕХНИЧЕСКИЙ БРИФ — КЛИМАТ",
    "",
    `Тип объекта: ${labelOf(objectTypes, objectType)}`,
    `Основная задача: ${labelOf(goals, goal)}`,
    `Ориентировочная площадь: ${area} м²`,
    `Высота потолка: ${height.toLocaleString("ru-RU")} м`,
    `Количество отдельных зон: ${zones}`,
    `Обычное количество людей: ${people}`,
    `Остекление: ${labelOf(glazingTypes, glazing)}`,
    `Солнечная нагрузка: ${labelOf(sunTypes, sun)}`,
    `Теплопритоки от техники: ${equipment}`,
    `Приоритеты: ${priorities.length ? priorities.join(", ") : "не выбраны"}`,
    "",
    "Нужно уточнить при обследовании:",
    "— планы и назначение каждой зоны;",
    "— допустимые места блоков, трасс и дренажа;",
    "— электроснабжение и ограничения фасада;",
    "— режимы работы, наружные температуры и требования паспортов оборудования;",
    "— необходимость отдельной приточно-вытяжной вентиляции.",
    "",
    "Бриф предварительный и не заменяет теплотехнический расчёт, проект и документацию производителя.",
  ].join("\n"), [area, equipment, glazing, goal, height, objectType, people, priorities, sun, zones]);

  function togglePriority(value: string) {
    setPriorities((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function download() {
    const blob = new Blob([brief], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "klimaticheskiy-brief.txt";
    link.click();
    URL.revokeObjectURL(href);
    setStatus("Файл подготовлен");
  }

  async function copy() {
    try { await navigator.clipboard.writeText(brief); setStatus("Бриф скопирован"); }
    catch { setStatus("Не удалось скопировать"); }
  }

  return <div className="brief-builder"><form className="brief-form" onSubmit={(event) => event.preventDefault()}>
    <div className="brief-privacy"><strong>Без персональных данных</strong><span>Не вводите ФИО, адрес, телефон или почту: таких полей здесь нет.</span></div>
    <div className="brief-fields">
      <label><span>Тип объекта</span><select value={objectType} onChange={(event) => setObjectType(event.target.value)}>{objectTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label><span>Основная задача</span><select value={goal} onChange={(event) => setGoal(event.target.value)}>{goals.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label><span>Площадь, м²</span><input type="number" min="5" max="10000" value={area} onChange={(event) => setArea(Number(event.target.value))} /></label>
      <label><span>Высота потолка, м</span><input type="number" min="2" max="20" step="0.1" value={height} onChange={(event) => setHeight(Number(event.target.value))} /></label>
      <label><span>Отдельных зон</span><input type="number" min="1" max="100" value={zones} onChange={(event) => setZones(Number(event.target.value))} /></label>
      <label><span>Обычно людей</span><input type="number" min="0" max="1000" value={people} onChange={(event) => setPeople(Number(event.target.value))} /></label>
      <label><span>Остекление</span><select value={glazing} onChange={(event) => setGlazing(event.target.value)}>{glazingTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label><span>Солнечная нагрузка</span><select value={sun} onChange={(event) => setSun(event.target.value)}>{sunTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label className="brief-wide"><span>Техника и другие теплопритоки</span><select value={equipment} onChange={(event) => setEquipment(event.target.value)}><option>обычная бытовая нагрузка</option><option>много компьютеров и экранов</option><option>кухонное или тепловое оборудование</option><option>технологическая нагрузка — нужен отдельный расчёт</option></select></label>
    </div>
    <fieldset className="brief-priorities"><legend>Приоритеты проекта</legend><div>{priorityOptions.map((item) => <button type="button" className={priorities.includes(item) ? "active" : ""} aria-pressed={priorities.includes(item)} onClick={() => togglePriority(item)} key={item}>{item}</button>)}</div></fieldset>
  </form><aside className="brief-preview"><p className="kicker kicker-light">Предпросмотр</p><h2>Готово для первого разговора</h2><pre>{brief}</pre><div className="brief-actions"><button type="button" className="button button-light" onClick={download}>Скачать TXT</button><button type="button" className="button brief-copy" onClick={copy}>Копировать</button></div><small>{status || "Всё рассчитано и сформировано только в браузере."}</small></aside></div>;
}
