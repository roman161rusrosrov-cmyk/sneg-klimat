import type { Metadata } from "next";
import Link from "next/link";
import { BrandGlyph, InnerLayout, ManagerBanner, PageIntro, PriceCall, Icon } from "../site-shell";

export const metadata: Metadata = { title: "VRV/VRF-системы — СНЕГ", description: "Принципы проектирования VRV/VRF для многозональных объектов." };

const architecture = [
  ["01", "Независимые зоны", "Для помещений с разными графиками, теплопритоками и требованиями к управлению."],
  ["02", "Типы внутренних блоков", "Настенные, кассетные и канальные решения выбирают по задаче зоны и интерьерным ограничениям."],
  ["03", "Центральное управление", "Локальные пульты, групповой контроль и связь с BMS закладываются на стадии проекта."],
  ["04", "Сервисная архитектура", "Доступ, остановка отдельных участков и регламент обслуживания учитываются до монтажа."],
] as const;

const projectStages = [
  ["01", "Исходные данные", "Планы, назначение зон, режимы, теплопритоки, фасад и электроснабжение."],
  ["02", "Системный расчёт", "Нагрузки, одновременность, трассы, перепады и ограничения выбранной системы."],
  ["03", "Рабочая схема", "Блоки, разветвители, дренаж, кабели управления, автоматика и сервисные зоны."],
  ["04", "Пусконаладка", "Опрессовка, вакуумирование, адресация, проверка режимов и передача протоколов."],
] as const;

export default function VrfPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Инженерный хаб" title="VRV/VRF для многозональных объектов" lead="Многозональная система начинается не с выбора наружного блока, а с планов, режимов, теплопритоков и ограничений объекта." />
      <section className="inner-section vrf-page-section">
        <div className="shell vrf-page-grid">
          <div className="vrf-diagram" aria-label="Условная схема VRV/VRF"><div className="vrf-diagram-brand"><BrandGlyph /></div><div className="vrf-outdoor"><i /><i /><i /><span>Наружный блок</span></div><div className="vrf-line main-line" /><div className="vrf-line branch-one" /><div className="vrf-line branch-two" /><div className="vrf-line branch-three" /><div className="vrf-indoor indoor-a"><b />Кассетный</div><div className="vrf-indoor indoor-b"><b />Канальный</div><div className="vrf-indoor indoor-c"><b />Настенный</div><span className="diagram-note">Условная схема — не проект</span></div>
          <div className="vrf-command-copy"><div className="vrf-brand-line"><BrandGlyph /><span>СНЕГ · VRV / VRF</span></div><p className="kicker kicker-light">Логика проекта</p><h2>Система управляет зонами, проект управляет рисками</h2><p>До выбора оборудования нужно связать нагрузки помещений, холодильный контур, дренаж, электропитание, автоматику и сервисный доступ.</p><ul className="check-list check-list-dark"><li><Icon name="check" />Теплопритоки и график каждой зоны</li><li><Icon name="check" />Длины трасс, перепады и разветвители</li><li><Icon name="check" />Коэффициент одновременности</li><li><Icon name="check" />Заправка и паспортные ограничения</li><li><Icon name="check" />Центральное управление и BMS</li></ul><PriceCall product="проект VRV/VRF" /><div className="vrf-inline-links"><Link href="/brief">Собрать бриф <Icon name="arrow" /></Link><Link href="/guides/vrf-project-checklist">Открыть чек-лист <Icon name="arrow" /></Link></div></div>
        </div>
      </section>

      <section className="inner-section vrf-architecture-section">
        <div className="shell"><div className="section-head split-head"><div><p className="kicker">Архитектура системы</p><h2>Четыре слоя одного решения</h2></div><p>Элементы нельзя подбирать изолированно: изменение одной зоны влияет на трассы, управление, ввод в эксплуатацию и сервис.</p></div><div className="vrf-architecture-grid">{architecture.map(([number, title, text]) => <article key={number}><span>{number}</span><BrandGlyph /><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="inner-section vrf-project-flow-section">
        <div className="shell"><div className="section-head"><p className="kicker kicker-light">Маршрут проекта</p><h2>От плана помещений до протокола запуска</h2></div><div className="vrf-components">{projectStages.map(([number, title, text]) => <article key={number}><span>{number}</span><BrandGlyph /><strong>{title}</strong><p>{text}</p></article>)}</div></div>
      </section>

      <ManagerBanner title="Обсудить VRV/VRF с менеджером" text="Назовите тип объекта, количество зон и текущую стадию проекта. Менеджер подскажет, какие планы и исходные данные нужны для первого инженерного расчёта." product="систему VRV/VRF" secondaryHref="/brief" secondaryLabel="Подготовить технический бриф" />
    </InnerLayout>
  );
}
