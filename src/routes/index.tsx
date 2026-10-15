import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, Landmark, Search, Sprout, Truck } from "lucide-react";
import { LANGUAGES, type LangCode } from "@/lib/languages";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { GrowLoop } from "@/components/GrowLoop";

export const Route = createFileRoute("/")({ component: Onboarding });

function Onboarding() {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const setLang = useApp((s) => s.setLang);
  const complete = useApp((s) => s.completeOnboarding);
  const onboarded = useApp((s) => s.onboarded);
  const role = useApp((s) => s.role);
  const hydrated = useApp((s) => s.hydrated);
  const [step, setStep] = useState<"lang" | "role">("lang");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!hydrated) return;
    if (onboarded && role) {
      void navigate({ to: role === "farmer" ? "/farmer" : "/partner" });
    }
  }, [hydrated, onboarded, role, navigate]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(s) ||
        l.native.toLowerCase().includes(s) ||
        l.code.includes(s),
    );
  }, [q]);

  if (hydrated && onboarded && role) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6">
        <GrowLoop className="overflow-hidden rounded-[var(--radius-xl)]" />
        <p className="mt-4 text-center font-display text-2xl text-primary">{t("appName")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-dvh max-w-3xl px-4 pb-10 pt-8">
      <p className="text-xs font-medium tracking-[0.14em] text-accent">{t("indianLangs")}</p>
      <h1 className="mt-2 font-display text-4xl text-primary">{t("appName")}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{t("tagline")}</p>

      {step === "lang" ? (
        <>
          <h2 className="mt-8 font-display text-2xl">{t("chooseLanguage")}</h2>
          <div className="relative mt-4">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="ps-9"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchLang")}
            />
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {filtered.map((l) => {
              const on = lang === l.code;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    dir={l.dir}
                    onClick={() => setLang(l.code as LangCode)}
                    className={cn(
                      "flex min-h-16 w-full flex-col items-start rounded-[var(--radius-md)] px-3 py-2 text-start shadow-[var(--shadow-border)]",
                      on ? "bg-primary text-primary-foreground" : "bg-surface text-foreground",
                    )}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="text-lg leading-tight">{l.native}</span>
                      {on ? <Check className="size-4 shrink-0" /> : null}
                    </span>
                    <span className={cn("text-xs", on ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {l.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <Button className="mt-6 w-full" size="lg" onClick={() => setStep("role")}>
            {t("continue")}
          </Button>
        </>
      ) : (
        <>
          <button type="button" className="mt-6 text-sm text-muted-foreground" onClick={() => setStep("lang")}>
            ← {t("back")}
          </button>
          <h2 className="mt-3 font-display text-2xl">{t("whoAreYou")}</h2>
          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={() => {
                complete("farmer");
                void navigate({ to: "/farmer" });
              }}
              className="flex gap-4 rounded-[var(--radius-xl)] bg-surface p-4 text-start shadow-[var(--shadow-border)]"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground">
                <Sprout className="size-7" />
              </span>
              <span>
                <span className="block font-display text-xl">{t("farmer")}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{t("farmerBlurb")}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                complete("partner");
                void navigate({ to: "/partner" });
              }}
              className="flex gap-4 rounded-[var(--radius-xl)] bg-surface p-4 text-start shadow-[var(--shadow-border)]"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-soil text-soil-foreground">
                <Truck className="size-7" />
              </span>
              <span>
                <span className="block font-display text-xl">{t("partner")}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{t("partnerBlurb")}</span>
              </span>
            </button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Landmark className="size-4" />
            {t("changeLang")} — {t("indianLangs")}
          </p>
        </>
      )}
    </div>
  );
}
