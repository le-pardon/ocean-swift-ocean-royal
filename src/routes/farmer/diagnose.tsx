import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, ScrollText } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { analyzePhoto } from "@/lib/ai";
import { fileToJpegDataUrl, shortDate, uid } from "@/lib/format";
import { GrowLoop } from "@/components/GrowLoop";
import { LeafArt } from "@/components/LeafArt";
import { FertilizerCards } from "@/components/FertilizerCards";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { LEAF_SAMPLES } from "@/lib/samples";
import { notice, signLabel } from "@/lib/notices";
import { blankSoilDraft, invalidSoilFields } from "@/lib/validation";
import { planFertilizers, sampleMaharashtraSoil, statusB, statusCu, statusFe, statusK, statusMn, statusN, statusOC, statusP, statusZn } from "@/lib/fertilizers";
import type { Diagnosis, SoilReading, SoilType } from "@/lib/types";
import { cn } from "@/lib/cn";
import type { MsgKey } from "@/lib/messages";

type Search = { tab?: "leaf" | "soil" };

export const Route = createFileRoute("/farmer/diagnose")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    tab: s.tab === "soil" ? "soil" : "leaf",
  }),
  component: DiagnosePage,
});

function DiagnosePage() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { t } = useT();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl">{t("scanTitle")}</h1>
        <p className="mt-1 text-muted-foreground">{tab === "soil" ? t("soilLead") : t("waitingPhoto")}</p>
      </div>
      <div className="grid grid-cols-2 rounded-full bg-muted p-1">
        {(["leaf", "soil"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => navigate({ search: { tab: k } })}
            className={cn(
              "min-h-10 rounded-full text-sm font-medium",
              tab === k ? "bg-surface text-foreground shadow-[var(--shadow-border)]" : "text-muted-foreground",
            )}
          >
            {t(k === "leaf" ? "leafTab" : "soilTab")}
          </button>
        ))}
      </div>
      {tab === "soil" ? <SoilPanel /> : <LeafPanel />}
    </div>
  );
}

const CONSENT_KEY = "khetsaathi-photo-consent-v1";

/** Photos leave the device for an outside AI service, so ask first. Stored per device. */
function usePhotoConsent() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try {
      setOk(localStorage.getItem(CONSENT_KEY) === "1");
    } catch {
      /* storage blocked: ask every visit */
    }
  }, []);
  const grant = () => {
    setOk(true);
    try {
      localStorage.setItem(CONSENT_KEY, "1");
    } catch {
      /* ignore */
    }
  };
  return { ok, grant };
}

function ConsentGate({ lang, grant }: { lang: string; grant: () => void }) {
  return (
    <div className="space-y-2 rounded-[var(--radius-lg)] bg-surface p-4 text-sm shadow-[var(--shadow-border)]">
      <p>{notice(lang, "photoConsentText")}</p>
      <Button type="button" variant="outline" onClick={grant}>
        {notice(lang, "photoConsentCheck")}
      </Button>
    </div>
  );
}

function LeafPanel() {
  const { t, lang } = useT();
  const add = useApp((s) => s.addDiagnosis);
  const camRef = useRef<HTMLInputElement>(null);
  const galRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [failed, setFailed] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const consent = usePhotoConsent();

  async function fromFile(file: File) {
    setFailed(false);
    setNote(null);
    setResult(null);
    const dataUrl = await fileToJpegDataUrl(file);
    setPhoto(dataUrl);
    setBusy(true);
    const minWait = new Promise((r) => setTimeout(r, 2000));
    try {
      const res = await analyzePhoto({ data: { imageBase64: dataUrl, kind: "leaf", lang } });
      await minWait;
      if (!res.ok || res.kind !== "leaf") {
        setFailed(true);
        toast.error(t("aiOff"));
        return;
      }
      if (res.quality === "unusable") {
        setNote(notice(lang, "leafUnusable"));
        return;
      }
      const shown = res.signs.filter((x) => x !== "none_visible");
      const d: Diagnosis = {
        id: uid("dx"),
        date: new Date().toISOString(),
        photoDataUrl: dataUrl,
        origin: "ai",
        issueType: "unclear",
        issue: shown.length ? shown.map((x) => signLabel(lang, x)).join("; ") : signLabel(lang, "none_visible"),
        summary: [
          shown.length ? "" : notice(lang, "leafNoSigns"),
          res.quality === "poor" ? notice(lang, "leafUnusable") : "",
          notice(lang, "leafNotice"),
        ]
          .filter(Boolean)
          .join(" "),
        treatment: notice(lang, "leafGuidance"),
        fertilizers: [],
      };
      setResult(d);
      add(d);
    } catch {
      await minWait;
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  function applySample(sample = LEAF_SAMPLES[0]) {
    const d: Diagnosis = {
      ...sample.diagnosis,
      id: uid("dx"),
      date: new Date().toISOString(),
      origin: "demo",
    };
    setPhoto(null);
    setResult(d); // demo examples are shown but never saved to the farmer's history
    setFailed(false);
    setNote(null);
  }

  return (
    <div className="space-y-4">
      <input ref={camRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && void fromFile(e.target.files[0])} />
      <input ref={galRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && void fromFile(e.target.files[0])} />

      {busy ? (
        <div className="overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-border)]">
          <GrowLoop />
          <p className="bg-surface px-4 py-3 text-center text-sm text-muted-foreground">{t("analysing")}</p>
        </div>
      ) : photo ? (
        <img src={photo} alt="" className="h-48 w-full rounded-[var(--radius-lg)] object-cover" />
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-border bg-cream px-4 py-8 text-center text-sm text-muted-foreground">
          {t("waitingPhoto")}
        </div>
      )}

      {consent.ok ? null : <ConsentGate lang={lang} grant={consent.grant} />}
      <div className="grid grid-cols-2 gap-2">
        <Button disabled={!consent.ok} onClick={() => camRef.current?.click()}>
          <Camera className="size-4" />
          {t("takePhoto")}
        </Button>
        <Button variant="outline" disabled={!consent.ok} onClick={() => galRef.current?.click()}>
          <ImagePlus className="size-4" />
          {t("gallery")}
        </Button>
      </div>
      {note ? <p className="rounded-[var(--radius-md)] bg-cream px-3 py-2 text-sm">{note}</p> : null}

      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">{t("samples")}</p>
        <div className="grid grid-cols-4 gap-2">
          {LEAF_SAMPLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => applySample(s)}
              className="rounded-[var(--radius-md)] bg-surface p-2 shadow-[var(--shadow-border)]"
            >
              <LeafArt tint={s.tint} className="mx-auto h-16" />
              <span className="mt-1 block text-center text-[11px] leading-tight">{t(s.titleKey)}</span>
            </button>
          ))}
        </div>
      </div>

      {failed ? (
        <div className="space-y-2 rounded-[var(--radius-lg)] bg-surface p-4 text-sm shadow-[var(--shadow-border)]">
          <p>{t("aiOff")}</p>
          <p>{notice(lang, "expertFallback")}</p>
        </div>
      ) : null}

      {result ? <DiagnosisCard d={result} /> : null}
    </div>
  );
}

function DiagnosisCard({ d }: { d: Diagnosis }) {
  const { t, lang } = useT();
  const sev: Record<NonNullable<Diagnosis["severity"]>, MsgKey> = { low: "low", mid: "mid", high: "high" };
  return (
    <section className="space-y-3">
      <article className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
        {d.origin === "demo" ? (
          <p className="mb-2 rounded-[var(--radius-sm)] bg-accent/15 px-2.5 py-1.5 text-xs font-medium text-accent">{notice(lang, "demoBanner")}</p>
        ) : null}
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("issue")}</p>
        <h2 className="font-display text-2xl">{d.issue}</h2>
        {d.cropGuess ? <p className="text-sm text-muted-foreground">{d.cropGuess}</p> : null}
        {d.severity ? (
          <p className="mt-2 inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
            {t("severity")}: {t(sev[d.severity])}
          </p>
        ) : null}
        <p className="mt-3 text-sm">{d.summary}</p>
        <p className="mt-2 text-sm">
          <span className="font-medium">{t("fix")}. </span>
          {d.treatment}
        </p>
      </article>
      {d.fertilizers.length > 0 ? (
        <>
          <h3 className="font-display text-xl">{t("buy")}</h3>
          <FertilizerCards items={d.fertilizers} />
        </>
      ) : null}
    </section>
  );
}

function SoilPanel() {
  const { t, lang } = useT();
  const store = useApp();
  const camRef = useRef<HTMLInputElement>(null);
  const galRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<Omit<SoilReading, "id" | "date"> | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [soilNote, setSoilNote] = useState<string | null>(null);
  const consent = usePhotoConsent();

  async function fromFile(file: File) {
    const dataUrl = await fileToJpegDataUrl(file);
    setPhoto(dataUrl);
    setBusy(true);
    setSoilNote(null);
    const minWait = new Promise((r) => setTimeout(r, 2000));
    // Never invent values: anything the card reader could not read stays blank for the farmer to type.
    const blank = { ...blankSoilDraft(store.soilType), photoDataUrl: dataUrl };
    try {
      const res = await analyzePhoto({ data: { imageBase64: dataUrl, kind: "soil-card", lang } });
      await minWait;
      if (!res.ok || res.kind !== "soil-card") {
        toast.error(t("aiOff"));
        setSoilNote(notice(lang, "soilNotRead"));
        setDraft(blank);
        return;
      }
      setDraft({ ...blank, ...res.values, lab: res.lab, source: "card" });
      setSoilNote(
        res.missing.length ? notice(lang, "soilUnreadable", { fields: res.missing.join(", ") }) : null,
      );
    } catch {
      await minWait;
      toast.error(t("aiOff"));
      setSoilNote(notice(lang, "soilNotRead"));
      setDraft(blank);
    } finally {
      setBusy(false);
    }
  }

  function save() {
    if (!draft) return;
    if (draft.source === "sample") {
      toast.error(notice(lang, "soilSampleNotSavable"));
      return;
    }
    const bad = invalidSoilFields(draft);
    if (bad.length > 0) {
      toast.error(notice(lang, "soilIncomplete", { fields: bad.join(", ") }));
      return;
    }
    const saved: SoilReading = { ...draft, id: uid("soil"), date: new Date().toISOString() };
    store.addSoilTest(saved);
    if (draft.texture) store.updateProfile({ soilType: draft.texture });
    setActiveId(saved.id);
    setDraft(null);
    toast.success(t("saved"));
  }

  const active = store.soilTests.find((s) => s.id === activeId) ?? store.soilTests[0];
  const draftComplete = draft ? invalidSoilFields(draft).length === 0 : false;
  const preview = draft && draftComplete ? planFertilizers({ ...draft, id: "draft", date: "" }, store.state) : [];
  const savedPlan = active ? planFertilizers(active, store.state) : [];

  return (
    <div className="space-y-4">
      <input ref={camRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && void fromFile(e.target.files[0])} />
      <input ref={galRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && void fromFile(e.target.files[0])} />

      {busy ? (
        <div className="overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-border)]">
          <GrowLoop />
          <p className="bg-surface px-4 py-3 text-center text-sm text-muted-foreground">{t("reading")}</p>
        </div>
      ) : photo ? (
        <img src={photo} alt="" className="h-44 w-full rounded-[var(--radius-lg)] object-cover" />
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-border bg-cream px-4 py-6 text-center text-sm text-muted-foreground">
          {t("waitingCard")}
        </div>
      )}

      {consent.ok ? null : <ConsentGate lang={lang} grant={consent.grant} />}
      <div className="grid grid-cols-2 gap-2">
        <Button disabled={!consent.ok} onClick={() => camRef.current?.click()}>
          <Camera className="size-4" />
          {t("snapHealthCard")}
        </Button>
        <Button variant="outline" disabled={!consent.ok} onClick={() => galRef.current?.click()}>
          <ImagePlus className="size-4" />
          {t("gallery")}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setDraft(sampleMaharashtraSoil());
            setPhoto(null);
            setSoilNote(notice(lang, "soilSampleNotSavable"));
          }}
        >
          <ScrollText className="size-4" />
          {t("sampleCard")}
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setDraft(blankSoilDraft(store.soilType));
            setPhoto(null);
            setSoilNote(null);
          }}
        >
          {t("manual")}
        </Button>
      </div>

      {draft ? (
        <form
          className="space-y-3 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <h2 className="font-display text-xl">{t("confirmSoil")}</h2>
          {soilNote ? <p className="rounded-[var(--radius-sm)] bg-cream px-3 py-2 text-sm">{soilNote}</p> : null}
          <div className="grid grid-cols-2 gap-3">
            <Num label={t("pH")} value={draft.pH} onChange={(pH) => setDraft({ ...draft, pH })} />
            <Num label="EC" value={draft.EC} onChange={(EC) => setDraft({ ...draft, EC })} />
            <Num label={t("organicC")} value={draft.OC} onChange={(OC) => setDraft({ ...draft, OC })} />
            <Num label={t("nitrogen")} value={draft.N} onChange={(N) => setDraft({ ...draft, N })} />
            <Num label={t("phosphorus")} value={draft.P} onChange={(P) => setDraft({ ...draft, P })} />
            <Num label={t("potassium")} value={draft.K} onChange={(K) => setDraft({ ...draft, K })} />
            <Num label={t("sulphur")} value={draft.S} onChange={(S) => setDraft({ ...draft, S })} />
            <Num label={t("zinc")} value={draft.Zn} onChange={(Zn) => setDraft({ ...draft, Zn })} />
            <Num label={t("iron")} value={draft.Fe} onChange={(Fe) => setDraft({ ...draft, Fe })} />
            <Num label={t("manganese")} value={draft.Mn} onChange={(Mn) => setDraft({ ...draft, Mn })} />
            <Num label={t("copper")} value={draft.Cu} onChange={(Cu) => setDraft({ ...draft, Cu })} />
            <Num label={t("boron")} value={draft.B} onChange={(B) => setDraft({ ...draft, B })} />
          </div>
          <div>
            <Label>{t("texture")}</Label>
            <p className="mb-1 text-xs text-muted-foreground">{notice(lang, "soilTextureNote")}</p>
            <Select
              value={draft.texture}
              onChange={(e) => setDraft({ ...draft, texture: e.target.value as SoilType })}
            >
              {(["sandy", "loam", "clay", "silt", "black"] as const).map((s) => (
                <option key={s} value={s}>
                  {t(s)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>{t("lab")}</Label>
            <Input
              value={draft.lab ?? ""}
              onChange={(e) => setDraft({ ...draft, lab: e.target.value })}
            />
          </div>
          <h3 className="font-display text-lg">{t("plan")}</h3>
          {draftComplete ? (
            <>
              <NutrientStrip soil={{ ...draft, id: "draft", date: "" }} />
              <FertilizerCards items={preview} />
            </>
          ) : null}
          <Button type="submit" className="w-full">
            {t("addTest")}
          </Button>
        </form>
      ) : null}

      {active && !draft ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl">{t("plan")}</h2>
          {active.photoDataUrl ? (
            <img src={active.photoDataUrl} alt="" className="h-32 w-full rounded-[var(--radius-lg)] object-cover" />
          ) : null}
          <p className="text-sm text-muted-foreground">
            {shortDate(active.date, lang)}
            {active.lab ? ` · ${active.lab}` : ""}
          </p>
          <NutrientStrip soil={active} />
          <FertilizerCards items={savedPlan} />
        </section>
      ) : null}

      <section>
        <h2 className="font-display text-xl">{t("testsSaved")}</h2>
        {store.soilTests.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">{t("historyEmpty")}</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {store.soilTests.map((s) => {
              const on = active?.id === s.id && !draft;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(s.id);
                      setDraft(null);
                      setPhoto(s.photoDataUrl ?? null);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[var(--radius-md)] bg-surface px-3 py-2 text-start text-sm shadow-[var(--shadow-border)]",
                      on && "ring-2 ring-primary",
                    )}
                  >
                    {s.photoDataUrl ? (
                      <img src={s.photoDataUrl} alt="" className="size-12 shrink-0 rounded-[var(--radius-sm)] object-cover" />
                    ) : (
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-cream text-primary">
                        <ScrollText className="size-5" />
                      </span>
                    )}
                    <span>
                      <span className="block font-medium">{shortDate(s.date, lang)}</span>
                      <span className="block text-muted-foreground">
                        N {Math.round(s.N)} · P {Math.round(s.P)} · K {Math.round(s.K)} · pH {s.pH.toFixed(1)}
                        {s.lab ? ` · ${s.lab}` : ""}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function Num({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  const shown = Number.isFinite(value) ? String(Math.round(value * 100) / 100) : "";
  return (
    <div>
      <Label>{label}</Label>
      <Input type="number" step="any" value={shown} onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))} />
    </div>
  );
}

function NutrientStrip({ soil }: { soil: SoilReading }) {
  const { t } = useT();
  const rows = [
    { k: t("nitrogen"), s: statusN(soil.N) },
    { k: t("phosphorus"), s: statusP(soil.P) },
    { k: t("potassium"), s: statusK(soil.K) },
    { k: t("organicC"), s: statusOC(soil.OC) },
    { k: t("sulphur"), s: soil.S < 10 ? ("deficient" as const) : ("opt" as const) },
    { k: t("zinc"), s: statusZn(soil.Zn) },
    { k: t("iron"), s: statusFe(soil.Fe ?? 99) },
    { k: t("manganese"), s: statusMn(soil.Mn ?? 99) },
    { k: t("copper"), s: statusCu(soil.Cu ?? 99) },
    { k: t("boron"), s: statusB(soil.B ?? 99) },
  ];
  return (
    <ul className="grid grid-cols-2 gap-2">
      {rows.map((r) => (
        <li key={r.k} className="rounded-[var(--radius-sm)] bg-cream px-3 py-2 text-sm">
          <p className="text-xs text-muted-foreground">{r.k}</p>
          <p className={r.s === "deficient" ? "font-medium text-accent" : "font-medium text-primary"}>{t(r.s)}</p>
        </li>
      ))}
    </ul>
  );
}
