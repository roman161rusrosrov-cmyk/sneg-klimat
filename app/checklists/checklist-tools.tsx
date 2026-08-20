"use client";

import { useMemo, useState } from "react";

const groups = [
  { title: "До обследования", items: ["План помещений с размерами и высотой", "Назначение каждой зоны", "Количество людей и график использования", "Окна, ориентация и затенение", "Перечень техники и других теплопритоков", "Ограничения фасада и места наружных блоков"] },
  { title: "До монтажа", items: ["Согласованы места внутренних блоков", "Проверен маршрут трасс и доступ к соединениям", "Определён способ отвода дренажа", "Проверено электропитание и защита", "Предусмотрен сервисный доступ", "Зафиксирована защита отделки и порядок работ"] },
  { title: "Перед сдачей", items: ["Проверены крепления и теплоизоляция", "Выполнены опрессовка и вакуумирование", "Проверен дренаж во всех режимах", "Зафиксированы фактические трассы", "Проверены автоматика и режимы", "Переданы инструкции и рекомендации по сервису"] },
] as const;

const allItems = groups.flatMap((group, groupIndex) => group.items.map((text, itemIndex) => ({ id: `${groupIndex}-${itemIndex}`, text, group: group.title })));

export default function ChecklistTools() {
  const [checked, setChecked] = useState<string[]>([]);
  const progress = useMemo(() => Math.round((checked.length / allItems.length) * 100), [checked]);

  function toggle(id: string) {
    setChecked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function download() {
    const content = ["ЧЕК-ЛИСТ КЛИМАТИЧЕСКОГО ПРОЕКТА — СНЕГ", "", ...groups.flatMap((group, groupIndex) => [group.title.toUpperCase(), ...group.items.map((item, itemIndex) => `${checked.includes(`${groupIndex}-${itemIndex}`) ? "[x]" : "[ ]"} ${item}`), ""]), "Результат предварительный. Итоговые требования определяются проектом и документацией оборудования."].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "sneg-checklist.txt"; link.click(); URL.revokeObjectURL(url);
  }

  return <><div className="checklist-toolbar"><div><span>Готовность</span><strong>{checked.length} из {allItems.length}</strong></div><div className="checklist-progress" aria-label={`Выполнено ${progress}%`}><i style={{ width: `${progress}%` }} /></div><div className="checklist-toolbar-actions"><button type="button" onClick={download}>Скачать .txt</button><button type="button" onClick={() => window.print()}>Распечатать</button><button type="button" onClick={() => setChecked([])}>Сбросить</button></div></div><div className="checklist-grid">{groups.map((group, groupIndex) => <section key={group.title}><span>0{groupIndex + 1}</span><h2>{group.title}</h2><div>{group.items.map((item, itemIndex) => { const id = `${groupIndex}-${itemIndex}`; return <label className={checked.includes(id) ? "done" : ""} key={item}><input type="checkbox" checked={checked.includes(id)} onChange={() => toggle(id)} /><i aria-hidden="true">✓</i><strong>{item}</strong></label>; })}</div></section>)}</div><p className="checklist-disclaimer">Список помогает организовать подготовку, но не заменяет проект, требования производителя и обязательные нормы для конкретного объекта.</p></>;
}
