"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Неверный пароль");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F5F5" }}>
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-lg bg-white">
        <div className="text-center mb-8">
          <Image src="/logo.jpg" alt="Logo" width={60} height={60} className="rounded-full mx-auto mb-3 object-cover" />
          <h1 className="text-xl font-semibold" style={{ color: "#3D2B1F" }}>Панель управления</h1>
          <p className="text-sm opacity-50 mt-1">Jolies Fleurs Admin</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-rose-300 transition-colors"
            style={{ borderColor: error ? "#D97F91" : "#E5E7EB", color: "#3D2B1F" }}
          />
          {error && <p className="text-xs" style={{ color: "#D97F91" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
