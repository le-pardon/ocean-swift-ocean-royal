import type { LangCode } from "./languages";

export type Role = "farmer" | "partner";
export type Season = "kharif" | "rabi" | "zaid";
export type SoilType = "sandy" | "loam" | "clay" | "silt" | "black";
export type Severity = "low" | "mid" | "high";
export type NutrientStatus = "deficient" | "opt" | "excess";

export type Named = Partial<Record<LangCode, string>> & { en: string };

export type SoilReading = {
  id: string;
  date: string;
  photoDataUrl?: string;
  pH: number;
  EC: number;
  OC: number;
  N: number;
  P: number;
  K: number;
  S: number;
  Zn: number;
  Fe: number;
  Mn: number;
  Cu: number;
  B: number;
  texture: SoilType;
  lab?: string;
  source: "card" | "manual" | "sample";
};

export type FertilizerRec = {
  id: string;
  name: string;
  purpose: string;
  dosePerAcre: string;
  doseKg: number;
  bagSizeKg: number;
  bagCostInr: number;
  shops: string[];
  notes?: string;
};

export type Crop = {
  id: string;
  photo: string;
  names: Named;
  seasons: Season[];
  soils: SoilType[];
  days: number;
  wantsIrrigation: boolean;
  costPerAcre: number;
  yieldQtlIrr: number;
  yieldQtlRain: number;
  lastSeasonPrice: number;
  harvestPrice: number;
  states: string[];
  pHMin: number;
  pHMax: number;
  why: string;
  risks: string;
};

export type RankedCrop = Crop & {
  profitPerAcre: number;
  yieldQtl: number;
  fertilizerCost: number;
  harvestDateLabel: string;
  fitScore: number;
  reasons: string[];
  /** "placeholder" = built-in figures with no recorded source, date or local validation. */
  dataStatus: "placeholder";
};

export type Diagnosis = {
  id: string;
  date: string;
  photoDataUrl?: string;
  cropGuess?: string;
  issueType: "deficiency" | "disease" | "pest" | "unclear";
  issue: string;
  /** Only set for built-in demo examples. AI photo results never claim a severity. */
  severity?: Severity;
  /** "demo" = built-in example, not about the user's plant. */
  origin?: "ai" | "demo";
  summary: string;
  treatment: string;
  fertilizers: FertilizerRec[];
};

export type Listing = {
  id: string;
  farmerName: string;
  village: string;
  state: string;
  cropId: string;
  qtyQtl: number;
  pricePerQtl: number;
  grade: string;
  notes: string;
  needDelivery: boolean;
  createdAt: string;
  harvestDate: string;
};

export type DeliveryJob = {
  id: string;
  listingId?: string;
  cropId: string;
  qtyQtl: number;
  pickup: string;
  drop: string;
  km: number;
  payInr: number;
  status: "open" | "accepted" | "picked" | "delivered";
  createdAt: string;
  updatedAt: string;
};
