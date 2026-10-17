import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Landmark, Leaf, ScrollText } from "lucide-react";
import { useT } from "@/lib/i18n";
import { notice } from "@/lib/notices";
import { useApp } from "@/lib/store";
import { cropName, currentSeason, recommendCrops } from "@/lib/crops";
import { greetingKey, inr, shortDate } from "@/lib/format";
import { GrowLoop } from "@/components/GrowLoop";

export const Route = createFileRoute("/farmer/")({ component: FarmerHome });

function FarmerHome() {
  const { t, lang } = useT();
  const name = useApp((s) => s.name);
  const state = useApp((s) => s.state);
  const soilType = useApp((s) => s.soilType);
  const irrigated = useApp((s) => s.irrigated);
  const acres = useApp((s) => s.acres);
  const season = useApp((s) => s.season) || currentSeason();
  const tests = useApp((s) => s.soilTests);
  const latest = tests[0];

  const ranked = recommendCrops({
    state,
    season,
    soilType: latest?.texture ?? soilType,
    irrigated,
    acres,
    soil: latest,
  });
  const top = ranked[0];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-muted-foreground">{t(greetingKey())}</p>
        <h1 className="font-display text-3xl text-foreground">{name || t("farmer")}</h1>
        <p className="mt-1 text-sm text-accent">{t("seasonNow", { season: t(season) })}</p>
      </div>

      <GrowLoop className="overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-border)]" />

      {latest ? (
        <Link
          to="/farmer/diagnose"
          search={{ tab: "soil" }}
          className="block rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("soilReady", { date: shortDate(latest.date, lang) })}</p>
          <p className="mt-1 font-display text-xl">{t("viewSoil")}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            N {Math.round(latest.N)} · P {Math.round(latest.P)} · K {Math.round(latest.K)} · pH {latest.pH.toFixed(1)}
          </p>
        </Link>
      ) : (
        <Link
          to="/farmer/diagnose"
          search={{ tab: "soil" }}
          className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-primary p-4 text-primary-foreground shadow-[var(--shadow-border)]"
        >
          <ScrollText className="mt-0.5 size-6 shrink-0" />
          <span>
            <span className="block font-display text-xl leading-tight">{t("uploadCard")}</span>
            <span className="mt-1 block text-sm text-primary-foreground/85">{t("soilNeeded")}</span>
          </span>
        </Link>
      )}

      {top ? (
        <section>
          <div className="mb-2 flex items-end justify-between">
            <h2 className="font-display text-xl">{t("topCropForYou")}</h2>
            <Link to="/farmer/plant" className="text-sm font-medium text-primary">
              {t("seeWhy")}
            </Link>
          </div>
          <Link
            to="/farmer/plant"
            className="block overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)]"
          >
            <img src={top.photo} alt="" className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-2xl">{cropName(top, lang)}</p>
                  <p className="text-sm text-muted-foreground">{t("harvestIn", { n: top.days })}</p>
                </div>
                <div className="text-end">
                  <p className="tabular text-2xl font-semibold text-accent">{inr(top.profitPerAcre, lang)}</p>
                  <p className="text-xs text-muted-foreground">{t("profitAcre")}</p>
                  <p className="text-[10px] text-muted-foreground">{notice(lang, "placeholderShort")}</p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/farmer/diagnose"
          search={{ tab: "leaf" }}
          className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]"
        >
          <Camera className="size-5 text-primary" />
          <p className="mt-2 font-medium">{t("scanALeaf")}</p>
        </Link>
        <Link to="/farmer/market" className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
          <Landmark className="size-5 text-primary" />
          <p className="mt-2 font-medium">{t("sellYourCrop")}</p>
        </Link>
      </div>

      <Link
        to="/farmer/plant"
        className="flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-primary px-4 font-medium text-primary-foreground"
      >
        <Leaf className="size-4" />
        {t("adviseMe")}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
