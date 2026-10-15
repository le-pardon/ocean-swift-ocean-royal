import type { Crop, FertilizerRec, RankedCrop, Season, SoilReading, SoilType } from "./types";
import { planFertilizers } from "./fertilizers";

export const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

const ALL = [...STATES];

export const CROPS: Crop[] = [
  {
    id: "wheat",
    photo: "/photos/wheat.jpg",
    names: {
      en: "Wheat",
      hi: "गेहूँ",
      bn: "গম",
      ta: "கோதுமை",
      te: "గోధుమ",
      mr: "गहू",
      gu: "ઘઉં",
      kn: "ಗೋಧಿ",
      ml: "ഗോതമ്പ്",
      pa: "ਕਣਕ",
      ur: "گندم",
      or: "ଗହମ",
      as: "ঘেঁহু",
    },
    seasons: ["rabi"],
    soils: ["loam", "clay", "silt", "black"],
    days: 120,
    wantsIrrigation: true,
    costPerAcre: 26800,
    yieldQtlIrr: 18,
    yieldQtlRain: 11,
    lastSeasonPrice: 2275,
    harvestPrice: 2450,
    states: ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Bihar", "Gujarat", "Maharashtra"],
    pHMin: 6.0,
    pHMax: 7.8,
    why: "Rabi staple with a firm MSP floor. Harvest lands in March–April when mills restock.",
    risks: "Late heat in March can shrink grain. Keep the last irrigation timed, not skipped.",
  },
  {
    id: "mustard",
    photo: "/photos/mustard.jpg",
    names: {
      en: "Mustard",
      hi: "सरसों",
      bn: "সরিষা",
      ta: "கடுகு",
      te: "ఆవాలు",
      mr: "मोहरी",
      gu: "સરસવ",
      kn: "ಸಾಸಿವೆ",
      ml: "കടുക്",
      pa: "ਸਰੋਂ",
      ur: "سرسوں",
      or: "ସୋରିଷ",
    },
    seasons: ["rabi"],
    soils: ["sandy", "loam", "silt"],
    days: 110,
    wantsIrrigation: false,
    costPerAcre: 18200,
    yieldQtlIrr: 8.5,
    yieldQtlRain: 7,
    lastSeasonPrice: 5450,
    harvestPrice: 5850,
    states: ["Rajasthan", "Haryana", "Madhya Pradesh", "Uttar Pradesh", "Gujarat", "West Bengal", "Assam"],
    pHMin: 6.0,
    pHMax: 8.0,
    why: "Oilseed with a thin cost base. Works on residual moisture after kharif.",
    risks: "Aphids in January. One early spray beats a late rescue.",
  },
  {
    id: "potato",
    photo: "/photos/potato.jpg",
    names: {
      en: "Potato",
      hi: "आलू",
      bn: "আলু",
      ta: "உருளைக்கிழங்கு",
      te: "బంగాళదుంప",
      mr: "बटाटा",
      gu: "બટાકા",
      kn: "ಆಲೂಗಡ್ಡೆ",
      ml: "ഉരുളക്കിഴങ്ങ്",
      pa: "ਆਲੂ",
      ur: "آلو",
      or: "ଆଳୁ",
    },
    seasons: ["rabi"],
    soils: ["sandy", "loam", "silt"],
    days: 90,
    wantsIrrigation: true,
    costPerAcre: 42000,
    yieldQtlIrr: 90,
    yieldQtlRain: 45,
    lastSeasonPrice: 980,
    harvestPrice: 1120,
    states: ["Uttar Pradesh", "West Bengal", "Bihar", "Punjab", "Gujarat", "Madhya Pradesh", "Assam"],
    pHMin: 5.2,
    pHMax: 6.8,
    why: "Fast cash crop. Cold-store demand lifts January–February prices.",
    risks: "Late blight in fog. Seed cost is high — buy certified, not mandi leftovers.",
  },
  {
    id: "gram",
    photo: "/photos/mustard.jpg",
    names: {
      en: "Gram (chana)",
      hi: "चना",
      bn: "ছোলা",
      ta: "கொண்டைக்கடலை",
      te: "శనగలు",
      mr: "हरभरा",
      gu: "ચણા",
      kn: "ಕಡಲೆ",
      ml: "കടല",
      pa: "ਛੋਲੇ",
      ur: "چنا",
      or: "ବୁଟ",
    },
    seasons: ["rabi"],
    soils: ["black", "clay", "loam"],
    days: 115,
    wantsIrrigation: false,
    costPerAcre: 16400,
    yieldQtlIrr: 8,
    yieldQtlRain: 6.5,
    lastSeasonPrice: 5400,
    harvestPrice: 5750,
    states: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh", "Karnataka", "Andhra Pradesh"],
    pHMin: 6.0,
    pHMax: 8.2,
    why: "Pulse that feeds the soil (nitrogen fix). Low water, solid mill demand.",
    risks: "Wilt on poorly drained black soil. Avoid low patches.",
  },
  {
    id: "paddy",
    photo: "/photos/paddy.jpg",
    names: {
      en: "Paddy",
      hi: "धान",
      bn: "ধান",
      ta: "நெல்",
      te: "వరి",
      mr: "भात",
      gu: "ડાંગર",
      kn: "ಭತ್ತ",
      ml: "നെല്ല്",
      pa: "ਝੋਨਾ",
      ur: "دھان",
      or: "ଧାନ",
      as: "ধান",
    },
    seasons: ["kharif"],
    soils: ["clay", "loam", "silt"],
    days: 125,
    wantsIrrigation: true,
    costPerAcre: 31200,
    yieldQtlIrr: 22,
    yieldQtlRain: 14,
    lastSeasonPrice: 2183,
    harvestPrice: 2320,
    states: ALL,
    pHMin: 5.5,
    pHMax: 7.5,
    why: "Procurement is the floor. Works wherever standing water is reliable.",
    risks: "Stem borer and blast in humid pockets. Don’t flood after panicle initiation.",
  },
  {
    id: "soybean",
    photo: "/photos/soybean.jpg",
    names: {
      en: "Soybean",
      hi: "सोयाबीन",
      bn: "সয়াবিন",
      ta: "சோயா",
      te: "సోయాబీన్",
      mr: "सोयाबीन",
      gu: "સોયાબીન",
      kn: "ಸೋಯಾಬೀನ್",
      ml: "സോയാബീൻ",
      pa: "ਸੋਇਆਬੀਨ",
      ur: "سویابین",
      or: "ସୋୟାବିନ୍",
    },
    seasons: ["kharif"],
    soils: ["black", "clay", "loam"],
    days: 100,
    wantsIrrigation: false,
    costPerAcre: 19800,
    yieldQtlIrr: 10,
    yieldQtlRain: 8,
    lastSeasonPrice: 4300,
    harvestPrice: 4680,
    states: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Karnataka", "Telangana"],
    pHMin: 6.0,
    pHMax: 7.5,
    why: "Oil mill crush keeps a bid under the crop. Suits black cotton soil.",
    risks: "Yellow mosaic if seed is uncertified. Drain water within 48 hours of a heavy rain.",
  },
  {
    id: "cotton",
    photo: "/photos/cotton.jpg",
    names: {
      en: "Cotton",
      hi: "कपास",
      bn: "তুলা",
      ta: "பருத்தி",
      te: "పత్తి",
      mr: "कापूस",
      gu: "કપાસ",
      kn: "ಹತ್ತಿ",
      ml: "പരുത്തി",
      pa: "ਕਪਾਹ",
      ur: "کپاس",
      or: "ତୁଳା",
    },
    seasons: ["kharif"],
    soils: ["black", "sandy", "loam"],
    days: 165,
    wantsIrrigation: false,
    costPerAcre: 35500,
    yieldQtlIrr: 12,
    yieldQtlRain: 8,
    lastSeasonPrice: 6800,
    harvestPrice: 7200,
    states: ["Maharashtra", "Gujarat", "Telangana", "Andhra Pradesh", "Rajasthan", "Haryana", "Punjab", "Karnataka"],
    pHMin: 6.0,
    pHMax: 8.0,
    why: "Long cash cycle but gin prices have held. Pink bollworm is the tax on inattention.",
    risks: "Input bill is heavy. Skip if credit is already stretched.",
  },
  {
    id: "maize",
    photo: "/photos/maize.jpg",
    names: {
      en: "Maize",
      hi: "मक्का",
      bn: "ভুট্টা",
      ta: "சோளம்",
      te: "మొక్కజొన్న",
      mr: "मका",
      gu: "મકાઈ",
      kn: "ಜೋಳ",
      ml: "ചോളം",
      pa: "ਮੱਕੀ",
      ur: "مکئی",
      or: "ମକା",
    },
    seasons: ["kharif", "rabi", "zaid"],
    soils: ["loam", "sandy", "silt"],
    days: 95,
    wantsIrrigation: true,
    costPerAcre: 22400,
    yieldQtlIrr: 28,
    yieldQtlRain: 16,
    lastSeasonPrice: 2090,
    harvestPrice: 2250,
    states: ALL,
    pHMin: 5.5,
    pHMax: 7.5,
    why: "Feed mills buy year-round. Fits as a bridge crop between seasons.",
    risks: "Fall armyworm. Scout weekly from week three.",
  },
  {
    id: "sugarcane",
    photo: "/photos/sugarcane.jpg",
    names: {
      en: "Sugarcane",
      hi: "गन्ना",
      bn: "আখ",
      ta: "கரும்பு",
      te: "చెరకు",
      mr: "ऊस",
      gu: "શેરડી",
      kn: "ಕಬ್ಬು",
      ml: "കരിമ്പ്",
      pa: "ਗੰਨਾ",
      ur: "گنا",
      or: "ଆଖୁ",
    },
    seasons: ["kharif", "rabi"],
    soils: ["loam", "clay", "black"],
    days: 330,
    wantsIrrigation: true,
    costPerAcre: 72000,
    yieldQtlIrr: 320,
    yieldQtlRain: 160,
    lastSeasonPrice: 340,
    harvestPrice: 355,
    states: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Andhra Pradesh", "Bihar"],
    pHMin: 6.5,
    pHMax: 7.5,
    why: "Mill FRP is notified. Only plant if a crushing mill is within haul.",
    risks: "Locks the field for a year. Water hungry.",
  },
  {
    id: "onion",
    photo: "/photos/onion.jpg",
    names: {
      en: "Onion",
      hi: "प्याज",
      bn: "পেঁয়াজ",
      ta: "வெங்காயம்",
      te: "ఉల్లి",
      mr: "कांदा",
      gu: "ડુંગળી",
      kn: "ಈರುಳ್ಳಿ",
      ml: "സവാള",
      pa: "ਪਿਆਜ਼",
      ur: "پیاز",
      or: "ପିଆଜ",
    },
    seasons: ["rabi", "kharif"],
    soils: ["loam", "black", "silt"],
    days: 120,
    wantsIrrigation: true,
    costPerAcre: 38500,
    yieldQtlIrr: 80,
    yieldQtlRain: 40,
    lastSeasonPrice: 1650,
    harvestPrice: 2100,
    states: ["Maharashtra", "Karnataka", "Madhya Pradesh", "Gujarat", "Rajasthan", "Andhra Pradesh", "Bihar"],
    pHMin: 6.0,
    pHMax: 7.5,
    why: "Volatile but Lasalgaon/Pimpalgaon prices usually recover by late rabi harvest.",
    risks: "Storage rot. Don’t chase last year’s spike — size the acreage modestly.",
  },
  {
    id: "tomato",
    photo: "/photos/tomato.jpg",
    names: {
      en: "Tomato",
      hi: "टमाटर",
      bn: "টমেটো",
      ta: "தக்காளி",
      te: "టమోటా",
      mr: "टोमॅटो",
      gu: "ટમેટા",
      kn: "ಟೊಮೆಟೊ",
      ml: "തക്കാളി",
      pa: "ਟਮਾਟਰ",
      ur: "ٹماٹر",
      or: "ଟମାଟୋ",
    },
    seasons: ["rabi", "zaid"],
    soils: ["loam", "silt", "sandy"],
    days: 80,
    wantsIrrigation: true,
    costPerAcre: 44800,
    yieldQtlIrr: 120,
    yieldQtlRain: 50,
    lastSeasonPrice: 1200,
    harvestPrice: 1600,
    states: ALL,
    pHMin: 6.0,
    pHMax: 7.0,
    why: "Short cycle. Stagger planting so you miss the glut week.",
    risks: "Price can collapse overnight. Sell in lots, not all at once.",
  },
];

export function cropName(crop: Crop, lang: string) {
  return crop.names[lang as keyof Crop["names"]] ?? crop.names.en;
}

export function currentSeason(d = new Date()): Season {
  const m = d.getMonth() + 1;
  if (m >= 6 && m <= 10) return "kharif";
  if (m >= 3 && m <= 5) return "zaid";
  return "rabi";
}

export function harvestDate(days: number, from = new Date()) {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export function recommendCrops(input: {
  state: string;
  season: Season;
  soilType: SoilType;
  irrigated: boolean;
  acres: number;
  soil?: SoilReading | null;
}): RankedCrop[] {
  const fert: FertilizerRec[] = input.soil ? planFertilizers(input.soil, input.state) : [];
  const fertCost = fert.reduce((s, f) => s + Math.ceil(f.doseKg / f.bagSizeKg) * f.bagCostInr, 0);

  return CROPS.filter((c) => c.seasons.includes(input.season))
    .map((c) => {
      let fit = 0.55;
      const reasons: string[] = [];
      if (c.soils.includes(input.soilType)) {
        fit += 0.18;
        reasons.push("Matches your soil texture");
      } else {
        fit -= 0.12;
        reasons.push("Soil is not ideal — still workable with care");
      }
      if (c.states.includes(input.state)) {
        fit += 0.12;
        reasons.push(`Grown widely in ${input.state}`);
      }
      if (input.soil) {
        if (input.soil.pH >= c.pHMin && input.soil.pH <= c.pHMax) {
          fit += 0.1;
          reasons.push(`pH ${input.soil.pH.toFixed(1)} sits in this crop’s range`);
        } else {
          fit -= 0.08;
          reasons.push("pH is off — lime or gypsum is in the fertilizer plan");
        }
      }
      const yieldQtl = input.irrigated || !c.wantsIrrigation ? c.yieldQtlIrr : c.yieldQtlRain;
      if (!input.irrigated && c.wantsIrrigation) {
        fit -= 0.1;
        reasons.push("Yield cut for rainfed water");
      }
      const extraFert = input.soil ? fertCost : 0;
      const profit = Math.round(yieldQtl * c.harvestPrice - c.costPerAcre - extraFert);
      fit += Math.max(0, Math.min(0.15, profit / 80000));
      return {
        ...c,
        profitPerAcre: profit,
        yieldQtl,
        fertilizerCost: extraFert,
        harvestDateLabel: harvestDate(c.days),
        fitScore: Math.max(0.15, Math.min(1, fit)),
        reasons,
      };
    })
    .sort((a, b) => b.profitPerAcre - a.profitPerAcre);
}
