import type { LangCode } from "./languages";

const LOCALE: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
  ta: "ta-IN",
  te: "te-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  pa: "pa-IN",
  ur: "ur-IN",
  or: "or-IN",
  as: "as-IN",
  ne: "ne-NP",
};

export function inr(n: number, lang: LangCode = "en") {
  return new Intl.NumberFormat(LOCALE[lang] ?? "en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export function num(n: number, lang: LangCode = "en") {
  return new Intl.NumberFormat(LOCALE[lang] ?? "en-IN").format(n);
}

export function shortDate(iso: string, lang: LangCode = "en") {
  return new Date(iso).toLocaleDateString(LOCALE[lang] ?? "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function fileToJpegDataUrl(file: File, max = 1280, quality = 0.72) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

export function greetingKey(d = new Date()) {
  const h = d.getHours();
  if (h < 12) return "greetMorn" as const;
  if (h < 17) return "greetAft" as const;
  return "greetEve" as const;
}
