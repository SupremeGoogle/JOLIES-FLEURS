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
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-light"
          style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)" }}>
          Оставьте заявку
        </h2>
        <p className="mt-2 text-sm opacity-60" style={{ color: "#7A5C4F" }}>
          Ответим в течение 30 минут
        </p>
      </div>

      {status === "ok" ? (
        <div className="p-8 rounded-2xl text-center" style={{ background: "#E8F3E6" }}>
          <div className="text-4xl mb-3">✅</div>
          <h3 className="font-semibold text-lg mb-2" style={{ color: "#3D2B1F" }}>Заявка принята!</h3>
          <p className="text-sm opacity-70" style={{ color: "#3D2B1F" }}>
            Мы свяжемся с вами в ближайшее время.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="p-8 rounded-2xl space-y-5" style={{ background: "#FCE8ED" }}>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#3D2B1F" }}>
              Ваше имя *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Мария"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "#FDFAF6",
                border: errors.name ? "2px solid #D97F91" : "2px solid transparent",
                color: "#3D2B1F",
              }}
            />
            {errors.name && <p className="text-xs mt-1" style={{ color: "#D97F91" }}>{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#3D2B1F" }}>
              Телефон *
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+7 (999) 000-00-00"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "#FDFAF6",
                border: errors.phone ? "2px solid #D97F91" : "2px solid transparent",
                color: "#3D2B1F",
              }}
            />
            {errors.phone && <p className="text-xs mt-1" style={{ color: "#D97F91" }}>{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#3D2B1F" }}>
              Комментарий
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Расскажите о пожеланиях к букету, поводе, бюджете..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
              style={{ background: "#FDFAF6", border: "2px solid transparent", color: "#3D2B1F" }}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-rose-400 cursor-pointer flex-shrink-0"
            />
            <label htmlFor="consent" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#7A5C4F" }}>
              Я согласен(а) с{" "}
              <Link href="/privacy" className="underline hover:no-underline" style={{ color: "#C9A96E" }}>
                обработкой персональных данных
              </Link>{" "}
              в соответствии с Федеральным законом № 152-ФЗ
            </label>
          </div>
          {errors.consent && <p className="text-xs" style={{ color: "#D97F91" }}>{errors.consent}</p>}

          {status === "error" && (
            <p className="text-xs text-center" style={{ color: "#D97F91" }}>
              Ошибка отправки. Позвоните нам: +7 (985) 389-85-91
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full text-center disabled:opacity-60"
          >
            {status === "loading" ? "Отправляем..." : "Отправить заявку"}
          </button>
        </form>
      )}
    </div>
  );
}
