import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CROPS, cropName } from "@/lib/crops";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { inr } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/farmer/market")({ component: MarketPage });

function MarketPage() {
  const { t, lang } = useT();
  const [tab, setTab] = useState<"sell" | "browse">("browse");
  const [compose, setCompose] = useState(false);
  const listings = useApp((s) => s.listings);
  const name = useApp((s) => s.name);
  const village = useApp((s) => s.village);
  const state = useApp((s) => s.state);
  const addListing = useApp((s) => s.addListing);
  const myName = name || t("farmer");

  const [cropId, setCropId] = useState(CROPS[0].id);
  const [qty, setQty] = useState("20");
  const [price, setPrice] = useState("2400");
  const [grade, setGrade] = useState("A");
  const [notes, setNotes] = useState("");
  const [need, setNeed] = useState(true);

  const mine = listings.filter((l) => l.farmerName === myName);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h1 className="font-display text-3xl">{t("marketTitle")}</h1>
        <Button size="sm" onClick={() => { setTab("sell"); setCompose(true); }}>
          {t("newListing")}
        </Button>
      </div>
      <div className="grid grid-cols-2 rounded-full bg-muted p-1">
        {(["browse", "sell"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={cn(
              "min-h-10 rounded-full text-sm font-medium",
              tab === k ? "bg-surface shadow-[var(--shadow-border)]" : "text-muted-foreground",
            )}
          >
            {t(k === "sell" ? "sell" : "browse")}
          </button>
        ))}
      </div>

      {tab === "sell" && compose ? (
        <form
          className="space-y-3 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]"
          onSubmit={(e) => {
            e.preventDefault();
            addListing({
              farmerName: myName,
              village: village || "Village",
              state,
              cropId,
              qtyQtl: Number(qty) || 1,
              pricePerQtl: Number(price) || 0,
              grade,
              notes,
              needDelivery: need,
              harvestDate: new Date().toISOString(),
            });
            toast.success(t("lotPosted"));
            setCompose(false);
          }}
        >
          <div>
            <Label>{t("crop")}</Label>
            <Select value={cropId} onChange={(e) => setCropId(e.target.value)}>
              {CROPS.map((c) => (
                <option key={c.id} value={c.id}>
                  {cropName(c, lang)}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{t("qty")} ({t("quintal")})</Label>
              <Input type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
            </div>
            <div>
              <Label>{t("price")}</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>{t("grade")}</Label>
            <Select value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option>A</option>
              <option>FAQ</option>
              <option>B</option>
            </Select>
          </div>
          <div>
            <Label>{t("notes")}</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={need} onChange={(e) => setNeed(e.target.checked)} className="size-4" />
            {t("needVan")}
          </label>
          <Button type="submit" className="w-full">
            {t("publish")}
          </Button>
        </form>
      ) : null}

      <ul className="space-y-3">
        {(tab === "sell" ? mine : listings).length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("emptyLots")}</p>
        ) : (
          (tab === "sell" ? mine : listings).map((l) => {
            const crop = CROPS.find((c) => c.id === l.cropId);
            return (
              <li key={l.id} className="overflow-hidden rounded-[var(--radius-lg)] bg-surface shadow-[var(--shadow-border)]">
                {crop ? <img src={crop.photo} alt="" className="h-28 w-full object-cover" /> : null}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl">{crop ? cropName(crop, lang) : l.cropId}</p>
                      <p className="text-sm text-muted-foreground">
                        {l.farmerName} · {l.village}, {l.state}
                      </p>
                    </div>
                    <p className="tabular text-xl font-semibold text-accent">{inr(l.pricePerQtl, lang)}</p>
                  </div>
                  <p className="mt-2 text-sm">
                    {l.qtyQtl} {t("quintal")} · {t("grade")} {l.grade}
                  </p>
                  <p className="mt-1 text-xs font-medium text-primary">{l.needDelivery ? t("deliveryOn") : t("deliveryOff")}</p>
                  {l.notes ? <p className="mt-1 text-sm text-muted-foreground">{l.notes}</p> : null}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
