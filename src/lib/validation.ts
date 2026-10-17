import type { SoilReading, SoilType } from "./types.ts";

/** The 12 numeric parameters printed on an Indian Soil Health Card. */
export const SOIL_NUMERIC_FIELDS = ["pH", "EC", "OC", "N", "P", "K", "S", "Zn", "Fe", "Mn", "Cu", "B"] as const;
export type SoilField = (typeof SOIL_NUMERIC_FIELDS)[number];

/**
 * Plausibility limits used only to catch misreads and typos.
 * These are NOT agronomic thresholds. Soil Scientist (B3) to confirm before relying on them.
 */
export const SOIL_PLAUSIBLE_RANGE: Record<SoilField, readonly [number, number]> = {
  pH: [3, 11],
  EC: [0, 20],
  OC: [0, 5],
  N: [0, 1500],
  P: [0, 300],
  K: [0, 2000],
  S: [0, 200],
  Zn: [0, 50],
  Fe: [0, 300],
  Mn: [0, 300],
  Cu: [0, 50],
  B: [0, 20],
};

export function isPlausible(field: SoilField, value: unknown): value is number {
  if (typeof value !== "number" || !Number.isFinite(value)) return false;
  const [min, max] = SOIL_PLAUSIBLE_RANGE[field];
  return value >= min && value <= max;
}

/** Fields that are missing, not a number, or outside the plausible range. */
export function invalidSoilFields(r: Partial<Record<SoilField, number>>): SoilField[] {
  return SOIL_NUMERIC_FIELDS.filter((f) => !isPlausible(f, r[f]));
}

/** An empty form: every number is NaN, nothing is pre-filled with typical values. */
export function blankSoilDraft(texture: SoilType): Omit<SoilReading, "id" | "date"> {
  return {
    pH: NaN, EC: NaN, OC: NaN, N: NaN, P: NaN, K: NaN,
    S: NaN, Zn: NaN, Fe: NaN, Mn: NaN, Cu: NaN, B: NaN,
    texture,
    source: "manual",
  };
}
