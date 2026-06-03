import { NextRequest } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";

export async function GET() {
  return Response.json(getSettings());
}

export async function PUT(req: NextRequest) {
  const settings = await req.json();
  saveSettings(settings);
  return Response.json({ success: true });
}
