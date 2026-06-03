export const metadata = {
  title: "Политика конфиденциальности — Jolies Fleurs",
};

export default function PrivacyPage() {
  return (
    <div className="pt-20 min-h-screen" style={{ background: "#FDFAF6" }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-light"
            style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)" }}>
            Политика конфиденциальности
          </h1>
          <p className="mt-3 text-sm opacity-50" style={{ color: "#7A5C4F" }}>
            Последнее обновление: январь 2025
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-6" style={{ color: "#3D2B1F" }}>
          <section>
            <h2 className="font-semibold text-lg mb-2">1. Общие положения</h2>
            <p className="opacity-70 leading-relaxed text-sm">
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты
              персональных данных пользователей, действующего на основании
              Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
            <p className="opacity-70 leading-relaxed text-sm mt-2">
              Оператором персональных данных является цветочный магазин Jolies Fleurs, г. Москва (далее — «Оператор»).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">2. Какие данные мы собираем</h2>
            <p className="opacity-70 leading-relaxed text-sm">При использовании формы обратной связи мы собираем:</p>
            <ul className="list-disc list-inside opacity-70 text-sm space-y-1 mt-2">
              <li>Имя и фамилию</li>
              <li>Номер телефона</li>
              <li>Текст обращения (комментарий)</li>
              <li>Дату и время обращения</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. Цели обработки данных</h2>
            <p className="opacity-70 leading-relaxed text-sm">Персональные данные обрабатываются исключительно в целях:</p>
            <ul className="list-disc list-inside opacity-70 text-sm space-y-1 mt-2">
              <li>Обработки заявок и обращений пользователей</li>
              <li>Связи с пользователем для уточнения деталей заказа</li>
              <li>Улучшения качества обслуживания</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">4. Правовое основание обработки</h2>
            <p className="opacity-70 leading-relaxed text-sm">
              Обработка персональных данных осуществляется на основании добровольного согласия субъекта
              персональных данных (ст. 6, ч. 1, п. 1 Федерального закона № 152-ФЗ).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">5. Передача данных третьим лицам</h2>
            <p className="opacity-70 leading-relaxed text-sm">
              Оператор не передаёт персональные данные третьим лицам без согласия пользователя,
              за исключением случаев, предусмотренных действующим законодательством Российской Федерации.
              Данные могут передаваться сервисам Google LLC (Google Sheets) для хранения заявок,
              соответствующих Политике конфиденциальности Google.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">6. Сроки хранения данных</h2>
            <p className="opacity-70 leading-relaxed text-sm">
              Персональные данные хранятся в течение 3 (трёх) лет с момента последнего взаимодействия
              пользователя с Оператором, после чего подлежат уничтожению, если иной срок не установлен законодательством.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">7. Права пользователя</h2>
            <p className="opacity-70 leading-relaxed text-sm">В соответствии со ст. 14–17 Федерального закона № 152-ФЗ пользователь вправе:</p>
            <ul className="list-disc list-inside opacity-70 text-sm space-y-1 mt-2">
              <li>Получить информацию об обработке своих персональных данных</li>
              <li>Потребовать уточнения, блокирования или уничтожения своих данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия Оператора в Роскомнадзоре или суде</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">8. Меры защиты данных</h2>
            <p className="opacity-70 leading-relaxed text-sm">
              Оператор принимает необходимые организационные и технические меры для защиты персональных
              данных от несанкционированного доступа, изменения, раскрытия или уничтожения, включая
              использование защищённого соединения (HTTPS) и ограниченный доступ к данным.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">9. Cookies</h2>
            <p className="opacity-70 leading-relaxed text-sm">
              Сайт может использовать технологию Cookies для обеспечения корректной работы. Cookies
              не содержат персональных данных и не передаются третьим лицам. Вы можете отключить Cookies
              в настройках браузера.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">10. Контактная информация</h2>
            <p className="opacity-70 leading-relaxed text-sm">
              По вопросам обработки персональных данных обращайтесь:<br />
              Телефон: +7 (985) 389-85-91<br />
              Telegram: <a href="https://t.me/dddd_nik" className="underline" style={{ color: "#C9A96E" }}>@dddd_nik</a><br />
              Адрес: г. Москва
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">11. Изменения в Политике</h2>
            <p className="opacity-70 leading-relaxed text-sm">
              Оператор вправе вносить изменения в настоящую Политику. Новая версия Политики вступает
              в силу с момента её публикации. Продолжая пользоваться нашими услугами после изменений,
              вы соглашаетесь с новой редакцией Политики.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
