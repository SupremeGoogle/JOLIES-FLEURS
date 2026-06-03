import fs from "fs";
import path from "path";

export interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  image: string;
  slug: string;
}

export interface Settings {
  shopName: string;
  tagline: string;
  address1: string;
  address2: string;
  phone1: string;
  phone2: string;
  hours: string;
  telegram: string;
  delivery: string;
}

export interface Submission {
  id: string;
  name: string;
  phone: string;
  message: string;
  timestamp: string;
}

const dataDir = path.join(process.cwd(), "data");

export function getProducts(): Product[] {
  const raw = fs.readFileSync(path.join(dataDir, "products.json"), "utf8");
  return JSON.parse(raw);
}

export function saveProducts(products: Product[]): void {
  fs.writeFileSync(
    path.join(dataDir, "products.json"),
    JSON.stringify(products, null, 2),
    "utf8"
  );
}

export function getSettings(): Settings {
  const raw = fs.readFileSync(path.join(dataDir, "settings.json"), "utf8");
  return JSON.parse(raw);
}

export function saveSettings(settings: Settings): void {
  fs.writeFileSync(
    path.join(dataDir, "settings.json"),
    JSON.stringify(settings, null, 2),
    "utf8"
  );
}

export function getSubmissions(): Submission[] {
  const file = path.join(dataDir, "submissions.json");
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw);
}

export function addSubmission(sub: Submission): void {
  const subs = getSubmissions();
  subs.unshift(sub);
  fs.writeFileSync(
    path.join(dataDir, "submissions.json"),
    JSON.stringify(subs.slice(0, 200), null, 2),
    "utf8"
  );
}
