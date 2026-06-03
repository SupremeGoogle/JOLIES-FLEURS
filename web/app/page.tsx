import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/data";

const reviews = [
  { name: "Мария К.", stars: 5, text: "Великолепный магазин! Заказывала букет на день рождения подруги — всё свежее, красиво упаковано. Доставили вовремя, курьер был вежлив. Однозначно рекомендую!", date: "2 месяца назад" },
  { name: "Анна Л.", stars: 5, text: "Уже второй раз беру букеты здесь. Очень нравится сочетание цветов и качество — стоят долго. Приятные цены за такой уровень.", date: "3 месяца назад" },
  { name: "Дмитрий В.", stars: 5, text: "Покупал жене на годовщину. Флористы помогли подобрать идеальный вариант. Жена была в восторге! Теперь это наш постоянный магазин.", date: "1 месяц назад" },
  { name: "Елена С.", stars: 5, text: "Всегда свежие цветы, приятная атмосфера, милые сотрудники. Букеты держатся больше недели!", date: "2 недели назад" },
  { name: "Оксана Р.", stars: 5, text: "Заказала доставку — всё пришло в идеальном состоянии, упаковано с любовью. Подруга была тронута. Спасибо Jolies Fleurs!", date: "5 дней назад" },
];

const features = [
  { icon: "🌸", title: "Свежие цветы", desc: "Поставки несколько раз в неделю — только свежие цветы", bg: "#FCE8ED" },
  { icon: "🚚", title: "Доставка", desc: "По Москве и Московской области в удобное время", bg: "#E8F3E6" },
  { icon: "💐", title: "Авторские букеты", desc: "Флористы создают неповторимые авторские композиции", bg: "#FCE8ED" },
  { icon: "📍", title: "Два магазина", desc: "Ленинградский пр-кт и Озерная — удобно для вас", bg: "#E8F3E6" },
];

export default async function HomePage() {
  const products = getProducts();
  const featured = products.slice(16, 22);

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FCE8ED 0%, #FDFAF6 50%, #E8F3E6 100%)" }}
      >
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F2A7B5, transparent)" }} />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #A8C5A0, transparent)" }} />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
          <div className="float-anim inline-block mb-8">
            <Image src="/logo.jpg" alt="Jolies Fleurs" width={120} height={120} priority fetchPriority="high"
              className="rounded-full object-cover mx-auto"
              style={{ border: "4px solid #F2A7B5", boxShadow: "0 8px 32px rgba(242,167,181,0.4)" }} />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-light mb-4"
            style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)", lineHeight: 1.1 }}>
            Jolies Fleurs
          </h1>
          <p className="text-xl md:text-2xl font-light mb-2 opacity-80"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", color: "#7A5C4F" }}>
            Цветы, которые говорят за вас
          </p>
          <p className="text-base opacity-60 mb-10" style={{ color: "#7A5C4F" }}>
            Свежие букеты и авторские композиции · Москва
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalog" className="btn-primary text-center text-base">Смотреть каталог</Link>
            <Link href="/contacts" className="btn-outline text-center text-base">Связаться с нами</Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs" style={{ color: "#7A5C4F" }}>прокрутите вниз</span>
          <div className="w-0.5 h-8" style={{ background: "linear-gradient(to bottom, #C9A96E, transparent)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6" style={{ background: "#FDFAF6" }}>
        <div className="max-w-4xl mx-auto text-center reveal reveal-fallback">
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: "#C9A96E" }}>О нас</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-8"
            style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)" }}>
            Цветочный бутик в Москве
          </h2>
          <p className="text-base leading-relaxed opacity-70 mb-4" style={{ color: "#3D2B1F" }}>
            Jolies Fleurs — это маленький уютный магазин с большой любовью к цветам. Мы работаем каждый день с 9:00 до 22:00,
            создавая букеты, которые дарят радость. У нас два удобных адреса в Москве.
          </p>
          <p className="text-base leading-relaxed opacity-70" style={{ color: "#3D2B1F" }}>
            Наши флористы подбирают только свежие цветы и создают уникальные авторские композиции для любого повода.
            Работаем с доставкой по Москве и Подмосковью.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20" style={{ background: "#FCE8ED" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 reveal reveal-fallback">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "#C9A96E" }}>Популярное</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light"
              style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)" }}>
              Любимые букеты
            </h2>
          </div>
          <div className="flex gap-5 overflow-x-auto carousel-scroll pb-4">
            {featured.map((p) => (
              <Link key={p.id} href="/catalog" className="carousel-item flex-none w-64 rounded-2xl overflow-hidden product-card"
                style={{ background: "#FDFAF6" }}>
                <div className="relative h-72 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm" style={{ color: "#C9A96E" }}>{p.price}</p>
                  <p className="text-sm opacity-60 mt-1" style={{ color: "#3D2B1F" }}>Авторский букет</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/catalog" className="btn-outline">Все букеты</Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-6" style={{ background: "#FDFAF6" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal reveal-fallback">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "#C9A96E" }}>Почему мы</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light"
              style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)" }}>
              С любовью к каждому букету
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 rounded-2xl reveal reveal-fallback" style={{ background: f.bg }}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "#3D2B1F" }}>{f.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed" style={{ color: "#3D2B1F" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20" style={{ background: "#F0E6D3" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 reveal reveal-fallback">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "#C9A96E" }}>Отзывы</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light"
              style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)" }}>
              Что говорят клиенты
            </h2>
            <p className="mt-3 text-sm opacity-60" style={{ color: "#7A5C4F" }}>Отзывы на Яндекс Картах</p>
          </div>
          <div className="flex gap-6 overflow-x-auto carousel-scroll pb-4">
            {reviews.map((r, i) => (
              <div key={i} className="carousel-item flex-none w-72 p-6 rounded-2xl" style={{ background: "#FDFAF6" }}>
                <div className="flex mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed opacity-80 mb-4" style={{ color: "#3D2B1F" }}>
                  &quot;{r.text}&quot;
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm" style={{ color: "#3D2B1F" }}>{r.name}</span>
                  <span className="text-xs opacity-40" style={{ color: "#3D2B1F" }}>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #3D2B1F 0%, #7A5C4F 100%)" }}>
        <div className="max-w-2xl mx-auto reveal reveal-fallback">
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-4 text-white"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}>
            Закажите букет сегодня
          </h2>
          <p className="text-white opacity-70 mb-8 text-base">
            Создадим идеальный букет для любого повода.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/dddd_nik" target="_blank" rel="noopener noreferrer" className="btn-primary text-center">
              Написать в Telegram
            </a>
            <Link href="/contacts" className="btn-outline text-center"
              style={{ borderColor: "rgba(253,250,246,0.5)", color: "#FDFAF6" }}>
              Форма заказа
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
