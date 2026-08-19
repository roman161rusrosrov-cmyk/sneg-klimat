import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-mark" aria-hidden="true">✣</div>
      <p>Ошибка 404</p>
      <h1>Такой страницы пока нет</h1>
      <p>Проверьте адрес или вернитесь к каталогу. Неопубликованные маршруты остаются закрытыми до проверки данных.</p>
      <div>
        <Link className="button button-primary" href="/">На главную</Link>
        <Link className="button button-ghost" href="/#catalog">Открыть каталог</Link>
      </div>
    </main>
  );
}
