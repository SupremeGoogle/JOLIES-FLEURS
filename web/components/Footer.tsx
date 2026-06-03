import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#1a0e0a", color: "#FDFAF6" }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image src="/logo.jpg" alt="Jolies Fleurs" width={40} height={40}
                className="rounded-full object-cover"
                style={{ border: "1px solid rgba(242,167,181,0.4)" }} />
              <span style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "1.2rem", fontWeight: 300, letterSpacing: "0.04em" }}>
                Jolies Fleurs
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(253,250,246,0.50)", lineHeight: 1.8 }}>
              Свежие букеты и цветочные композиции.<br />
              Доставка по Москве и МО.
            </p>
            <a href="https://t.me/dddd_nik" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-xs transition-opacity hover:opacity-100"
              style={{ color: "rgba(253,250,246,0.55)", letterSpacing: "0.05em" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.267l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.292z"/>
              </svg>
              @dddd_nik
            </a>
          </div>

          {/* Addresses */}
          <div>
            <p className="section-label mb-5" style={{ color: "rgba(201,169,110,0.7)" }}>Магазины</p>
            <div className="space-y-5 text-sm" style={{ color: "rgba(253,250,246,0.55)" }}>
              <div>
                <p className="font-medium mb-1" style={{ color: "rgba(253,250,246,0.85)", letterSpacing: "0.03em" }}>Ленинградский</p>
                <p>Ленинградский пр-кт, 29к4</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(253,250,246,0.30)" }}>вход совмещён с магазином табака</p>
                <a href="tel:+79853898591" className="block mt-1 hover:opacity-90 transition-opacity" style={{ color: "#C9A96E" }}>
                  +7 (985) 389-85-91
                </a>
              </div>
              <div>
                <p className="font-medium mb-1" style={{ color: "rgba(253,250,246,0.85)", letterSpacing: "0.03em" }}>Озерная</p>
                <p>Озерная, 1к2/4</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(253,250,246,0.30)" }}>вход совмещён с WB</p>
                <a href="tel:+79324925459" className="block mt-1 hover:opacity-90 transition-opacity" style={{ color: "#C9A96E" }}>
                  +7 (932) 492-54-59
                </a>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="section-label mb-5" style={{ color: "rgba(201,169,110,0.7)" }}>Информация</p>
            <div className="space-y-2 text-sm mb-6" style={{ color: "rgba(253,250,246,0.50)" }}>
              <p>Ежедневно 9:00 — 22:00</p>
              <p>Доставка по Москве и МО</p>
            </div>
            <nav className="space-y-3">
              {[
                { href: "/catalog", label: "Каталог" },
                { href: "/contacts", label: "Контакты" },
                { href: "/privacy", label: "Политика конфиденциальности" },
              ].map((l) => (
                <div key={l.href}>
                  <Link href={l.href} className="text-xs transition-opacity hover:opacity-100"
                    style={{ color: "rgba(253,250,246,0.40)", letterSpacing: "0.04em" }}>
                    {l.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-2"
          style={{ borderTop: "1px solid rgba(253,250,246,0.08)" }}>
          <span className="text-xs" style={{ color: "rgba(253,250,246,0.25)", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Jolies Fleurs
          </span>
          <Link href="/privacy" className="text-xs transition-opacity hover:opacity-80"
            style={{ color: "rgba(253,250,246,0.25)", letterSpacing: "0.04em" }}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
