import { MapPin, ShoppingBag } from "lucide-react";
import type { FertilizerRec } from "@/lib/types";
import { costForFarm } from "@/lib/fertilizers";
import { inr } from "@/lib/format";
import { useT } from "@/lib/i18n";
import { useApp } from "@/lib/store";

export function FertilizerCards({ items }: { items: FertilizerRec[] }) {
  const { t, lang } = useT();
  const acres = useApp((s) => s.acres);

  if (!items.length) return null;

  return (
    <div className="grid gap-3">
      {items.map((f) => {
        const { bags, total } = costForFarm(f, acres || 1);
        return (
          <article key={f.id} className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg leading-tight text-foreground">{f.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.purpose}</p>
              </div>
              <div className="text-right">
                <p className="tabular text-lg font-semibold text-accent">{inr(total, lang)}</p>
                <p className="text-xs text-muted-foreground">{t("estForFarm", { n: acres || 1 })}</p>
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-[var(--radius-sm)] bg-cream px-3 py-2">
                <dt className="text-xs text-muted-foreground">{t("dose")}</dt>
                <dd className="font-medium">{f.dosePerAcre}</dd>
              </div>
              <div className="rounded-[var(--radius-sm)] bg-cream px-3 py-2">
                <dt className="text-xs text-muted-foreground">{t("cost")}</dt>
                <dd className="font-medium">
                  {inr(f.bagCostInr, lang)} / {f.bagSizeKg} kg {t("bag")} · {bags} {t("bag")}
                </dd>
              </div>
            </dl>
            <div className="mt-3 flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("shops")}</p>
                <ul className="mt-0.5 space-y-0.5">
                  {f.shops.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
            {f.notes ? (
              <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                <ShoppingBag className="mt-0.5 size-4 shrink-0" />
                {f.notes}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
