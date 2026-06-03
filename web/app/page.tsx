import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/data";
import ContactForm from "@/app/contacts/ContactForm";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4 C12 8 6 8 6 14 C6 20 12 22 14 20 C16 22 22 20 22 14 C22 8 16 8 14 4Z"/>
        <circle cx="14" cy="14" r="2.5"/>
        <line x1="14" y1="20" x2="14" y2="24"/>
      </svg>
    ),
    title: "Свежие цветы",
    desc: "Поставки несколько раз в неделю — только отборные свежие цветы",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="9" width="18" height="12" rx="2"/>
        <path d="M20 13 L24 13 L26 17 L26 21 L20 21"/>
        <circle cx="7" cy="23" r="2"/>
        <circle cx="22" cy="23" r="2"/>
        <line x1="6" y1="13" x2="14" y2="13"/>
        <line x1="6" y1="17" x2="11" y2="17"/>
      </svg>
    ),
    title: "Доставка",
    desc: "По Москве и Московской области в удобное для вас время",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 22 C14 22 4 16 4 10 C4 7 7 4 10 5 C12 5.5 13 7 14 9 C15 7 16 5.5 18 5 C21 4 24 7 24 10 C24 16 14 22 14 22Z"/>
        <path d="M9 10 C9 10 11 8 14 10 C17 8 19 10 19 10"/>
      </svg>
    ),
    title: "Авторские букеты",
    desc: "Флористы создают неповторимые авторские композиции для любого повода",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3 C10 3 7 6 7 10 C7 16 14 23 14 23 C14 23 21 16 21 10 C21 6 18 3 14 3Z"/>
        <circle cx="14" cy="10" r="2.5"/>
      </svg>
    ),
    title: "Два магазина",
    desc: "Ленинградский проспект и Озерная — всегда рядом с вами",
  },
];

const reviews = [
  { name: "Мария К.", text: "Великолепный магазин. Заказывала букет на день рождения подруги — всё свежее, красиво упаковано. Доставили вовремя. Однозначно рекомендую.", date: "2 месяца назад" },
  { name: "Анна Л.", text: "Уже второй раз беру букеты здесь. Очень нравится сочетание цветов, стоят долго. Приятные цены за такой уровень.", date: "3 месяца назад" },
  { name: "Дмитрий В.", text: "Покупал жене на годовщину. Флористы помогли подобрать идеальный вариант. Жена была в восторге. Теперь это наш постоянный магазин.", date: "1 месяц назад" },
  { name: "Елена С.", text: "Всегда свежие цветы, приятная атмосфера, внимательные сотрудники. Букеты держатся больше недели.", date: "2 недели назад" },
  { name: "Оксана Р.", text: "Заказала доставку — всё пришло в идеальном состоянии, упаковано с любовью. Подруга была тронута. Спасибо команде.", date: "5 дней назад" },
];

export default function HomePage() {
  const products = getProducts();
  const featured = products.slice(16, 22);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#FDFAF6" }}>

        {/* Light floral BG — slow zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="hero-bg-zoom w-full h-full object-cover"
            style={{ opacity: 0.72, transformOrigin: "center 40%" }}
          />
        </div>

        {/* Soft ivory veil — keeps text readable */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to bottom, rgba(253,250,246,0.42) 0%, rgba(253,250,246,0.20) 45%, rgba(253,250,246,0.60) 100%)"
        }} />

        {/* Content — light glass card */}
        <div className="relative z-10 text-center px-10 py-14 max-w-lg mx-auto mt-14 rounded-3xl"
          style={{
            background: "rgba(253,250,246,0.55)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.70)",
            boxShadow: "0 12px 48px rgba(61,43,31,0.10), inset 0 1px 0 rgba(255,255,255,0.80)",
          }}>

          <div className="float-anim inline-block mb-6">
            <Image src="/logo.jpg" alt="Jolies Fleurs" width={88} height={88} priority fetchPriority="high"
              className="rounded-full object-cover mx-auto"
              style={{ border: "2px solid rgba(242,167,181,0.7)", boxShadow: "0 4px 20px rgba(242,167,181,0.30)" }} />
          </div>

          <p className="section-label mb-3">Цветочный бутик · Москва</p>

          <h1 style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            color: "#3D2B1F",
            lineHeight: 1.0,
            fontSize: "clamp(3rem, 6vw, 5.2rem)",
            fontWeight: 300,
          }}>
            Jolies Fleurs
          </h1>

          <div className="gold-line my-5" />

          <p style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            color: "#7A5C4F",
            fontSize: "1.2rem",
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}>
            Цветы, которые говорят за вас
          </p>

          <p className="mt-2 text-xs" style={{ color: "#B39280", letterSpacing: "0.08em" }}>
            Свежие букеты · Авторские композиции · Доставка
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/catalog" className="btn-primary">Смотреть каталог</Link>
            <Link href="#order" className="btn-outline">Оставить заявку</Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.45 }}>
          <span style={{ color: "#7A5C4F", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #C9A96E, transparent)" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-24 px-6" style={{ background: "#FDFAF6" }}>
        <div className="max-w-3xl mx-auto text-center reveal reveal-fallback">
          <p className="section-label mb-4">О нас</p>
          <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#3D2B1F", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.2 }}>
            Цветочный бутик в сердце Москвы
          </h2>
          <div className="gold-line my-6" />
          <p className="text-base leading-relaxed mb-4" style={{ color: "#7A5C4F", opacity: 0.85 }}>
            Jolies Fleurs — маленький уютный магазин с большой любовью к цветам. Мы работаем каждый день с 9:00 до 22:00,
            создавая букеты, которые дарят радость. Два удобных адреса в Москве — на Ленинградском проспекте и Озерной.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#7A5C4F", opacity: 0.85 }}>
            Наши флористы подбирают только свежие цветы и создают авторские композиции для любого повода.
            Работаем с доставкой по Москве и Подмосковью.
          </p>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="py-24 overflow-hidden" style={{ background: "#F7F2EE" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal reveal-fallback">
            <p className="section-label mb-4">Популярное</p>
            <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#3D2B1F", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>
              Любимые букеты
            </h2>
            <div className="gold-line mt-6" />
          </div>
          <div className="flex gap-5 overflow-x-auto carousel-scroll pb-4 -mx-2 px-2">
            {featured.map((p) => (
              <Link key={p.id} href="/catalog"
                className="carousel-item flex-none w-60 rounded-2xl overflow-hidden product-card"
                style={{ background: "#fff", boxShadow: "0 2px 16px rgba(61,43,31,0.06)" }}>
                <div className="relative overflow-hidden" style={{ height: "280px" }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-medium tracking-wide" style={{ color: "#C9A96E" }}>{p.price}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#7A5C4F", opacity: 0.6, letterSpacing: "0.05em" }}>Авторский букет</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/catalog" className="btn-outline">Весь каталог</Link>
          </div>
        </div>
      </section>

      {/* ── WHY US — Liquid Glass ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#2a1810" }}>
        {/* BG floral */}
        <div className="absolute inset-0">
          <img src="/flowers/6280%E2%82%BD.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover" style={{ opacity: 0.22 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(42,24,16,0.7) 0%, rgba(42,24,16,0.4) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 reveal reveal-fallback">
            <p className="section-label mb-4" style={{ color: "rgba(201,169,110,0.8)" }}>Почему мы</p>
            <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#FDFAF6", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>
              С любовью к каждому букету
            </h2>
            <div className="gold-line mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="glass rounded-2xl p-7 reveal reveal-fallback" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="mb-5 opacity-90">{f.icon}</div>
                <h3 className="font-medium mb-2 text-sm tracking-wide" style={{ color: "#FDFAF6", letterSpacing: "0.05em" }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(253,250,246,0.60)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS — Liquid Glass ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#1a0e0a" }}>
        <div className="absolute inset-0">
          <img src="/flowers/10470%E2%82%BD.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover" style={{ opacity: 0.18 }} />
          <div className="absolute inset-0" style={{ background: "rgba(26,14,10,0.65)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal reveal-fallback">
            <p className="section-label mb-4" style={{ color: "rgba(201,169,110,0.8)" }}>Отзывы</p>
            <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#FDFAF6", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>
              Что говорят клиенты
            </h2>
            <div className="gold-line mt-6" />
          </div>

          <div className="flex gap-5 overflow-x-auto carousel-scroll pb-4">
            {reviews.map((r, i) => (
              <div key={i} className="carousel-item flex-none w-72 glass rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="#C9A96E">
                      <path d="M6 1L7.5 4.5H11L8.3 6.8L9.3 10.5L6 8.3L2.7 10.5L3.7 6.8L1 4.5H4.5Z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(253,250,246,0.78)", lineHeight: 1.75 }}>
                  "{r.text}"
                </p>
                <div className="flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
                  <span className="text-sm font-medium" style={{ color: "#FDFAF6" }}>{r.name}</span>
                  <span className="text-xs" style={{ color: "rgba(253,250,246,0.35)", fontSize: "0.65rem", letterSpacing: "0.05em" }}>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER FORM ── */}
      <section id="order" className="py-24 px-6 relative overflow-hidden" style={{ background: "#FDFAF6" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(242,167,181,0.12) 0%, transparent 70%)"
        }} />
        <div className="relative max-w-xl mx-auto">
          <div className="text-center mb-10 reveal reveal-fallback">
            <p className="section-label mb-4">Контакт</p>
            <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#3D2B1F", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>
              Оставить заявку
            </h2>
            <div className="gold-line mt-5 mb-4" />
            <p className="text-sm" style={{ color: "#7A5C4F", opacity: 0.7 }}>Ответим в течение 30 минут</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
