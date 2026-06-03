"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/contacts", label: "Контакты" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Hero фон светлый — ссылки всегда тёмные
  const linkColor = "#2C2420";
  const brandColor = "#2C2420";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(253,250,246,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(44,36,32,0.08)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Jolies Fleurs"
            width={38}
            height={38}
            className="rounded-full object-cover"
            style={{ border: "2px solid #F2A7B5" }}
          />
          <span
            className="font-heading text-xl font-semibold hidden sm:block transition-colors duration-500"
            style={{ color: brandColor, fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            Jolies Fleurs
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium transition-all duration-300"
                style={{
                  color: linkColor,
                  fontFamily: "var(--font-jost, sans-serif)",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex">
          <a
            href="https://t.me/dddd_nik"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-5"
          >
            Заказать
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="block w-6 h-0.5 mb-1 transition-all"
            style={{ background: linkColor, transform: open ? "rotate(45deg) translate(3px,3px)" : "none" }} />
          <span className="block w-6 h-0.5 mb-1 transition-all"
            style={{ background: linkColor, opacity: open ? 0 : 1 }} />
          <span className="block w-6 h-0.5 transition-all"
            style={{ background: linkColor, transform: open ? "rotate(-45deg) translate(3px,-3px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: open ? "300px" : "0",
          background: "rgba(253,250,246,0.97)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-base font-medium"
              style={{ color: "#2C2420" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
