import { getProducts, getSettings } from "@/lib/data";
import AdminClient from "./AdminClient";

export const metadata = { title: "Панель управления — Jolies Fleurs" };

export default function AdminPage() {
  const products = getProducts();
  const settings = getSettings();
  return <AdminClient products={products} settings={settings} />;
}
