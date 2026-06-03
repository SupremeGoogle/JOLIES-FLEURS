import { cookies } from "next/headers";

export async function POST() {
  const jar = await cookies();
  jar.delete("admin_token");
  return Response.json({ success: true });
}
