import { getProducts } from "@/lib/data";
import CatalogClient from "./CatalogClient";

export const metadata = {
  title: "Каталог — Jolies Fleurs",
  description: "Все букеты и цветочные композиции. Широкий выбор, свежие цветы, доступные цены.",
};

export default function CatalogPage() {
  const products = getProducts();
  return <CatalogClient products={products} />;
}
