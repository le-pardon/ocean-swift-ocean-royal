import { _ as Outlet, m as useRouterState, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Camera, f as Leaf, h as House, l as Package, n as UserRound, p as Landmark, r as Truck, t as Wallet } from "../_libs/lucide-react.mjs";
import { a as useApp } from "./router-CVrjSalQ.mjs";
import { t as useT } from "./i18n-DEMkNnHY.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-B4i8i6n1.js
var import_jsx_runtime = require_jsx_runtime();
var FARMER_TABS = [
	{
		to: "/farmer",
		label: "navHome",
		icon: House,
		match: "/farmer"
	},
	{
		to: "/farmer/plant",
		label: "navPlant",
		icon: Leaf,
		match: "/farmer/plant"
	},
	{
		to: "/farmer/diagnose",
		label: "navScan",
		icon: Camera,
		match: "/farmer/diagnose"
	},
	{
		to: "/farmer/market",
		label: "navMarket",
		icon: Landmark,
		match: "/farmer/market"
	},
	{
		to: "/farmer/profile",
		label: "navYou",
		icon: UserRound,
		match: "/farmer/profile"
	}
];
var PARTNER_TABS = [
	{
		to: "/partner",
		label: "navJobs",
		icon: Package,
		match: "/partner"
	},
	{
		to: "/partner/runs",
		label: "navRuns",
		icon: Truck,
		match: "/partner/runs"
	},
	{
		to: "/partner/earnings",
		label: "navEarn",
		icon: Wallet,
		match: "/partner/earnings"
	},
	{
		to: "/partner/profile",
		label: "navYou",
		icon: UserRound,
		match: "/partner/profile"
	}
];
function isActive(pathname, tab, tabs) {
	if (tab.to === tabs[0].to) return pathname === tab.to || pathname === tab.to + "/";
	return pathname.startsWith(tab.match);
}
function AppShell({ kind }) {
	const { t } = useT();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const tabs = kind === "farmer" ? FARMER_TABS : PARTNER_TABS;
	const village = useApp((s) => s.village);
	const state = useApp((s) => s.state);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl leading-none tracking-tight text-primary",
					children: t("appName")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: village ? `${village}, ${state}` : state
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary",
					children: kind === "farmer" ? t("farmer") : t("partner")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-4 pb-28 pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 mx-auto max-w-lg border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid",
					style: { gridTemplateColumns: `repeat(${tabs.length}, 1fr)` },
					children: tabs.map((tab) => {
						const Icon = tab.icon;
						const on = isActive(pathname, tab, tabs);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: tab.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", on ? "text-primary" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: on ? 2.4 : 1.8
							}), t(tab.label)]
						}) }, tab.to);
					})
				})
			})
		]
	});
}
//#endregion
export { AppShell as t };
