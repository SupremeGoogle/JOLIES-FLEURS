import { NextRequest } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";

export async function GET() {
  return Response.json(getProducts());
}

export async function PUT(req: NextRequest) {
  const products = await req.json();
  saveProducts(products);
  return Response.json({ success: true });
}
