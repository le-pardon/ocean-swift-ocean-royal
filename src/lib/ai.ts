import { createServerFn } from "@tanstack/react-start";
import type { Diagnosis, FertilizerRec, SoilReading, SoilType } from "./types";

type AnalyzeKind = "leaf" | "soil-card";

export type AnalyzeInput = {
  imageBase64: string;
  kind: AnalyzeKind;
  lang?: string;
  cropHint?: string;
};

export type LeafResult = {
  ok: true;
  kind: "leaf";
  diagnosis: Omit<Diagnosis, "id" | "date" | "photoDataUrl">;
};

export type SoilResult = {
  ok: true;
  kind: "soil-card";
  reading: Omit<SoilReading, "id" | "date" | "photoDataUrl">;
};

export type AnalyzeFail = { ok: false; error: string };
export type AnalyzeResult = LeafResult | SoilResult | AnalyzeFail;

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced?.[1] ?? text).trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("No JSON");
  return JSON.parse(raw.slice(start, end + 1));
}

export const analyzePhoto = createServerFn({ method: "POST" })
  .validator((input: AnalyzeInput) => input)
  .handler(async ({ data }): Promise<AnalyzeResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "AI is not available" };

    const prompt =
      data.kind === "leaf"
        ? `You are an agronomist for Indian smallholders. Look at this crop leaf photo.
Return ONLY JSON:
{
  "cropGuess": string,
  "issueType": "deficiency" | "disease" | "pest",
  "issue": string,
  "severity": "low" | "mid" | "high",
  "summary": string (2 sentences, plain),
  "treatment": string (what to do this week),
  "fertilizers": [{ "name": string, "purpose": string, "dosePerAcre": string, "doseKg": number, "bagSizeKg": number, "bagCostInr": number, "shops": string[], "notes": string }]
}
Prefer Indian fertiliser names (Urea, DAP, MOP, SSP, ZnSO4, gypsum, lime) and 2025-26 subsidised bag prices in INR.
Shops should be IFFCO/KRIBHCO, state co-op, mandi dealer, KVK.
Language for summary/treatment/purpose: ${data.lang === "en" ? "English" : data.lang}. ${data.cropHint ? `Crop hint: ${data.cropHint}` : ""}`
        : `You are reading an Indian Soil Health Card (SHC) photograph.
Extract numbers from an Indian Soil Health Card. Units: pH unitless, EC dS/m, OC %, N P K kg/ha, S Zn Fe Mn Cu B in ppm.
Return ONLY JSON:
{
  "pH": number, "EC": number, "OC": number, "N": number, "P": number, "K": number,
  "S": number, "Zn": number, "Fe": number, "Mn": number, "Cu": number, "B": number,
  "texture": "sandy" | "loam" | "clay" | "silt" | "black",
  "lab": string
}
Read every parameter printed on the card. If one value is unreadable, estimate a typical figure for that soil and still return a number.`

    const imageUrl = data.imageBase64.startsWith("data:")
      ? data.imageBase64
      : `data:image/jpeg;base64,${data.imageBase64}`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.2,
        max_tokens: 900,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false, error: `xAI API error ${res.status}` };
    }
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content ?? "";
    try {
      const parsed = extractJson(text) as Record<string, unknown>;
      if (data.kind === "leaf") {
        const ferts = Array.isArray(parsed.fertilizers)
          ? (parsed.fertilizers as FertilizerRec[]).map((f, i) => ({
              id: `ai-${i}`,
              name: String(f.name ?? "Fertilizer"),
              purpose: String(f.purpose ?? ""),
              dosePerAcre: String(f.dosePerAcre ?? ""),
              doseKg: Number(f.doseKg ?? 25),
              bagSizeKg: Number(f.bagSizeKg ?? 50),
              bagCostInr: Number(f.bagCostInr ?? 500),
              shops: Array.isArray(f.shops) ? f.shops.map(String) : ["IFFCO cooperative", "Local agri dealer"],
              notes: f.notes ? String(f.notes) : undefined,
            }))
          : [];
        return {
          ok: true,
          kind: "leaf",
          diagnosis: {
            cropGuess: String(parsed.cropGuess ?? ""),
            issueType: (parsed.issueType as Diagnosis["issueType"]) ?? "deficiency",
            issue: String(parsed.issue ?? "Nutrient stress"),
            severity: (parsed.severity as Diagnosis["severity"]) ?? "mid",
            summary: String(parsed.summary ?? ""),
            treatment: String(parsed.treatment ?? ""),
            fertilizers: ferts,
          },
        };
      }
      const texture = ["sandy", "loam", "clay", "silt", "black"].includes(String(parsed.texture))
        ? (parsed.texture as SoilType)
        : "loam";
      return {
        ok: true,
        kind: "soil-card",
        reading: {
          pH: Number(parsed.pH ?? 7),
          EC: Number(parsed.EC ?? 0.3),
          OC: Number(parsed.OC ?? 0.5),
          N: Number(parsed.N ?? 250),
          P: Number(parsed.P ?? 20),
          K: Number(parsed.K ?? 180),
          S: Number(parsed.S ?? 12),
          Zn: Number(parsed.Zn ?? 0.6),
          Fe: Number(parsed.Fe ?? 4.5),
          Mn: Number(parsed.Mn ?? 2.5),
          Cu: Number(parsed.Cu ?? 0.4),
          B: Number(parsed.B ?? 0.5),
          texture,
          lab: String(parsed.lab ?? "Soil Health Card"),
          source: "card",
        },
      };
    } catch {
      return { ok: false, error: "Could not read the photo" };
    }
  });
