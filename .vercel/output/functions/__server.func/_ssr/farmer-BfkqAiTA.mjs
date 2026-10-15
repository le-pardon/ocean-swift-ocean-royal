import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Camera, c as ScrollText, f as Leaf, p as Landmark, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as useApp, c as inr, h as recommendCrops, l as shortDate, m as currentSeason, p as cropName, s as greetingKey } from "./router-DUh-9jiU.mjs";
import { t as useT } from "./i18n-B3f9H9bs.mjs";
import { t as GrowLoop } from "./GrowLoop-DeR5WKmP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/farmer-BfkqAiTA.js
var import_jsx_runtime = require_jsx_runtime();
function FarmerHome() {
	const { t, lang } = useT();
	const name = useApp((s) => s.name);
	const state = useApp((s) => s.state);
	const soilType = useApp((s) => s.soilType);
	const irrigated = useApp((s) => s.irrigated);
	const acres = useApp((s) => s.acres);
	const season = useApp((s) => s.season) || currentSeason();
	const latest = useApp((s) => s.soilTests)[0];
	const top = recommendCrops({
		state,
		season,
		soilType: latest?.texture ?? soilType,
		irrigated,
		acres,
		soil: latest
	})[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t(greetingKey())
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-foreground",
					children: name || t("farmer")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-accent",
					children: t("seasonNow", { season: t(season) })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowLoop, { className: "overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-border)]" }),
			latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/farmer/diagnose",
				search: { tab: "soil" },
				className: "block rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
						children: t("soilReady", { date: shortDate(latest.date, lang) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-xl",
						children: t("viewSoil")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"N ",
							Math.round(latest.N),
							" · P ",
							Math.round(latest.P),
							" · K ",
							Math.round(latest.K),
							" · pH ",
							latest.pH.toFixed(1)
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/farmer/diagnose",
				search: { tab: "soil" },
				className: "flex items-start gap-3 rounded-[var(--radius-lg)] bg-primary p-4 text-primary-foreground shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "mt-0.5 size-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display text-xl leading-tight",
					children: t("uploadCard")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm text-primary-foreground/85",
					children: t("soilNeeded")
				})] })]
			}),
			top ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: t("topCropForYou")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/farmer/plant",
					className: "text-sm font-medium text-primary",
					children: t("seeWhy")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/farmer/plant",
				className: "block overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: top.photo,
					alt: "",
					className: "h-40 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: cropName(top, lang)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("harvestIn", { n: top.days })
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular text-2xl font-semibold text-accent",
								children: inr(top.profitPerAcre, lang)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t("profitAcre")
							})]
						})]
					})
				})]
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/farmer/diagnose",
					search: { tab: "leaf" },
					className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium",
						children: t("scanALeaf")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/farmer/market",
					className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium",
						children: t("sellYourCrop")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/farmer/plant",
				className: "flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-primary px-4 font-medium text-primary-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-4" }),
					t("adviseMe"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
				]
			})
		]
	});
}
//#endregion
export { FarmerHome as component };
