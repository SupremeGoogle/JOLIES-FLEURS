import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (password !== adminPassword) {
    return Response.json({ error: "Неверный пароль" }, { status: 401 });
  }

  const jar = await cookies();
  jar.set("admin_token", "authenticated", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({ success: true });
}
