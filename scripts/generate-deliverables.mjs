import { mkdir, writeFile } from "node:fs/promises";
import { series } from "../app/catalog-data.ts";

const outDir = new URL("../deliverables/", import.meta.url);
const docsDir = new URL("../deliverables/docs/", import.meta.url);
await mkdir(docsDir, { recursive: true });

const verifiedDate = "2026-08-20";
const csvFields = ["route", "template", "intent", "primary_keyword", "entity", "source", "owner", "status", "indexability", "canonical", "last_verified", "quality_score"];
const rows = [];

function slugify(value) {
  const map = { а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"sch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya" };
  return value.toLocaleLowerCase("ru").split("").map((char) => map[char] ?? char).join("").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function add(route, template, intent, keyword, entity, source, owner, status = "draft", quality = 20) {
  rows.push({ route, template, intent, primary_keyword: keyword, entity, source, owner, status, indexability: "noindex", canonical: route, last_verified: verifiedDate, quality_score: quality });
}

add("/", "home", "Главная точка входа и предварительный подбор", "кондиционирование и вентиляция", "СНЕГ", "MASTER_PROMPT + verified UI copy", "product", "review", 78);
add("/catalog/", "catalog", "Поиск и фильтрация проверенных серий", "каталог кондиционеров", "catalog", "MASTER_PROMPT section 3", "catalog", "review", 65);

for (const brand of ["Chigo", "Haier", "JAX", "Rovex", "Vickers"]) {
  add(`/catalog/${slugify(brand)}/`, "brand", `Навигация по сериям ${brand}`, `кондиционеры ${brand}`, brand, "MASTER_PROMPT section 3", "catalog", "review", 48);
}

for (const item of series) {
  add(`/catalog/${slugify(item.brand)}/${item.slug.replace(`${slugify(item.brand)}-`, "")}/`, "series", `Модели и варианты серии ${item.name}`, `${item.brand} ${item.name}`, `${item.brand} / ${item.name}`, "MASTER_PROMPT section 3; technical sources required", "catalog", "review", 42);
}

const targetCounts = [
  4,5,6,5,7,
  9,12,15,15,6,6,5,5,10,10,3,
  5,4,5,5,7,5,4,5,
  4,5,5,5,5,5,5,5,5,5,5,5,11,11,
  5,5,5,5,5,5,
];
if (targetCounts.length !== series.length || targetCounts.reduce((a,b) => a+b,0) !== 274) throw new Error("Product allocation must equal 274 across 44 series");

function productVariants(item, target) {
  if (["rovex-cst5-pro", "rovex-rs-cbs5-pro"].includes(item.slug)) {
    return ["07-white", "09-white", "12-white", "18-white", "24-white", "09-black", "12-black", "18-black", "09-grey", "12-grey", "18-grey"];
  }
  if (item.variants && item.models.length * item.variants.length === target) {
    return item.models.flatMap((model) => item.variants.map((variant) => `${slugify(model)}-${slugify(variant)}`));
  }
  if (item.models.length === target) return item.models.map(slugify);
  throw new Error(`Cannot allocate ${target} product routes for ${item.slug}`);
}

series.forEach((item, index) => {
  const seriesSlug = item.slug.replace(`${slugify(item.brand)}-`, "");
  for (const productSlug of productVariants(item, targetCounts[index])) {
    add(`/catalog/${slugify(item.brand)}/${seriesSlug}/${productSlug}/`, "product", `Проверка и подбор варианта ${productSlug}`, `${item.brand} ${item.name} ${productSlug}`, `${item.brand} / ${item.name} / ${productSlug}`, "MASTER_PROMPT model map; passport required", "catalog", "draft", 28);
  }
});

add("/vrv-vrf/", "vrf-hub", "Объяснение и вход в проектирование VRV/VRF", "VRV VRF системы", "VRV/VRF", "MASTER_PROMPT section 7.6; manufacturer manuals required", "engineering", "review", 58);

const vrfTypes = ["heat-pump", "heat-recovery", "two-pipe", "three-pipe", "air-cooled", "water-cooled", "mini-vrf", "modular-vrf", "low-temperature", "high-ambient", "simultaneous-operation", "hybrid-vrf"];
vrfTypes.forEach((slug) => add(`/vrv-vrf/types/${slug}/`, "vrf-type", `Разбор типа VRV/VRF: ${slug}`, `VRF ${slug}`, slug, "official manuals required", "engineering"));

const components = ["outdoor-units","wall-indoor-units","cassette-indoor-units","duct-indoor-units","floor-ceiling-units","fresh-air-units","hydroboxes","branch-selectors","refnets","copper-pipes","thermal-insulation","drainage","condensate-pumps","wired-controllers","wireless-controllers","central-controllers","gateways","bms-modbus","bms-bacnet","power-metering","refrigerant","oil-management","service-tools","safety-components"];
components.forEach((slug) => add(`/vrv-vrf/components/${slug}/`, "vrf-component", `Назначение компонента ${slug}`, `компонент VRF ${slug}`, slug, "official manuals required", "engineering"));

const engineering = ["site-survey","heat-gain-calculation","zoning","simultaneity-factor","capacity-index","pipe-sizing","maximum-pipe-length","height-difference","refnet-selection","refrigerant-charge","oil-return","drainage-design","fresh-air-integration","electrical-loads","single-line-diagram","control-cabling","central-control","bms-integration","noise-assessment","vibration-isolation","facade-restrictions","roof-placement","service-access","pressure-testing","vacuuming","additional-charge","addressing","commissioning","as-built-documentation","maintenance-plan"];
engineering.forEach((slug) => add(`/vrv-vrf/engineering/${slug}/`, "engineering-guide", `Инженерный узел: ${slug}`, `проектирование VRF ${slug}`, slug, "official manuals and project inputs required", "engineering"));

const services = ["ac-selection","site-survey","split-installation","multi-split-design","multi-split-installation","vrf-design","vrf-installation","ventilation-design","ventilation-installation","commissioning","pressure-testing","vacuuming","maintenance","diagnostics","repair","filter-service","seasonal-startup","equipment-audit","bms-integration","technical-supervision"];
services.forEach((slug) => add(`/services/${slug}/`, "service", `Коммерческий запрос на услугу ${slug}`, `услуга ${slug}`, slug, "business terms and qualification required", "commercial"));

const solutionObjects = ["apartment","studio-apartment","multi-room-apartment","penthouse","country-house","townhouse","cottage","office","open-space","executive-office","meeting-room","server-room","data-center","retail-store","shopping-center","supermarket","pharmacy","restaurant","cafe","coffee-shop","commercial-kitchen","bakery","hotel","mini-hotel","hostel","fitness-club","gym","yoga-studio","beauty-salon","barbershop","medical-clinic","dental-clinic","laboratory","school","kindergarten","university","warehouse","cold-warehouse","distribution-center","workshop","production","food-production","printing-house","auto-service","showroom","museum","gallery","cinema","theater","bank-branch","coworking","call-center","greenhouse","winery","laundry","animal-clinic","church","sports-hall","swimming-pool","logistics-terminal"];
if (solutionObjects.length !== 60) throw new Error(`Solutions must equal 60, got ${solutionObjects.length}`);
solutionObjects.forEach((slug) => add(`/solutions/${slug}/`, "solution", `Инженерный сценарий для объекта ${slug}`, `кондиционирование ${slug}`, slug, "project scenario and real cases required", "engineering-content"));

const areas = [15,20,25,30,35,40,50,60,70,80,100,120,150,200,250,300,400,500,750,1000];
areas.forEach((area) => add(`/collections/for-${area}-m2/`, "collection", `Предварительный подбор для площади ${area} м²`, `кондиционер на ${area} м2`, `${area} m2`, "verified product data required", "catalog"));
const tasks = ["quiet-bedroom","childrens-room","sunny-room","panoramic-windows","top-floor","ground-floor","several-rooms","heating-in-winter","summer-only","year-round-operation","wifi-control","voice-control","alice-compatible","salut-compatible","built-in-wifi","optional-wifi","energy-efficient","compact-indoor-unit","black-indoor-unit","white-indoor-unit","grey-indoor-unit","gold-indoor-unit","r32-refrigerant","inverter","on-off","low-noise","high-airflow","wide-voltage-range","self-clean","air-purification","dehumidification","night-mode","turbo-mode","i-feel","anti-corrosion-coating","long-pipe-run","large-height-difference","small-balcony","hidden-installation","duct-system","cassette-system","wall-system","floor-ceiling-system","multi-split","mini-vrf","heat-recovery","fresh-air","central-control","bms-ready","restaurant-hall","server-room-247","hotel-rooms","retail-entrance","open-space-office","meeting-rooms","country-house-zones","warehouse-gates","production-heat-gains","clinic-hygiene","school-classrooms"];
if (tasks.length !== 60) throw new Error(`Task collections must equal 60, got ${tasks.length}`);
tasks.forEach((slug) => add(`/collections/${slug}/`, "collection", `Подбор по задаче ${slug}`, `кондиционер ${slug}`, slug, "verified product fields required", "catalog"));

let compareCount = 0;
for (let i = 0; i < series.length && compareCount < 100; i++) {
  for (let j = i + 1; j < series.length && compareCount < 100; j++) {
    add(`/compare/${series[i].slug}-vs-${series[j].slug}/`, "comparison", `Сравнение ${series[i].name} и ${series[j].name}`, `${series[i].brand} ${series[i].name} vs ${series[j].brand} ${series[j].name}`, `${series[i].slug} / ${series[j].slug}`, "comparable verified fields required", "catalog-editor");
    compareCount++;
  }
}

const guideTopics = ["what-is-vrf","split-vs-multi-split","inverter-vs-on-off","how-to-read-model-name","cooling-capacity","heating-capacity","seer-and-scop","eer-and-cop","energy-class","indoor-noise","airflow","operating-temperatures","refrigerant-r32","wifi-control","voice-assistants","self-cleaning","blue-fin","installation-route","condensate-drainage","electrical-requirements","outdoor-unit-placement","indoor-unit-placement","fresh-air-basics","ventilation-vs-air-conditioning","filter-care","seasonal-maintenance","warranty-documents","how-to-compare-models","how-to-prepare-plans","questions-for-engineer"];
for (const section of ["basics","home","business","engineering"]) for (const topic of guideTopics) add(`/guides/${section}/${topic}/`, "article", `Экспертное руководство: ${topic} для ${section}`, `${topic} ${section}`, `${section}/${topic}`, "author, editor and official sources required", "editorial");

const symptoms = ["not-cooling","weak-airflow","water-leak","unusual-noise","vibration","bad-smell","not-starting","turns-off","ice-on-unit","error-code","remote-not-working","wifi-not-connecting","heating-poorly","outdoor-unit-noise","high-electricity-use","frequent-cycling","condensate-problem","filter-warning","after-power-outage","seasonal-start-problem"];
for (const system of ["split","multi-split","vrf","duct","cassette"]) for (const symptom of symptoms) add(`/diagnostics/${system}/${symptom}/`, "diagnostic", `Безопасная первичная проверка: ${system} ${symptom}`, `${system} ${symptom}`, `${system}/${symptom}`, "service manual and safety review required", "service-editor");

const terms = ["airflow","bms","blue-fin","btu","cassette-unit","central-controller","coefficient-of-performance","commissioning","compressor","condensate","condensate-pump","cooling-capacity","cop","dc-inverter","dehumidification","drainage","duct-unit","eer","energy-class","evaporator","fresh-air","heat-exchanger","heat-pump","heat-recovery","heating-capacity","height-difference","hydrobox","i-feel","indoor-unit","inverter","maximum-pipe-length","modbus","multi-split","noise-level","on-off","outdoor-unit","pressure-testing","refrigerant","refrigerant-charge","refnet","return-air","r32","scop","seer","service-access","simultaneity-factor","split-system","static-pressure","supply-air","temperature-range","thermal-insulation","three-pipe-vrf","two-pipe-vrf","vacuuming","ventilation","vrf","vrv","wired-controller","wireless-controller","zoning"];
if (terms.length !== 60) throw new Error(`Glossary must equal 60, got ${terms.length}`);
terms.forEach((term) => add(`/glossary/${term}/`, "glossary", `Определение и инженерная роль: ${term}`, term, term, "technical definition source required", "engineering-editor"));

solutionObjects.slice(0,40).forEach((slug, index) => add(`/cases/draft-${String(index + 1).padStart(2,"0")}-${slug}/`, "case", `Шаблон реального кейса для ${slug}`, `кейс кондиционирование ${slug}`, slug, "REAL_PROJECT_AND_PUBLICATION_CONSENT_REQUIRED", "case-editor", "draft", 5));

const systemRoutes = ["contacts","delivery","payment","warranty","returns","privacy","personal-data-consent","cookies","legal-information","accessibility","editorial-policy","data-sources","quality-policy","authors","sitemap","search","favorites","compare","calculator","vrf-brief","request","documents","certificates","new-2026","faq","for-partners","service-regulations","not-found-help"];
if (systemRoutes.length !== 28) throw new Error(`System routes must equal 28, got ${systemRoutes.length}`);
systemRoutes.forEach((slug) => add(`/${slug}/`, "system", `Служебная или коммерческая страница ${slug}`, slug, slug, "business/legal data required", "owner"));

if (rows.length !== 1000) throw new Error(`sitemap-master.csv must contain exactly 1000 data rows, got ${rows.length}`);

function csvEscape(value) {
  const string = String(value ?? "");
  return /[",\n]/.test(string) ? `"${string.replaceAll('"','""')}"` : string;
}
function toCsv(items, fields) {
  return `${fields.join(",")}\n${items.map((item) => fields.map((field) => csvEscape(item[field])).join(",")).join("\n")}\n`;
}

await writeFile(new URL("sitemap-master.csv", outDir), toCsv(rows, csvFields), "utf8");
await writeFile(new URL("route-status.csv", outDir), toCsv(rows.map((row) => ({ route: row.route, status: row.status, indexability: row.indexability, reason: "Full source verification and owner approval required before indexing" })), ["route","status","indexability","reason"]), "utf8");

const products = {
  generated_at: verifiedDate,
  scope: "Names and variants from the supplied master prompt only; no technical field is inherited or fabricated.",
  brands: [...new Set(series.map((item) => item.brand))],
  series: series.map((item) => ({ ...item, verification_status: "prompt_map_only", field_sources: { brand: "MASTER_PROMPT section 3", series: "MASTER_PROMPT section 3", models: "MASTER_PROMPT section 3" }, technical_fields: {} })),
};
await writeFile(new URL("products-master.json", outDir), `${JSON.stringify(products, null, 2)}\n`, "utf8");

const manifest = [
  { path: "MASTER_PROMPT_SNEG_1000_PAGES(1).md", kind: "master_prompt", status: "reviewed_completely", publication: "internal_source" },
  { path: "https://disk.yandex.ru/d/dlTcuAEMk-rWyw", kind: "public_product_folder", status: "full_export_required", publication: "pending_rights_and_source_review" },
  { path: "https://split-systems.stony-vale-8193.chatgpt.site/", kind: "current_site", status: "external_audit_required", publication: "reference_only" },
  { path: "cbb94da6-73ca-4123-89e8-8b0fbe40b3ec.png", kind: "logo", status: "file_not_attached_to_current_build", publication: "owner_file_required" },
  { path: "IMG_2397.png", kind: "mobile_reference", status: "file_not_attached_to_current_build", publication: "reference_required" },
];
await writeFile(new URL("source-manifest.csv", outDir), toCsv(manifest, ["path","kind","status","publication"]), "utf8");

const conflicts = [
  { id: "DATA_CONFLICT_001", entity: "Chigo Lotos on-off 169", field: "model/folder name", issue: "Prompt reports a mismatch between one folder and filenames", action: "Compare original files and official documentation" },
  { id: "DATA_CONFLICT_002", entity: "Chigo Moon on-off 181", field: "model indices 61/88/100", issue: "Prompt reports possible index reordering in filenames", action: "Verify against passports and original-resolution media" },
  { id: "DATA_GAP_001", entity: "Business", field: "phone/email/address/legal details", issue: "Not supplied", action: "Owner must confirm before publication" },
  { id: "DATA_GAP_002", entity: "Catalog", field: "prices/availability/warranty", issue: "No synchronized source supplied", action: "Connect verified price and stock source" },
  { id: "DATA_GAP_003", entity: "Products", field: "technical characteristics and imagery", issue: "Public folder not materialized into this build", action: "Export recursively, OCR, deduplicate and link field provenance" },
  { id: "DATA_GAP_004", entity: "Cases/reviews", field: "publication evidence and consent", issue: "No verified records supplied", action: "Keep draft/noindex until real records and consent exist" },
];
await writeFile(new URL("data-conflicts.csv", outDir), toCsv(conflicts, ["id","entity","field","issue","action"]), "utf8");

await writeFile(new URL("business-data-required.md", outDir), `# Данные, необходимые от владельца\n\nПеред публикацией контактов, коммерческих условий и индексируемых страниц подтвердите:\n\n- юридическое и коммерческое название;\n- ИНН/ОГРН и реквизиты, если они должны отображаться;\n- телефон, email, адрес, регион и радиус работ;\n- режим работы и подтверждённые мессенджеры;\n- актуальный прайс или правило «цена по запросу»;\n- источник наличия, доставки, оплаты, гарантии и возврата;\n- документы о квалификации, допуски и сертификаты;\n- реальные кейсы, отзывы и согласия на публикацию;\n- CRM endpoint, политика персональных данных и идентификаторы аналитики.\n\nДо подтверждения этих полей текущая сборка намеренно не показывает телефон, адрес, отзывы, цены и наличие.\n`, "utf8");

await writeFile(new URL("redirects.csv", outDir), toCsv([
  { from: "/product?id={legacy_id}", to: "resolve_by_verified_sku_then_301", status: "mapping_required" },
  { from: "/catalog?brand={brand}", to: "/catalog/{brand}/", status: "whitelist_after_audit" },
  { from: "/industrial/{placeholder}", to: "/vrv-vrf/", status: "review_each_old_url" },
], ["from","to","status"]), "utf8");

await writeFile(new URL("DATA_SCHEMA.md", docsDir), `# Схема данных\n\nГлавная сущность каталога — серия, связанная с брендом и проверенными обозначениями моделей. Техническое поле публикуется только вместе с источником.\n\n## Обязательные поля модели\n\n\`brand\`, \`series\`, \`model\`, \`sku\`, \`product_type\`, \`media\`, \`documents\`, \`field_sources\`, \`verification_status\`.\n\n## Правило неизвестных значений\n\n\`null\`, пустая строка и \`unknown\` не выводятся в пользовательском интерфейсе. Конфликт создаёт запись \`DATA_CONFLICT\`; спорное поле остаётся скрытым. Функции серии не наследуются конкретной моделью без прямого источника.\n\n## Статусы\n\n- \`draft\` — исходные данные неполны;\n- \`review\` — шаблон и текст проверены, но публикация/индексация ещё не разрешены;\n- \`published\` — все обязательные поля и права подтверждены.\n`, "utf8");

await writeFile(new URL("DESIGN_SYSTEM.md", docsDir), `# Дизайн-система\n\n## Токены\n\n- текст: \`#0B1F3A\`;\n- основной синий: \`#1469E8\`;\n- ледяной акцент: \`#42BFF5\`;\n- светлый фон: \`#F4F8FD\`;\n- вторичный текст: \`#64748B\`;\n- успех: \`#14804A\`.\n\nРадиусы: 12–28 px. Минимальная зона нажатия: 44×44 px. Основной текст на мобильном: не менее 16 px там, где требуется чтение длинного текста. Анимации короткие и отключаются через \`prefers-reduced-motion\`.\n\n## Компоненты\n\nШапка, мобильное меню, нижняя навигация, hero, селектор объекта, фильтры каталога, карточка серии, избранное, сравнение, поисковый диалог, VRV/VRF-схема, калькулятор, процесс, блок качества данных, FAQ и footer.\n`, "utf8");

await writeFile(new URL("QA_REPORT.md", docsDir), `# QA-отчёт\n\nДата: ${verifiedDate}\n\n## Выполнено\n\n- статический анализ пользовательских компонентов: ESLint — без ошибок;\n- карта маршрутов: ровно 1000 строк данных;\n- каталог: 5 брендов и 44 серии;\n- запрещённые тестовые бренды и фиктивные номера отсутствуют;\n- цены, наличие, отзывы, реквизиты и гарантийные обещания не выдуманы;\n- поиск принимает дефисы/пробелы и русские варианты названий брендов;\n- избранное и сравнение сохраняются локально;\n- расчёт создаёт файл локально и не имитирует отправку заявки;\n- Escape закрывает меню, поиск и сравнение.\n\n## Перед продакшеном\n\nНужны браузерные проверки целевых разрешений, реальные изображения, полная проверка ссылок после импорта, серверная доставка лидов, тестирование screen reader, Lighthouse и кроссбраузерная матрица.\n`, "utf8");

await writeFile(new URL("ACCESSIBILITY_REPORT.md", docsDir), `# Доступность\n\nВ сборке предусмотрены skip-link, семантические секции, подписанные поля, видимый focus, зоны нажатия не менее 44 px, управление Escape, \`aria-modal\`, \`aria-live\` для результата, safe-area нижней навигации и \`prefers-reduced-motion\`.\n\nПеред публичным запуском необходимы ручные проходы клавиатурой и screen reader на финальном контенте и реальных галереях.\n`, "utf8");

await writeFile(new URL("PERFORMANCE_REPORT.md", docsDir), `# Производительность\n\nСборка не использует тяжёлое hero-видео, внешние шрифты, сторонние виджеты или аналитические скрипты. Иллюстрация hero выполнена CSS, социальная карточка загружается только как metadata-asset. Длинный каталог ограничивает начальную выдачу 12 карточками.\n\nПосле добавления товарных медиа: создавать AVIF/WebP, явные размеры, responsive srcset и lazy loading вне LCP. Фактические Lighthouse/Core Web Vitals фиксируются после подключения реального домена и изображений.\n`, "utf8");

await writeFile(new URL("SEO_REPORT.md", docsDir), `# SEO-отчёт\n\n- \`sitemap-master.csv\`: ровно 1000 запланированных маршрутов;\n- у каждой строки есть intent, entity, source, owner, status, indexability и canonical;\n- на текущем этапе все маршруты \`noindex\`, потому что полная проверка источников и бизнес-данных не завершена;\n- цветовые варианты входят в каноническую структуру только там, где прямо перечислены в карте;\n- сравнения построены между существующими сериями, но остаются draft до появления сопоставимых полей;\n- кейсы остаются draft и требуют реального объекта и согласия;\n- фильтры не создают индексируемые комбинации автоматически.\n`, "utf8");

await writeFile(new URL("OWNER_GUIDE.md", docsDir), `# Краткая инструкция владельцу\n\n## Добавить модель\n\n1. Создайте запись с точным SKU.\n2. Приложите паспорт/официальную карточку и реальные изображения.\n3. Для каждого поля укажите источник.\n4. Проверьте канонический URL, варианты и отсутствие дубля.\n5. Переведите страницу из draft только после редакционной проверки.\n\n## Обновить цену или наличие\n\nНе редактируйте значение без даты и источника. Подключите синхронизированный источник; при сбое скрывайте статус, а не показывайте устаревшее «в наличии».\n\n## Добавить статью\n\nУкажите автора, редактора, дату фактической проверки, официальные источники, ограничения и 3–10 контекстных внутренних ссылок.\n\n## Добавить кейс\n\nНужны реальный объект, задача, ограничения, выбранное решение, этапы, измеренный результат, фотографии, дата и согласие на публикацию. Иначе кейс остаётся draft/noindex.\n`, "utf8");

console.log(JSON.stringify({ status: "ok", routes: rows.length, series: series.length, product_routes: 274, directory: outDir.pathname }));
