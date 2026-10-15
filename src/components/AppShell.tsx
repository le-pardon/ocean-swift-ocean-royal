import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Camera, Home, Landmark, Leaf, Package, UserRound, Wallet, Truck } from "lucide-react";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import type { MsgKey } from "@/lib/messages";

type Tab = { to: string; label: MsgKey; icon: typeof Home; match: string };

const FARMER_TABS: Tab[] = [
  { to: "/farmer", label: "navHome", icon: Home, match: "/farmer" },
  { to: "/farmer/plant", label: "navPlant", icon: Leaf, match: "/farmer/plant" },
  { to: "/farmer/diagnose", label: "navScan", icon: Camera, match: "/farmer/diagnose" },
  { to: "/farmer/market", label: "navMarket", icon: Landmark, match: "/farmer/market" },
  { to: "/farmer/profile", label: "navYou", icon: UserRound, match: "/farmer/profile" },
];

const PARTNER_TABS: Tab[] = [
  { to: "/partner", label: "navJobs", icon: Package, match: "/partner" },
  { to: "/partner/runs", label: "navRuns", icon: Truck, match: "/partner/runs" },
  { to: "/partner/earnings", label: "navEarn", icon: Wallet, match: "/partner/earnings" },
  { to: "/partner/profile", label: "navYou", icon: UserRound, match: "/partner/profile" },
];

function isActive(pathname: string, tab: Tab, tabs: Tab[]) {
  if (tab.to === tabs[0].to) {
    return pathname === tab.to || pathname === tab.to + "/";
  }
  return pathname.startsWith(tab.match);
}

export function AppShell({ kind }: { kind: "farmer" | "partner" }) {
  const { t } = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tabs = kind === "farmer" ? FARMER_TABS : PARTNER_TABS;
  const village = useApp((s) => s.village);
  const state = useApp((s) => s.state);

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur-sm">
        <div>
          <p className="font-display text-xl leading-none tracking-tight text-primary">{t("appName")}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {village ? `${village}, ${state}` : state}
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {kind === "farmer" ? t("farmer") : t("partner")}
        </span>
      </header>
      <main className="flex-1 px-4 pb-28 pt-4">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-lg border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
        <ul className="grid" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const on = isActive(pathname, tab, tabs);
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
                    on ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" strokeWidth={on ? 2.4 : 1.8} />
                  {t(tab.label)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
