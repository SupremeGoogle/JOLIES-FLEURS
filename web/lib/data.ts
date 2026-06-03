import fs from "fs";
import path from "path";
import { pushFileToGitHub, isProduction } from "./github";

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
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  whyTitle: string;
  whyItem1Title: string;
  whyItem1Desc: string;
  whyItem2Title: string;
  whyItem2Desc: string;
  whyItem3Title: string;
  whyItem3Desc: string;
  whyItem4Title: string;
  whyItem4Desc: string;
  reviewsTitle: string;
}

export interface Submission {
  id: string;
  name: string;
  phone: string;
  message: string;
  timestamp: string;
}

const dataDir = path.join(process.cwd(), "data");

// ── READ (always from bundled files — works in dev and prod) ──────────────

export function getProducts(): Product[] {
  const raw = fs.readFileSync(path.join(dataDir, "products.json"), "utf8");
  return JSON.parse(raw);
}

export function getSettings(): Settings {
  const raw = fs.readFileSync(path.join(dataDir, "settings.json"), "utf8");
  return JSON.parse(raw);
}

export function getSubmissions(): Submission[] {
  const file = path.join(dataDir, "submissions.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// ── WRITE ─────────────────────────────────────────────────────────────────
// Dev  → writes to local JSON file instantly
// Prod → commits to GitHub via API → Vercel auto-redeploys (~1 min)

async function writeData(filename: string, content: string, commitMsg: string) {
  if (isProduction()) {
    await pushFileToGitHub(`web/data/${filename}`, content, commitMsg);
  } else {
    fs.writeFileSync(path.join(dataDir, filename), content, "utf8");
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeData(
    "products.json",
    JSON.stringify(products, null, 2),
    "Admin: обновление каталога товаров"
  );
}

export async function saveSettings(settings: Settings): Promise<void> {
  await writeData(
    "settings.json",
    JSON.stringify(settings, null, 2),
    "Admin: обновление настроек сайта"
  );
}

export async function addSubmission(sub: Submission): Promise<void> {
  const subs = getSubmissions();
  subs.unshift(sub);
  const trimmed = subs.slice(0, 200);
  await writeData(
    "submissions.json",
    JSON.stringify(trimmed, null, 2),
    "New form submission"
  );
}
