import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/partner/earnings")({ component: EarnPage });

function EarnPage() {
  const { t, lang } = useT();
  const jobs = useApp((s) => s.jobs.filter((j) => j.status === "delivered"));
  const total = jobs.reduce((s, j) => s + j.payInr, 0);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(todayStart);
  monthStart.setDate(1);
  const sum = (from: Date) =>
    jobs.filter((j) => new Date(j.updatedAt) >= from).reduce((s, j) => s + j.payInr, 0);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">{t("earnedTitle")}</h1>
      <div className="grid grid-cols-2 gap-3">
        <Stat label={t("today")} value={inr(sum(todayStart), lang)} />
        <Stat label={t("week")} value={inr(sum(weekStart), lang)} />
        <Stat label={t("month")} value={inr(sum(monthStart), lang)} />
        <Stat label={t("trips")} value={String(jobs.length)} />
      </div>
      {jobs.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("emptyEarn")}</p>
      ) : (
        <ul className="space-y-2">
          {jobs.map((j) => (
            <li key={j.id} className="flex items-center justify-between rounded-[var(--radius-md)] bg-surface px-3 py-2 shadow-[var(--shadow-border)]">
              <span className="text-sm">
                {j.pickup} → {j.drop}
              </span>
              <span className="tabular font-medium">{inr(j.payInr, lang)}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-muted-foreground">
        {t("fareEst")}: {inr(total, lang)}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 tabular font-display text-2xl">{value}</p>
    </div>
  );
}
