"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product, Settings, Submission } from "@/lib/data";

type Tab = "products" | "settings" | "submissions";

export default function AdminClient({
  products: initialProducts,
  settings: initialSettings,
  submissions,
}: {
  products: Product[];
  settings: Settings;
  submissions: Submission[];
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
    showSaved("✅ Сохранено! Сайт обновится через ~1 минуту.");
    setProducts(updated);
  };

  const saveSettings = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false);
    showSaved("✅ Сохранено! Сайт обновится через ~1 минуту.");
  };

  const deleteProduct = (id: number) => {
    if (!confirm("Удалить товар?")) return;
    saveProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (p: Product) => {
    const updated = products.map((x) => (x.id === p.id ? p : x));
    saveProducts(updated);
    setEditProduct(null);
  };

  const addProduct = async () => {
    const id = Math.max(0, ...products.map((p) => p.id)) + 1;
    let image = newProduct.image || "";
    const fileInput = document.getElementById("new-file") as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const fd = new FormData();
      fd.append("file", fileInput.files[0]);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      image = data.url || image;
    }
    const priceNum = Number(String(newProduct.priceNum || "0").replace(/\D/g, ""));
    const price = `${priceNum.toLocaleString("ru-RU")} ₽`;
    let cat = "5k-7k";
    if (priceNum < 3000) cat = "under3k";
    else if (priceNum < 5000) cat = "3k-5k";
    else if (priceNum >= 7000) cat = "over7k";
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
    <div className="min-h-screen" style={{ background: "#F5F5F5" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="logo" width={36} height={36} className="rounded-full object-cover" />
          <span className="font-semibold text-sm" style={{ color: "#3D2B1F" }}>Jolies Fleurs Admin</span>
        </div>
        <div className="flex items-center gap-4">
          {saved && <span className="text-xs text-green-600">{saved}</span>}
          {saving && <span className="text-xs opacity-50">Сохранение...</span>}
          <a href="/" target="_blank" className="text-xs opacity-50 hover:opacity-80 transition-opacity">Открыть сайт</a>
          <button onClick={logout} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" style={{ color: "#3D2B1F" }}>
            Выйти
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 min-h-screen bg-white border-r border-gray-100 pt-6">
          {(["products", "settings", "submissions"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="w-full text-left px-5 py-3 text-sm transition-colors"
              style={{
                color: tab === t ? "#3D2B1F" : "#7A5C4F",
                background: tab === t ? "#FCE8ED" : "transparent",
                fontWeight: tab === t ? 600 : 400,
                borderLeft: tab === t ? "3px solid #F2A7B5" : "3px solid transparent",
              }}
            >
              {t === "products" ? "Товары" : t === "settings" ? "Настройки" : "Заявки"}
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-8 overflow-auto">
          {/* PRODUCTS TAB */}
          {tab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold" style={{ color: "#3D2B1F" }}>
                  Товары ({products.length})
                </h2>
                <button onClick={() => setAddMode(true)} className="btn-primary text-sm py-2 px-4">
                  + Добавить
                </button>
              </div>

              {/* Add form */}
              {addMode && (
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                  <h3 className="font-semibold mb-4" style={{ color: "#3D2B1F" }}>Новый товар</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1 opacity-60">Название</label>
                      <input className="w-full border rounded-lg px-3 py-2 text-sm" value={newProduct.name || ""} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Букет из роз" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 opacity-60">Цена (число)</label>
                      <input className="w-full border rounded-lg px-3 py-2 text-sm" type="number" value={newProduct.priceNum || ""} onChange={(e) => setNewProduct({ ...newProduct, priceNum: Number(e.target.value) })} placeholder="3500" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 opacity-60">Фото из файла</label>
                      <input id="new-file" type="file" accept="image/*" className="w-full text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 opacity-60">Или URL фото</label>
                      <input className="w-full border rounded-lg px-3 py-2 text-sm" value={newProduct.image || ""} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} placeholder="https://..." />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={addProduct} className="btn-primary text-sm py-2 px-4">Добавить</button>
                    <button onClick={() => { setAddMode(false); setNewProduct({}); }} className="btn-outline text-sm py-2 px-4">Отмена</button>
                  </div>
                </div>
              )}

              {/* Products table */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-[60px_1fr_100px_120px_80px] gap-0 text-xs font-semibold py-3 px-4 border-b bg-gray-50" style={{ color: "#7A5C4F" }}>
                  <span>Фото</span><span>Название</span><span>Цена</span><span>Категория</span><span>Действия</span>
                </div>
                <div className="divide-y">
                  {products.map((p) => (
                    <div key={p.id}>
                      {editProduct?.id === p.id ? (
                        <div className="p-4 bg-rose-50">
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                              <label className="text-xs opacity-60 block mb-1">Название</label>
                              <input className="w-full border rounded px-2 py-1.5 text-sm" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
                            </div>
                            <div>
                              <label className="text-xs opacity-60 block mb-1">Цена числом</label>
                              <input type="number" className="w-full border rounded px-2 py-1.5 text-sm" value={editProduct.priceNum} onChange={(e) => {
                                const n = Number(e.target.value);
                                let cat = "5k-7k";
                                if (n < 3000) cat = "under3k";
                                else if (n < 5000) cat = "3k-5k";
                                else if (n >= 7000) cat = "over7k";
                                setEditProduct({ ...editProduct, priceNum: n, price: `${n.toLocaleString("ru-RU")} ₽`, category: cat });
                              }} />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs opacity-60 block mb-1">URL изображения</label>
                              <input className="w-full border rounded px-2 py-1.5 text-sm" value={editProduct.image} onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })} />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => updateProduct(editProduct)} className="btn-primary text-xs py-1.5 px-3">Сохранить</button>
                            <button onClick={() => setEditProduct(null)} className="btn-outline text-xs py-1.5 px-3">Отмена</button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-[60px_1fr_100px_120px_80px] gap-0 items-center py-3 px-4 hover:bg-gray-50 transition-colors">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm px-2 truncate" style={{ color: "#3D2B1F" }}>{p.name}</span>
                          <span className="text-sm font-semibold" style={{ color: "#C9A96E" }}>{p.price}</span>
                          <span className="text-xs px-2 py-1 rounded-full inline-block" style={{ background: "#FCE8ED", color: "#7A5C4F" }}>
                            {p.category === "under3k" ? "до 3000" : p.category === "3k-5k" ? "3-5 тыс" : p.category === "5k-7k" ? "5-7 тыс" : "7000+"}
                          </span>
                          <div className="flex gap-2">
                            <button onClick={() => setEditProduct(p)} className="text-xs opacity-50 hover:opacity-100 transition-opacity">редакт.</button>
                            <button onClick={() => deleteProduct(p.id)} className="text-xs opacity-50 hover:opacity-100 transition-opacity">удалить</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {tab === "settings" && (
            <div>
              <h2 className="text-xl font-semibold mb-6" style={{ color: "#3D2B1F" }}>Настройки сайта</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
                {([
                  ["shopName", "Название магазина"],
                  ["tagline", "Слоган"],
                  ["address1", "Адрес 1"],
                  ["address2", "Адрес 2"],
                  ["phone1", "Телефон 1"],
                  ["phone2", "Телефон 2"],
                  ["hours", "Часы работы"],
                  ["telegram", "Telegram"],
                  ["delivery", "Доставка"],
                ] as [keyof Settings, string][]).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium mb-1.5 opacity-60" style={{ color: "#3D2B1F" }}>{label}</label>
                    <input
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-rose-300 transition-colors"
                      value={settings[key]}
                      onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                      style={{ color: "#3D2B1F" }}
                    />
                  </div>
                ))}
                <button onClick={saveSettings} className="btn-primary mt-2">Сохранить настройки</button>
              </div>
            </div>
          )}

          {/* SUBMISSIONS TAB */}
          {tab === "submissions" && (
            <div>
              <h2 className="text-xl font-semibold mb-6" style={{ color: "#3D2B1F" }}>
                Заявки ({submissions.length})
              </h2>
              {submissions.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center opacity-40 text-sm" style={{ color: "#3D2B1F" }}>
                  Заявок пока нет
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="divide-y">
                    {submissions.map((s) => (
                      <div key={s.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-semibold text-sm" style={{ color: "#3D2B1F" }}>{s.name}</span>
                          <span className="text-xs opacity-40" style={{ color: "#3D2B1F" }}>
                            {new Date(s.timestamp).toLocaleString("ru-RU")}
                          </span>
                        </div>
                        <a href={`tel:${s.phone}`} className="text-sm" style={{ color: "#C9A96E" }}>{s.phone}</a>
                        {s.message && (
                          <p className="text-sm opacity-60 mt-1 leading-relaxed" style={{ color: "#3D2B1F" }}>{s.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
