"use client";

import { useMemo, useState } from "react";

const systems = [["split", "Сплит / мульти-сплит"], ["vrf", "VRV / VRF"], ["vent", "Вентиляция"], ["combined", "Комплексная система"]] as const;
const loads = [["season", "Сезонно"], ["daily", "Ежедневно"], ["heavy", "Пыль / высокая нагрузка"]] as const;

const common = [
  ["Перед активным сезоном", "Проверить режимы, посторонние шумы, запахи, свободный приток и выход воздуха. Сверить дальнейшие действия с паспортом."],
  ["Во время эксплуатации", "Следить за изменением шума, слабым потоком, водой и сообщениями на дисплее. При отклонениях не ждать плановой даты."],
  ["После сезона", "Провести внешний осмотр доступных частей без вскрытия корпусов. Зафиксировать замечания для сервисного визита."],
] as const;

export default function MaintenancePlanner() {
  const [system, setSystem] = useState("split");
  const [load, setLoad] = useState("season");

  const rows = useMemo(() => {
    const systemLine = system === "vent"
      ? "Состояние фильтров, решёток, приводов и доступных дренажных участков проверяют по проектному регламенту. Балансировку и работы внутри установки выполняет специалист."
      : system === "vrf"
        ? "Журнал ошибок, адресацию, холодильный контур, дренаж и автоматику проверяет профильная сервисная организация по документации выбранной системы."
        : system === "combined"
          ? "Кондиционирование, вентиляцию и автоматику обслуживают согласованно: изменение одной подсистемы может повлиять на общий режим объекта."
          : "Пользователь может осмотреть доступный фильтр только так, как показано в инструкции. Глубокая чистка, дренаж, электрика и холодильный контур — работа специалиста.";
    const loadLine = load === "heavy"
      ? "При пыли, жире, шерсти, ремонте или непрерывной работе проверки нужны чаще, чем в обычном режиме; частоту определяют по фактическому загрязнению и паспорту."
      : load === "daily"
        ? "При ежедневной работе полезно заранее поставить сервисные проверки в календарь и не ждать заметного падения производительности."
        : "Перед началом сезона проведите проверку заранее, чтобы оставить время на диагностику и необходимые работы.";
    return [...common, ["Для выбранной системы", systemLine], ["Поправка на режим", loadLine]];
  }, [load, system]);

  return <div className="maintenance-planner"><div className="maintenance-controls"><fieldset><legend>01 · Тип системы</legend>{systems.map(([value, label]) => <button type="button" className={system === value ? "active" : ""} onClick={() => setSystem(value)} key={value}>{label}</button>)}</fieldset><fieldset><legend>02 · Режим эксплуатации</legend>{loads.map(([value, label]) => <button type="button" className={load === value ? "active" : ""} onClick={() => setLoad(value)} key={value}>{label}</button>)}</fieldset><p>Выбор остаётся на этом устройстве только до закрытия страницы.</p></div><div className="maintenance-timeline">{rows.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</div></div>;
}
