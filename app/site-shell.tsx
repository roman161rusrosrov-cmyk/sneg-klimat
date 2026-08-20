/* Product artwork is served as pre-optimized static WebP assets. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { ReactNode } from "react";
import BackButton from "./back-button";
import { business } from "./business-config";
import { publicAsset } from "./public-path";
import type { SeriesRecord } from "./catalog-data";
import GlobalSearch from "./global-search";

const navigation = [
  ["/catalog", "Каталог"],
  ["/ventilation", "Вентиляция"],
  ["/brands", "Бренды"],
  ["/solutions", "Решения"],
  ["/vrf", "VRV / VRF"],
  ["/services", "Услуги"],
  ["/guides", "База знаний"],
  ["/tools", "Инструменты"],
] as const;

export function BrandGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={`brand-glyph ${className}`.trim()} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 5v38M7.5 14.5l33 19M7.5 33.5l33-19" />
      <path d="m24 5-4 5m4-5 4 5M24 43l-4-5m4 5 4-5M7.5 14.5l6 .5m-6-.5 2.5 5.5M40.5 33.5l-6-.5m6 .5-2.5-5.5M7.5 33.5l6-.5m-6 .5 2.5-5.5M40.5 14.5l-6 .5m6-.5-2.5 5.5" />
    </svg>
  );
}

export function BrandMark({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <span className={`brand${inverse ? " brand-inverse" : ""}`} aria-label="СНЕГ — кондиционирование и вентиляция">
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5v38M7.5 14.5l33 19M7.5 33.5l33-19" />
        <path d="m24 5-4 5m4-5 4 5M24 43l-4-5m4 5 4-5M7.5 14.5l6 .5m-6-.5 2.5 5.5M40.5 33.5l-6-.5m6 .5-2.5-5.5M7.5 33.5l6-.5m-6 .5 2.5-5.5M40.5 14.5l-6 .5m6-.5-2.5 5.5" />
      </svg>
      <span className="brand-copy"><strong>СНЕГ</strong>{!compact && <small>кондиционирование и вентиляция</small>}</span>
    </span>
  );
}

export function Icon({ name }: { name: "arrow" | "check" | "menu" | "search" | "download" | "phone" }) {
  const paths: Record<string, ReactNode> = {
    arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 8h16M4 16h16" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    download: <><path d="M12 3v12m-4-4 4 4 4-4" /><path d="M5 20h14" /></>,
    phone: <path d="M7.2 3.8 4.8 5.5c-.7.5-.9 1.4-.6 2.2 2.1 5.6 6.5 10 12.1 12.1.8.3 1.7.1 2.2-.6l1.7-2.4c.4-.6.3-1.4-.3-1.9l-3.2-2.4c-.5-.4-1.2-.4-1.7 0l-1.6 1.3a15.2 15.2 0 0 1-3.2-3.2L11.5 9c.4-.5.4-1.2 0-1.7L9.1 4.1c-.5-.6-1.3-.7-1.9-.3Z" />,
  };
  return <svg className={`icon icon-${name}`} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export function SiteHeader() {
  return (
    <header className="site-header inner-site-header">
      <div className="shell header-inner">
        <span className="header-glyph" aria-hidden="true"><BrandGlyph /></span>
        <Link className="logo-link" href="/"><BrandMark /></Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <GlobalSearch />
          <a className="header-phone" href={business.phoneHref} aria-label={`Позвонить ${business.phoneDisplay}`}><Icon name="phone" /><span>{business.phoneDisplay}</span></a>
          <Link className="header-cta" href="/calculator">Получить расчёт</Link>
          <details className="page-menu">
            <summary aria-label="Открыть меню"><Icon name="menu" /></summary>
            <nav aria-label="Мобильное меню">
              {navigation.map(([href, label]) => <Link key={href} href={href}>{label}<Icon name="arrow" /></Link>)}
              <Link href="/favorites">Избранное<Icon name="arrow" /></Link>
              <Link href="/calculator">Калькулятор<Icon name="arrow" /></Link>
              <a href={business.phoneHref}>Позвонить · {business.phoneDisplay}<Icon name="phone" /></a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <a className="floating-call" href={business.phoneHref} aria-label={`Позвонить менеджеру ${business.phoneDisplay}`}><Icon name="phone" /><span><small>Спросить менеджера</small><strong>{business.phoneDisplay}</strong></span></a>
      <footer>
        <div className="footer-glyph-field" aria-hidden="true"><BrandGlyph /><BrandGlyph /><BrandGlyph /></div>
        <div className="shell footer-grid">
          <div><BrandMark inverse /><p>Подбор, поставка, монтаж и обслуживание климатических систем для дома и бизнеса.</p></div>
          <nav aria-label="Навигация в подвале"><strong>Разделы</strong>{navigation.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/calculator">Калькулятор</Link></nav>
          <div className="footer-contact"><strong>Связаться с менеджером</strong><a href={business.phoneHref}><Icon name="phone" />{business.phoneDisplay}</a><p>Позвоните, чтобы уточнить цену, наличие и подобрать модель под ваш объект.</p></div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 СНЕГ</span><nav aria-label="Справочная информация"><Link href="/faq">Частые вопросы</Link><Link href="/site-info">Как работает сайт</Link></nav></div>
      </footer>
    </>
  );
}

export function PriceCall({ product, compact = false }: { product: string; compact?: boolean }) {
  return (
    <a className={`price-call${compact ? " price-call-compact" : ""}`} href={business.phoneHref} aria-label={`Спросить цену на ${product} по телефону ${business.phoneDisplay}`}>
      <Icon name="phone" />
      <span><small>Спросить цену у менеджера</small><strong>{business.phoneDisplay}</strong></span>
    </a>
  );
}

export function PageIntro({ eyebrow, title, lead, fallback = "/" }: { eyebrow: string; title: string; lead: string; fallback?: string }) {
  return (
    <section className="inner-hero">
      <div className="inner-hero-brand" aria-hidden="true"><BrandGlyph /><BrandGlyph /><BrandGlyph /></div>
      <div className="shell">
        <BackButton fallback={fallback} />
        <div className="inner-brand-signature"><BrandMark compact /><span>инженерный климат</span></div>
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  );
}

export function SeriesCover({ record, eager = false }: { record: SeriesRecord; eager?: boolean }) {
  return (
    <div className="series-photo">
      <img
        src={publicAsset(`/catalog/${record.slug}.webp`)}
        alt={`${record.brand} ${record.name}`}
        width="1000"
        height="1000"
        loading={eager ? "eager" : "lazy"}
      />
    </div>
  );
}

export function InnerLayout({ children }: { children: ReactNode }) {
  return <><SiteHeader /><main className="inner-main">{children}</main><SiteFooter /></>;
}
