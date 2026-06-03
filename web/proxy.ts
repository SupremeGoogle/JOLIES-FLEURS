import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get("admin_token")?.value;
    if (token !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login")) {
    const token = req.cookies.get("admin_token")?.value;
    if (token !== "authenticated") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
