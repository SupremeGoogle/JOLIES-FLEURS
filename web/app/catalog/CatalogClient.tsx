"use client";
import { useState, useRef } from "react";
import type { Product } from "@/lib/data";

const CATS = [
  { id: "all", label: "Все" },
  { id: "under3k", label: "До 3 000 ₽" },
  { id: "3k-5k", label: "3 000 – 5 000 ₽" },
  { id: "5k-7k", label: "5 000 – 7 000 ₽" },
  { id: "over7k", label: "От 7 000 ₽" },
];

export default function CatalogClient({ products }: { products: Product[] }) {
  const [cat, setCat] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered = cat === "all" ? products : products.filter((p) => p.category === cat);

  const openDialog = (p: Product) => {
    setSelected(p);
    dialogRef.current?.showModal();
  };
  const closeDialog = () => dialogRef.current?.close();

  return (
    <div className="pt-20 pb-16 min-h-screen" style={{ background: "#FDFAF6" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center py-12">
          <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "#C9A96E" }}>Каталог</p>
          <h1
            className="font-heading text-5xl md:text-6xl font-light"
            style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            Наши букеты
          </h1>
          <p className="mt-3 opacity-60 text-base" style={{ color: "#7A5C4F" }}>
            {products.length} авторских композиций
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: cat === c.id ? "#F2A7B5" : "#FCE8ED",
                color: "#3D2B1F",
                border: cat === c.id ? "2px solid #D97F91" : "2px solid transparent",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => openDialog(p)}
              className="product-card rounded-2xl overflow-hidden text-left w-full"
              style={{ background: "#fff" }}
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: "110%" }}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm" style={{ color: "#C9A96E" }}>{p.price}</p>
                <p className="text-xs opacity-50 mt-0.5" style={{ color: "#3D2B1F" }}>Авторский букет</p>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-20 opacity-50" style={{ color: "#3D2B1F" }}>
            Нет букетов в этой категории
          </p>
        )}
      </div>

      {/* Lightbox dialog */}
      <dialog ref={dialogRef} onClick={(e) => e.target === dialogRef.current && closeDialog()}>
        {selected && (
          <div
            className="relative flex flex-col md:flex-row rounded-2xl overflow-hidden"
            style={{ background: "#FDFAF6", maxWidth: "860px", maxHeight: "90vh" }}
          >
            <button
              onClick={closeDialog}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold"
              style={{ background: "rgba(61,43,31,0.2)", color: "#3D2B1F" }}
            >
              ✕
            </button>
            <div className="md:w-1/2 max-h-[60vh] md:max-h-[80vh] overflow-hidden">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "#C9A96E" }}>
                  Авторский букет
                </p>
                <p
                  className="font-heading text-3xl font-light mb-4"
                  style={{ color: "#3D2B1F", fontFamily: "var(--font-cormorant, Georgia, serif)" }}
                >
                  {selected.name}
                </p>
                <p
                  className="text-3xl font-semibold mb-4"
                  style={{ color: "#C9A96E" }}
                >
                  {selected.price}
                </p>
                <p className="text-sm opacity-60 leading-relaxed" style={{ color: "#3D2B1F" }}>
                  Свежий авторский букет из сезонных цветов. Состав уточняйте у флориста — он создаётся
                  индивидуально под каждый заказ.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://t.me/dddd_nik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  Заказать в Telegram
                </a>
                <a href="tel:+79853898591" className="btn-outline text-center text-sm">
                  +7 (985) 389-85-91
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
