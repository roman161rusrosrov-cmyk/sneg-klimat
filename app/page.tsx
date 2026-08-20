import Link from "next/link";
import { BrandGlyph, BrandMark, Icon, SiteFooter, SiteHeader } from "./site-shell";

const routes = [
  { href: "/catalog", number: "01", title: "Каталог кондиционеров", text: "44 серии Chigo, Haier, JAX, Rovex и Vickers с отдельной страницей каждой линейки.", tone: "blue", featured: false },
  { href: "/ventilation", number: "02", title: "Вентиляция", text: "Приточные, вытяжные, приточно-вытяжные и локальные системы, рекуперация и решения для бизнеса.", tone: "vent", featured: true },
  { href: "/brands", number: "03", title: "Бренды", text: "Пять самостоятельных каталогов с быстрым переходом к нужному производителю.", tone: "ice", featured: false },
  { href: "/solutions", number: "04", title: "Решения по объекту", text: "Квартира, дом, офис, магазин, ресторан, гостиница, склад и производство.", tone: "navy", featured: false },
  { href: "/vrf", number: "05", title: "VRV / VRF", text: "Отдельный инженерный раздел для многозональных систем и проектных исходных данных.", tone: "dark", featured: false },
  { href: "/services", number: "06", title: "Услуги", text: "Обследование, расчёт, проектирование, монтаж, пусконаладка и сервис.", tone: "mint", featured: false },
  { href: "/guides", number: "07", title: "База знаний", text: "Подбор мощности, сравнение технологий, приёмка монтажа и чек-лист VRV/VRF.", tone: "pale", featured: false },
  { href: "/tools", number: "08", title: "Инструменты", text: "Поиск, бриф, подбор, диагностика, обслуживание, размещение, избранное и чек-листы.", tone: "blue", featured: false },
  { href: "/faq", number: "09", title: "Частые вопросы", text: "Короткие ответы про цену, монтаж, вентиляцию, обслуживание и выбор системы.", tone: "ice", featured: false },
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="home-hub">
        <section className="home-hero">
          <div className="hero-aurora" aria-hidden="true" />
          <div className="home-hero-glyphs" aria-hidden="true"><BrandGlyph /><BrandGlyph /><BrandGlyph /><BrandGlyph /></div>
          <div className="shell home-hero-grid">
            <div className="home-hero-copy">
              <div className="home-hero-brand"><BrandMark inverse /></div>
              <p className="eyebrow"><span /> Инженерный подбор климатических систем</p>
              <h1>Комфортный климат.<br /><em>Точно по расчёту.</em></h1>
              <p className="hero-lead">Подбираем кондиционирование, вентиляцию и VRV/VRF‑системы для квартир, домов и коммерческих объектов. Выберите нужное направление или получите предварительный расчёт.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/catalog">Открыть каталог <Icon name="arrow" /></Link>
                <Link className="button button-ghost" href="/calculator">Получить расчёт</Link>
              </div>
              <div className="home-facts" aria-label="Состав каталога">
                <span><strong>44</strong> серии</span>
                <span><strong>5</strong> брендов</span>
                <span><strong>6</strong> направлений вентиляции</span>
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
                <Link className={`hub-card hub-card-${route.tone}${route.featured ? " hub-card-featured" : ""}`} href={route.href} key={route.href}>
                  <span>{route.number}</span>
                  <BrandGlyph />
                  <div><h2>{route.title}</h2><p>{route.text}</p></div>
                  <i><Icon name="arrow" /></i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-trust">
          <div className="shell home-trust-grid">
            <div><span>01</span><strong>Без форм и регистрации</strong><p>Для просмотра каталога и расчёта не нужны имя, почта или номер телефона.</p></div>
            <div><span>02</span><strong>Расчёт на устройстве</strong><p>Параметры калькулятора не отправляются через сайт.</p></div>
            <div><span>03</span><strong>Без рекламных трекеров</strong><p>В коде сайта нет собственных счётчиков и рекламных пикселей.</p></div>
            <Link href="/site-info"><span>04</span><strong>Прозрачные правила</strong><p>Что хранится локально и как работает связь с менеджером.</p><Icon name="arrow" /></Link>
          </div>
        </section>

        <section className="home-calculator-cta">
          <div className="shell home-calculator-inner">
            <div><p className="kicker kicker-light">Отдельный инструмент</p><h2>Подготовьте климатический бриф</h2><p>Соберите исходные параметры объекта без имени, адреса и контактов, а затем скачайте готовый текст.</p></div>
            <Link className="button button-light" href="/brief">Собрать бриф <Icon name="arrow" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
