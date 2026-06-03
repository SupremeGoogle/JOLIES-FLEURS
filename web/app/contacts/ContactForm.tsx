"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.phone.trim()) e.phone = "Введите телефон";
    else if (!/^[\d\s\+\-\(\)]{7,}$/.test(form.phone)) e.phone = "Некорректный номер";
    if (!consent) e.consent = "Необходимо согласие";
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", phone: "", message: "" });
        setConsent(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {status === "ok" ? (
        <div className="p-10 rounded-2xl text-center" style={{ background: "#E8F3E6" }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "#A8C5A0" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M4 10l4 4 8-8"/>
            </svg>
          </div>
          <h3 className="font-medium text-lg mb-2" style={{ color: "#3D2B1F" }}>Заявка принята</h3>
          <p className="text-sm" style={{ color: "#7A5C4F" }}>Мы свяжемся с вами в ближайшее время.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5 p-8 rounded-2xl"
          style={{ background: "rgba(253,250,246,0.7)", border: "1px solid rgba(201,169,110,0.2)", backdropFilter: "blur(8px)" }}>

          <div>
            <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: "#7A5C4F" }}>
              Ваше имя *
            </label>
            <input type="text" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Мария"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ background: "#FDFAF6", border: errors.name ? "1.5px solid #D97F91" : "1.5px solid rgba(201,169,110,0.3)", color: "#3D2B1F" }} />
            {errors.name && <p className="text-xs mt-1" style={{ color: "#D97F91" }}>{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: "#7A5C4F" }}>
              Телефон *
            </label>
            <input type="tel" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+7 (999) 000-00-00"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ background: "#FDFAF6", border: errors.phone ? "1.5px solid #D97F91" : "1.5px solid rgba(201,169,110,0.3)", color: "#3D2B1F" }} />
            {errors.phone && <p className="text-xs mt-1" style={{ color: "#D97F91" }}>{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: "#7A5C4F" }}>
              Комментарий
            </label>
            <textarea value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Расскажите о пожеланиях к букету, поводе, бюджете..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
              style={{ background: "#FDFAF6", border: "1.5px solid rgba(201,169,110,0.3)", color: "#3D2B1F" }} />
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" id="consent" checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer"
              style={{ accentColor: "#C9A96E" }} />
            <label htmlFor="consent" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#7A5C4F" }}>
              Я согласен(а) с{" "}
              <Link href="/privacy" className="underline hover:no-underline" style={{ color: "#C9A96E" }}>
                обработкой персональных данных
              </Link>{" "}
              согласно ФЗ № 152-ФЗ
            </label>
          </div>
          {errors.consent && <p className="text-xs" style={{ color: "#D97F91" }}>{errors.consent}</p>}

          {status === "error" && (
            <p className="text-xs text-center" style={{ color: "#D97F91" }}>
              Ошибка отправки. Позвоните: +7 (985) 389-85-91
            </p>
          )}

          <button type="submit" disabled={status === "loading"}
            className="btn-primary w-full text-center disabled:opacity-60">
            {status === "loading" ? "Отправляем..." : "Оставить заявку"}
          </button>
        </form>
      )}
    </div>
  );
}
