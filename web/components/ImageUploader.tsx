"use client";
import { useRef, useState, DragEvent } from "react";

interface Props {
  value: string;          // current image URL
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Только изображения (jpg, png, webp)");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Ошибка загрузки");
      }
    } catch {
      setError("Ошибка соединения");
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  return (
    <div className="space-y-2">
      {/* Preview + drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className="relative cursor-pointer rounded-xl overflow-hidden border-2 border-dashed transition-all"
        style={{
          borderColor: dragging ? "#F2A7B5" : "rgba(201,169,110,0.35)",
          background: dragging ? "rgba(242,167,181,0.06)" : "#fafafa",
          minHeight: "120px",
        }}
      >
        {value ? (
          /* Image preview */
          <div className="relative w-full" style={{ height: "160px" }}>
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
            />
            {/* Overlay hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              style={{ background: "rgba(0,0,0,0.35)" }}>
              <p className="text-white text-xs font-medium">Нажмите или перетащите новое фото</p>
            </div>
            {/* Upload spinner */}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(253,250,246,0.7)" }}>
                <div className="w-6 h-6 rounded-full border-2 border-rose-300 border-t-transparent animate-spin" />
              </div>
            )}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center" style={{ minHeight: "120px" }}>
            {uploading ? (
              <div className="w-8 h-8 rounded-full border-2 border-rose-300 border-t-transparent animate-spin mb-2" />
            ) : (
              <>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" className="mb-3 opacity-60">
                  <rect x="4" y="8" width="24" height="18" rx="3"/>
                  <circle cx="12" cy="16" r="2.5"/>
                  <path d="M4 22 L10 16 L16 20 L22 14 L28 20"/>
                  <path d="M16 4 L16 12 M12 7 L16 4 L20 7"/>
                </svg>
                <p className="text-xs font-medium" style={{ color: "#7A5C4F" }}>
                  Нажмите чтобы выбрать файл
                </p>
                <p className="text-xs mt-1 opacity-50" style={{ color: "#7A5C4F" }}>
                  или перетащите сюда
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* URL input */}
      <div className="flex gap-2 items-center">
        <span className="text-xs opacity-40" style={{ color: "#7A5C4F", whiteSpace: "nowrap" }}>или URL:</span>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="flex-1 border rounded-lg px-2 py-1.5 text-xs outline-none focus:border-rose-300"
          style={{ borderColor: "rgba(201,169,110,0.3)", color: "#3D2B1F" }}
        />
      </div>

      {error && <p className="text-xs" style={{ color: "#D97F91" }}>{error}</p>}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
