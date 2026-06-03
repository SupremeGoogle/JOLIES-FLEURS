import { NextRequest } from "next/server";
import { addSubmission } from "@/lib/data";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, message, timestamp } = body;

    if (!name || !phone) {
      return Response.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }

    const sub = {
      id: randomUUID(),
      name: String(name).slice(0, 200),
      phone: String(phone).slice(0, 50),
      message: String(message || "").slice(0, 2000),
      timestamp: timestamp || new Date().toISOString(),
    };

    await addSubmission(sub);

    // Forward to Google Apps Script
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sub, source: "website" }),
        });
      } catch {
        // Don't fail if Apps Script is unavailable
      }
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
