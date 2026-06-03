import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/data";
import ContactForm from "@/app/(site)/contacts/ContactForm";

const features = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#C4956A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3C11 7 5 7 5 13C5 19 11 21 13 19C15 21 21 19 21 13C21 7 15 7 13 3Z"/><circle cx="13" cy="13" r="2.2"/><line x1="13" y1="19" x2="13" y2="23"/></svg>,
    title: "Свежие цветы",
    desc: "Поставки несколько раз в неделю — только отборные свежие цветы",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#C4956A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="17" height="11" rx="2"/><path d="M19 12 L23 12 L25 16 L25 20 L19 20"/><circle cx="6" cy="22" r="1.8"/><circle cx="21" cy="22" r="1.8"/><line x1="5" y1="13" x2="13" y2="13"/><line x1="5" y1="16" x2="10" y2="16"/></svg>,
    title: "Доставка",
    desc: "По Москве и Московской области в удобное для вас время",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#C4956A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><path d="M13 21C13 21 3 15 3 9C3 6 6 3 9 4C11 4.5 12 6.5 13 8.5C14 6.5 15 4.5 17 4C20 3 23 6 23 9C23 15 13 21 13 21Z"/></svg>,
    title: "Авторские букеты",
    desc: "Флористы создают неповторимые авторские композиции для любого повода",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#C4956A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2C9 2 6 5.5 6 9.5C6 15.5 13 22 13 22C13 22 20 15.5 20 9.5C20 5.5 17 2 13 2Z"/><circle cx="13" cy="9.5" r="2.2"/></svg>,
    title: "Два магазина",
    desc: "Ленинградский проспект и Озерная — всегда рядом с вами",
  },
];

const reviews = [
  { name: "Мария К.", text: "Великолепный магазин. Заказывала букет на день рождения подруги — всё свежее, красиво упаковано. Доставили вовремя.", date: "2 мес. назад" },
  { name: "Анна Л.", text: "Уже второй раз беру букеты здесь. Очень нравится сочетание цветов, стоят долго. Приятные цены за такой уровень.", date: "3 мес. назад" },
  { name: "Дмитрий В.", text: "Покупал жене на годовщину. Флористы помогли подобрать идеальный вариант. Жена была в восторге.", date: "1 мес. назад" },
  { name: "Елена С.", text: "Всегда свежие цветы, приятная атмосфера, внимательные сотрудники. Букеты держатся больше недели.", date: "2 нед. назад" },
  { name: "Оксана Р.", text: "Заказала доставку — всё пришло в идеальном состоянии, упаковано с любовью. Подруга была тронута.", date: "5 дн. назад" },
];

export default function HomePage() {
  const products = getProducts();
  const featured = products.slice(16, 22);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#FBF5F0" }}>

        {/* Bokeh BG */}
        <div className="absolute inset-0 overflow-hidden">
          <img src="/hero-bg.jpg" alt="" aria-hidden="true"
            className="hero-bg-zoom w-full h-full object-cover"
            style={{ opacity: 0.65, transformOrigin: "center 45%" }} />
        </div>

        {/* Gradient veil */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(160deg, rgba(251,245,240,0.55) 0%, rgba(251,245,240,0.25) 40%, rgba(44,36,32,0.18) 100%)"
        }} />

        {/* Floating blobs */}
        <div className="blob w-80 h-80 opacity-20 -top-20 -right-20"
          style={{ background: "radial-gradient(circle, #E8A0B0, transparent)", animationDelay: "0s" }} />
        <div className="blob w-64 h-64 opacity-15 bottom-10 -left-16"
          style={{ background: "radial-gradient(circle, #B0C9B0, transparent)", animationDelay: "-4s" }} />
        <div className="blob w-48 h-48 opacity-10 top-1/3 right-1/4"
          style={{ background: "radial-gradient(circle, #C4956A, transparent)", animationDelay: "-8s" }} />

        {/* Glass content card */}
        <div className="relative z-10 text-center px-10 py-14 max-w-lg mx-auto mt-16 rounded-[2.5rem] glass-soft"
          style={{ boxShadow: "0 16px 60px rgba(44,36,32,0.10), inset 0 1px 0 rgba(255,255,255,0.9)" }}>

          <div className="float-anim inline-block mb-7">
            <Image src="/logo.jpg" alt="Jolies Fleurs" width={84} height={84} priority fetchPriority="high"
              className="rounded-full object-cover mx-auto"
              style={{ border: "2px solid rgba(232,160,176,0.6)", boxShadow: "0 6px 24px rgba(232,160,176,0.25)" }} />
          </div>

          <p className="section-label mb-3">Цветочный бутик · Москва</p>

          <h1 style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            color: "#2C2420",
            lineHeight: 1.0,
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.01em",
          }}>
            Jolies Fleurs
          </h1>

          <div className="gold-line my-5" />

          <p style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#6B5048", fontSize: "1.15rem", fontWeight: 300, letterSpacing: "0.02em" }}>
            Цветы, которые говорят за вас
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/catalog" className="btn-primary">Смотреть каталог</Link>
            <Link href="#order" className="btn-outline">Оставить заявку</Link>
          </div>
        </div>

        {/* Wave transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{
          background: "#FDFAF6",
          clipPath: "ellipse(55% 100% at 50% 100%)",
        }} />
      </section>

      {/* ── ABOUT ── */}
      <section className="py-28 px-6" style={{ background: "#FDFAF6" }}>
        <div className="max-w-3xl mx-auto text-center reveal reveal-fallback">
          <p className="section-label mb-5">О нас</p>
          <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#2C2420", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 300, lineHeight: 1.15 }}>
            Маленький бутик<br/>с большой любовью к цветам
          </h2>
          <div className="gold-line my-7" />
          <p className="leading-relaxed text-sm" style={{ color: "#6B5048", lineHeight: 1.9 }}>
            Jolies Fleurs работает каждый день с 9:00 до 22:00 — создавая букеты,
            которые дарят радость. Два удобных адреса в Москве, доставка по всему МО
            и авторские композиции для любого повода.
          </p>
        </div>
      </section>

      {/* ── FEATURED — wave top ── */}
      <section className="pt-20 pb-28 overflow-hidden relative" style={{ background: "#FBF0F3" }}>
        {/* wave top */}
        <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none" style={{
          background: "#FDFAF6",
          clipPath: "ellipse(55% 100% at 50% 0%)",
        }} />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-14 reveal reveal-fallback">
            <p className="section-label mb-4">Популярное</p>
            <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#2C2420", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>
              Любимые букеты
            </h2>
            <div className="gold-line mt-6" />
          </div>

          <div className="flex gap-5 overflow-x-auto carousel-scroll pb-4">
            {featured.map((p) => (
              <Link key={p.id} href="/catalog"
                className="carousel-item flex-none w-60 rounded-[1.5rem] overflow-hidden product-card bg-white"
                style={{ boxShadow: "0 2px 20px rgba(44,36,32,0.07)" }}>
                <div className="overflow-hidden" style={{ height: "280px" }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                </div>
                <div className="px-4 py-3.5">
                  <p className="text-sm font-medium" style={{ color: "#C4956A", letterSpacing: "0.02em" }}>{p.price}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6B5048", opacity: 0.55, letterSpacing: "0.04em" }}>Авторский букет</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/catalog" className="btn-outline">Весь каталог</Link>
          </div>
        </div>

        {/* wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{
          background: "#1e1008",
          clipPath: "ellipse(60% 100% at 50% 100%)",
        }} />
      </section>

      {/* ── WHY US + REVIEWS — единый тёмный блок ── */}
      <div className="relative overflow-hidden" style={{ background: "#1e1008" }}>
        <div className="absolute inset-0">
          <img src="/flowers/7400%E2%82%BD.jpg" alt="" aria-hidden="true"
            className="w-full h-full object-cover" style={{ opacity: 0.18 }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(30,16,8,0.70) 0%, rgba(30,16,8,0.45) 50%, rgba(30,16,8,0.75) 100%)"
          }} />
        </div>

        {/* WHY US */}
        <section className="py-28 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 reveal reveal-fallback">
              <p className="section-label mb-4" style={{ color: "rgba(196,149,106,0.8)" }}>Почему мы</p>
              <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#FDFAF6", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>
                С любовью к каждому букету
              </h2>
              <div className="gold-line mt-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <div key={i} className="glass rounded-[1.5rem] p-7 reveal reveal-fallback"
                  style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="mb-5">{f.icon}</div>
                  <h3 className="text-sm font-medium mb-2" style={{ color: "#FDFAF6", letterSpacing: "0.06em" }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(253,250,246,0.55)", lineHeight: 1.75 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gold separator */}
        <div className="relative z-10 max-w-sm mx-auto">
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(196,149,106,0.25), transparent)" }} />
        </div>

        {/* REVIEWS */}
        <section className="py-28 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal reveal-fallback">
              <p className="section-label mb-4" style={{ color: "rgba(196,149,106,0.8)" }}>Отзывы</p>
              <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#FDFAF6", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>
                Что говорят клиенты
              </h2>
              <div className="gold-line mt-6" />
            </div>
            <div className="flex gap-5 overflow-x-auto carousel-scroll pb-4">
              {reviews.map((r, i) => (
                <div key={i} className="carousel-item flex-none w-72 glass rounded-[1.5rem] p-7">
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="10" height="10" viewBox="0 0 10 10" fill="#C4956A">
                        <path d="M5 1L6.2 3.8H9L6.8 5.6L7.6 8.5L5 6.9L2.4 8.5L3.2 5.6L1 3.8H3.8Z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(253,250,246,0.78)", lineHeight: 1.8 }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}>
                    <span className="text-sm font-medium" style={{ color: "#FDFAF6" }}>{r.name}</span>
                    <span style={{ color: "rgba(253,250,246,0.30)", fontSize: "0.6rem", letterSpacing: "0.06em" }}>{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave to form */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10" style={{
          background: "#FDFAF6",
          clipPath: "ellipse(60% 100% at 50% 100%)",
        }} />
      </div>

      {/* ── ORDER FORM ── */}
      <section id="order" className="pt-10 pb-28 px-6 relative overflow-hidden" style={{ background: "#FDFAF6" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(232,160,176,0.10) 0%, transparent 70%)"
        }} />
        <div className="relative max-w-lg mx-auto">
          <div className="text-center mb-10 reveal reveal-fallback">
            <p className="section-label mb-4">Связаться</p>
            <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#2C2420", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>
              Оставить заявку
            </h2>
            <div className="gold-line mt-5" />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
