/* Catalog images are already normalized WebP assets and must keep their static public paths. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { ReactNode } from "react";
import BackButton from "./back-button";
import { publicAsset } from "./public-path";
import type { SeriesRecord } from "./catalog-data";

const navigation = [
  ["/catalog", "Каталог"],
  ["/brands", "Бренды"],
  ["/solutions", "Решения"],
  ["/vrf", "VRV / VRF"],
  ["/services", "Услуги"],
  ["/guides", "База знаний"],
] as const;

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

export function Icon({ name }: { name: "arrow" | "check" | "menu" | "search" | "download" }) {
  const paths: Record<string, ReactNode> = {
    arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 8h16M4 16h16" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    download: <><path d="M12 3v12m-4-4 4 4 4-4" /><path d="M5 20h14" /></>,
  };
  return <svg className={`icon icon-${name}`} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export function SiteHeader() {
  return (
    <header className="site-header inner-site-header">
      <div className="shell header-inner">
        <Link className="logo-link" href="/"><BrandMark /></Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="header-cta" href="/calculator">Получить расчёт</Link>
          <details className="page-menu">
            <summary aria-label="Открыть меню"><Icon name="menu" /></summary>
            <nav aria-label="Мобильное меню">
              {navigation.map(([href, label]) => <Link key={href} href={href}>{label}<Icon name="arrow" /></Link>)}
              <Link href="/calculator">Калькулятор<Icon name="arrow" /></Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="shell footer-grid">
        <div><BrandMark inverse /><p>Кондиционирование, вентиляция и VRV/VRF‑системы. Каталог построен на материалах владельца без вымышленных цен.</p></div>
        <nav aria-label="Навигация в подвале"><strong>Разделы</strong>{navigation.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/calculator">Калькулятор</Link></nav>
        <div><strong>Данные</strong><p>Изображения и обозначения серий взяты из предоставленных материалов. Характеристики публикуются только после проверки паспорта конкретной модели.</p></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 СНЕГ</span><span>Расчёты на сайте имеют предварительный характер</span></div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, lead, fallback = "/" }: { eyebrow: string; title: string; lead: string; fallback?: string }) {
  return (
    <section className="inner-hero">
      <div className="shell">
        <BackButton fallback={fallback} />
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
