"use client";

import { useState } from "react";

export default function ModelList({ models }: { models: string[] }) {
  const [copied, setCopied] = useState("");

  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("Не удалось скопировать");
    }
  }

  return <div className="model-tools"><div className="model-tools-head"><span>Нажмите на обозначение, чтобы скопировать</span><button type="button" onClick={() => copy(models.join("\n"), "Список скопирован")}>{copied || "Копировать все"}</button></div><ul className="model-list">{models.map((model) => <li key={model}><code>{model}</code><button type="button" onClick={() => copy(model, `Скопировано: ${model}`)} aria-label={`Скопировать модель ${model}`}>Копировать</button></li>)}</ul></div>;
}
