import { SOIL_NUMERIC_FIELDS, isPlausible } from "./validation.ts";
import type { SoilField } from "./validation.ts";

export type AnalyzeKind = "leaf" | "soil-card";

/** Closed vocabulary: the model may only pick from these. The app, not the model, writes all farmer-facing text. */
export const LEAF_SIGNS = [
  "yellowing_uniform",
  "yellowing_between_veins",
  "purple_red_tint",
  "brown_or_dark_spots",
  "edge_scorch",
  "wilting_drooping",
  "chewed_holes",
  "curling_or_twisting",
  "white_or_grey_coating",
  "fine_speckling",
  "none_visible",
] as const;
export type LeafSign = (typeof LEAF_SIGNS)[number];
export type PhotoQuality = "good" | "poor" | "unusable";

export const MAX_IMAGE_CHARS = 4_000_000; // ~3 MB of image data
const DATA_URL = /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

export type ValidInput = { imageUrl: string; kind: AnalyzeKind; lang: string; cropHint?: string };

export function validateAnalyzeInput(input: unknown): { ok: true; value: ValidInput } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) return { ok: false, error: "bad_input" };
  const o = input as Record<string, unknown>;
  if (o.kind !== "leaf" && o.kind !== "soil-card") return { ok: false, error: "bad_kind" };
  const img = o.imageBase64;
  if (typeof img !== "string" || img.length === 0 || img.length > MAX_IMAGE_CHARS) return { ok: false, error: "bad_image_size" };
  if (!DATA_URL.test(img)) return { ok: false, error: "bad_image_format" };
  const lang = typeof o.lang === "string" && /^[a-z]{2,3}$/.test(o.lang) ? o.lang : "en";
  const hint =
    typeof o.cropHint === "string" && /^[\p{L}\p{N} -]{1,40}$/u.test(o.cropHint.trim()) ? o.cropHint.trim() : undefined;
  return { ok: true, value: { imageUrl: img, kind: o.kind, lang, cropHint: hint } };
}

/** Best-effort global limiter. Serverless instances do not share memory, so this only bounds worst-case spend per instance. */
export function createLimiter(max: number, windowMs: number, now: () => number = Date.now) {
  let hits: number[] = [];
  return {
    tryAcquire(): boolean {
      const t = now();
      hits = hits.filter((h) => t - h < windowMs);
      if (hits.length >= max) return false;
      hits.push(t);
      return true;
    },
  };
}

export function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced?.[1] ?? text).trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("No JSON");
  return JSON.parse(raw.slice(start, end + 1));
}

/**
 * Keep only values that are numbers (or numeric strings) inside the plausible range.
 * Anything else is reported as missing. Nothing is estimated or defaulted.
 */
export function parseSoilCard(parsed: unknown): { values: Partial<Record<SoilField, number>>; missing: SoilField[]; lab?: string } {
  const o = (typeof parsed === "object" && parsed !== null ? parsed : {}) as Record<string, unknown>;
  const values: Partial<Record<SoilField, number>> = {};
  const missing: SoilField[] = [];
  for (const f of SOIL_NUMERIC_FIELDS) {
    const v = o[f];
    const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
    if (isPlausible(f, n)) values[f] = n;
    else missing.push(f);
  }
  const lab = typeof o.lab === "string" ? o.lab.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 80) : "";
  return { values, missing, lab: lab || undefined };
}

export function parseLeaf(parsed: unknown): { quality: PhotoQuality; signs: LeafSign[] } {
  const o = (typeof parsed === "object" && parsed !== null ? parsed : {}) as Record<string, unknown>;
  const quality: PhotoQuality = o.photoQuality === "good" || o.photoQuality === "poor" ? o.photoQuality : "unusable";
  const raw = Array.isArray(o.signs) ? o.signs : [];
  const signs = [...new Set(raw.filter((s): s is LeafSign => (LEAF_SIGNS as readonly unknown[]).includes(s)))].slice(0, 4);
  const real = signs.filter((s) => s !== "none_visible");
  return { quality, signs: real.length > 0 ? real : signs.slice(0, 1) };
}
