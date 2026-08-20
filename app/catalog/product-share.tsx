"use client";

import { useState } from "react";

export default function ProductShare({ title }: { title: string }) {
  const [status, setStatus] = useState("Поделиться серией");

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${title} — СНЕГ`, url });
        setStatus("Ссылка отправлена");
      } else {
        await navigator.clipboard.writeText(url);
        setStatus("Ссылка скопирована");
      }
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") setStatus("Не удалось скопировать");
    }
  }

  return <button className="product-share" type="button" onClick={share}><span aria-hidden="true">↗</span>{status}</button>;
}
