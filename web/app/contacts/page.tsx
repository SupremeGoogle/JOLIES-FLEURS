import ContactForm from "./ContactForm";

export const metadata = {
  title: "Контакты — Jolies Fleurs",
  description: "Свяжитесь с нами. Два магазина в Москве, доставка по Москве и МО.",
};

export default function ContactsPage() {
  return (
    <div className="pt-20 min-h-screen" style={{ background: "#FDFAF6" }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "#C9A96E" }}>Контакты</p>
          <h1 className="font-heading text-5xl md:text-6xl font-light"
            style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)" }}>
            Свяжитесь с нами
          </h1>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-6 rounded-2xl text-center" style={{ background: "#FCE8ED" }}>
            <div className="w-8 h-px mb-4" style={{background:"#C9A96E"}}/>
            <h3 className="font-semibold mb-3" style={{ color: "#3D2B1F" }}>Адреса</h3>
            <p className="text-sm opacity-70 mb-1" style={{ color: "#3D2B1F" }}>Ленинградский пр-кт, 29к4</p>
            <p className="text-xs opacity-50 mb-3" style={{ color: "#3D2B1F" }}>вход совмещён с магазином табака</p>
            <p className="text-sm opacity-70 mb-1" style={{ color: "#3D2B1F" }}>Озерная, 1к2/4</p>
            <p className="text-xs opacity-50" style={{ color: "#3D2B1F" }}>вход совмещён с WB</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: "#E8F3E6" }}>
            <div className="w-8 h-px mb-4" style={{background:"#C9A96E"}}/>
            <h3 className="font-semibold mb-3" style={{ color: "#3D2B1F" }}>Телефоны</h3>
            <a href="tel:+79853898591" className="block text-sm mb-2 hover:underline" style={{ color: "#3D2B1F" }}>
              +7 (985) 389-85-91
            </a>
            <a href="tel:+79324925459" className="block text-sm hover:underline" style={{ color: "#3D2B1F" }}>
              +7 (932) 492-54-59
            </a>
            <a href="https://t.me/dddd_nik" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-sm hover:underline" style={{ color: "#7A5C4F" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.267l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.292z"/>
              </svg>
              @dddd_nik
            </a>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: "#F0E6D3" }}>
            <div className="w-8 h-px mb-4" style={{background:"#C9A96E"}}/>
            <h3 className="font-semibold mb-3" style={{ color: "#3D2B1F" }}>График работы</h3>
            <p className="text-sm opacity-70 mb-1" style={{ color: "#3D2B1F" }}>Ежедневно</p>
            <p className="text-xl font-semibold" style={{ color: "#C9A96E" }}>9:00 – 22:00</p>
            <p className="text-xs opacity-50 mt-2" style={{ color: "#3D2B1F" }}>Без выходных</p>
          </div>
        </div>

        {/* Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div>
            <h3 className="font-semibold mb-3 text-base" style={{ color: "#3D2B1F" }}>
              Ленинградский пр-кт, 29к4
            </h3>
            <div className="rounded-2xl overflow-hidden" style={{ height: "300px" }}>
              <iframe
                src="https://yandex.ru/maps/213/moscow/org/zholi_flyor/146598207932/?from=mapframe&ll=37.547090,55.804150&z=16"
                width="100%" height="300" frameBorder="0" allowFullScreen
                title="Jolies Fleurs Ленинградский"
                className="rounded-2xl"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-base" style={{ color: "#3D2B1F" }}>
              Озерная, 1к2/4
            </h3>
            <div className="rounded-2xl overflow-hidden" style={{ height: "300px" }}>
              <iframe
                src="https://yandex.ru/maps/213/moscow/org/zholi_fler/2514168104/?from=mapframe&ll=37.365360,55.660000&z=16"
                width="100%" height="300" frameBorder="0" allowFullScreen
                title="Jolies Fleurs Озерная"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
}
