import type { Metadata } from "next";
import Link from "next/link";
import { ventilationSystems } from "../ventilation-data";
import { BrandGlyph, Icon, InnerLayout, PageIntro, PriceCall } from "../site-shell";

export const metadata: Metadata = {
  title: "Вентиляция для дома и бизнеса — СНЕГ",
  description: "Приточная, вытяжная, приточно-вытяжная и локальная вентиляция, рекуперация и решения для коммерческих объектов.",
};

export default function VentilationPage() {
  return (
    <InnerLayout>
      <PageIntro
        eyebrow="Отдельное направление"
        title="Вентиляция, рассчитанная под ваш объект"
        lead="Свежий воздух, управляемый воздушный баланс и понятный путь от обследования до пусконаладки. Выберите тип системы — каждое направление открывается на отдельной странице."
      />

      <section className="inner-section ventilation-overview">
        <div className="shell ventilation-overview-grid">
          <div className="ventilation-manifesto">
            <p className="kicker">Не просто вентилятор</p>
            <h2>Воздухообмен — часть инженерной системы здания</h2>
            <p>Производительность, баланс притока и вытяжки, шум, фильтрация, нагрев, автоматика и сервисный доступ связаны между собой. Поэтому итоговое решение начинается с исходных данных и расчёта.</p>
            <div className="ventilation-facts">
              <span><strong>6</strong><small>направлений</small></span>
              <span><strong>1</strong><small>воздушный баланс</small></span>
              <span><strong>0</strong><small>форм на сайте</small></span>
            </div>
          </div>
          <div className="air-balance-card" aria-label="Условная схема движения воздуха">
            <div className="air-balance-brand"><BrandGlyph /></div>
            <div className="air-source air-source-in"><i /><b>Приток</b></div>
            <div className="air-room"><BrandGlyph /><span>Чистая зона</span></div>
            <div className="air-source air-source-out"><i /><b>Вытяжка</b></div>
            <p>Условная схема. Реальные расходы и трассы определяются проектом.</p>
          </div>
        </div>
      </section>

      <section className="inner-section ventilation-catalog-section" aria-labelledby="ventilation-catalog-title">
        <div className="shell">
          <div className="section-head split-head">
            <div><p className="kicker">Категория вентиляции</p><h2 id="ventilation-catalog-title">Выберите направление</h2></div>
            <p>Карточки не подменяют расчёт. Они помогают понять архитектуру решения и подготовиться к разговору с инженером.</p>
          </div>
          <div className="ventilation-grid">
            {ventilationSystems.map((item, index) => (
              <article className={`ventilation-card ventilation-card-${item.tone}`} key={item.slug}>
                <div className="ventilation-card-head"><span>{String(index + 1).padStart(2, "0")}</span><BrandGlyph /></div>
                <small>{item.label}</small>
                <h2>{item.title}</h2>
                <p>{item.short}</p>
                <div className="ventilation-card-actions">
                  <Link href={`/ventilation/${item.slug}`}>Подробнее <Icon name="arrow" /></Link>
                  <PriceCall product={item.title} compact />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-section ventilation-flow-section">
        <div className="shell">
          <div className="section-head"><p className="kicker kicker-light">Рабочий порядок</p><h2>От задачи к чистому воздуху</h2></div>
          <div className="ventilation-flow">
            {[
              ["01", "Обследование", "Назначение помещений, люди, режимы, ограничения и места оборудования."],
              ["02", "Воздушный баланс", "Расходы притока и вытяжки по зонам, перетоки и совместная работа режимов."],
              ["03", "Проектное решение", "Оборудование, каналы, решётки, шумоглушение, автоматика и сервисные зоны."],
              ["04", "Монтаж и запуск", "Сборка, проверка, настройка расходов, автоматики и передача регламента."],
            ].map(([number, title, text]) => <article key={number}><span>{number}</span><BrandGlyph /><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="inner-section ventilation-final">
        <div className="shell ventilation-final-inner">
          <div><BrandGlyph /><p className="kicker kicker-light">СНЕГ · вентиляция</p><h2>Подготовим решение под реальный объект</h2><p>Позвоните менеджеру: уточним задачу, список исходных данных и следующий шаг без отправки контактов через сайт.</p></div>
          <PriceCall product="систему вентиляции" />
        </div>
      </section>
    </InnerLayout>
  );
}
