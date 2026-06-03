import { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) return Response.json({ error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `upload_${Date.now()}.${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(filePath, buffer);
    return Response.json({ url: `/uploads/${filename}` });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
