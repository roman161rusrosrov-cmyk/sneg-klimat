"use client";

import { useState } from "react";
import { objectSolutions } from "../site-content";
import { Icon } from "../site-shell";

export default function ClimateCalculator() {
  const [objectType, setObjectType] = useState("Квартира");
  const [area, setArea] = useState(35);
  const [height, setHeight] = useState(2.7);
  const [sun, setSun] = useState<"low" | "medium" | "high">("medium");
  const [people, setPeople] = useState(2);
  const [equipment, setEquipment] = useState(0.4);
  const [zones, setZones] = useState(1);
  const [ventilation, setVentilation] = useState("Нужно определить");
  const sunFactor = sun === "low" ? 0.9 : sun === "high" ? 1.15 : 1;
  const calculated = Math.max(0.5, area * 0.1 * (height / 2.7) * sunFactor + Math.max(0, people - 1) * 0.13 + equipment);
  const capacityLow = (calculated * 0.9).toFixed(1);
  const capacityHigh = (calculated * 1.1).toFixed(1);

  function downloadBrief() {
    const content = [
      "СНЕГ — предварительный климатический бриф", "",
      `Тип объекта: ${objectType}`, `Площадь: ${area} м²`, `Высота потолка: ${height.toFixed(1)} м`,
      `Инсоляция: ${sun === "low" ? "низкая" : sun === "high" ? "высокая" : "средняя"}`,
      `Людей: ${people}`, `Теплоприток от техники: ${equipment.toFixed(1)} кВт`, `Зон: ${zones}`,
      `Вентиляция: ${ventilation}`, `Ориентир холодопроизводительности: ${capacityLow}–${capacityHigh} кВт`, "",
      "Результат предварительный и требует проверки инженером по планировке, ограждениям, трассам, электрике, дренажу и документации выбранной системы.",
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob); link.download = "sneg-climate-brief.txt"; link.click(); URL.revokeObjectURL(link.href);
  }

  return (
    <div className="calculator-grid">
      <div className="calculator-form">
        <div className="form-row two-cols">
          <label><span>Тип объекта</span><select value={objectType} onChange={(event) => setObjectType(event.target.value)}>{objectSolutions.map((item) => <option key={item.slug}>{item.title}</option>)}</select></label>
          <label><span>Площадь, м²</span><input type="number" min="5" max="1000" value={area} onChange={(event) => setArea(Math.max(5, Number(event.target.value) || 5))} /></label>
        </div>
        <label className="range-field"><span><b>Высота потолка</b><output>{height.toFixed(1)} м</output></span><input type="range" min="2.3" max="6" step="0.1" value={height} onChange={(event) => setHeight(Number(event.target.value))} /><small>От 2,3 до 6 метров</small></label>
        <fieldset><legend>Инсоляция и остекление</legend><div className="segmented"><button type="button" className={sun === "low" ? "active" : ""} onClick={() => setSun("low")}>Низкая</button><button type="button" className={sun === "medium" ? "active" : ""} onClick={() => setSun("medium")}>Средняя</button><button type="button" className={sun === "high" ? "active" : ""} onClick={() => setSun("high")}>Высокая</button></div></fieldset>
        <div className="form-row three-cols">
          <label><span>Постоянно людей</span><input type="number" min="1" max="100" value={people} onChange={(event) => setPeople(Math.max(1, Number(event.target.value) || 1))} /></label>
          <label><span>Техника, кВт тепла</span><input type="number" min="0" max="50" step="0.1" value={equipment} onChange={(event) => setEquipment(Math.max(0, Number(event.target.value) || 0))} /></label>
          <label><span>Количество зон</span><input type="number" min="1" max="100" value={zones} onChange={(event) => setZones(Math.max(1, Number(event.target.value) || 1))} /></label>
        </div>
        <label><span>Потребность в вентиляции</span><select value={ventilation} onChange={(event) => setVentilation(event.target.value)}><option>Нужно определить</option><option>Нужен приток свежего воздуха</option><option>Есть отдельная вентиляция</option></select></label>
      </div>
      <aside className="calculator-result" aria-live="polite">
        <p>Ориентир холодопроизводительности</p>
        <div className="result-number"><strong>{capacityLow}</strong><span>—</span><strong>{capacityHigh}</strong><small>кВт</small></div>
        <div className="capacity-bar"><i style={{ width: `${Math.min(100, calculated * 7)}%` }} /></div>
        <ul><li><Icon name="check" />База: 0,1 кВт/м² при 2,7 м</li><li><Icon name="check" />Поправка на высоту и инсоляцию</li><li><Icon name="check" />Учтены люди и теплоприток техники</li></ul>
        <div className="result-warning"><strong>Это не готовый проект</strong><p>Инженер должен проверить планировку, окна, стены, регион, трассы, дренаж, электрику и паспортные ограничения оборудования.</p></div>
        <button className="button button-primary" onClick={downloadBrief}><Icon name="download" /> Скачать бриф</button>
        <small className="privacy-note">Файл создаётся на вашем устройстве. Данные никуда не отправляются.</small>
      </aside>
    </div>
  );
}
