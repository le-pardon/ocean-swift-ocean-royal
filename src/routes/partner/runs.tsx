import { createFileRoute } from "@tanstack/react-router";
import { CROPS, cropName } from "@/lib/crops";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { inr } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/partner/runs")({ component: RunsPage });

function RunsPage() {
  const { t, lang } = useT();
  const jobs = useApp((s) => s.jobs.filter((j) => j.status === "accepted" || j.status === "picked"));
  const advance = useApp((s) => s.advanceJob);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">{t("myRuns")}</h1>
      {jobs.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("emptyRuns")}</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((j) => {
            const crop = CROPS.find((c) => c.id === j.cropId);
            return (
              <li key={j.id} className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
                <p className="text-xs font-medium uppercase tracking-wide text-accent">{t("activeRun")}</p>
                <p className="font-display text-xl">{crop ? cropName(crop, lang) : j.cropId}</p>
                <p className="text-sm text-muted-foreground">
                  {j.pickup} → {j.drop}
                </p>
                <p className="mt-1 tabular text-lg font-semibold text-accent">{inr(j.payInr, lang)}</p>
                <Button className="mt-3 w-full" onClick={() => advance(j.id)}>
                  {j.status === "accepted" ? t("markPick") : t("markDrop")}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
