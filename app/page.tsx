import Link from "next/link";
import { BrandMark, Icon, SiteFooter, SiteHeader } from "./site-shell";

const routes = [
  { href: "/catalog", number: "01", title: "Каталог", text: "44 серии Chigo, Haier, JAX, Rovex и Vickers с отдельной страницей каждой линейки.", tone: "blue" },
  { href: "/brands", number: "02", title: "Бренды", text: "Пять самостоятельных каталогов с быстрым переходом к нужному производителю.", tone: "ice" },
  { href: "/solutions", number: "03", title: "Решения по объекту", text: "Квартира, дом, офис, магазин, ресторан, гостиница, склад и производство.", tone: "navy" },
  { href: "/vrf", number: "04", title: "VRV / VRF", text: "Отдельный инженерный раздел для многозональных систем и проектных исходных данных.", tone: "dark" },
  { href: "/services", number: "05", title: "Услуги", text: "Обследование, расчёт, проектирование, монтаж, пусконаладка и сервис.", tone: "mint" },
  { href: "/guides", number: "06", title: "База знаний", text: "Подбор мощности, сравнение технологий, приёмка монтажа и чек-лист VRV/VRF.", tone: "pale" },
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="home-hub">
        <section className="home-hero">
          <div className="hero-aurora" aria-hidden="true" />
          <div className="shell home-hero-grid">
            <div className="home-hero-copy">
              <p className="eyebrow"><span /> Инженерный подбор климатических систем</p>
              <h1>Комфортный климат.<br /><em>Точно по расчёту.</em></h1>
              <p className="hero-lead">Главная страница помогает выбрать направление. Каталог, VRV/VRF, решения, услуги и материалы открываются отдельно — без длинной страницы со всеми разделами подряд.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/catalog">Открыть каталог <Icon name="arrow" /></Link>
                <Link className="button button-ghost" href="/calculator">Получить расчёт</Link>
              </div>
              <div className="home-facts" aria-label="Состав каталога">
                <span><strong>44</strong> серии</span>
                <span><strong>5</strong> брендов</span>
                <span><strong>8</strong> типов объектов</span>
              </div>
            </div>

            <div className="hero-visual home-hero-visual" aria-label="Схематичное изображение климатической системы">
              <div className="air-ring ring-one" /><div className="air-ring ring-two" />
              <div className="climate-unit"><div className="unit-label"><BrandMark compact /></div><div className="unit-slot" /><div className="unit-led" /></div>
              <div className="airflow flow-one"><i /><i /><i /></div><div className="airflow flow-two"><i /><i /><i /></div>
              <div className="metric-card metric-temp"><span>Комфорт</span><strong>22°</strong><small>точная настройка</small></div>
              <div className="metric-card metric-noise"><span className="pulse" /><strong>Инженерный подход</strong><small>от задачи к системе</small></div>
            </div>
          </div>
        </section>

        <section className="home-directory" aria-labelledby="directory-title">
          <div className="shell">
            <div className="section-head split-head">
              <div><p className="kicker">Навигация</p><h2 id="directory-title">Каждая задача — в своём разделе</h2></div>
              <p>Выберите нужное направление. После перехода можно вернуться кнопкой «Назад» или через общее меню.</p>
            </div>
            <div className="hub-card-grid">
              {routes.map((route) => (
                <Link className={`hub-card hub-card-${route.tone}`} href={route.href} key={route.href}>
                  <span>{route.number}</span>
                  <div><h2>{route.title}</h2><p>{route.text}</p></div>
                  <i><Icon name="arrow" /></i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-calculator-cta">
          <div className="shell home-calculator-inner">
            <div><p className="kicker kicker-light">Отдельный инструмент</p><h2>Подготовьте климатический бриф</h2><p>Предварительный калькулятор открывается на собственной странице и не отправляет введённые данные.</p></div>
            <Link className="button button-light" href="/calculator">Перейти к расчёту <Icon name="arrow" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
