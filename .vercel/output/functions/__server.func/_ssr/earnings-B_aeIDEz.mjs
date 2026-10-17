import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useApp, c as inr } from "./router-CVrjSalQ.mjs";
import { t as useT } from "./i18n-DEMkNnHY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/earnings-B_aeIDEz.js
var import_jsx_runtime = require_jsx_runtime();
function EarnPage() {
	const { t, lang } = useT();
	const jobs = useApp((s) => s.jobs.filter((j) => j.status === "delivered"));
	const total = jobs.reduce((s, j) => s + j.payInr, 0);
	const todayStart = /* @__PURE__ */ new Date();
	todayStart.setHours(0, 0, 0, 0);
	const weekStart = new Date(todayStart);
	weekStart.setDate(weekStart.getDate() - 7);
	const monthStart = new Date(todayStart);
	monthStart.setDate(1);
	const sum = (from) => jobs.filter((j) => new Date(j.updatedAt) >= from).reduce((s, j) => s + j.payInr, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: t("earnedTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t("today"),
						value: inr(sum(todayStart), lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t("week"),
						value: inr(sum(weekStart), lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t("month"),
						value: inr(sum(monthStart), lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t("trips"),
						value: String(jobs.length)
					})
				]
			}),
			jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("emptyEarn")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-[var(--radius-md)] bg-surface px-3 py-2 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm",
						children: [
							j.pickup,
							" → ",
							j.drop
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular font-medium",
						children: inr(j.payInr, lang)
					})]
				}, j.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					t("fareEst"),
					": ",
					inr(total, lang)
				]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 tabular font-display text-2xl",
			children: value
		})]
	});
}
//#endregion
export { EarnPage as component };
