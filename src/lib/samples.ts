import type { Diagnosis, FertilizerRec } from "./types";
import { shopsFor } from "./fertilizers";

const shops = shopsFor("Maharashtra");

function fert(
  id: string,
  name: string,
  purpose: string,
  dosePerAcre: string,
  doseKg: number,
  bagSizeKg: number,
  bagCostInr: number,
  notes?: string,
): FertilizerRec {
  return { id, name, purpose, dosePerAcre, doseKg, bagSizeKg, bagCostInr, shops, notes };
}

export const LEAF_SAMPLES: {
  id: string;
  titleKey: "sampleN" | "sampleP" | "sampleK" | "sampleZn";
  tint: string;
  diagnosis: Omit<Diagnosis, "id" | "date">;
}[] = [
  {
    id: "n",
    titleKey: "sampleN",
    tint: "#c9b24a",
    diagnosis: {
      issueType: "deficiency",
      issue: "Nitrogen deficiency",
      severity: "mid",
      cropGuess: "Maize / paddy",
      summary:
        "Older leaves have gone a uniform pale yellow from the tip. Growth looks thin. This is classic nitrogen hunger, not a virus.",
      treatment:
        "Top-dress urea immediately, then irrigate. A foliar 2% urea spray buys 5 days if the crop is already tall.",
      fertilizers: [
        fert("urea", "Urea 46-0-0", "Fast nitrogen for yellowing older leaves.", "50 kg / acre, split", 50, 45, 266),
      ],
    },
  },
  {
    id: "p",
    titleKey: "sampleP",
    tint: "#7a4a8a",
    diagnosis: {
      issueType: "deficiency",
      issue: "Phosphorus deficiency",
      severity: "mid",
      cropGuess: "Tomato / wheat",
      summary:
        "Leaves are a dark, dull green with purple-red undersides. Plants look stunted from the start — phosphorus never reached the roots.",
      treatment:
        "Band DAP below the next sowing. For a standing crop, foliar DAP 1% in the evening, twice, 7 days apart.",
      fertilizers: [
        fert("dap", "DAP 18-46-0", "Correct low phosphorus at the root zone.", "50 kg / acre", 50, 50, 1350),
      ],
    },
  },
  {
    id: "k",
    titleKey: "sampleK",
    tint: "#b56a1e",
    diagnosis: {
      issueType: "deficiency",
      issue: "Potassium deficiency",
      severity: "high",
      cropGuess: "Cotton",
      summary:
        "Leaf margins scorch brown while the centre stays green. Bolls (or grain) fill poorly. This is potassium, not sunburn.",
      treatment:
        "Apply MOP and irrigate. Foliar 1% potassium nitrate if the crop is already flowering.",
      fertilizers: [
        fert("mop", "MOP 0-0-60", "Restore potassium for grain / boll fill.", "25 kg / acre", 25, 50, 900),
      ],
    },
  },
  {
    id: "zn",
    titleKey: "sampleZn",
    tint: "#8a7a3c",
    diagnosis: {
      issueType: "deficiency",
      issue: "Zinc deficiency (khaira)",
      severity: "mid",
      cropGuess: "Paddy",
      summary:
        "Dusty brown rusty patches on mid-leaves, plants look dusty even after rain. Classic zinc hunger on alkaline paddies.",
      treatment:
        "Basal zinc sulphate this season. Foliar 0.5% ZnSO₄ + 0.25% lime if the crop is already in water.",
      fertilizers: [
        fert(
          "znso4",
          "Zinc sulphate 21%",
          "Correct khaira / white bud. Once in two years on most soils.",
          "10 kg / acre",
          10,
          10,
          480,
        ),
      ],
    },
  },
];

export const SYMPTOM_FALLBACK: Record<string, Omit<Diagnosis, "id" | "date">> = {
  yellowOld: LEAF_SAMPLES[0].diagnosis,
  purpleLeaf: LEAF_SAMPLES[1].diagnosis,
  burnEdge: LEAF_SAMPLES[2].diagnosis,
  spots: LEAF_SAMPLES[3].diagnosis,
};
