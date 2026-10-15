import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as MapPin, o as ShoppingBag } from "../_libs/lucide-react.mjs";
import { a as useApp, c as inr, g as costForFarm } from "./router-DUh-9jiU.mjs";
import { t as useT } from "./i18n-B3f9H9bs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FertilizerCards-COV49ZrM.js
var import_jsx_runtime = require_jsx_runtime();
function FertilizerCards({ items }) {
	const { t, lang } = useT();
	const acres = useApp((s) => s.acres);
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: items.map((f) => {
			const { bags, total } = costForFarm(f, acres || 1);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg leading-tight text-foreground",
							children: f.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: f.purpose
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular text-lg font-semibold text-accent",
								children: inr(total, lang)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t("estForFarm", { n: acres || 1 })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid grid-cols-2 gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[var(--radius-sm)] bg-cream px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: t("dose")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-medium",
								children: f.dosePerAcre
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[var(--radius-sm)] bg-cream px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: t("cost")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "font-medium",
								children: [
									inr(f.bagCostInr, lang),
									" / ",
									f.bagSizeKg,
									" kg ",
									t("bag"),
									" · ",
									bags,
									" ",
									t("bag")
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: t("shops")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-0.5 space-y-0.5",
							children: f.shops.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
						})] })]
					}),
					f.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mt-0.5 size-4 shrink-0" }), f.notes]
					}) : null
				]
			}, f.id);
		})
	});
}
//#endregion
export { FertilizerCards as t };
