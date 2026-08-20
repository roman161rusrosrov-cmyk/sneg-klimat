import type { Metadata } from "next";
import Link from "next/link";
import { InnerLayout, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = { title: "VRV/VRF-системы — СНЕГ", description: "Принципы проектирования VRV/VRF для многозональных объектов." };

export default function VrfPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="Инженерный хаб" title="VRV/VRF для многозональных объектов" lead="Многозональная система начинается не с выбора наружного блока, а с планов, режимов, теплопритоков и ограничений объекта." />
      <section className="inner-section vrf-page-section"><div className="shell vrf-page-grid"><div className="vrf-diagram" aria-label="Условная схема VRV/VRF"><div className="vrf-outdoor"><i /><i /><i /><span>Наружный блок</span></div><div className="vrf-line main-line" /><div className="vrf-line branch-one" /><div className="vrf-line branch-two" /><div className="vrf-line branch-three" /><div className="vrf-indoor indoor-a"><b />Кассетный</div><div className="vrf-indoor indoor-b"><b />Канальный</div><div className="vrf-indoor indoor-c"><b />Настенный</div><span className="diagram-note">Условная схема — не проект</span></div><div><p className="kicker kicker-light">Логика проекта</p><h2>Что нужно рассчитать</h2><ul className="check-list check-list-dark"><li><Icon name="check" />Теплопритоки и график каждой зоны</li><li><Icon name="check" />Длины трасс, перепады и разветвители</li><li><Icon name="check" />Коэффициент одновременности</li><li><Icon name="check" />Заправку и паспортные ограничения</li><li><Icon name="check" />Центральное управление и BMS</li></ul><Link className="button button-light" href="/guides/vrf-project-checklist">Открыть чек-лист <Icon name="arrow" /></Link></div></div></section>
      <section className="inner-section"><div className="shell vrf-components"><article><span>01</span><strong>Исходные данные</strong><p>Планы, зоны, режимы, теплопритоки, фасад и электроснабжение.</p></article><article><span>02</span><strong>Системный расчёт</strong><p>Трассы, перепады, одновременность и заправка — по документации производителя.</p></article><article><span>03</span><strong>Пусконаладка</strong><p>Опрессовка, вакуумирование, адресация и проверка автоматики.</p></article></div></section>
    </InnerLayout>
  );
}
