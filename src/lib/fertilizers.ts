import type { FertilizerRec, SoilReading, SoilType } from "./types";

export function shopsFor(state: string): string[] {
  return [
    `${state} State Cooperative Marketing Federation`,
    "IFFCO / KRIBHCO cooperative counter",
    "Licensed agri-input dealer at your mandi",
    `Krishi Vigyan Kendra (KVK), ${state}`,
  ];
}

function rec(
  id: string,
  name: string,
  purpose: string,
  doseKg: number,
  bagSizeKg: number,
  bagCostInr: number,
  shops: string[],
  notes?: string,
): FertilizerRec {
  return {
    id,
    name,
    purpose,
    doseKg,
    bagSizeKg,
    bagCostInr,
    dosePerAcre: `${doseKg} kg / acre`,
    shops,
    notes,
  };
}

export function statusN(n: number) {
  if (n < 280) return "deficient" as const;
  if (n > 560) return "excess" as const;
  return "opt" as const;
}
export function statusP(p: number) {
  if (p < 25) return "deficient" as const;
  if (p > 50) return "excess" as const;
  return "opt" as const;
}
export function statusK(k: number) {
  if (k < 140) return "deficient" as const;
  if (k > 280) return "excess" as const;
  return "opt" as const;
}
export function statusOC(oc: number) {
  if (oc < 0.5) return "deficient" as const;
  if (oc > 0.75) return "opt" as const;
  return "opt" as const;
}
export function statusZn(zn: number) {
  if (zn < 0.6) return "deficient" as const;
  return "opt" as const;
}
export function statusFe(fe: number) {
  if (fe < 4.5) return "deficient" as const;
  return "opt" as const;
}
export function statusMn(mn: number) {
  if (mn < 2) return "deficient" as const;
  return "opt" as const;
}
export function statusCu(cu: number) {
  if (cu < 0.2) return "deficient" as const;
  return "opt" as const;
}
export function statusB(b: number) {
  if (b < 0.5) return "deficient" as const;
  return "opt" as const;
}

export function planFertilizers(soil: SoilReading, state: string): FertilizerRec[] {
  const shops = shopsFor(state);
  const out: FertilizerRec[] = [];

  if (soil.pH < 6.0) {
    out.push(
      rec(
        "lime",
        "Agricultural lime (CaCO₃)",
        "Raise acidic pH toward 6.5 so phosphorus unlocks.",
        200,
        50,
        220,
        shops,
        "Broadcast 3–4 weeks before sowing. Do not mix with urea in the same hopper.",
      ),
    );
  }
  if (soil.pH > 8.2) {
    out.push(
      rec(
        "gypsum",
        "Gypsum (CaSO₄)",
        "Ease alkaline / sodic soil and add sulphur.",
        200,
        50,
        260,
        shops,
        "Irrigate after application. Helps groundnut, cotton and pulses on black soil.",
      ),
    );
  }
  if (statusN(soil.N) === "deficient") {
    out.push(
      rec(
        "urea",
        "Urea 46-0-0",
        "Nitrogen is low. Split dose: half at sowing, half at 25–30 days.",
        50,
        45,
        266,
        shops,
        "Subsidised bag. Keep dry. Never place against seed.",
      ),
    );
  }
  if (statusP(soil.P) === "deficient") {
    out.push(
      rec(
        "dap",
        "DAP 18-46-0",
        "Phosphorus is low. Place below the seed at sowing.",
        50,
        50,
        1350,
        shops,
        "One bag / acre covers most rabi cereals on low-P plots.",
      ),
    );
  }
  if (statusK(soil.K) === "deficient") {
    out.push(
      rec(
        "mop",
        "MOP (muriate of potash) 0-0-60",
        "Potassium is low. Needed for grain fill and drought tolerance.",
        25,
        50,
        900,
        shops,
      ),
    );
  }
  if (soil.S < 10) {
    out.push(
      rec(
        "bentonite-s",
        "Bentonite sulphur 90%",
        "Sulphur is low — oilseeds and pulses respond fast.",
        8,
        10,
        280,
        shops,
      ),
    );
  }
  if (statusZn(soil.Zn) === "deficient") {
    out.push(
      rec(
        "znso4",
        "Zinc sulphate 21%",
        "Zinc is low (khaira risk in paddy, white bud in maize).",
        10,
        10,
        480,
        shops,
        "Once in two years is enough on most soils. Foliar 0.5% if the crop is already in.",
      ),
    );
  }
  if ((soil.Fe ?? 99) < 4.5) {
    out.push(
      rec(
        "feso4",
        "Ferrous sulphate 19%",
        "Iron is low. Common on alkaline black soils — new leaves stay pale.",
        10,
        10,
        180,
        shops,
        "Soil application at sowing, or 0.5% foliar with citric acid if the crop is up.",
      ),
    );
  }
  if ((soil.Mn ?? 99) < 2) {
    out.push(
      rec(
        "mnso4",
        "Manganese sulphate 30%",
        "Manganese is low. Interveinal yellowing on young leaves.",
        10,
        10,
        220,
        shops,
        "Do not mix in the same tank as lime.",
      ),
    );
  }
  if ((soil.Cu ?? 99) < 0.2) {
    out.push(
      rec(
        "cuso4",
        "Copper sulphate 24%",
        "Copper is low. Rare, but wheat and onion on sandy plots respond.",
        5,
        5,
        320,
        shops,
      ),
    );
  }
  if ((soil.B ?? 99) < 0.5) {
    out.push(
      rec(
        "borax",
        "Borax (disodium tetraborate) 10.5% B",
        "Boron is low. Cauliflower browning, hollow stem, poor pod set.",
        4,
        5,
        160,
        shops,
        "A little goes a long way. Do not exceed the dose — boron toxicity is hard to undo.",
      ),
    );
  }
  if (statusOC(soil.OC) === "deficient") {
    out.push(
      rec(
        "fym",
        "Farmyard manure / vermicompost",
        "Organic carbon is thin. Rebuild the sponge before chasing bags.",
        2000,
        50,
        400,
        [`Local gaushala / compost unit, ${state}`, "DeHaat / BigHaat vermicompost"],
        "4 trolley FYM or 8 bags vermicompost per acre. Best in the month before sowing.",
      ),
    );
  }
  if (out.length === 0) {
    out.push(
      rec(
        "maintain",
        "Maintenance NPK (12-32-16)",
        "Soil is in range. A starter dose at sowing is enough.",
        40,
        50,
        1450,
        shops,
      ),
    );
  }
  return out;
}

export function sampleMaharashtraSoil(): Omit<SoilReading, "id" | "date"> {
  return {
    pH: 7.8,
    EC: 0.32,
    OC: 0.41,
    N: 186,
    P: 12,
    K: 210,
    S: 8,
    Zn: 0.38,
    Fe: 4.2,
    Mn: 3.1,
    Cu: 0.42,
    B: 0.28,
    texture: "black" as SoilType,
    lab: "Soil Testing Lab, Nagpur",
    source: "sample",
  };
}

export function costForFarm(rec: FertilizerRec, acres: number) {
  const bags = Math.ceil((rec.doseKg * acres) / rec.bagSizeKg);
  return { bags, total: bags * rec.bagCostInr };
}
