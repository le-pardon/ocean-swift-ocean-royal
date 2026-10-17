import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CROPS, STATES, cropName, currentSeason, recommendCrops } from "@/lib/crops";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { inr } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { FertilizerCards } from "@/components/FertilizerCards";
import { planFertilizers } from "@/lib/fertilizers";
import { notice } from "@/lib/notices";
import type { Season, SoilType } from "@/lib/types";

export const Route = createFileRoute("/farmer/plant")({ component: PlantPage });

function PlantPage() {
  const { t, lang } = useT();
  const store = useApp();
  const [state, setState] = useState(store.state);
  const [season, setSeason] = useState<Season>(store.season || currentSeason());
  const [soilType, setSoilType] = useState<SoilType>(store.soilTests[0]?.texture ?? store.soilType);
  const [irrigated, setIrrigated] = useState(store.irrigated);
  const [acres, setAcres] = useState(String(store.acres));
  const [show, setShow] = useState(true);

  const ranked = useMemo(
    () =>
      recommendCrops({
        state,
        season,
        soilType,
        irrigated,
        acres: Number(acres) || 1,
        soil: store.soilTests[0],
      }),
    [state, season, soilType, irrigated, acres, store.soilTests],
  );

  const fert = store.soilTests[0] ? planFertilizers(store.soilTests[0], state) : [];

  function apply() {
    store.updateProfile({
      state,
      season,
      soilType,
      irrigated,
      acres: Number(acres) || 1,
    });
    setShow(true);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl">{t("plantTitle")}</h1>
        <p className="mt-1 text-muted-foreground">{t("plantLead")}</p>
      </div>

      <form
        className="space-y-3 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]"
        onSubmit={(e) => {
          e.preventDefault();
          apply();
        }}
      >
        <div>
          <Label htmlFor="state">{t("state")}</Label>
          <Select id="state" value={state} onChange={(e) => setState(e.target.value)}>
            {STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="season">{t("season")}</Label>
            <Select id="season" value={season} onChange={(e) => setSeason(e.target.value as Season)}>
              {(["kharif", "rabi", "zaid"] as const).map((s) => (
                <option key={s} value={s}>
                  {t(s)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="soil">{t("soil")}</Label>
            <Select id="soil" value={soilType} onChange={(e) => setSoilType(e.target.value as SoilType)}>
              {(["sandy", "loam", "clay", "silt", "black"] as const).map((s) => (
                <option key={s} value={s}>
                  {t(s)}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="water">{t("water")}</Label>
            <Select
              id="water"
              value={irrigated ? "irrigated" : "rainfed"}
              onChange={(e) => setIrrigated(e.target.value === "irrigated")}
            >
              <option value="irrigated">{t("irrigated")}</option>
              <option value="rainfed">{t("rainfed")}</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="acres">{t("acres")}</Label>
            <Input
              id="acres"
              type="number"
              min={0.5}
              step={0.5}
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          {t("adviseMe")}
        </Button>
      </form>

      {show ? (
        <p className="rounded-[var(--radius-md)] bg-cream px-3 py-2 text-sm">{notice(lang, "placeholderBanner")}</p>
      ) : null}

      {show ? (
        <ol className="space-y-4">
          {ranked.map((c, i) => (
            <li key={c.id} className="overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)]">
              <div className="relative">
                <img src={c.photo} alt="" className="h-36 w-full object-cover" />
                <span className="absolute start-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-sm font-semibold tabular">
                  {i + 1}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl">{cropName(c, lang)}</h2>
                    <p className="text-sm text-muted-foreground">{t("harvestIn", { n: c.days })}</p>
                  </div>
                  <div className="text-end">
                    <p className="tabular text-2xl font-semibold text-accent">{inr(c.profitPerAcre, lang)}</p>
                    <p className="text-xs text-muted-foreground">{t("profitAcre")}</p>
                  </div>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <Stat label={t("costGrow")} value={inr(c.costPerAcre, lang)} />
                  <Stat label={t("priceHarvest")} value={`${inr(c.harvestPrice, lang)} / qtl`} />
                  <Stat label={t("lastYear")} value={`${inr(c.lastSeasonPrice, lang)} / qtl`} />
                  <Stat label={t("fit")} value={`${Math.round(c.fitScore * 100)}%`} />
                </dl>
                <p className="mt-3 text-sm">
                  <span className="font-medium">{t("whyThis")}. </span>
                  {c.why}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{t("risks")}. </span>
                  {c.risks}
                </p>
                <ul className="mt-2 list-disc ps-4 text-sm text-muted-foreground">
                  {c.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {fert.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl">{t("feed")}</h2>
          <FertilizerCards items={fert} />
        </section>
      ) : null}

      <p className="text-xs text-muted-foreground">
        {CROPS.length} {t("rankedBy")}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] bg-cream px-3 py-2">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="tabular font-medium">{value}</dd>
    </div>
  );
}
