import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { MapPin, Navigation } from "lucide-react";
import { CROPS, cropName } from "@/lib/crops";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { inr } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/partner/")({ component: JobsPage });

function JobsPage() {
  const { t, lang } = useT();
  const jobs = useApp((s) => s.jobs.filter((j) => j.status === "open"));
  const accept = useApp((s) => s.acceptJob);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">{t("openJobs")}</h1>
      {jobs.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("emptyJobs")}</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((j) => {
            const crop = CROPS.find((c) => c.id === j.cropId);
            return (
              <li key={j.id} className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl">{crop ? cropName(crop, lang) : j.cropId}</p>
                    <p className="text-sm text-muted-foreground">
                      {j.qtyQtl} {t("quintal")}
                    </p>
                  </div>
                  <p className="tabular text-xl font-semibold text-accent">{inr(j.payInr, lang)}</p>
                </div>
                <p className="mt-3 flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 size-4 text-primary" />
                  <span>
                    {t("pickup")}: {j.pickup}
                  </span>
                </p>
                <p className="mt-1 flex items-start gap-2 text-sm">
                  <Navigation className="mt-0.5 size-4 text-soil" />
                  <span>
                    {t("drop")}: {j.drop}
                  </span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {j.km} {t("km")} · {t("fareEst")} {inr(j.payInr, lang)}
                </p>
                <Button
                  className="mt-3 w-full"
                  onClick={() => {
                    accept(j.id);
                    toast.success(t("jobAccepted"));
                  }}
                >
                  {t("accept")}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
