import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#3D2B1F", color: "#FDFAF6" }} className="mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="Jolies Fleurs"
                width={44}
                height={44}
                className="rounded-full object-cover"
                style={{ border: "2px solid #F2A7B5" }}
              />
              <span className="font-heading text-xl" style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}>
                Jolies Fleurs
              </span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Свежие букеты и цветочные композиции.<br />
              Доставка по Москве и МО.
            </p>
            <a
              href="https://t.me/dddd_nik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.267l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.292z"/>
              </svg>
              @dddd_nik
            </a>
          </div>

          {/* Addresses */}
          <div>
            <h3 className="font-semibold mb-4 text-rose-200" style={{ fontFamily: "var(--font-jost, sans-serif)" }}>
              Наши магазины
            </h3>
            <div className="space-y-4 text-sm opacity-80">
              <div>
                <p className="font-medium opacity-100 mb-1">Ленинградский</p>
                <p>Ленинградский пр-кт, 29к4</p>
                <p className="opacity-60 text-xs">вход совмещён с магазином табака</p>
                <a href="tel:+79853898591" className="hover:text-rose-300 transition-colors">
                  +7 (985) 389-85-91
                </a>
              </div>
              <div>
                <p className="font-medium opacity-100 mb-1">Озерная</p>
                <p>Озерная, 1к2/4</p>
                <p className="opacity-60 text-xs">вход совмещён с WB</p>
                <a href="tel:+79324925459" className="hover:text-rose-300 transition-colors">
                  +7 (932) 492-54-59
                </a>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-4 text-rose-200" style={{ fontFamily: "var(--font-jost, sans-serif)" }}>
              Информация
            </h3>
            <div className="space-y-2 text-sm opacity-80">
              <p>Ежедневно 9:00–22:00</p>
              <p>Доставка по Москве и МО</p>
            </div>
            <nav className="mt-4 space-y-2">
              {[
                { href: "/catalog", label: "Каталог" },
                { href: "/contacts", label: "Контакты" },
                { href: "/privacy", label: "Политика конфиденциальности" },
              ].map((l) => (
                <div key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {l.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div
          className="mt-10 pt-6 text-xs opacity-40 flex flex-col sm:flex-row justify-between gap-2"
          style={{ borderTop: "1px solid rgba(253,250,246,0.1)" }}
        >
          <span>© {new Date().getFullYear()} Jolies Fleurs. Все права защищены.</span>
          <Link href="/privacy" className="hover:opacity-80 transition-opacity">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
