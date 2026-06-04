import Image from "next/image";
import Link from "next/link";
import { getProducts, getSettings } from "@/lib/data";
import ContactForm from "@/app/(site)/contacts/ContactForm";

const reviewsList = [
  { name: "Мария К.", text: "Великолепный магазин. Заказывала букет на день рождения подруги — всё свежее, красиво упаковано. Доставили вовремя.", date: "2 мес. назад" },
  { name: "Анна Л.", text: "Уже второй раз беру букеты здесь. Очень нравится сочетание цветов, стоят долго. Приятные цены за такой уровень.", date: "3 мес. назад" },
  { name: "Дмитрий В.", text: "Покупал жене на годовщину. Флористы помогли подобрать идеальный вариант. Жена была в восторге.", date: "1 мес. назад" },
  { name: "Елена С.", text: "Всегда свежие цветы, приятная атмосфера, внимательные сотрудники. Букеты держатся больше недели.", date: "2 нед. назад" },
  { name: "Оксана Р.", text: "Заказала доставку — всё пришло в идеальном состоянии, упаковано с любовью. Подруга была тронута.", date: "5 дн. назад" },
];

export default function HomePage() {
  const products = getProducts();
  const s = getSettings();
  const featuredRaw = products.filter((p) => p.featured);
  const featured = (featuredRaw.length > 0 ? featuredRaw : products.slice(0, 6)).slice(0, 6);

  const features = [
    { title: s.whyItem1Title, desc: s.whyItem1Desc },
    { title: s.whyItem2Title, desc: s.whyItem2Desc },
    { title: s.whyItem3Title, desc: s.whyItem3Desc },
    { title: s.whyItem4Title, desc: s.whyItem4Desc },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section">
        {/* Фоновая картинка — на весь экран, медленный zoom */}
        <img
          src="/bg.png"
          alt=""
          aria-hidden="true"
          className="hero-bg-zoom hero-img"
          fetchPriority="high"
        />

        {/* Тёмный слой СВЕРХУ — специально для навбара */}
        <div className="hero-nav-overlay" />

        {/* Центральный свет — текст читается */}
        <div className="hero-center-glow" />

        {/* Контент */}
        <div className="hero-content">
          <div className="float-anim hero-logo-wrap">
            <Image src="/logo.jpg" alt="Jolies Fleurs" width={84} height={84} priority
              style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(232,160,176,0.7)", boxShadow: "0 4px 32px rgba(242,167,181,0.35), 0 0 0 6px rgba(255,255,255,0.60)" }} />
          </div>

          <p className="hero-label">Цветочный бутик · Москва</p>

          <h1 className="hero-title">{s.shopName}</h1>

          <div className="hero-divider" />

          <p className="hero-tagline">{s.tagline}</p>
          <p className="hero-sub">{s.heroSubtitle}</p>

          <div className="hero-btns">
            <Link href="/catalog" className="btn-primary">Смотреть каталог</Link>
            <Link href="#order" className="btn-outline">Оставить заявку</Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: "#FDFAF6", padding: "100px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }} className="reveal reveal-fallback">
          <p className="section-label" style={{ marginBottom: "20px" }}>О нас</p>
          <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, color: "#2C2420", lineHeight: 1.2, marginBottom: "28px" }}>
            {s.aboutTitle}
          </h2>
          <div className="gold-line" style={{ marginBottom: "28px" }} />
          <p style={{ color: "#6B5048", lineHeight: 1.9, fontSize: "0.95rem" }}>
            {s.aboutText}
          </p>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section style={{ background: "#FBF0F3", padding: "80px 0 100px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div className="reveal reveal-fallback" style={{ textAlign: "center", marginBottom: "56px" }}>
            <p className="section-label" style={{ marginBottom: "16px" }}>Популярное</p>
            <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, color: "#2C2420" }}>
              Любимые букеты
            </h2>
            <div className="gold-line" style={{ marginTop: "20px" }} />
          </div>

          <div className="carousel-scroll" style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "16px" }}>
            {featured.map((p) => (
              <Link key={p.id} href="/catalog"
                className="carousel-item product-card"
                style={{ flexShrink: 0, width: "240px", borderRadius: "20px", overflow: "hidden", background: "#fff", display: "block", textDecoration: "none", boxShadow: "0 2px 20px rgba(44,36,32,0.07)" }}>
                <div style={{ height: "280px", overflow: "hidden" }}>
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} loading="lazy" />
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#C4956A" }}>{p.price}</p>
                  <p style={{ fontSize: "11px", color: "#6B5048", opacity: 0.55, marginTop: "2px", letterSpacing: "0.04em" }}>Авторский букет</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/catalog" className="btn-outline">Весь каталог</Link>
          </div>
        </div>
      </section>

      {/* ── WHY US + REVIEWS — единый тёмный блок, ОДНА фоновая картинка ── */}
      <div style={{ position: "relative", overflow: "hidden", background: "#1e1008" }}>
        {/* Фоновое фото — без блюра, нормальная яркость */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="/flowers/7.400%E2%82%BD.jpg" alt="" aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.20 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(30,16,8,0.72) 0%, rgba(30,16,8,0.50) 50%, rgba(30,16,8,0.78) 100%)" }} />
        </div>

        {/* WHY US */}
        <section style={{ position: "relative", zIndex: 1, padding: "100px 24px 80px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="reveal reveal-fallback" style={{ textAlign: "center", marginBottom: "60px" }}>
              <p className="section-label" style={{ color: "rgba(196,149,106,0.8)", marginBottom: "16px" }}>Почему мы</p>
              <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, color: "#FDFAF6" }}>
                {s.whyTitle}
              </h2>
              <div className="gold-line" style={{ marginTop: "20px" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {features.map((f, i) => (
                <div key={i} className="glass reveal reveal-fallback" style={{ borderRadius: "20px", padding: "28px", transitionDelay: `${i * 80}ms` }}>
                  <div style={{ width: "32px", height: "1px", background: "#C4956A", marginBottom: "20px" }} />
                  <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#FDFAF6", letterSpacing: "0.06em", marginBottom: "10px", textTransform: "uppercase" }}>{f.title}</h3>
                  <p style={{ fontSize: "13px", color: "rgba(253,250,246,0.58)", lineHeight: 1.75 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "320px", margin: "0 auto" }}>
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(196,149,106,0.25), transparent)" }} />
        </div>

        {/* REVIEWS */}
        <section style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="reveal reveal-fallback" style={{ textAlign: "center", marginBottom: "60px" }}>
              <p className="section-label" style={{ color: "rgba(196,149,106,0.8)", marginBottom: "16px" }}>Отзывы</p>
              <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, color: "#FDFAF6" }}>
                {s.reviewsTitle}
              </h2>
              <div className="gold-line" style={{ marginTop: "20px" }} />
            </div>
            <div className="carousel-scroll" style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "16px" }}>
              {reviewsList.map((r, i) => (
                <div key={i} className="carousel-item glass" style={{ flexShrink: 0, width: "300px", borderRadius: "20px", padding: "28px" }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="10" height="10" viewBox="0 0 10 10" fill="#C4956A">
                        <path d="M5 1L6.2 3.8H9L6.8 5.6L7.6 8.5L5 6.9L2.4 8.5L3.2 5.6L1 3.8H3.8Z"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(253,250,246,0.78)", marginBottom: "20px" }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#FDFAF6" }}>{r.name}</span>
                    <span style={{ fontSize: "10px", color: "rgba(253,250,246,0.30)", letterSpacing: "0.05em" }}>{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── ORDER FORM ── */}
      <section id="order" style={{ background: "#FDFAF6", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(232,160,176,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "520px", margin: "0 auto", position: "relative" }}>
          <div className="reveal reveal-fallback" style={{ textAlign: "center", marginBottom: "40px" }}>
            <p className="section-label" style={{ marginBottom: "16px" }}>Связаться</p>
            <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, color: "#2C2420" }}>
              Оставить заявку
            </h2>
            <div className="gold-line" style={{ marginTop: "20px" }} />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
