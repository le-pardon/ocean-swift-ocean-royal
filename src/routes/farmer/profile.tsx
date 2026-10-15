import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { LANGUAGES, type LangCode } from "@/lib/languages";
import { STATES } from "@/lib/crops";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";

export const Route = createFileRoute("/farmer/profile")({ component: FarmerProfile });

function FarmerProfile() {
  const { t, lang } = useT();
  const nav = useNavigate();
  const store = useApp();

  return (
    <div className="space-y-5">
      <h1 className="font-display text-3xl">{t("profile")}</h1>
      <form
        className="space-y-3 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success(t("saved"));
        }}
      >
        <div>
          <Label htmlFor="name">{t("yourName")}</Label>
          <Input id="name" value={store.name} placeholder={t("namePh")} onChange={(e) => store.updateProfile({ name: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="village">{t("village")}</Label>
          <Input
            id="village"
            value={store.village}
            placeholder={t("villagePh")}
            onChange={(e) => store.updateProfile({ village: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="st">{t("state")}</Label>
          <Select id="st" value={store.state} onChange={(e) => store.updateProfile({ state: e.target.value })}>
            {STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="ac">{t("acres")}</Label>
          <Input
            id="ac"
            type="number"
            value={store.acres}
            onChange={(e) => store.updateProfile({ acres: Number(e.target.value) || 1 })}
          />
        </div>
        <Button type="submit" className="w-full">
          {t("save")}
        </Button>
      </form>

      <section className="rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-xl">{t("changeLang")}</h2>
        <p className="mb-3 text-sm text-muted-foreground">{t("indianLangs")}</p>
        <Select value={lang} onChange={(e) => store.setLang(e.target.value as LangCode)}>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.native} — {l.name}
            </option>
          ))}
        </Select>
      </section>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          store.resetRole();
          void nav({ to: "/" });
        }}
      >
        {t("switchToPartner")}
      </Button>
    </div>
  );
}
