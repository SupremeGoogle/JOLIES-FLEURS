"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product, Settings } from "@/lib/data";
import ImageUploader from "@/components/ImageUploader";

type Tab = "products" | "content" | "settings" | "submissions";

// Admin-specific button styles — not using site's .btn-primary
const ABtnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  background: "#F2A7B5", color: "#3D2B1F", border: "none", borderRadius: "10px",
  padding: "8px 18px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
  transition: "background 0.15s",
};
const ABtnOutline: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  background: "transparent", color: "#7A5C4F", border: "1px solid #e5e7eb",
  borderRadius: "10px", padding: "8px 18px", fontSize: "14px", fontWeight: 500, cursor: "pointer",
};
const ABtnDanger: React.CSSProperties = {
  background: "transparent", color: "#ef4444", border: "none",
  fontSize: "13px", cursor: "pointer", padding: "4px 8px", borderRadius: "6px",
};
const ABtnEdit: React.CSSProperties = {
  background: "transparent", color: "#6b7280", border: "none",
  fontSize: "13px", cursor: "pointer", padding: "4px 8px", borderRadius: "6px",
};

const FIELD = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-300 transition-colors";
const CAT_LABELS: Record<string, string> = {
  "under3k": "до 3 000",
  "3k-5k": "3–5 тыс",
  "5k-7k": "5–7 тыс",
  "over7k": "7 000+",
};

export default function AdminClient({
  products: initialProducts,
  settings: initialSettings,
}: {
  products: Product[];
  settings: Settings;
}) {
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState(initialProducts);
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [addMode, setAddMode] = useState(false);
  const router = useRouter();

  const showSaved = (msg: string) => {
    setSaved(msg);
    setTimeout(() => setSaved(""), 8000);
  };

  const saveProducts = async (updated: Product[]) => {
    setSaving(true);
    await fetch("/api/admin/products", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setSaving(false);
    showSaved("Сохранено! Сайт обновится через ~1 минуту.");
    setProducts(updated);
  };

  const saveSettings = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false);
    showSaved("Настройки сохранены! Сайт обновится через ~1 минуту.");
  };

  const deleteProduct = (id: number) => {
    if (!confirm("Удалить товар?")) return;
    saveProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (p: Product) => {
    saveProducts(products.map((x) => (x.id === p.id ? p : x)));
    setEditProduct(null);
  };

  const addProduct = () => {
    const id = Math.max(0, ...products.map((p) => p.id)) + 1;
    const image = newProduct.image || "";
    const priceNum = Number(String(newProduct.priceNum || "0").replace(/\D/g, ""));
    const price = `${priceNum.toLocaleString("ru-RU")} ₽`;
    let cat = newProduct.category || "";
    if (!cat) {
      if (priceNum < 3000) cat = "under3k";
      else if (priceNum < 5000) cat = "3k-5k";
      else if (priceNum >= 7000) cat = "over7k";
      else cat = "5k-7k";
    }
    const p: Product = { id, name: newProduct.name || `Букет ${id}`, price, priceNum, category: cat, image, slug: `bouquet-${id}` };
    saveProducts([...products, p]);
    setNewProduct({});
    setAddMode(false);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F7F8", fontFamily: "system-ui, sans-serif" }}>

      {/* ── Top bar ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image src="/logo.jpg" alt="logo" width={34} height={34} style={{ borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontWeight: 600, fontSize: "15px", color: "#1a1a1a" }}>Jolies Fleurs</span>
          <span style={{ fontSize: "13px", color: "#9ca3af", fontWeight: 400 }}>· Панель управления</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {saved && (
            <span style={{ fontSize: "13px", color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "4px 12px" }}>
              {saved}
            </span>
          )}
          {saving && <span style={{ fontSize: "13px", color: "#9ca3af" }}>Сохранение…</span>}
          <a href="/" target="_blank" style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>↗ Сайт</a>
          <button onClick={logout}
            style={{ fontSize: "13px", color: "#6b7280", background: "#f3f4f6", border: "none", borderRadius: "8px", padding: "6px 14px", cursor: "pointer" }}>
            Выйти
          </button>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>

        {/* ── Sidebar ── */}
        <div style={{ width: "200px", background: "#fff", borderRight: "1px solid #f0f0f0", padding: "16px 0", flexShrink: 0 }}>
          {(["products", "content", "settings", "submissions"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "10px 20px", fontSize: "14px", border: "none", cursor: "pointer",
                color: tab === t ? "#1a1a1a" : "#6b7280",
                background: tab === t ? "#FFF0F3" : "transparent",
                fontWeight: tab === t ? 600 : 400,
                borderLeft: tab === t ? "3px solid #F2A7B5" : "3px solid transparent",
                transition: "all 0.15s",
              }}>
              {t === "products" ? "Товары" : t === "content" ? "Контент" : t === "settings" ? "Настройки" : "Заявки"}
            </button>
          ))}
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, padding: "32px", overflowAuto: "scroll" } as React.CSSProperties}>

          {/* PRODUCTS */}
          {tab === "products" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a" }}>
                  Товары <span style={{ color: "#9ca3af", fontWeight: 400 }}>({products.length})</span>
                </h2>
                <button onClick={() => setAddMode(true)} style={ABtnPrimary}>+ Добавить товар</button>
              </div>

              {/* Add form */}
              {addMode && (
                <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "24px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "20px" }}>Новый товар</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Фото товара</label>
                      <ImageUploader value={newProduct.image || ""} onChange={(url) => setNewProduct({ ...newProduct, image: url })} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Название</label>
                      <input className={FIELD} value={newProduct.name || ""} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Букет из роз" />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Цена, ₽</label>
                      <input className={FIELD} type="number" value={newProduct.priceNum || ""} onChange={(e) => setNewProduct({ ...newProduct, priceNum: Number(e.target.value) })} placeholder="3500" />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Категория</label>
                      <select className={FIELD} value={newProduct.category || ""} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                        <option value="">— авто по цене —</option>
                        <option value="under3k">До 3 000 ₽</option>
                        <option value="3k-5k">3 000 – 5 000 ₽</option>
                        <option value="5k-7k">5 000 – 7 000 ₽</option>
                        <option value="over7k">От 7 000 ₽</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button onClick={addProduct} style={ABtnPrimary}>Добавить</button>
                    <button onClick={() => { setAddMode(false); setNewProduct({}); }} style={ABtnOutline}>Отмена</button>
                  </div>
                </div>
              )}

              {/* Table */}
              <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                {/* Header */}
                <div style={{ display: "grid", gridTemplateColumns: "68px 1fr 110px 120px 44px 130px", padding: "12px 16px", background: "#fafafa", borderBottom: "1px solid #f0f0f0", fontSize: "12px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <span>Фото</span><span>Название</span><span>Цена</span><span>Категория</span><span title="Любимые букеты">★</span><span>Действия</span>
                </div>

                {products.map((p) => (
                  <div key={p.id}>
                    {editProduct?.id === p.id ? (
                      /* Edit row */
                      <div style={{ padding: "20px", background: "#fffbff", borderBottom: "1px solid #f0f0f0" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                          <div style={{ gridColumn: "1 / -1" }}>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "8px" }}>Фото</label>
                            <ImageUploader value={editProduct.image} onChange={(url) => setEditProduct({ ...editProduct, image: url })} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "5px" }}>Название</label>
                            <input className={FIELD} value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "5px" }}>Цена, ₽</label>
                            <input className={FIELD} type="number" value={editProduct.priceNum}
                              onChange={(e) => {
                                const n = Number(e.target.value);
                                setEditProduct({ ...editProduct, priceNum: n, price: `${n.toLocaleString("ru-RU")} ₽` });
                              }} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "5px" }}>Категория</label>
                            <select className={FIELD} value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}>
                              <option value="under3k">До 3 000 ₽</option>
                              <option value="3k-5k">3 000 – 5 000 ₽</option>
                              <option value="5k-7k">5 000 – 7 000 ₽</option>
                              <option value="over7k">От 7 000 ₽</option>
                              <option value="custom">Своя…</option>
                            </select>
                            {editProduct.category === "custom" && (
                              <input className={FIELD} style={{ marginTop: "6px" }} placeholder="Название категории"
                                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} />
                            )}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => updateProduct(editProduct)} style={ABtnPrimary}>Сохранить</button>
                          <button onClick={() => setEditProduct(null)} style={ABtnOutline}>Отмена</button>
                        </div>
                      </div>
                    ) : (
                      /* Normal row */
                      <div style={{ display: "grid", gridTemplateColumns: "68px 1fr 110px 120px 44px 130px", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #f9f9f9" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                        <div style={{ width: "48px", height: "48px", borderRadius: "10px", overflow: "hidden", background: "#f3f4f6" }}>
                          {p.image && <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                        </div>
                        <span style={{ fontSize: "14px", color: "#1a1a1a", paddingLeft: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#C9A96E" }}>{p.price}</span>
                        <span style={{ display: "inline-block", fontSize: "12px", padding: "3px 10px", borderRadius: "20px", background: "#FFF0F3", color: "#c97889" }}>
                          {CAT_LABELS[p.category] || p.category}
                        </span>
                        <button
                          title="Показывать в «Любимые букеты»"
                          onClick={() => saveProducts(products.map((x) => x.id === p.id ? { ...x, featured: !x.featured } : x))}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", padding: "2px", lineHeight: 1, color: p.featured ? "#F2A7B5" : "#d1d5db" }}
                        >
                          {p.featured ? "★" : "☆"}
                        </button>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-start" }}>
                          <button onClick={() => setEditProduct(p)} style={ABtnEdit}>Изменить</button>
                          <button onClick={() => deleteProduct(p.id)} style={ABtnDanger}>Удалить</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTENT */}
          {tab === "content" && (
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", marginBottom: "8px" }}>Контент сайта</h2>
              <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "28px" }}>Все изменения появятся на сайте через ~1 минуту после сохранения</p>

              {/* Hero */}
              <Section title="Главный экран">
                {([
                  ["tagline", "Слоган (крупный текст)", false],
                  ["heroSubtitle", "Подзаголовок (мелкий текст)", false],
                ] as [keyof Settings, string, boolean][]).map(([k, l]) => (
                  <Field key={k} label={l} value={settings[k]} onChange={(v) => setSettings({ ...settings, [k]: v })} />
                ))}
              </Section>

              {/* About */}
              <Section title="Блок «О нас»">
                {([
                  ["aboutTitle", "Заголовок", false],
                  ["aboutText", "Текст", true],
                ] as [keyof Settings, string, boolean][]).map(([k, l, multi]) => (
                  <Field key={k} label={l} value={settings[k]} onChange={(v) => setSettings({ ...settings, [k]: v })} multiline={multi} />
                ))}
              </Section>

              {/* Why Us */}
              <Section title="Блок «Почему мы»">
                <Field label="Заголовок блока" value={settings.whyTitle} onChange={(v) => setSettings({ ...settings, whyTitle: v })} />
                {[1,2,3,4].map((n) => (
                  <div key={n} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", marginBottom: "10px" }}>
                    <Field label={`Пункт ${n} — название`} value={settings[`whyItem${n}Title` as keyof Settings]} onChange={(v) => setSettings({ ...settings, [`whyItem${n}Title`]: v })} />
                    <Field label={`Пункт ${n} — описание`} value={settings[`whyItem${n}Desc` as keyof Settings]} onChange={(v) => setSettings({ ...settings, [`whyItem${n}Desc`]: v })} />
                  </div>
                ))}
              </Section>

              {/* Reviews */}
              <Section title="Блок «Отзывы»">
                <Field label="Заголовок" value={settings.reviewsTitle} onChange={(v) => setSettings({ ...settings, reviewsTitle: v })} />
              </Section>

              <button onClick={saveSettings} style={{ ...ABtnPrimary, padding: "12px 28px", fontSize: "15px", marginTop: "8px" }}>
                Сохранить контент
              </button>
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", marginBottom: "24px" }}>Контакты и реквизиты</h2>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", maxWidth: "600px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                {([
                  ["shopName", "Название магазина"],
                  ["address1", "Адрес 1"],
                  ["address2", "Адрес 2"],
                  ["phone1", "Телефон 1"],
                  ["phone2", "Телефон 2"],
                  ["hours", "Часы работы"],
                  ["telegram", "Telegram"],
                  ["delivery", "Доставка"],
                  ["submissionsSheetUrl", "Google Таблица заявок"],
                ] as [keyof Settings, string][]).map(([key, label]) => (
                  <div key={key} style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
                    <input className={FIELD}
                      value={settings[key]}
                      onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                      style={{ color: "#1a1a1a" }} />
                  </div>
                ))}
                <button onClick={saveSettings} style={{ ...ABtnPrimary, marginTop: "8px", padding: "10px 24px", fontSize: "15px" }}>
                  Сохранить
                </button>
              </div>
            </div>
          )}

          {/* SUBMISSIONS */}
          {tab === "submissions" && (
            <div style={{ maxWidth: "560px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", marginBottom: "24px" }}>Заявки</h2>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, marginBottom: "18px" }}>
                  Заявки с формы ведутся в Google Таблице. В админке они не отображаются, чтобы не хранить и не дублировать клиентские данные на сайте.
                </p>
                {settings.submissionsSheetUrl ? (
                  <a href={settings.submissionsSheetUrl} target="_blank" rel="noreferrer" style={{ ...ABtnPrimary, textDecoration: "none", padding: "12px 22px" }}>
                    Открыть Google Таблицу
                  </a>
                ) : (
                  <div style={{ border: "1px solid #fee2e2", background: "#fff7f7", borderRadius: "12px", padding: "14px", color: "#991b1b", fontSize: "13px", lineHeight: 1.5 }}>
                    Ссылка на таблицу не указана. Добавьте ее во вкладке «Настройки» в поле «Google Таблица заявок».
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ── Helper components ────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", marginBottom: "18px", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  const style: React.CSSProperties = {
    width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px",
    padding: "8px 12px", fontSize: "14px", color: "#1a1a1a",
    outline: "none", resize: multiline ? "vertical" : undefined,
    fontFamily: "system-ui, sans-serif", marginBottom: "4px",
  };
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </label>
      {multiline
        ? <textarea rows={3} style={style} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input style={style} value={value} onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  );
}
