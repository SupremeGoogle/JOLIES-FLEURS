import { getProducts, getSettings, getSubmissions } from "@/lib/data";
import AdminClient from "./AdminClient";

export const metadata = { title: "Панель управления — Jolies Fleurs" };

export default function AdminPage() {
  const products = getProducts();
  const settings = getSettings();
  const submissions = getSubmissions().slice(0, 50);
  return <AdminClient products={products} settings={settings} submissions={submissions} />;
}
