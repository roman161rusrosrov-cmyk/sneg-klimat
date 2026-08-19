export type SeriesRecord = {
  slug: string;
  brand: "Chigo" | "Haier" | "JAX" | "Rovex" | "Vickers";
  name: string;
  technology: "inverter" | "on-off" | "not-confirmed";
  models: string[];
  variants?: string[];
  refrigerant?: "R32";
  new2026?: boolean;
  note?: string;
};

export const series: SeriesRecord[] = [
  { slug: "chigo-sunrise-inverter-268", brand: "Chigo", name: "Sunrise Inverter 268", technology: "inverter", models: ["CS-25V3G-1K268", "CS-35V3G-1K268"], variants: ["белый", "чёрный"] },
  { slug: "chigo-alba-inverter-150", brand: "Chigo", name: "Alba Inverter 150", technology: "inverter", models: ["CS-21V3A-B150", "CS-25V3A-B150", "CS-35V3A-1C150", "CS-51V3A-1B150", "CS-61V3A-1D150"] },
  { slug: "chigo-king-inverter-172", brand: "Chigo", name: "King Inverter 172", technology: "inverter", models: ["CS-25V3A-1C172", "CS-35V3A-1C172", "CS-51V3A-1B172"], variants: ["белый", "чёрный"] },
  { slug: "chigo-lotos-on-off-169", brand: "Chigo", name: "Lotos on-off 169", technology: "on-off", models: ["CS-21H3A-B169", "CS-25H3A-B169", "CS-35H3A-1C169", "ветка 51", "CT3S-100H3A-1E169"], note: "Имя папки и файлов требует сверки источника." },
  { slug: "chigo-moon-on-off-181", brand: "Chigo", name: "Moon on-off 181", technology: "on-off", models: ["CS-21H3A-B181", "CS-25H3A-B181", "CS-35H3A-1C181", "CS-51H3A-1B181", "CS-61H3A-1D181", "CS-88H3A-1H181", "CT3S-100H3A-1E181"], note: "Индексы 61/88/100 требуют сверки исходных файлов." },

  { slug: "haier-jade-super-match", brand: "Haier", name: "Jade Super Match", technology: "not-confirmed", models: ["AS25", "AS35", "AS50"], variants: ["Gold", "Silver", "White"] },
  { slug: "haier-flexis-super-match", brand: "Haier", name: "Flexis Super Match", technology: "not-confirmed", models: ["AS25", "AS35", "AS50", "AS70"], variants: ["Black", "Gold", "White"] },
  { slug: "haier-stellar-hp-minus-20", brand: "Haier", name: "Stellar HP −20 °C", technology: "not-confirmed", models: ["AS20", "AS25", "AS35", "AS50", "AS70"], variants: ["Cappuccino", "Silver", "White"] },
  { slug: "haier-flexis-on-off", brand: "Haier", name: "Flexis On-Off", technology: "on-off", models: ["HSU-07", "HSU-09", "HSU-12", "HSU-18", "HSU-24"], variants: ["Black", "Gold", "White"] },
  { slug: "haier-coral-dc-inverter", brand: "Haier", name: "Coral DC-Inverter", technology: "inverter", models: ["AS20HPL2HRA", "AS25HPL2HRA", "AS35HPL2HRA", "AS50HPL2HRA", "AS70HPL2HRA", "AS100HPL2HRA"] },
  { slug: "haier-coral-on-off", brand: "Haier", name: "Coral On-Off", technology: "on-off", models: ["HSU-07 HPL303-R3", "HSU-09 HPL303-R3", "HSU-12 HPL303-R3", "HSU-18 HPL303-R3", "HSU-24 HPL303-R3", "HSU-33 HPL303-R3"] },
  { slug: "haier-tundra-dc-inverter", brand: "Haier", name: "Tundra DC-Inverter", technology: "inverter", models: ["AS07 TT5HRA", "AS09 TT5HRA", "AS12 TT5HRA", "AS18 TT5HRA", "AS24 TT5HRA"] },
  { slug: "haier-tundra-on-off", brand: "Haier", name: "Tundra On-Off", technology: "on-off", models: ["HSU-07 HTT-R3", "HSU-09 HTT-R3", "HSU-12 HTT-R3", "HSU-18 HTT-R3", "HSU-24 HTT-R3"] },
  { slug: "haier-quantum-inverter", brand: "Haier", name: "Quantum Inverter", technology: "inverter", models: ["AS20 HQJ1HRA", "AS25 HQJ1HRA", "AS35 HQJ1HRA", "AS50 HQJ1HRA", "AS70 HQJ1HRA"], variants: ["Black", "White"] },
  { slug: "haier-quantum-on-off", brand: "Haier", name: "Quantum On-Off", technology: "on-off", models: ["HSU-07 HQJ103-R3", "HSU-09 HQJ103-R3", "HSU-12 HQJ103-R3", "HSU-18 HQJ103-R3", "HSU-24 HQJ103-R3"], variants: ["Black", "White"] },
  { slug: "haier-leader-a", brand: "Haier", name: "Leader-A", technology: "not-confirmed", models: ["AS12TL5HRA-A", "AS18TL5HRA-A", "AS24TL5HRA-A"] },

  { slug: "jax-murray-acy-he-r32-new", brand: "JAX", name: "Murray ACY-HE R32 NEW", technology: "not-confirmed", refrigerant: "R32", models: ["07", "09", "12", "18", "24"] },
  { slug: "jax-hayman-aci-he-neo-r32", brand: "JAX", name: "Hayman ACI-HE NEO R32", technology: "not-confirmed", refrigerant: "R32", models: ["10", "14", "20", "26"] },
  { slug: "jax-brisbane-aciu-he-r32", brand: "JAX", name: "Brisbane ACIU-HE R32", technology: "not-confirmed", refrigerant: "R32", models: ["08", "10", "14", "20", "26"] },
  { slug: "jax-tasmania-acn-he-r32", brand: "JAX", name: "Tasmania ACN-HE R32", technology: "on-off", refrigerant: "R32", models: ["07", "09", "14", "18", "24"] },
  { slug: "jax-melbourne-acm-he", brand: "JAX", name: "Melbourne ACM-HE", technology: "on-off", models: ["08", "10", "14", "20", "26", "32", "38"] },
  { slug: "jax-york-ace-he-neo", brand: "JAX", name: "York ACE-HE NEO", technology: "on-off", models: ["08", "10", "14", "20", "26"] },
  { slug: "jax-adelaide-aci-he", brand: "JAX", name: "Adelaide ACI-HE", technology: "not-confirmed", models: ["10", "14", "20", "26"], new2026: true },
  { slug: "jax-darwin-ack-he", brand: "JAX", name: "Darwin ACK-HE", technology: "not-confirmed", models: ["08", "10", "14", "20", "26"], new2026: true },

  { slug: "rovex-smart-pro-rs-pxi6-pro", brand: "Rovex", name: "Smart PRO RS-PXI6 PRO", technology: "not-confirmed", models: ["09", "12", "18", "24"] },
  { slug: "rovex-smart-rs-pxi6", brand: "Rovex", name: "SMART RS-PXI6", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-star-s-abs-he-s", brand: "Rovex", name: "STAR-S ABS-HE-S", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-star-n-abs-he-n", brand: "Rovex", name: "STAR-N ABS-HE-N", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-rich-rs-muin1", brand: "Rovex", name: "RICH RS-MUIN1", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-megapolis-rs-cbs4", brand: "Rovex", name: "MEGAPOLIS RS-CBS4", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-city-pro-rs-cst4-pro", brand: "Rovex", name: "CITY PRO RS-CST4-PRO", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-city-rs-cst4", brand: "Rovex", name: "CITY RS-CST4", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-mira-s-ast-he-s", brand: "Rovex", name: "MIRA-S AST-HE-S", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-mira-n-ast-he-n", brand: "Rovex", name: "MIRA-N AST-HE-N", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-grace-rs-mst1", brand: "Rovex", name: "GRACE RS-MST1", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "rovex-cst-5-unite", brand: "Rovex", name: "CST-5 UNITE", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"], new2026: true },
  { slug: "rovex-cst5-pro", brand: "Rovex", name: "ROVEX CST5 PRO", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"], variants: ["Black", "Grey", "White"], new2026: true },
  { slug: "rovex-rs-cbs5-pro", brand: "Rovex", name: "RS-CBS5 PRO", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"], variants: ["Black", "Grey", "White"], new2026: true },

  { slug: "vickers-rook-vch-he", brand: "Vickers", name: "ROOK VCH-HE", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
  { slug: "vickers-tanya", brand: "Vickers", name: "Tanya", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"], new2026: true },
  { slug: "vickers-tanya-max", brand: "Vickers", name: "Tanya Max", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"], new2026: true },
  { slug: "vickers-vera-max-vg-he-max", brand: "Vickers", name: "VERA MAX VG-HE MAX", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"], new2026: true },
  { slug: "vickers-vera-vg-he", brand: "Vickers", name: "VERA VG-HE", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"], new2026: true },
  { slug: "vickers-viking-ve-he", brand: "Vickers", name: "VIKING VE-HE", technology: "not-confirmed", models: ["07", "09", "12", "18", "24"] },
];

export const objects = [
  { icon: "⌂", title: "Квартира", hint: "Тишина и аккуратная трасса" },
  { icon: "◇", title: "Частный дом", hint: "Несколько комнат и режимов" },
  { icon: "▦", title: "Офис", hint: "Зоны, график и свежий воздух" },
  { icon: "□", title: "Магазин", hint: "Теплопритоки и открытые двери" },
  { icon: "◫", title: "Ресторан", hint: "Зал, кухня и вытяжка" },
  { icon: "▤", title: "Гостиница", hint: "Поквартирный контроль зон" },
  { icon: "▧", title: "Склад", hint: "Объём, ворота и режим хранения" },
  { icon: "⌁", title: "Производство", hint: "Процессные теплопритоки" },
];

export const serviceSteps = [
  { n: "01", title: "Обследование", text: "Фиксируем назначение помещений, теплопритоки, ограничения фасада, электрики и дренажа." },
  { n: "02", title: "Расчёт и проект", text: "Подбираем тип системы и трассы. Для VRV/VRF проверяем решение по документации выбранного производителя." },
  { n: "03", title: "Поставка и монтаж", text: "Согласуем комплектацию, размещение, сервисный доступ и последовательность работ." },
  { n: "04", title: "Пуск и сервис", text: "Опрессовка, вакуумирование, пусконаладка и регламентное обслуживание квалифицированными специалистами." },
];

export const faqs = [
  { q: "Можно выбрать кондиционер только по площади?", a: "Площадь даёт лишь первый ориентир. На результат влияют высота потолка, остекление и солнце, люди, техника, этаж, назначение помещения и климат. Калькулятор ниже показывает диапазон, а не готовый проект." },
  { q: "Чем VRV/VRF отличается от обычной сплит-системы?", a: "Сплит-система обычно обслуживает одну зону парой блоков. VRV/VRF объединяет множество внутренних блоков с общей холодильной системой и централизованным управлением. Такое решение требует инженерного расчёта длин трасс, перепадов, коэффициента одновременности и заправки." },
  { q: "Почему на сайте нет цен «от»?", a: "Цена зависит от точной модели, комплектации, доступности и условий монтажа. До подключения подтверждённого прайс-листа мы не показываем искусственные значения и не выдаём расчёт за коммерческое предложение." },
  { q: "Какие данные каталога уже проверены?", a: "В текущем прототипе подтверждены названия пяти брендов, 44 серии и перечисленные в исходном мастер-промте обозначения моделей или размерных веток. Технические параметры, цены и наличие будут опубликованы только после проверки паспортов и официальных карточек." },
];
